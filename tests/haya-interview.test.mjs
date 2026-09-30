import assert from "node:assert/strict";
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

  assert.equal(questions.length, 12, `${roleId} should have 8 role questions + 4 common questions`);
  assert.equal(new Set(questions.map((question) => question.id)).size, questions.length);
  questions.forEach((question) => {
    assert.ok(question.question);
    assert.ok(question.stage);
    assert.ok(question.competency);
    assert.ok(question.difficulty);
    assert.ok(Array.isArray(question.evidence));
    assert.equal(/HCAD-RAG/i.test(JSON.stringify(question)), false);
  });

  const progress = getQuestionProgress(roleId, 0);
  assert.deepEqual(progress, { current: 1, total: 12 });

  const knowledge = getHayaKnowledge(roleId);
  assert.equal(/HCAD-RAG/i.test(JSON.stringify(knowledge)), false);
}

console.log("Haya interview grounding tests passed: 6/6 roles");


const aiQuestions = getInterviewQuestions("ai-engineer");
const easyNext = chooseAdaptiveQuestion(
  aiQuestions,
  ["ai-why"],
  [{ questionId: "ai-why", score: { clarity: 2, relevance: 2, specificity: 2, ownership: 2, evidence: 2 } }]
);
assert.ok(easyNext);
assert.equal(easyNext.difficulty, "easy");

const hardNext = chooseAdaptiveQuestion(
  aiQuestions,
  ["ai-why"],
  [{ questionId: "ai-why", score: { clarity: 5, relevance: 5, specificity: 5, ownership: 5, evidence: 5 } }]
);
assert.ok(hardNext);
assert.equal(hardNext.difficulty, "hard");

const summary = summarizeInterview([
  { score: { clarity: 5, relevance: 4, specificity: 3, ownership: 4, evidence: 2 } }
]);
assert.equal(summary[0].dimension, "clarity");
assert.equal(summary.at(-1).dimension, "evidence");

console.log("Adaptive interview tests passed");
