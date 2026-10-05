import { ROLES } from './data.js';
import { getHayaKnowledge } from './haya-knowledge.js';
import { getInterviewQuestions, getQuestionProgress, chooseAdaptiveQuestion, summarizeInterview } from './haya-interview.js';

const WORKER_URL = 'https://portfolio-bot-proxy.eklakhdewan78.workers.dev';
const MAX_MESSAGE_LENGTH = 500;
const MAX_HISTORY_MESSAGES = 6;
const CACHE_VERSION = 'v4';
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
  if (!knowledge) return null;

  if (/\b(why (hire|him|you)|hire (him|eklakh)|why should (i|we) hire|what makes (him|eklakh) (different|stand out)|why eklakh|what('s| is) the case for hiring)\b/.test(q)) {
    return "If you're evaluating Eklakh for an AI/software role, the strongest case is evidence-backed engineering breadth: Enterprise RAG documents a 50-query frozen benchmark with 780 human relevance judgments, including Recall@10 +9.9% and nDCG@10 +7.0% versus the dense baseline; TaxTrace documents 134 backend tests, 15 frontend tests, 7 reconciliation benchmark gate tests, 32 AI quality-gate tests, 1.000 reconciliation precision/recall, and a 5/5 security audit. His work also spans agentic workflows, backend systems, recommendation systems, and full-stack AI applications. The portfolio does not claim large-scale production ownership, so the value proposition is strong technical evidence plus honest scope rather than inflated claims.";
  }

  if (/\b(strengths?|best at|good at|strongest|standout skills?)\b/.test(q)) {
    return "The strongest documented areas are retrieval engineering, evidence-grounded AI, evaluation, backend/API engineering, and connecting AI/ML components to usable software. The portfolio repeatedly emphasizes baselines, measurable evaluation, testing, explicit interfaces, and controlled experiments rather than treating a demo as proof of production quality.";
  }

  if (/\b(different|stand out|unique|special|edge|advantage)\b/.test(q)) {
    return "The clearest differentiator is the combination of AI depth and software-engineering discipline. Enterprise RAG is not presented as just an LLM app: it includes dense + BM25 retrieval, hybrid/RRF fusion, cross-encoder reranking, evidence-constrained generation, citation validation, and a frozen evaluation set with human judgments. That evaluation-first mindset carries into the other systems.";
  }

  if (/\b(compare|comparison|other candidates?|better than|versus other)\b/.test(q)) {
    return "The portfolio does not contain evidence about other candidates, so I cannot honestly rank Eklakh against them. What I can give you is the decision-relevant evidence: retrieval evaluation in Enterprise RAG, automated test coverage and reconciliation gates in TaxTrace, evidence-constrained decision workflows in APX, and full-stack/realtime engineering in Tackboard.";
  }

  if (/\b(about him|tell me about (him|eklakh)|who is (he|eklakh)|profile|summary|overview)\b/.test(q)) {
    const { profile } = knowledge;
    return profile.name + " is a " + profile.degree + " candidate at " + profile.institution + ", graduating " + profile.graduationYear + " with a " + profile.cgpa + " CGPA. His portfolio focuses on applied AI engineering, RAG, AI systems, agentic workflows, machine learning, and software engineering around AI. The strongest evidence is concentrated in Enterprise RAG, TaxTrace, APX, Tackboard, and recommendation/job-agent systems.";
  }

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
      ? `${roleId && ROLES[roleId] ? 'For the ' + ROLES[roleId].title + ' view, ' : ''}the documented projects include: ${knowledge.projects.map((project) => project.name).join('; ')}.`
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
  landing: [
    "Why should a company hire Eklakh?",
    "What makes Eklakh different from a typical AI portfolio?",
    "What are his strongest engineering projects?",
    "What evidence proves the quality of his work?"
  ],
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

// Lightweight evidence retrieval: keep the LLM context focused on the parts of the
// portfolio most likely to answer the visitor's question. The canonical source remains
// haya-knowledge.js; this function only selects a smaller evidence slice at request time.
function retrieveRelevantKnowledge(question, knowledge) {
  if (!knowledge || !question) return knowledge;

  const terms = normalizeCacheQuestion(question)
    .replace(/[^a-z0-9+#.\s-]/g, ' ')
    .split(/\s+/)
    .filter((term) => term.length >= 3);

  const score = (value) => {
    const text = JSON.stringify(value).toLowerCase();
    return terms.reduce((total, term) => total + (text.includes(term) ? 1 : 0), 0);
  };

  const rankedProjects = [...(knowledge.projects || [])]
    .map((project, index) => ({ project, index, score: score(project) }))
    .sort((a, b) => b.score - a.score || a.index - b.index);
  const relevantProjects = rankedProjects.filter((item) => item.score > 0).slice(0, 4).map((item) => item.project);
  const projects = relevantProjects.length ? relevantProjects : (knowledge.projects || []).slice(0, 3);

  const rankedCapabilities = [...(knowledge.capabilities || [])]
    .map((capability, index) => ({ capability, index, score: score(capability) }))
    .sort((a, b) => b.score - a.score || a.index - b.index);
  const relevantCapabilities = rankedCapabilities.filter((item) => item.score > 0).slice(0, 12).map((item) => item.capability);
  const capabilities = relevantCapabilities.length ? relevantCapabilities : (knowledge.capabilities || []).slice(0, 12);

  return {
    profile: knowledge.profile,
    experience: knowledge.experience,
    projects,
    capabilities,
    roleRelevance: knowledge.roleRelevance,
    honestyRules: knowledge.honestyRules
  };
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

  async function handleSendMessage() {
    if (busy) return;

    const question = chatInput.value.trim();
    if (!question) return;

    if (question.length > MAX_MESSAGE_LENGTH) {
      addMessage(`Please keep the question under ${MAX_MESSAGE_LENGTH} characters.`, 'bot');
      return;
    }

    if (interviewSession?.active) {
      chatInput.value = '';
      busy = true;
      chatSubmit.disabled = true;
      chatInput.disabled = true;
      try {
        addMessage(question, 'user');
        await handleInterviewAnswer(question);
      } catch (error) {
        console.error('Haya interview error:', error);
        addMessage('I could not evaluate that answer right now. Please try again.', 'bot');
      } finally {
        busy = false;
        chatSubmit.disabled = false;
        chatInput.disabled = false;
        chatInput.focus();
      }
      return;
    }

    chatInput.value = '';
    addMessage(question, 'user');
    busy = true;
    chatSubmit.disabled = true;
    chatInput.disabled = true;

    let thinkingMessage = null;

    try {
      const modelTier = selectModelTier(question);
      const deterministic = deterministicAnswer(question, currentRoleContext);

      if (deterministic) {
        writeClientCache(currentRoleContext, question, deterministic, modelTier);
        addMessage(deterministic, 'bot');
        messageHistory.push(
          { role: 'user', content: question },
          { role: 'assistant', content: deterministic }
        );
        messageHistory = messageHistory.slice(-MAX_HISTORY_MESSAGES);
        return;
      }

      const cached = readClientCache(currentRoleContext, question, modelTier);
      if (cached) {
        addMessage(cached, 'bot');
        messageHistory.push(
          { role: 'user', content: question },
          { role: 'assistant', content: cached }
        );
        messageHistory = messageHistory.slice(-MAX_HISTORY_MESSAGES);
        return;
      }

      thinkingMessage = addMessage('Thinking…', 'bot');

      const fullKnowledge = getHayaKnowledge(
        currentRoleContext === 'landing' ? null : currentRoleContext
      );
      const knowledge = retrieveRelevantKnowledge(question, fullKnowledge);

      const systemPrompt = [
        'You are Haya, Eklakh Dewan’s portfolio evidence assistant.',
        'Answer like a sharp recruiter-facing portfolio assistant: direct, specific, evidence-led, and conversational.',
        'Use the supplied candidate knowledge as the source of truth. Prefer concrete projects, metrics, evaluation methods, engineering decisions, and documented scope.',
        'For questions such as “why hire him?”, “why him?”, “what makes him different?”, or “what is his edge?”, synthesize the strongest documented evidence into a hiring-oriented answer. Do not refuse merely because the portfolio lacks a comparison candidate.',
        'For comparison questions, do not invent facts about other candidates. State that limitation, then provide the strongest decision-relevant evidence about Eklakh.',
        'Do not invent employers, clients, users, metrics, production scale, publications, or achievements.',
        'If the knowledge does not document an answer, say that the available portfolio data does not document it.',
        'Do not repeat “the available portfolio data…” when the requested fact is actually documented elsewhere in the supplied knowledge.',
        currentRoleContext !== 'landing'
          ? `The visitor is currently viewing the ${ROLES[currentRoleContext]?.title || 'selected'} role.`
          : 'The visitor is on the portfolio landing page.',
        `Candidate knowledge: ${JSON.stringify(knowledge)}`
      ].join('\\n');

      const response = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: modelTier === STRONG_MODEL_TIER
            ? 'meta-llama/llama-3.3-70b-instruct'
            : 'meta-llama/llama-3.1-8b-instruct',
          tier: modelTier,
          cache: true,
          cacheKey: {
            version: CACHE_VERSION,
            role: currentRoleContext,
            question
          },
          profile: knowledge,
          messages: [
            { role: 'system', content: systemPrompt },
            ...messageHistory.slice(-MAX_HISTORY_MESSAGES),
            { role: 'user', content: question }
          ]
        })
      });

      if (!response.ok) throw new Error(`Worker returned ${response.status}`);

      const data = await response.json();
      const answer = data?.choices?.[0]?.message?.content?.trim()
        || data?.answer?.trim()
        || data?.response?.trim();

      if (!answer) throw new Error('Haya returned an empty response');

      writeClientCache(currentRoleContext, question, answer, modelTier);
      messageHistory.push(
        { role: 'user', content: question },
        { role: 'assistant', content: answer }
      );
      messageHistory = messageHistory.slice(-MAX_HISTORY_MESSAGES);

      if (thinkingMessage) {
        thinkingMessage.textContent = answer;
      } else {
        addMessage(answer, 'bot');
      }
    } catch (error) {
      console.error('Haya error:', error);

      if (thinkingMessage) {
        thinkingMessage.textContent =
          'I could not reach the Haya service right now. Please try again in a moment.';
      } else {
        addMessage(
          'I could not reach the Haya service right now. Please try again in a moment.',
          'bot'
        );
      }
    } finally {
      busy = false;
      chatSubmit.disabled = false;
      chatInput.disabled = false;
      chatInput.focus();
    }
  }

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
    button.textContent = interviewSession?.active ? 'Restart mock interview' : 'Start mock interview';
    button.addEventListener('click', startInterview);
    wrap.appendChild(button);

    if (interviewSession?.active) {
      const stop = document.createElement('button');
      stop.type = 'button';
      stop.className = 'haya-starter';
      stop.textContent = 'End interview';
      stop.addEventListener('click', stopInterview);
      wrap.appendChild(stop);
    }

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
    if (!firstQuestion) {
      interviewSession.active = false;
      addMessage('I could not initialize the interview question bank for this role.', 'bot');
      return;
    }
    interviewSession.currentQuestion = firstQuestion;
    const progress = getQuestionProgress(currentRoleContext, 0);

    addMessage(
      `Mock interview started for ${ROLES[currentRoleContext].title}. I’ll ask one question at a time, evaluate each answer against documented evidence, and adapt the next question to your responses. Core interview: ${progress.total} questions.`,
      'bot'
    );
    addMessage(`${progress.current}/${progress.total} — ${firstQuestion.question}`, 'bot');
    addInterviewControl();
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
  "coaching": "One short, actionable improvement for the candidate. Do not write a memorized answer.",
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
- Keep feedback conversational; do not sound like a resume or rubric.
- Coaching should tell the candidate what evidence, structure, or specificity to add.
- Never rewrite the candidate's answer into a memorized script.
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
          coaching: '',
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

      if (result.feedback) addMessage(`Feedback: ${result.feedback}`, 'bot');
      if (result.coaching) addMessage(`Coaching: ${result.coaching}`, 'bot');
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
    addInterviewControl();
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
      chatInput.disabled = false;
      chatSubmit.disabled = false;
      addMessage("Hi — I’m Haya. Ask me why Eklakh is a fit, what he has built, how the projects were evaluated, or choose a role for deeper context.", 'bot');
      addStarterQuestions();
      addRoleSelector();
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