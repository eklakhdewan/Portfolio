import { PROJECTS, ROLES, ROLE_FLAGSHIPS } from "./data.js";

function esc(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function projectEvidenceHtml(project) {
  const metrics = (project.metrics || []).slice(0, 4).map(metric => `<span>${esc(metric)}</span>`).join("");
  const engineering = (project.engineering || []).slice(0, 7).map(item => `<li>${esc(item)}</li>`).join("");
  return `
    <div class="project-evidence">
      ${metrics ? `<div class="project-metrics" aria-label="Verified project metrics">${metrics}</div>` : ""}
      <details class="project-details">
        <summary>Architecture &amp; engineering evidence</summary>
        <div class="project-detail-body">
          <div><strong>Architecture</strong><p>${esc(project.architecture || "Documented in repository.")}</p></div>
          <div><strong>Engineering</strong><ul>${engineering}</ul></div>
          <div><strong>Evidence boundary</strong><p>${esc(project.evidence || "Repository evidence available.")}</p></div>
          <div><strong>Stack</strong><p>${(project.stack || []).map(item => `<span class="inline-stack">${esc(item)}</span>`).join("")}</p></div>
        </div>
      </details>
    </div>
  `;
}

function galleryHtml(project) {
  if (!project.gallery?.length) return "";
  return `
    <div class="project-gallery" aria-label="${esc(project.name)} visual gallery">
      ${project.gallery.map((image, index) => `
        <button type="button" class="project-gallery-item" data-lightbox-src="${esc(image.src)}" data-lightbox-alt="${esc(image.alt)}" aria-label="Open ${esc(project.name)} evidence ${index + 1}">
          <img src="${esc(image.src)}" alt="${esc(image.alt)}" loading="lazy" decoding="async" />
          <span class="gallery-label">${image.src.includes("product-visual") ? "Product visual" : "Repository screenshot"} · expand</span>
        </button>
      `).join("")}
    </div>
  `;
}

function capabilitiesHtml(role) {
  const groups = role.capabilities || { Core: role.skills || [] };
  return Object.entries(groups).map(([group, items]) => `
    <article class="capability-card">
      <p class="capability-label">${esc(group)}</p>
      <div class="capability-list">${items.map(item => `<span>${esc(item)}</span>`).join("")}</div>
    </article>
  `).join("");
}

function proofHtml(role) {
  return (role.proof || []).map(item => `
    <article class="proof-card"><strong>${esc(item.value)}</strong><span>${esc(item.label)}</span></article>
  `).join("");
}

function engineeringProofHtml(role) {
  const seen = new Set();
  const rows = [];
  role.projects.forEach(project => {
    const items = [...(project.engineering || []), ...(project.metrics || [])];
    const unique = items.filter(item => {
      if (seen.has(item)) return false;
      seen.add(item);
      return true;
    }).slice(0, 4);
    if (unique.length) rows.push(`
      <article class="proof-ledger-row">
        <div><span class="proof-project">${esc(project.name)}</span><span class="proof-project-role">${esc(project.roleFocus)}</span></div>
        <ul>${unique.map(item => `<li>${esc(item)}</li>`).join("")}</ul>
        <a href="#project-${esc(project.id)}" class="text-link">View evidence ↗</a>
      </article>
    `);
  });
  return rows.join("");
}

function educationHtml(role) {
  return (role.education || []).map(item => `
    <article class="info-card"><p class="eyebrow">Education</p><h3>${esc(item.degree)}</h3><p>${esc(item.institution)} · ${esc(item.year)}</p><strong>${esc(item.result)}</strong></article>
  `).join("");
}

function credentialsHtml(role) {
  return (role.credentials || []).map(item => `
    <article class="info-card"><p class="eyebrow">Credential</p><h3>${esc(item.name)}</h3><p>${esc(item.issuer)} · ${esc(item.duration)}</p><span class="credential-badge">${esc(item.evidence)}</span></article>
  `).join("");
}

function projectCard(project, role, index) {
  const isFlagship = project.id === ROLE_FLAGSHIPS[role.id];
  return `
    <article id="project-${esc(project.id)}" class="project-card in-view ${isFlagship ? "project-featured" : ""}" style="--role-accent:${esc(role.accent)};--project-index:${index};">
      <div class="project-meta">
        <span>${String(index + 1).padStart(2, "0")}</span>
        <span class="project-kicker">${isFlagship ? "ROLE FLAGSHIP" : esc(role.title)}</span>
      </div>
      <div class="project-title-row">
        <div>
          <p class="project-category">${esc(project.category)}</p>
          <h3>${esc(project.name)}</h3>
          <p class="project-subtitle">${esc(project.roleFocus)}</p>
        </div>
        <span class="project-status-badge">${esc(project.status)}</span>
      </div>
      <p class="project-description">${esc(project.description)}</p>
      ${project.metrics?.length ? `<div class="project-metric-strip">${project.metrics.slice(0, 3).map(metric => `<span>${esc(metric)}</span>`).join("")}</div>` : ""}
      ${galleryHtml(project)}
      ${projectEvidenceHtml(project)}
      <ul class="tag-list">${(project.stack || []).slice(0, 7).map(tag => `<li>${esc(tag)}</li>`).join("")}</ul>
      <div class="card-links">
        ${project.repo ? `<a class="text-link" style="color:var(--role-accent)" href="${esc(project.repo)}" target="_blank" rel="noopener noreferrer">Repository ↗</a>` : ""}
        ${project.demo ? `<a class="text-link" style="color:var(--role-accent)" href="${esc(project.demo)}" target="_blank" rel="noopener noreferrer">Live demo ↗</a>` : ""}
      </div>
    </article>
  `;
}

function roleFlagshipHtml(project, role) {
  if (!project) return "";
  return `
    <section class="section case-study-section" style="--role-accent:${esc(role.accent)}">
      <div class="container">
        <div class="flagship-header">
          <div class="section-heading in-view">
            <p class="eyebrow">Role flagship · ${esc(role.title)}</p>
            <h2>${esc(project.name)}</h2>
            <p>${esc(project.description)}</p>
          </div>
          <div class="flagship-actions">
            ${project.repo ? `<a class="button button-primary" style="background-color:var(--role-accent)" href="${esc(project.repo)}" target="_blank" rel="noopener noreferrer">Inspect repository ↗</a>` : ""}
            ${project.demo ? `<a class="button button-secondary" href="${esc(project.demo)}" target="_blank" rel="noopener noreferrer">Open demo ↗</a>` : ""}
          </div>
        </div>
        <div class="flagship-metrics">
          ${(project.metrics || []).slice(0, 4).map(metric => `<div><strong>${esc(metric.split(" ").slice(0, 2).join(" "))}</strong><span>${esc(metric.split(" ").slice(2).join(" ") || "verified signal")}</span></div>`).join("")}
        </div>
        <div class="case-study-grid flagship-grid in-view">
          <div class="case-panel case-panel-primary"><span class="case-label">Problem</span><p>${esc(project.problem)}</p></div>
          <div class="case-panel case-panel-primary"><span class="case-label">Architecture</span><p>${esc(project.architecture)}</p></div>
          <div class="case-panel"><span class="case-label">Evidence</span><p>${esc(project.evidence)}</p></div>
          <div class="case-panel"><span class="case-label">Engineering</span><p>${(project.engineering || []).slice(0, 8).map(esc).join(" · ")}</p></div>
        </div>
      </div>
    </section>
  `;
}

export function renderRoleView(roleId) {
  const role = ROLES[roleId];
  if (!role) return "";
  const featured = role.projects.find(project => project.id === ROLE_FLAGSHIPS[roleId]) || role.projects[0];

  const projectsHtml = role.projects.map((project, index) => projectCard(project, role, index)).join("");
  const experienceHtml = (role.experience || []).map((exp, index) => `
    <article class="timeline-item in-view" style="--role-accent:${esc(role.accent)};animation-delay:${index * 0.12}s">
      <div class="timeline-date">${esc(exp.duration)}</div>
      <h3>${esc(exp.role)} · ${esc(exp.company)}</h3>
      <div class="experience-card">
        <div class="exp-header"><div><p class="exp-role">${esc(exp.role)}</p><p class="exp-company">${esc(exp.company)}</p></div><div class="exp-meta"><p>${esc(exp.duration)}</p><span>Certificate-backed</span></div></div>
        <p class="experience-description">${esc(exp.description)}</p>
        <a class="exp-cert-link" href="${import.meta.env.BASE_URL}EKLAKH%20DEWAN-%20Internship%20Certificate.png" target="_blank" rel="noopener noreferrer">View certificate ↗</a>
      </div>
    </article>
  `).join("");

  return `
    <section class="hero container in-view role-hero" style="--role-accent:${esc(role.accent)}">
      <div class="hero-copy">
        <p class="eyebrow">Targeted View · ${esc(role.title)}</p>
        <h1>${esc(role.title)}</h1>
        <p class="hero-summary">${esc(role.pitch)}</p>
        <p class="hero-status"><span class="status-pulse" aria-hidden="true"></span><span>Evidence-ranked profile · ${role.projects.length} selected projects · role-specific résumé</span></p>
        <div class="hero-actions">
          <a class="button button-primary" style="background-color:var(--role-accent)" href="${import.meta.env.BASE_URL}${esc(role.resumeFile)}" target="_blank" rel="noreferrer">View résumé ↗</a>
          <button class="button button-secondary" onclick="document.getElementById('bot-toggle').click();">Ask Haya ↗</button>
        </div>
        <div class="proof-grid">${proofHtml(role)}</div>
      </div>
      <aside class="hero-visual" aria-label="Profile and role summary">
        <div class="portrait-wrap"><img src="${import.meta.env.BASE_URL}me.png" alt="Eklakh Dewan" class="portrait role-portrait" /></div>
        <div class="hero-card role-fit-card"><p class="card-label">Role fit</p><h2>${esc(role.title)}</h2><p>${esc(role.pitch)}</p></div>
      </aside>
    </section>

    <section id="projects" class="section section-dark">
      <div class="container">
        <div class="section-heading in-view">
          <p class="eyebrow">Role-ranked project evidence</p>
          <h2>Less breadth. More proof.</h2>
          <p>The list is deliberately constrained to projects with evidence relevant to this role. The first project is the explicit flagship; supporting work follows by relevance.</p>
        </div>
        <div class="project-grid role-project-grid">${projectsHtml}</div>
      </div>
    </section>

    ${roleFlagshipHtml(featured, role)}

    <section class="section section-tint">
      <div class="container">
        <div class="section-heading in-view">
          <p class="eyebrow">Engineering proof</p>
          <h2>Claims tied directly to projects.</h2>
          <p>These are implementation and evaluation signals linked to the project that produced them—not a generic keyword cloud.</p>
        </div>
        <div class="proof-ledger in-view">${engineeringProofHtml(role)}</div>
      </div>
    </section>

    <section class="section container">
      <div class="section-heading in-view"><p class="eyebrow">Capabilities</p><h2>The stack behind the selected work.</h2></div>
      <div class="capability-grid in-view">${capabilitiesHtml(role)}</div>
    </section>

    <section id="experience" class="section section-tint">
      <div class="container split-layout">
        <div class="section-heading in-view"><p class="eyebrow">Experience</p><h2>Early-career experience with evidence attached.</h2></div>
        <div class="timeline">${experienceHtml}</div>
      </div>
    </section>

    <section class="section container"><div class="info-grid in-view">${educationHtml(role)}${credentialsHtml(role)}</div></section>

    <section id="contact" class="section contact-section container">
      <div class="contact-card contact-intro in-view">
        <div><p class="eyebrow">06 / Contact</p><h2>If the system is interesting,<br /><em>let’s talk about it.</em></h2><p>I’m interested in AI/ML engineering, backend systems, and software roles where there is something real to measure, debug, and improve. Available for job, placement, and internship opportunities.</p></div>
        <div class="contact-actions"><a class="button button-primary" style="background-color:var(--role-accent)" href="mailto:eklakh.inplace@gmail.com">Email me ↗</a><a class="button button-secondary" href="https://github.com/eklakhdewan" target="_blank" rel="noreferrer">GitHub ↗</a><a class="button button-secondary" href="https://www.linkedin.com/in/eklakhdewan/" target="_blank" rel="noreferrer">LinkedIn ↗</a></div>
      </div>
      <div class="contact-layout in-view">
        <form action="https://formspree.io/f/mrbldebq" method="POST" class="contact-form" aria-label="Contact Eklakh Dewan">
          <div class="form-head" style="color:var(--role-accent)"><span>MESSAGE / 001</span><span>DIRECT CHANNEL</span></div>
          <label>Name<input type="text" name="name" autocomplete="name" required /></label>
          <label>Email<input type="email" name="email" autocomplete="email" required /></label>
          <label>Phone <small>(optional)</small><input type="tel" name="number" autocomplete="tel" /></label>
          <label>Message<textarea name="message" rows="5" required></textarea></label>
          <button class="button button-primary" style="background-color:var(--role-accent);border:none" type="submit">Transmit message →</button>
          <p class="form-note">Powered by Formspree.</p>
        </form>
        <aside class="resume-card"><p class="eyebrow">Recruiter pack</p><h3>Need the one-page version?</h3><p>Download the role-specific résumé or browse the evidence above.</p><div class="resume-actions"><a class="button button-primary" style="background-color:var(--role-accent);border:none" href="${import.meta.env.BASE_URL}${esc(role.resumeFile)}" download>Download résumé ↓</a><a class="text-link" style="color:var(--role-accent)" href="${import.meta.env.BASE_URL}${esc(role.resumeFile)}" target="_blank" rel="noreferrer">View résumé ↗</a></div></aside>
      </div>
      <div class="contact-links"><a href="mailto:eklakh.inplace@gmail.com">eklakh.inplace@gmail.com</a><a href="https://eklakhdewan.com.np/" target="_blank" rel="noreferrer">eklakhdewan.com.np ↗</a><a href="https://leetcode.com/u/eklakh-dewan/" target="_blank" rel="noreferrer">LeetCode ↗</a></div>
    </section>

    <dialog class="evidence-lightbox" id="evidence-lightbox" aria-label="Project evidence viewer">
      <button class="lightbox-close" type="button" data-lightbox-close aria-label="Close evidence viewer">×</button>
      <img id="evidence-lightbox-image" alt="" />
      <p id="evidence-lightbox-caption"></p>
    </dialog>
  `;
}

export function renderLandingView() {
  const flagship = PROJECTS.enterpriseRag;
  const taxtrace = PROJECTS.taxtrace;
  return `
    <section class="hero container in-view">
      <div class="hero-copy">
        <p class="eyebrow">Eklakh Dewan</p>
        <h1>I build AI systems that retrieve, reason, recommend and execute.</h1>
        <p class="hero-summary">AI systems engineer focused on RAG, backend systems, agentic automation, and measurable AI workflows.</p>
        <p class="hero-status"><span class="status-pulse" aria-hidden="true"></span><span>Currently exploring: <strong class="status-link">Agentic Systems &amp; Hybrid Retrieval</strong></span></p>
        <div class="hero-actions"><button class="button button-primary" onclick="document.getElementById('bot-toggle').click();">Start Hiring Interview ↗</button><a class="button button-secondary" href="#ai-engineer">Explore AI Engineer profile ↗</a></div>
        <div class="proof-grid landing-proof" aria-label="Professional proof points">
          <article class="proof-card"><strong>50</strong><span>frozen RAG queries</span></article>
          <article class="proof-card"><strong>780</strong><span>human judgments</span></article>
          <article class="proof-card"><strong>134</strong><span>TaxTrace backend tests</span></article>
          <article class="proof-card"><strong>5/5</strong><span>security audit</span></article>
        </div>
      </div>
      <aside class="hero-visual" aria-label="Profile and flagship engineering evidence">
        <div class="portrait-wrap"><img src="${import.meta.env.BASE_URL}me.png" alt="Eklakh Dewan in a navy suit" class="portrait" /><span class="portrait-badge">AI systems<br /><strong>with proof</strong></span></div>
        <div class="hero-card"><div class="status-dot" aria-hidden="true"></div><p class="card-label">Flagship engineering</p><h2>${esc(flagship.name)}</h2><p>${esc(flagship.subtitle)}</p><div class="signal-list"><span>Recall@10 +9.9%</span><span>nDCG@10 +7.0%</span><span>780 human judgments</span></div></div>
      </aside>
    </section>

    <section class="section section-dark landing-flagships">
      <div class="container">
        <div class="section-heading in-view"><p class="eyebrow">Proof-first portfolio</p><h2>Two projects establish the engineering baseline.</h2><p>Start with the retrieval/evaluation flagship, then inspect the verified application engineering in TaxTrace.</p></div>
        <div class="landing-project-grid">
          <article class="landing-project-card flagship-card"><p class="eyebrow">01 · AI / Retrieval</p><h3>${esc(flagship.name)}</h3><p>${esc(flagship.description)}</p><div class="landing-metrics">${flagship.metrics.slice(0,4).map(m=>`<span>${esc(m)}</span>`).join("")}</div><a class="text-link" href="#ai-engineer">Open AI Engineer evidence ↗</a></article>
          <article class="landing-project-card"><p class="eyebrow">02 · Systems / Product</p><h3>${esc(taxtrace.name)}</h3><p>${esc(taxtrace.description)}</p><div class="landing-metrics">${taxtrace.metrics.slice(0,4).map(m=>`<span>${esc(m)}</span>`).join("")}</div><a class="text-link" href="#ai-systems">Open AI Systems evidence ↗</a></article>
        </div>
      </div>
    </section>

    <section id="roles" class="section section-tint">
      <div class="container">
        <div class="section-heading in-view"><p class="eyebrow">Portfolio map</p><h2>A role-specific view of the same engineering body of work.</h2><p>Each role has an explicit project order, flagship, evidence set, and résumé. Weak or unsupported projects are intentionally excluded.</p></div>
        <div class="role-directory">${Object.values(ROLES).map((r, i) => `<a href="#${esc(r.id)}" class="role-directory-item"><span>${String(i+1).padStart(2,"0")}</span><div><strong>${esc(r.title)}</strong><small>${esc(r.projects[0]?.name || "")} · ${esc(r.projects.length)} selected projects</small></div><span aria-hidden="true">↗</span></a>`).join("")}</div>
      </div>
    </section>

    <section id="contact" class="section contact-section container">
      <div class="contact-card contact-intro in-view"><div><p class="eyebrow">06 / Contact</p><h2>If the system is interesting,<br /><em>let’s talk about it.</em></h2><p>Available for internships, placements, and engineering opportunities.</p></div><div class="contact-actions"><a class="button button-primary" href="mailto:eklakh.inplace@gmail.com">Email me ↗</a><a class="button button-secondary" href="https://github.com/eklakhdewan" target="_blank" rel="noreferrer">GitHub ↗</a><a class="button button-secondary" href="https://www.linkedin.com/in/eklakhdewan/" target="_blank" rel="noreferrer">LinkedIn ↗</a></div></div>
      <div class="contact-links"><a href="mailto:eklakh.inplace@gmail.com">eklakh.inplace@gmail.com</a><a href="https://eklakhdewan.com.np/" target="_blank" rel="noreferrer">eklakhdewan.com.np ↗</a><a href="https://leetcode.com/u/eklakh-dewan/" target="_blank" rel="noreferrer">LeetCode ↗</a></div>
    </section>
  `;
}


export function renderAboutView() {
  return `
    <section class="about-page">
      <div class="container">
        <div class="about-header">
          <div><p class="eyebrow">About / Profile</p><h1>Eklakh Dewan</h1><p class="about-role">AI Systems Engineer</p></div>
          <a class="button button-secondary" href="#landing">← Back to portfolio</a>
        </div>
        <div class="about-intro">
          <p class="about-label">Short bio</p>
          <p class="about-bio">I’m an Artificial Intelligence and Data Science engineer focused on designing and building reliable AI systems. My work spans retrieval-augmented generation, information retrieval, intelligent agents, machine learning, backend systems, and evaluation-driven engineering, with an emphasis on turning research concepts into measurable, production-oriented systems where architecture, evidence, and reliability matter as much as model capability.</p>
        </div>
        <div class="about-grid">
          <section class="about-panel"><p class="about-label">Profile</p><dl class="about-details">
            <div><dt>Education</dt><dd>B.Tech — Artificial Intelligence &amp; Data Science</dd></div>
            <div><dt>Institution</dt><dd>KPR Institute of Engineering and Technology</dd></div>
            <div><dt>Focus</dt><dd>AI Systems Engineering</dd></div>
            <div><dt>Primary areas</dt><dd>RAG · Retrieval · Agents · Machine Learning · Backend Engineering</dd></div>
            <div><dt>Location</dt><dd>Coimbatore, India</dd></div>
          </dl></section>
          <section class="about-panel"><p class="about-label">Technical focus</p><div class="about-focus-list">
            <article><strong>AI Systems</strong><span>Modular AI pipelines and production-oriented system design.</span></article>
            <article><strong>RAG &amp; Retrieval</strong><span>Hybrid retrieval, ranking, reranking, evidence grounding, and evaluation.</span></article>
            <article><strong>Intelligent Agents</strong><span>Tool-using systems, decision pipelines, and autonomous workflows.</span></article>
            <article><strong>Machine Learning</strong><span>Representation learning, applied ML, recommendation, and model evaluation.</span></article>
            <article><strong>Software Engineering</strong><span>Backend APIs, full-stack applications, testing, and system architecture.</span></article>
          </div></section>
        </div>
        <section class="about-philosophy">
          <div class="section-heading"><p class="eyebrow">Engineering philosophy</p><h2>How I build.</h2><p>The portfolio is evidence-first by design. The same principle guides how I approach engineering work.</p></div>
          <div class="about-principles">
            <article><span>01</span><strong>Evidence over claims</strong><p>Back capabilities with reproducible evidence rather than keyword-heavy descriptions.</p></article>
            <article><span>02</span><strong>Evaluation before optimization</strong><p>Measure whether a change improves the system before calling it an improvement.</p></article>
            <article><span>03</span><strong>Architecture matters</strong><p>Treat models, retrieval, APIs, persistence, orchestration, and interfaces as one system.</p></article>
            <article><span>04</span><strong>Research → engineering</strong><p>Translate useful research ideas into implementations that can be tested and inspected.</p></article>
            <article><span>05</span><strong>Build for failure</strong><p>Understand system boundaries, failure modes, and regression risk—not just successful demos.</p></article>
          </div>
        </section>
        <section class="about-links"><p class="about-label">Find the work</p><div class="contact-actions">
          <a class="button button-primary" href="#ai-engineer">Explore AI Engineer profile ↗</a>
          <a class="button button-secondary" href="https://github.com/eklakhdewan" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <a class="button button-secondary" href="https://www.linkedin.com/in/eklakhdewan/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          <a class="button button-secondary" href="${import.meta.env.BASE_URL}Resume.pdf" target="_blank" rel="noopener noreferrer">Résumé ↗</a>
        </div></section>
      </div>
    </section>
  `;
}

export function render404View() {
  return `
    <section class="hero container in-view" style="text-align:center;justify-content:center;min-height:70vh;display:flex;align-items:center;">
      <div><p class="eyebrow" style="color:var(--blue)">Error 404</p><h1>System Context Not Found</h1><p class="hero-summary" style="max-width:480px;margin:0 auto 32px">The engineering role you are looking for does not exist in this deployment.</p><a class="button button-primary" href="#landing">Return to Main Terminal</a></div>
    </section>
  `;
}
