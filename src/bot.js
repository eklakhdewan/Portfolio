import { ROLES } from './data.js';
import { getHayaKnowledge } from './haya-knowledge.js';
import { getInterviewQuestions, getQuestionProgress, chooseAdaptiveQuestion, summarizeInterview } from './haya-interview.js';

const WORKER_URL = 'https://portfolio-bot-proxy.eklakhdewan78.workers.dev';
const MAX_MESSAGE_LENGTH = 500;
const MAX_HISTORY_MESSAGES = 6;
const CACHE_VERSION = 'v3';
const FAST_MODEL_TIER = 'fast';
const STRONG_MODEL_TIER = 'strong';
const CLIENT_CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const CLIENT_CACHE_MAX_ENTRIES = 50;
const CLIENT_CACHE_PREFIX = `haya-cache:${CACHE_VERSION}:`;
const INTERVIEW_TIMEOUT_MS = 12000;

let currentRoleContext = 'landing';
let messageHistory = [];
let busy = false;
let interviewSession = null;

function normalizeCacheQuestion(text) {
  return text.trim().toLowerCase().replace(/\s+/g, ' ');
}

function deterministicAnswer(question, roleId) {
  const q = normalizeCacheQuestion(question);
  const knowledge = getHayaKnowledge(roleId);
  if (!knowledge || !roleId || roleId === 'landing') return null;

  if (/\b(resume|cv)\b/.test(q)) {
    const role = ROLES[roleId];
    return role?.resumeFile
      ? `The relevant resume is ${role.resumeFile}. It is the resume configured for the ${role.title} view.`
      : 'The available portfolio data does not document a resume for this role.';
  }

  if (/\b(rag|retrieval)\b/.test(q)) {
    const matches = knowledge.projects.filter((project) => {
      const haystack = JSON.stringify(project).toLowerCase();
      return haystack.includes('rag') || haystack.includes('retrieval');
    });
    if (!matches.length) return 'The available portfolio data for this role does not document a RAG or retrieval project.';
    return `The ${ROLES[roleId]?.title || 'selected role'} view documents these RAG/retrieval projects: ${matches.map((project) => project.name).join('; ')}.`;
  }

  if (/\b(backend|back-end|api|server)\b/.test(q)) {
    const skills = knowledge.capabilities.filter((skill) =>
      /fastapi|next\.js|postgres|mysql|rest|api|node|nestjs|backend|sql/i.test(skill)
    ).slice(0, 10);
    return skills.length
      ? `The documented backend/data stack for this role includes ${skills.join(', ')}.`
      : 'The available portfolio data does not document a backend stack for this role.';
  }

  if (/\b(skill|skills|stack|technolog|tech)\b/.test(q)) {
    return knowledge.capabilities.length
      ? `The documented capabilities for this role include ${knowledge.capabilities.slice(0, 10).join(', ')}.`
      : 'The available portfolio data does not document skills for this role.';
  }

  if (/\b(project|projects)\b/.test(q)) {
    return knowledge.projects.length
      ? `The selected evidence for this role includes: ${knowledge.projects.map((project) => project.name).join('; ')}.`
      : 'The available portfolio data does not document projects for this role.';
  }

  if (/\b(education|degree|cgpa|college|university)\b/.test(q)) {
    const { profile } = knowledge;
    return `${profile.degree} at ${profile.institution}, graduating ${profile.graduationYear}, with ${profile.cgpa} CGPA.`;
  }

  if (/\b(experience|internship|intern)\b/.test(q)) {
    const experience = knowledge.experience[0];
    return experience
      ? `${experience.role} at ${experience.company} — ${experience.duration}. ${experience.description}`
      : 'The available portfolio data does not document experience.';
  }

  return null;
}

