const ALLOWED_ORIGIN = 'https://eklakhdewan.github.io';
const MAX_BODY_BYTES = 16000;
const MAX_MESSAGES = 12;
const MAX_MESSAGE_CHARS = 1200;
const ALLOWED_MODELS = new Set(['meta-llama/llama-3.3-70b-instruct']);

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin === ALLOWED_ORIGIN ? origin : ALLOWED_ORIGIN,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin'
  };
}

function json(data, status, origin = ALLOWED_ORIGIN) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...corsHeaders(origin)
    }
  });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const headers = corsHeaders(origin);

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers });

    if (origin !== ALLOWED_ORIGIN) return json({ error: 'Origin not allowed.' }, 403);
    if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);

    const contentLength = Number(request.headers.get('Content-Length') || 0);
    if (contentLength > MAX_BODY_BYTES) return json({ error: 'Request too large.' }, 413);

    try {
      const requestData = await request.json();
      if (!Array.isArray(requestData.messages) || requestData.messages.length === 0) {
        return json({ error: 'Messages are required.' }, 400);
      }

      const messages = requestData.messages.slice(-MAX_MESSAGES).map((message) => {
        if (!message || !['system', 'user', 'assistant'].includes(message.role)) {
          throw new Error('Invalid message role.');
        }
        const content = typeof message.content === 'string' ? message.content.slice(0, MAX_MESSAGE_CHARS) : '';
        if (!content) throw new Error('Invalid message content.');
        return { role: message.role, content };
      });

      const model = ALLOWED_MODELS.has(requestData.model)
        ? requestData.model
        : 'meta-llama/llama-3.3-70b-instruct';

      if (!env.OPENROUTER_API_KEY) return json({ error: 'AI provider is not configured.' }, 503);

      const openRouterResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://eklakhdewan.github.io/trial-portfolio/',
          'X-Title': 'Eklakh Dewan Trial Portfolio — Haya'
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.2,
          max_tokens: 500
        })
      });

      const body = await openRouterResponse.text();
      return new Response(body, {
        status: openRouterResponse.status,
        headers: {
          ...headers,
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'no-store'
        }
      });
    } catch {
      return json({ error: 'Invalid request or upstream failure.' }, 400);
    }
  }
};