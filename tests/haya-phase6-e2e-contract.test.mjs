import assert from "node:assert/strict";
import fs from "node:fs";
import { getInterviewQuestions, getQuestionProgress, chooseAdaptiveQuestion, summarizeInterview } from "../src/haya-interview.js";
import { getHayaKnowledge } from "../src/haya-knowledge.js";

const roles = [
  "ai-engineer",
  "ml-engineer",
  "ai-systems",
  "data-science",
  "data-analyst",
  "web-developer"
];

for (const roleId of roles) {
  const questions = getInterviewQuestions(roleId);
  const knowledge = getHayaKnowledge(roleId);

  assert.equal(questions.length, 12, `${roleId}: expected 12 core questions`);
  assert.equal(new Set(questions.map((q) => q.id)).size, questions.length);
  assert.ok(questions.every((q) =>
    q.stage && q.competency && q.difficulty && q.question && Array.isArray(q.evidence)
  ));
  assert.equal(getQuestionProgress(roleId, 0).total, 12);
  assert.ok(knowledge?.profile?.name);
  assert.ok(!JSON.stringify(questions).toLowerCase().includes("hcad-rag"));
  assert.ok(!JSON.stringify(knowledge).toLowerCase().includes("hcad-rag"));
}

const questions = getInterviewQuestions("ai-engineer");
const low = chooseAdaptiveQuestion(questions, [], [
  { score: { clarity: 2, relevance: 2, specificity: 2, ownership: 2, evidence: 2 } }
]);
const high = chooseAdaptiveQuestion(questions, [], [
  { score: { clarity: 5, relevance: 5, specificity: 5, ownership: 5, evidence: 5 } }
]);

assert.equal(low.difficulty, "easy");
assert.equal(high.difficulty, "hard");

const report = summarizeInterview([
  { score: { clarity: 5, relevance: 4, specificity: 3, ownership: 4, evidence: 2 } },
  { score: { clarity: 4, relevance: 5, specificity: 4, ownership: 5, evidence: 3 } }
]);

assert.equal(report.length, 5);
assert.equal(report[0].dimension, "relevance");
assert.equal(report.at(-1).dimension, "evidence");

const botSource = fs.readFileSync(new URL("../src/bot.js", import.meta.url), "utf8");
assert.match(botSource, /async function handleSendMessage/);
assert.match(botSource, /WORKER_URL/);

console.log("Haya Phase 6 end-to-end contract tests passed");