function selectModelTier(question) {
  const q = normalizeCacheQuestion(question);
  const strongSignals = [
    'compare', 'comparison', 'trade-off', 'tradeoff', 'why ',
    'how does', 'how do', 'explain', 'walk me through',
    'architecture', 'design', 'difference', ' versus ', ' vs ',
    'evaluate', 'analyze', 'analysis', 'reasoning',
    'implementation', 'pipeline', 'workflow'
  ];
  return strongSignals.some((signal) => q.includes(signal))
    ? STRONG_MODEL_TIER
    : FAST_MODEL_TIER;
}

function getClientCacheKey(roleId, question, modelTier = FAST_MODEL_TIER) {
  return `${CLIENT_CACHE_PREFIX}${modelTier}:${roleId}:${normalizeCacheQuestion(question)}`;
}

function readClientCache(roleId, question, modelTier = FAST_MODEL_TIER) {
  try {
    const raw = localStorage.getItem(getClientCacheKey(roleId, question, modelTier));
    if (!raw) return null;
    const entry = JSON.parse(raw);
    if (!entry?.answer || Date.now() - entry.createdAt > CLIENT_CACHE_TTL_MS) {
      localStorage.removeItem(getClientCacheKey(roleId, question, modelTier));
      return null;
    }
    return entry.answer;
  } catch {
    return null;
  }
}

function writeClientCache(roleId, question, answer, modelTier = FAST_MODEL_TIER) {
  try {
    const key = getClientCacheKey(roleId, question, modelTier);
    localStorage.setItem(key, JSON.stringify({ answer, createdAt: Date.now() }));
    const keys = [];
    for (let i = 0; i < localStorage.length; i += 1) {
      const itemKey = localStorage.key(i);
      if (itemKey?.startsWith(CLIENT_CACHE_PREFIX)) keys.push(itemKey);
    }
    if (keys.length > CLIENT_CACHE_MAX_ENTRIES) {
      keys.sort((a, b) => {
        try { return JSON.parse(localStorage.getItem(a)).createdAt - JSON.parse(localStorage.getItem(b)).createdAt; }
        catch { return 0; }
      });
      keys.slice(0, keys.length - CLIENT_CACHE_MAX_ENTRIES).forEach((itemKey) => localStorage.removeItem(itemKey));
    }
  } catch {
    // Cache is an optimization; never block the assistant if storage is unavailable.
  }
}


const ROLE_STARTER_QUESTIONS = {
  "ai-engineer": [
    "How is your Enterprise RAG pipeline structured?",
    "What retrieval techniques did you use in Enterprise RAG?",
    "How does APX use evidence before making a decision?",
    "Which AI and LLM skills are documented for this role?"
  ],
  "ml-engineer": [
    "How does your job recommendation system rank matches?",
    "Which ML and NLP techniques are used in your projects?",
    "What evaluation signals do you use for retrieval models?",
    "How do dense embeddings complement TF-IDF in your work?"
  ],
  "ai-systems": [
    "How is TaxTrace architected?",
    "What backend and infrastructure technologies do you use?",
    "How did you approach persistence and reliability in APX?",
    "What engineering signals are documented for this role?"
  ],
  "data-science": [
    "How do you use NLP in your projects?",
    "What data science projects are documented for this role?",
    "How do TF-IDF and semantic similarity appear in your work?",
    "Which Python data-science technologies do you use?"
  ],
  "data-analyst": [
    "What SQL capabilities are documented for this role?",
    "How does your job dashboard support data analysis?",
    "What reporting and visualization work have you built?",
    "Which data-cleaning and business-intelligence skills do you use?"
  ],
  "web-developer": [
    "What full-stack applications have you built?",
    "How is your portfolio architecture implemented?",
    "Which frontend and backend technologies do you use?",
    "How do you integrate AI services into web applications?"
  ]
};

function roleSummary(roleId) {
  return JSON.stringify(getHayaKnowledge(roleId));
}

