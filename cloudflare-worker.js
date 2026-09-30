/**
 * Cloudflare Worker Proxy for OpenRouter API
 * 
 * INSTRUCTIONS FOR EKLAKH:
 * 1. Go to dash.cloudflare.com and sign up/log in (it's free).
 * 2. Go to "Workers & Pages" -> "Create Application" -> "Create Worker".
 * 3. Name it "portfolio-bot-proxy" and click Deploy.
 * 4. Click "Edit Code" and paste this exact file in, replacing the default code.
 * 5. Click "Deploy" in the top right.
 * 6. Go to the worker's Settings -> Variables.
 * 7. Add a variable named `OPENROUTER_API_KEY` and paste your `sk-or-v1-...` key. Encrypt it.
 * 8. In your portfolio's `bot.js`, change the fetch URL to your new worker's URL (e.g. https://portfolio-bot-proxy.eklakh.workers.dev).
 * 9. Delete the API key from your GitHub code!
 */

export default {
  async fetch(request, env) {
    // Handle CORS preflight requests
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        }
      });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    try {
      const requestData = await request.json();
      const cacheEligible = requestData.cache === true && requestData.cacheKey;

      if (cacheEligible) {
        const key = requestData.cacheKey;
        const version = String(key.version || "v1");
        const role = String(key.role || "landing").slice(0, 80);
        const question = String(key.question || "").trim().toLowerCase().replace(/\s+/g, " ").slice(0, 500);

        if (question) {
          const cacheUrl = new URL(request.url);
          cacheUrl.pathname = "/__haya_cache/" + encodeURIComponent(version) + "/" + encodeURIComponent(role) + "/" + encodeURIComponent(question);
          cacheUrl.search = "";
          const cacheKey = new Request(cacheUrl.toString(), { method: "GET" });
          const cached = await caches.default.match(cacheKey);
          if (cached) {
            const headers = new Headers(cached.headers);
            headers.set("X-Haya-Cache", "HIT");
            return new Response(cached.body, { status: cached.status, headers });
          }
          requestData._hayaCacheKey = cacheKey;
        }
      }

      // Call OpenRouter with the key stored safely on the server
      const openRouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: requestData.model || "meta-llama/llama-3.3-70b-instruct",
          messages: requestData.messages
        })
      });

      const data = await openRouterResponse.json();
      const responseBody = JSON.stringify(data);

      if (requestData._hayaCacheKey && openRouterResponse.ok && data?.choices?.[0]?.message?.content) {
        const cacheResponse = new Response(responseBody, {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=0, s-maxage=604800"
          }
        });
        await caches.default.put(requestData._hayaCacheKey, cacheResponse.clone());
      }

      // Return the response to the frontend
      return new Response(responseBody, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "X-Haya-Cache": requestData._hayaCacheKey && openRouterResponse.ok && data?.choices?.[0]?.message?.content ? "MISS" : "BYPASS"
        }
      });
      
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { 
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }
  }
};
