/**
 * Haya Phase 2 interview bank.
 *
 * Source: Eklakh Dewan — HR Interview Answer Bank.
 * This is a prioritized core, not a verbatim copy of the full bank.
 */

const common = [
  {
    id: "common-intro",
    stage: "Introduction",
    competency: "communication",
    difficulty: "easy",
    question: "Tell me about yourself.",
    evidence: ["profile", "education", "current focus", "selected solo projects"]
  },
  {
    id: "common-resume",
    stage: "Introduction",
    competency: "resume walkthrough",
    difficulty: "easy",
    question: "Walk me through your resume.",
    evidence: ["education", "projects", "internship", "technical direction"]
  },
  {
    id: "common-strengths",
    stage: "Behavioral",
    competency: "self-awareness",
    difficulty: "easy",
    question: "What are your key strengths?",
    evidence: ["systematic problem solving", "AI systems interest", "persistence", "testing/evaluation"]
  },
  {
    id: "common-development",
    stage: "Behavioral",
    competency: "self-awareness",
    difficulty: "medium",
    question: "What is one area you are currently improving?",
    evidence: ["prioritization", "simplification", "scope control"]
  },
  {
    id: "common-difficult",
    stage: "Behavioral",
    competency: "problem solving",
    difficulty: "medium",
    question: "Tell me about a time you solved a difficult problem.",
    evidence: ["layered retrieval", "decomposition", "testing", "evidence"]
  },
  {
    id: "common-failure",
    stage: "Behavioral",
    competency: "failure handling",
    difficulty: "medium",
    question: "Tell me about a failure and what you learned from it.",
    evidence: ["compute constraints", "feasibility", "smaller experiments"]
  },
  {
    id: "common-team",
    stage: "Teamwork",
    competency: "collaboration",
    difficulty: "medium",
    question: "How do you work in a team?",
    evidence: ["explicit ownership", "interfaces", "communication", "reviewability"]
  },
  {
    id: "common-priority",
    stage: "Ownership",
    competency: "prioritization",
    difficulty: "medium",
    question: "How do you prioritize your tasks?",
    evidence: ["impact", "urgency", "dependencies", "risk", "information value"]
  },
  {
    id: "common-ambiguity",
    stage: "Ownership",
    competency: "ambiguity",
    difficulty: "medium",
    question: "How do you manage ambiguity?",
    evidence: ["explicit assumptions", "questions", "small prototypes", "evidence"]
  },
  {
    id: "common-career",
    stage: "Career Goals",
    competency: "career direction",
    difficulty: "easy",
    question: "What are your career goals?",
    evidence: ["software/AI engineering", "production discipline", "end-to-end AI systems"]
  }
];