function getInterviewContext(roleId, question) {
  const knowledge = getHayaKnowledge(roleId);
  const evidenceText = (question?.evidence || []).join(' ').toLowerCase();
  const projects = knowledge.projects.filter((project) => {
    const haystack = JSON.stringify(project).toLowerCase();
    return !evidenceText || evidenceText.split(/\\W+/).some((term) => term.length > 3 && haystack.includes(term));
  }).slice(0, 3);

  return {
    profile: knowledge.profile,
    experience: knowledge.experience,
    capabilities: knowledge.capabilities,
    projects: projects.length ? projects : knowledge.projects.slice(0, 3),
    roleRelevance: knowledge.roleRelevance,
    honestyRules: knowledge.honestyRules
  };
}

export function initBot() {
  const botToggle = document.getElementById('bot-toggle');
  const botPanel = document.getElementById('bot-panel');
  const botClose = document.getElementById('bot-close');
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const chatSubmit = document.getElementById('chat-submit');
  const chatInputArea = document.querySelector('.chat-input-area');

  if (!botToggle || !botPanel || !botClose || !chatMessages || !chatInput || !chatSubmit) return;

  const setOpen = (open) => {
    botPanel.style.display = open ? 'flex' : 'none';
    botPanel.setAttribute('aria-hidden', String(!open));
    botToggle.setAttribute('aria-expanded', String(open));
    if (open) window.setTimeout(() => chatInput.focus(), 0);
  };

  botToggle.addEventListener('click', () => {
    setOpen(botPanel.style.display !== 'flex');
  });

  botClose.addEventListener('click', () => {
    setOpen(false);
    botToggle.focus();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && botPanel.style.display === 'flex') {
      setOpen(false);
      botToggle.focus();
    }
  });

  chatSubmit.addEventListener('click', handleSendMessage);
  chatInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  });

  function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message message-${sender}`;
    msgDiv.textContent = text;
    msgDiv.setAttribute('role', sender === 'bot' ? 'status' : 'log');
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return msgDiv;
  }

  function addStarterQuestions() {
    const starterWrap = document.createElement('div');
    starterWrap.className = 'haya-starters';
    starterWrap.setAttribute('aria-label', 'Starter questions');

    const label = document.createElement('p');
    label.className = 'haya-starters-label';
    label.textContent = 'Try a question';
    starterWrap.appendChild(label);

    const questions = ROLE_STARTER_QUESTIONS[currentRoleContext] || [];
    questions.forEach((question) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'haya-starter';
      button.textContent = question;
      button.addEventListener('click', () => {
        chatInput.value = question;
        handleSendMessage();
      });
      starterWrap.appendChild(button);
    });

    chatMessages.appendChild(starterWrap);
  }

  function addRoleSelector() {
    const selectorDiv = document.createElement('div');
    selectorDiv.className = 'role-selector';
    selectorDiv.setAttribute('aria-label', 'Choose a portfolio role');

    const label = document.createElement('p');
    label.className = 'haya-starters-label';
    label.textContent = 'Choose a role';
    selectorDiv.appendChild(label);

    Object.values(ROLES).forEach((role) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'haya-role';
      button.textContent = role.title;
      button.addEventListener('click', () => {
        window.location.hash = role.id;
        selectorDiv.remove();
      });
      selectorDiv.appendChild(button);
    });

    chatMessages.appendChild(selectorDiv);
  }

  function addInterviewControl() {
    const wrap = document.createElement('div');
    wrap.className = 'haya-starters';
    wrap.setAttribute('aria-label', 'Interview controls');

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'haya-starter';
    button.textContent = 'Start mock interview';
    button.addEventListener('click', startInterview);
    wrap.appendChild(button);

    chatMessages.appendChild(wrap);
  }

  function startInterview() {
    if (!ROLES[currentRoleContext]) return;

    interviewSession = {
      active: true,
      roleId: currentRoleContext,
      questionIndex: 0,
      answered: 0,
      attempts: 0,
      followUps: 0,
      evaluations: [],
      answeredIds: [],
      currentQuestion: null,
      history: []

    };

    messageHistory = [];
    chatMessages.innerHTML = '';
    const questions = getInterviewQuestions(currentRoleContext);
    const firstQuestion = chooseAdaptiveQuestion(questions, [], []);
    interviewSession.currentQuestion = firstQuestion;
    const progress = getQuestionProgress(currentRoleContext, 0);

    addMessage(
      `Mock interview started for ${ROLES[currentRoleContext].title}. I’ll ask one question at a time, evaluate each answer against documented evidence, and adapt the next question to your responses. Core interview: ${progress.total} questions.`,
      'bot'
    );
    addMessage(`${progress.current}/${progress.total} — ${firstQuestion.question}`, 'bot');
    chatInputArea.style.display = 'flex';
    chatInput.focus();
  }

  function stopInterview() {
    if (!interviewSession?.active) return;
    interviewSession.active = false;
    addMessage('Interview mode ended. You can continue with normal Haya questions.', 'bot');
  }

  function buildInterviewPrompt(question, answer) {
    const knowledge = getInterviewContext(interviewSession.roleId, question);
    const role = ROLES[interviewSession.roleId];

    return `You are Haya conducting a structured mock HR interview for Eklakh Dewan.
