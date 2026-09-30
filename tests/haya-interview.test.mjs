import assert from "node:assert/strict";
import { getInterviewQuestions, getQuestionProgress } from "../src/haya-interview.js";
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
