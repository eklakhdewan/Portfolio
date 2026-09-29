import { ROLES } from './data.js';

let currentRoleContext = null;
let messageHistory = [];

// NOTE: Move this to a Cloudflare Worker before deploying publicly.
// See cloudflare-worker.js for step-by-step instructions.
// const OPENROUTER_API_KEY = "";

export function initBot() {
  const botWidget = document.getElementById('bot-widget');
  const botToggle = document.getElementById('bot-toggle');
  const botPanel = document.getElementById('bot-panel');
  const botClose = document.getElementById('bot-close');
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const chatSubmit = document.getElementById('chat-submit');

  if (!botWidget) return;

  botToggle.addEventListener('click', () => {
    botPanel.style.display = botPanel.style.display === 'none' || botPanel.style.display === '' ? 'flex' : 'none';
    if (botPanel.style.display === 'flex') {
      chatInput.focus();
    }
  });

  botClose.addEventListener('click', () => {
    botPanel.style.display = 'none';
  });

  chatSubmit.addEventListener('click', handleSendMessage);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSendMessage();
  });

  function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message message-${sender}`;
    msgDiv.textContent = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function addRoleSelector() {
    const selectorDiv = document.createElement('div');
    selectorDiv.className = 'role-selector';
    selectorDiv.style.cssText = 'display:flex; flex-direction:column; gap:8px; margin-top:10px;';

    Object.values(ROLES).forEach(role => {
      const btn = document.createElement('button');
      btn.textContent = role.title;
      btn.style.cssText = `padding:10px 12px; border:1px solid ${role.accent}; border-radius:6px; background:transparent; color:var(--ink); cursor:pointer; text-align:left; font-weight:bold; font-size:0.85rem;`;

      btn.addEventListener('mouseenter', () => { btn.style.background = role.accent; btn.style.color = '#fff'; });
      btn.addEventListener('mouseleave', () => { btn.style.background = 'transparent'; btn.style.color = 'var(--ink)'; });

      btn.addEventListener('click', () => {
        window.location.hash = role.id;
        selectorDiv.remove();
      });

      selectorDiv.appendChild(btn);
    });

    chatMessages.appendChild(selectorDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  async function handleSendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    chatInput.value = '';

    const typingDiv = document.createElement('div');
    typingDiv.className = 'message message-bot typing-indicator';
    typingDiv.textContent = 'Haya is thinking...';
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    const responseText = await queryOpenRouter(text);

    typingDiv.remove();
    addMessage(responseText, 'bot');
  }

  async function queryOpenRouter(userText) {
    messageHistory.push({ role: 'user', content: userText });

    const contextStr = currentRoleContext === 'landing'
      ? "The user is on the landing page. Ask them what role they are hiring for."
      : JSON.stringify(ROLES[currentRoleContext]);

    const systemPrompt = `You are Haya, Eklakh Dewan's highly intelligent, professional AI portfolio concierge.
You are currently assisting a recruiter viewing the ${currentRoleContext} role portfolio.

ABOUT EKLAKH DEWAN:
- B.Tech AI & Data Science (2027 batch) at KPRIET.
- Builds production-grade RAG systems, agentic LLM workflows, and backend infrastructure.
- Actively seeking internships, placements, and job roles.
- Email: eklakh.inplace@gmail.com | GitHub: eklakhdewan
- Completed a virtual internship at Flowrage Technology (Gemini API integration, resume-matching algorithms).

ROLE CONTEXT:
${contextStr}

RULES:
1. Your name is Haya. Speak concisely, confidently, warmly.
2. Advocate for Eklakh by highlighting specific tools, metrics, and design decisions.
3. Keep answers to 2-3 sentences max.
4. Do NOT hallucinate. If unsure, say Eklakh is a fast learner but you lack that data.
5. No markdown formatting. Plain text only.`;

    try {
      const response = await fetch("https://portfolio-bot-proxy.eklakhdewan78.workers.dev", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3.3-70b-instruct",
          messages: [
            { role: "system", content: systemPrompt },
            ...messageHistory
          ]
        })
      });

      const data = await response.json();
      if (data.choices && data.choices[0] && data.choices[0].message) {
        const reply = data.choices[0].message.content;
        messageHistory.push({ role: "assistant", content: reply });
        return reply;
      }
      return "I'm having trouble connecting right now, please try again.";
    } catch (err) {
      console.error(err);
      return "Connection error. Please check your network.";
    }
  }

  // Public API — called by router.js on hash change
  return {
    updateContext: (roleId) => {
      if (currentRoleContext === roleId) return;

      currentRoleContext = roleId;
      messageHistory = [];
      chatMessages.innerHTML = '';

      if (roleId !== 'landing' && ROLES[roleId]) {
        addMessage(`Hello! I'm Haya. I see you're evaluating Eklakh for a ${ROLES[roleId].title} role. I've prepared his most relevant projects below. What would you like to know more about?`, 'bot');
        chatInput.disabled = false;
        chatSubmit.disabled = false;
      } else {
        addMessage(`Hi there! I'm Haya, Eklakh's AI concierge. I can answer any questions about his skills, projects, or experience. First — what role are you hiring for?`, 'bot');
        addRoleSelector();
        chatInput.disabled = true;
        chatSubmit.disabled = true;
      }
    }
  };
}