const roleQuestions = {
  "ai-engineer": [
    ["ai-why", "Motivation", "role awareness", "easy", "Why do you want to become an AI Engineer?", ["AI + software engineering", "retrieval", "evaluation"]],
    ["ai-proud", "Project Experience", "project depth", "medium", "Which AI project are you most proud of?", ["Enterprise RAG", "APX", "TaxTrace", "job recommendations"]],
    ["ai-contribution", "Project Experience", "ownership", "medium", "What was your contribution to that project?", ["implementation", "experimentation", "evaluation", "integration"]],
    ["ai-challenge", "Project Experience", "problem solving", "medium", "What was the biggest challenge you faced in an AI project?", ["compute constraints", "evaluation discipline", "smaller experiments"]],
    ["ai-fit", "Role Awareness", "AI judgment", "medium", "How do you decide whether AI is appropriate for a business problem?", ["objective", "data", "error cost", "latency", "baseline", "ROI"]],
    ["ai-explain", "Communication", "technical communication", "medium", "How do you explain an AI solution to a non-technical person?", ["business outcome", "evidence", "traceability"]],
    ["ai-failure", "Behavioral", "failure handling", "medium", "Tell me about a time your AI project failed.", ["compute constraints", "reduced experiment", "validation"]],
    ["ai-hard", "Project Experience", "technical depth", "hard", "Tell me about a difficult technical problem you solved.", ["BM25", "dense retrieval", "hybrid fusion", "reranking", "evidence validation"]]
  ],
  "ml-engineer": [
    ["ml-why", "Motivation", "role awareness", "easy", "Why ML Engineering?", ["experimentation", "evaluation", "reproducibility", "software systems"]],
    ["ml-proud", "Project Experience", "project depth", "medium", "What ML project are you most proud of?", ["job recommendations", "retrieval", "ML experimentation"]],
    ["ml-role", "Role Awareness", "role understanding", "easy", "What does an ML Engineer do?", ["data", "validation", "deployment", "monitoring", "maintenance"]],
    ["ml-deploy", "Technical", "deployment", "medium", "What is your experience with deploying ML models?", ["project-level deployment", "FastAPI", "integration", "no overclaiming"]],
    ["ml-production", "Technical", "honesty", "medium", "Have you worked with production ML systems?", ["project experience", "production-oriented design", "no enterprise production claim"]],
    ["ml-tradeoff", "Technical", "decision making", "hard", "How do you balance model accuracy with business requirements?", ["accuracy", "latency", "cost", "explainability", "reliability"]],
    ["ml-failure", "Behavioral", "failure handling", "medium", "Tell me about a time an ML project didn't go as planned.", ["compute limits", "smaller validation experiments", "specific hypothesis"]],
    ["ml-newtech", "Behavioral", "learning", "medium", "Describe a time you had to learn a new technology quickly.", ["FAISS", "BM25", "SentenceTransformers", "FastAPI", "small working slice"]]
  ],
  "ai-systems": [
    ["sys-why", "Motivation", "role awareness", "easy", "Why AI Systems Engineering?", ["reliability", "retrieval", "APIs", "orchestration", "persistence"]],
    ["sys-project", "Project Experience", "system design", "medium", "Tell me about a systems/AI project you have worked on.", ["Enterprise RAG", "ingestion", "retrieval", "reranking", "evidence", "evaluation"]],
    ["sys-model-system", "Technical", "systems thinking", "medium", "What is the difference between building an AI model and building an AI system?", ["model vs surrounding system", "state", "errors", "security", "latency", "monitoring"]],
    ["sys-reliability", "Technical", "reliability", "hard", "How would you think about reliability in an AI system?", ["failure modes", "validation", "timeouts", "retries", "fallbacks", "evidence checks"]],
    ["sys-scale", "Technical", "scalability", "hard", "How do you approach system performance and scalability?", ["measurement", "indexing", "caching", "batching", "async", "database performance"]],
    ["sys-failure", "Behavioral", "incident handling", "medium", "How do you respond when a system fails unexpectedly?", ["stabilize", "isolate", "logs", "reproduce", "regression test"]],
    ["sys-tradeoff", "Behavioral", "trade-offs", "medium", "Tell me about a time you had to make a trade-off.", ["CPU/memory limits", "experiment scale", "controlled runs"]],
    ["sys-priority", "Ownership", "reliability vs speed", "medium", "How do you prioritize reliability versus speed of development?", ["prototype stage", "validation", "tests", "observability"]]
  ],
  "data-science": [
    ["ds-why", "Motivation", "role awareness", "easy", "Why Data Science?", ["data", "experimentation", "statistics", "ML", "business insight"]],
    ["ds-project", "Project Experience", "project depth", "medium", "Tell me about a data science project you have worked on.", ["job recommendations", "data modeling", "analysis"]],
    ["ds-data", "Technical", "data quality", "medium", "How do you approach data cleaning and preparation?", ["missing values", "duplicates", "normalization", "validation"]],
    ["ds-eda", "Technical", "analysis", "medium", "How do you approach exploratory data analysis?", ["distribution", "outliers", "relationships", "hypotheses"]],
    ["ds-model", "Technical", "model selection", "medium", "How do you decide which model or technique to use?", ["problem type", "baseline", "data", "interpretability", "evaluation"]],
    ["ds-eval", "Technical", "evaluation", "hard", "How do you evaluate a machine-learning model?", ["appropriate metric", "baseline", "holdout", "error analysis"]],
    ["ds-failure", "Behavioral", "failure handling", "medium", "Tell me about a time an ML or data project did not go as planned.", ["compute constraints", "scope reduction", "measurable experiment"]],
    ["ds-insight", "Communication", "business communication", "medium", "How do you explain a data-driven finding to a non-technical stakeholder?", ["outcome", "evidence", "uncertainty", "action"]]
  ],
  "data-analyst": [
    ["da-why", "Motivation", "role awareness", "easy", "Why Data Analytics?", ["SQL", "reporting", "business insight", "data quality"]],
    ["da-project", "Project Experience", "project depth", "medium", "Tell me about a data-analysis project you have worked on.", ["job dashboard", "data cleaning", "reporting", "visualization"]],
    ["da-sql", "Technical", "SQL", "medium", "What SQL capabilities are you most comfortable with?", ["SQL", "MySQL", "PostgreSQL", "aggregation", "reporting"]],
    ["da-clean", "Technical", "data quality", "medium", "How do you approach data cleaning?", ["validation", "duplicates", "missing data", "consistent fields"]],
    ["da-dashboard", "Technical", "visualization", "medium", "How do you build a useful dashboard?", ["decision-oriented metrics", "clear hierarchy", "filters", "actionable insights"]],
    ["da-insight", "Technical", "business insight", "medium", "How do you turn raw data into a useful business insight?", ["question", "metric", "segmentation", "context", "recommendation"]],
    ["da-priority", "Behavioral", "prioritization", "medium", "How do you prioritize multiple analysis requests?", ["impact", "urgency", "dependencies", "decision value"]],
    ["da-error", "Behavioral", "quality", "medium", "How do you handle a finding that turns out to be wrong?", ["reproduce", "trace data", "identify root cause", "correct communication"]]
  ],
  "web-developer": [
    ["web-why", "Motivation", "role awareness", "easy", "Which type of web development interests you most?", ["full-stack", "backend", "AI integration", "APIs"]],
    ["web-project", "Project Experience", "project depth", "medium", "Tell me about a web project you have worked on.", ["TaxTrace", "portfolio architecture", "frontend/backend integration"]],
    ["web-stack", "Technical", "technology breadth", "easy", "What technologies have you worked with?", ["Python", "FastAPI", "SQLAlchemy", "PostgreSQL", "Next.js", "React", "TypeScript"]],
    ["web-perf", "Technical", "performance", "medium", "How do you ensure website performance?", ["JavaScript", "assets", "API calls", "caching", "measurement"]],
    ["web-testing", "Technical", "testing", "medium", "How do you test your web applications?", ["unit", "integration", "API checks", "migrations", "frontend flows"]],
    ["web-bug", "Behavioral", "debugging", "medium", "Tell me about a difficult bug you solved.", ["layer isolation", "browser", "API", "service", "database"]],
    ["web-change", "Ownership", "requirements", "medium", "How do you handle changing requirements?", ["modularity", "migrations", "acceptance criteria"]],
    ["web-learn", "Behavioral", "learning", "medium", "Tell me about a time you had to learn a new framework quickly.", ["FastAPI", "Next.js", "React", "TypeScript", "vertical slice"]]
  ]
};

function normalizeRoleQuestions(roleId) {
  return (roleQuestions[roleId] || []).map(
    ([id, stage, competency, difficulty, question, evidence]) => ({
      id,
      stage,
      competency,
      difficulty,
      question,
      evidence
    })
  );
}

export function getInterviewQuestions(roleId) {
  const role = normalizeRoleQuestions(roleId);
  const selected = role.length ? role : common;
  return [...selected, ...common.slice(0, 4)];
}

export function getQuestionProgress(roleId, index) {
  const questions = getInterviewQuestions(roleId);
  return {
    current: Math.min(index + 1, questions.length),
    total: questions.length
  };
}
