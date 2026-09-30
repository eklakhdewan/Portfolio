import assert from "node:assert/strict";
import fs from "node:fs";

const bot = fs.readFileSync(new URL("../src/bot.js", import.meta.url), "utf8");
const router = fs.readFileSync(new URL("../src/router.js", import.meta.url), "utf8");
const render = fs.readFileSync(new URL("../src/render.js", import.meta.url), "utf8");

assert.match(bot, /async function handleSendMessage\(\)/);
assert.match(bot, /fetch\(WORKER_URL/);
assert.match(bot, /deterministicAnswer/);
assert.match(bot, /readClientCache/);
assert.match(bot, /writeClientCache/);
assert.match(bot, /handleInterviewAnswer/);

const answerIncrements = bot.match(/session\.answered \+= 1;/g) || [];
assert.equal(answerIncrements.length, 1, "each interview answer must be counted exactly once");

assert.match(router, /renderLandingView\(\)/);
assert.match(router, /bot\.updateContext\("landing"\)/);
assert.match(render, /I build AI systems that retrieve, reason, recommend and execute/);
assert.match(render, /Start Hiring Interview/);

console.log("Haya runtime contract tests passed");