Evaluate only the candidate's answer to the current question.

Question:
"${question.question}"

Candidate answer:
"${answer}"

Role: ${role.title}
Stage: ${question.stage}
Competency: ${question.competency}
Difficulty: ${question.difficulty}
Expected evidence/topics:
${question.evidence.join(', ')}

Canonical candidate grounding:
${JSON.stringify(knowledge)}

Interview state:
${JSON.stringify(interviewSession.history.slice(-4))}

Return ONLY valid JSON:
{
  "feedback": "1-2 concise sentences. Be specific and conversational.",
  "followUp": "One targeted follow-up if the answer is vague, shallow, unsupported, contradictory, or worth probing; otherwise empty string.",
  "contradiction": "A concise description of any conflict with documented evidence; otherwise empty string.",
  "score": {
    "clarity": 1,
    "relevance": 1,
    "specificity": 1,
    "ownership": 1,
    "evidence": 1
  }
}

Rules:
- Scores are integers 1-5 and evaluate only this answer.
- Do not make a hiring decision.
- Reward concrete first-person evidence and clear ownership.
- Do not penalize a candidate for honestly lacking an experience.
- Never invent missing facts.
- Treat unsupported metrics, users, deployments, employers, clients, or achievements as unsupported.
- If the answer conflicts with canonical evidence, flag it in contradiction and feedback.
- Ask at most one useful follow-up.
- Do not generate the next core question.`;
  }


  async function handleInterviewAnswer(answer) {
    const session = interviewSession;
    const questions = getInterviewQuestions(session.roleId);
    const question = session.currentQuestion;

    if (!question) throw new Error('Interview question state is missing.');

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), INTERVIEW_TIMEOUT_MS);

    try {
      const knowledge = getInterviewContext(session.roleId, question);
      const modelTier = question.difficulty === 'hard' || question.competency === 'technical depth'
        ? STRONG_MODEL_TIER
        : FAST_MODEL_TIER;

      const response = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: modelTier === STRONG_MODEL_TIER
            ? 'meta-llama/llama-3.3-70b-instruct'
            : 'meta-llama/llama-3.1-8b-instruct',
          tier: modelTier,
          cache: false,
          interview: true,
          profile: knowledge,
          messages: [
            {
              role: 'system',
              content: buildInterviewPrompt(question, answer)
            },
            {
              role: 'user',
              content: answer
            }
          ]
        }),
        signal: controller.signal
      });

      if (!response.ok) throw new Error(`Worker returned ${response.status}`);
      const data = await response.json();
      const raw = data?.choices?.[0]?.message?.content?.trim();
      if (!raw) throw new Error('Empty interview response');

      let result;
      try {
        const cleaned = raw.replace(/^```json\s*/i, '').replace(/\s*```$/, '');
        result = JSON.parse(cleaned);
      } catch {
        result = {
          feedback: raw,
          followUp: '',
          contradiction: '',
          score: null
        };
      }

      session.history.push({
        questionId: question.id,
        question: question.question,
        answer,
        evaluation: result
      });

      session.evaluations.push({
        questionId: question.id,
        question: question.question,
        score: result.score || null
      });
      session.answered += 1;

      if (!session.answeredIds.includes(question.id)) {
        session.answeredIds.push(question.id);
      }

      if (result.feedback) addMessage(`Feedback: ${result.feedback}`, 'bot');
      if (result.contradiction) addMessage(`Evidence check: ${result.contradiction}`, 'bot');

      if (result.followUp && session.followUps < 1) {
        session.followUps += 1;
        addMessage(`Follow-up: ${result.followUp}`, 'bot');
        return;
      }

      session.followUps = 0;
      session.answered += 1;

      if (!session.answeredIds.includes(question.id)) {
        session.answeredIds.push(question.id);
      }

      if (session.answered >= questions.length) {
        finishInterview();
        return;
      }

      const nextQuestion = chooseAdaptiveQuestion(
        questions,
        session.answeredIds,
        session.evaluations
      );
      session.currentQuestion = nextQuestion;
      session.questionIndex += 1;

      const progress = getQuestionProgress(session.roleId, session.questionIndex);
      addMessage(
        `${progress.current}/${progress.total} — ${nextQuestion.question}`,
        'bot'
      );
    } finally {
      window.clearTimeout(timeout);
    }
  }


  function finishInterview() {
    const session = interviewSession;
    session.active = false;

    const dimensions = summarizeInterview(session.evaluations);
    const strongest = dimensions.slice(0, 2).map((item) => `${item.dimension} ${item.average}/5`);
    const weakest = dimensions.slice(-2).reverse().map((item) => `${item.dimension} ${item.average}/5`);

    const unsupported = session.history.filter((item) => item.evaluation?.contradiction).length;
    const summary = [
      `Interview complete across ${session.answered} questions.`,
      strongest.length ? `Strongest dimensions: ${strongest.join(', ')}.` : '',
      weakest.length ? `Dimensions to improve: ${weakest.join(', ')}.` : '',
      unsupported ? `${unsupported} answer(s) triggered an evidence check.` : 'No evidence conflicts were flagged.',
      'Use the feedback above to revise specific answers rather than memorizing scripts.'
    ].filter(Boolean).join(' ');

    addMessage(summary, 'bot');
  }


  function resetConversation(roleId) {
    currentRoleContext = roleId;
    messageHistory = [];
    chatMessages.innerHTML = '';

    if (chatInputArea) {
      chatInputArea.style.display = roleId === 'landing' ? 'none' : 'flex';
    }

    interviewSession = null;

    if (roleId !== 'landing' && ROLES[roleId]) {
      addMessage(`Haya can explain the portfolio evidence for the ${ROLES[roleId].title} view — projects, capabilities, experience, and the relevant resume. Ask about any specific item.`, 'bot');
      addStarterQuestions();
      addInterviewControl();
      chatInput.disabled = false;
      chatSubmit.disabled = false;
    } else {
      chatInput.disabled = true;
      chatSubmit.disabled = true;
      addMessage("Hi — I’m Haya. Choose a role to explore Eklakh’s portfolio with role-specific context, projects, skills, and evidence.", 'bot');
      addRoleSelector();
      chatInput.disabled = false;
      chatSubmit.disabled = false;
    }
  }

  return {
    startInterview,
    stopInterview,
    updateContext: (roleId) => {
      if (currentRoleContext === roleId && chatMessages.childElementCount > 0) return;
      resetConversation(roleId);
    }
  };
}