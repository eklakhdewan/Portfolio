import { ROLES } from './data.js';

function projectEvidenceHtml(project) {
  const architecture = project.architecture
    ? '<div class="project-proof"><strong>Architecture</strong><br />' + project.architecture + '</div>'
    : '';
  const engineering = project.engineering?.length
    ? '<div class="project-proof"><strong>Engineering</strong><br />' + project.engineering.join(' · ') + '</div>'
    : '';
  const evidence = project.evidence
    ? '<div class="project-proof"><strong>Evidence</strong><br />' + project.evidence + '</div>'
    : '';
  const metrics = project.metrics?.length
    ? '<div class="project-metrics">' + project.metrics.map(metric => '<span>' + metric + '</span>').join('') + '</div>'
    : '';
  const stack = project.stack?.length
    ? '<div class="project-stack"><span>STACK</span>' + project.stack.map(item => '<b>' + item + '</b>').join('') + '</div>'
    : '';

  return '<div class="project-evidence">' + architecture + engineering + evidence + metrics + stack + '</div>';
}

function capabilitiesHtml(role) {
  const groups = role.capabilities || { Core: role.skills || [] };
  return Object.entries(groups).map(([group, items]) => `
    <article class="capability-card">
      <p class="capability-label">${group}</p>
      <div class="capability-list">
        ${items.map(item => `<span>${item}</span>`).join('')}
      </div>
    </article>
  `).join('');
}

function proofHtml(role) {
  return (role.proof || []).map(item => `
    <article class="proof-card">
      <strong>${item.value}</strong>
      <span>${item.label}</span>
    </article>
  `).join('');
}

function signalsHtml(role) {
  return (role.engineeringSignals || []).map(signal => `<span class="signal-chip">${signal}</span>`).join('');
}

function educationHtml(role) {
  return (role.education || []).map(item => `
    <article class="info-card">
      <p class="eyebrow">Education</p>
      <h3>${item.degree}</h3>
      <p>${item.institution} · ${item.year}</p>
      <strong>${item.result}</strong>
    </article>
  `).join('');
}

function credentialsHtml(role) {
  return (role.credentials || []).map(item => `
    <article class="info-card">
      <p class="eyebrow">Credential</p>
      <h3>${item.name}</h3>
      <p>${item.issuer} · ${item.duration}</p>
      <span class="credential-badge">${item.evidence}</span>
    </article>
  `).join('');
}

export function renderRoleView(roleId) {
  const role = ROLES[roleId];
  if (!role) return '';

  const projectsHtml = role.projects.map((p, index) => `
    <article class="project-card in-view ${p.featured ? 'project-featured' : ''}" style="animation-delay: ${index * 0.1}s;">
      <div class="project-meta">
        <span>${String(index + 1).padStart(2, '0')}</span>
        <span style="color: ${role.accent}; font-weight: bold;">${p.featured ? 'FLAGSHIP' : role.title}</span>
      </div>
      <h3>${p.title || p.name}</h3>
      <p>${p.description}</p>
      <p class="project-category">${p.category || role.title}</p>
      ${p.status || p.badge ? `<div class="project-status"><span class="project-badge" style="border-color: ${p.badgeColor || role.accent}; color: ${p.badgeColor || role.accent};">${p.badge || "Status"}</span><span>${p.status || ""}</span></div>` : ""}
      ${projectEvidenceHtml(p)}
      <ul class="tag-list">
        ${(p.tags || (Array.isArray(p.stack) ? p.stack : String(p.stack || "").split(" · ").filter(Boolean))).map(t => `<li>${t}</li>`).join("")}
      </ul>
      <div class="card-links">
        ${p.repo || p.link ? `<a class="text-link" style="color: ${role.accent}" href="${p.repo || p.link}" target="_blank" rel="noopener noreferrer">View Repository <span aria-hidden="true">↗</span></a>` : ""}
        ${p.demo ? `<a class="text-link" style="color: ${role.accent}" href="${p.demo}" target="_blank" rel="noopener noreferrer">View Demo <span aria-hidden="true">↗</span></a>` : ""}
        ${!p.repo && !p.link && !p.demo ? '<span class="project-private">Repository not public yet</span>' : ""}
      </div>
    </article>
  `).join('');

  const experienceHtml = (role.experience || []).map((exp, index) => `
    <article class="timeline-item in-view" style="animation-delay: ${index * 0.15}s; border-left-color: ${role.accent};">
      <div class="timeline-date" style="color: ${role.accent};">${exp.duration}</div>
      <h3>${exp.role} · ${exp.company}</h3>
      <div class="experience-card">
        <div class="exp-header">
          <div>
            <p class="exp-role">${exp.role}</p>
            <p class="exp-company" style="color: ${role.accent};">${exp.company}</p>
          </div>
          <div class="exp-meta">
            <p>${exp.duration}</p>
            <span>Certificate-backed</span>
          </div>
        </div>
        <p class="experience-description">${exp.description}</p>
        <a class="exp-cert-link" style="color: ${role.accent};" href="${import.meta.env.BASE_URL}EKLAKH%20DEWAN-%20Internship%20Certificate.png" target="_blank" rel="noopener noreferrer">View certificate ↗</a>
      </div>
    </article>
  `).join('');

  const featured = role.projects.find(p => p.featured) || role.projects[0];

  return `
    <section class="hero container in-view role-hero">
      <div class="hero-copy">
        <p class="eyebrow" style="color: ${role.accent};">Targeted View</p>
        <h1>${role.title}</h1>
        <p class="hero-summary">${role.pitch}</p>
        <div class="hero-actions">
          <button class="button button-primary" style="background-color: ${role.accent}" onclick="document.getElementById('bot-toggle').click();">Chat with Haya <span aria-hidden="true">↗</span></button>
          <a class="button button-secondary" href="${import.meta.env.BASE_URL}${role.resumeFile}" target="_blank" rel="noreferrer">View résumé</a>
        </div>
        <div class="proof-grid">
          ${proofHtml(role)}
        </div>
      </div>
      <aside class="hero-visual" aria-label="Profile and role summary">
        <div class="portrait-wrap">
          <img src="${import.meta.env.BASE_URL}me.png" alt="Eklakh Dewan" class="portrait role-portrait" />
        </div>
        <div class="hero-card role-fit-card">
          <p class="card-label">Role fit</p>
          <h2>${role.title}</h2>
          <p>${role.pitch}</p>
        </div>
      </aside>
    </section>

    <section id="projects" class="section section-dark">
      <div class="container">
        <div class="section-heading in-view">
          <p class="eyebrow" style="color: ${role.accent}">Selected engineering work</p>
          <h2>Systems with visible implementation detail.</h2>
          <p>Projects are presented as engineering evidence: what was built, how it works, and which skills it demonstrates.</p>
        </div>
        <div class="project-grid">
          ${projectsHtml}
        </div>
      </div>
    </section>

    <section class="section case-study-section">
      <div class="container">
        <div class="section-heading in-view">
          <p class="eyebrow" style="color: ${role.accent}">Flagship case study</p>
          <h2>${featured.name}</h2>
          <p>${featured.description}</p>
        </div>
        <div class="case-study-grid in-view">
          <div class="case-panel">
            <span class="case-label">Problem</span>
            <p>${featured.problem || 'A production-oriented engineering problem where correctness, reliability, and measurable behavior matter.'}</p>
          </div>
          <div class="case-panel">
            <span class="case-label">Architecture</span>
            <p>${featured.architecture || 'A layered architecture combining data, retrieval, application logic, and observable interfaces.'}</p>
          </div>
          <div class="case-panel">
            <span class="case-label">Engineering</span>
            <p>${(featured.engineering || []).join(' · ') || 'Implementation details and engineering decisions are documented in the project repository.'}</p>
          </div>
          <div class="case-panel">
            <span class="case-label">Evidence</span>
            <p>${featured.evidence || 'Repository evidence, implementation details, evaluation dimensions, and deployment artifacts.'}</p>
          </div>
          <div class="case-panel">
            <span class="case-label">Metrics</span>
            <p>${(featured.metrics || []).join(' · ') || 'Evaluation and test evidence where available.'}</p>
          </div>
          <div class="case-panel">
            <span class="case-label">Stack</span>
            <p>${(featured.stack || featured.tags || []).join(' · ')}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-tint">
      <div class="container">
        <div class="section-heading in-view">
          <p class="eyebrow" style="color: ${role.accent}">Engineering evidence</p>
          <h2>Signals behind the work.</h2>
          <p>Concrete engineering concerns surfaced across projects rather than hidden inside generic skill lists.</p>
        </div>
        <div class="signal-cloud in-view">${signalsHtml(role)}</div>
      </div>
    </section>

    <section class="section container">
      <div class="section-heading in-view">
        <p class="eyebrow" style="color: ${role.accent}">Capabilities</p>
        <h2>The stack behind the systems.</h2>
      </div>
      <div class="capability-grid in-view">
        ${capabilitiesHtml(role)}
      </div>
    </section>

    <section id="experience" class="section section-tint">
      <div class="container split-layout">
        <div class="section-heading in-view">
          <p class="eyebrow" style="color: ${role.accent}">Experience</p>
          <h2>Early-career experience with evidence attached.</h2>
        </div>
        <div class="timeline">${experienceHtml}</div>
      </div>
    </section>

    <section class="section container">
      <div class="info-grid in-view">
        ${educationHtml(role)}
        ${credentialsHtml(role)}
      </div>
    </section>

    <section id="experience" class="section section-tint">
      <div class="container split-layout">
        <div class="section-heading in-view"><p class="eyebrow">Experience</p><h2>Artificial Intelligence Intern.</h2><p>Flowrage Technology · 4 weeks (Virtual).</p></div>
        <div class="timeline"><article class="timeline-item in-view"><div class="timeline-date">4 weeks (Virtual)</div><h3>Artificial Intelligence Intern · Flowrage Technology</h3><div class="experience-card"><p class="experience-description">Worked on Gemini API integration, resume parsing, and job-matching workflows using TF-IDF and dense embeddings.</p></div></article></div>
      </div>
    </section>

    <section id="contact" class="section contact-section container">
      <div class="contact-card contact-intro in-view" style="border: 1px solid var(--line);">
        <div>
          <p class="eyebrow" style="color: ${role.accent};">Recruiter channel</p>
          <h2>Interested in the system?<br /><em>Let’s talk.</em></h2>
          <p>Available for internships, placements, and engineering opportunities.</p>
          <div class="contact-links">
            <a href="mailto:eklakh.inplace@gmail.com">eklakh.inplace@gmail.com ↗</a>
            <a href="https://github.com/eklakhdewan" target="_blank" rel="noreferrer">GitHub ↗</a>
          </div>
        </div>
        <div class="contact-actions">
          <a class="button button-primary" style="background-color: ${role.accent};" href="mailto:eklakh.inplace@gmail.com">Email me ↗</a>
          <button class="button button-secondary" onclick="document.getElementById('bot-toggle').click();">Ask Haya</button>
        </div>
      </div>
      <div class="contact-layout in-view">
        <form action="https://formspree.io/f/mrbldebq" method="POST" class="contact-form">
          <div class="form-head" style="color: ${role.accent};"><span>MESSAGE / 001</span><span>DIRECT CHANNEL</span></div>
          <label>Name<input type="text" name="name" autocomplete="name" required /></label>
          <label>Email<input type="email" name="email" autocomplete="email" required /></label>
          <label>Phone <small>(optional)</small><input type="tel" name="number" autocomplete="tel" /></label>
          <label>Message<textarea name="message" rows="5" required></textarea></label>
          <button class="button button-primary" style="background-color: ${role.accent}; border: none;" type="submit">Transmit message <span aria-hidden="true">→</span></button>
          <p class="form-note">Powered by Formspree.</p>
        </form>
        <aside class="resume-card">
          <p class="eyebrow" style="color: ${role.accent};">Recruiter pack</p>
          <h3>Need the one-page version?</h3>
          <p>Download the current résumé or browse the full profile and project evidence.</p>
          <div class="resume-actions">
            <a class="button button-primary" style="background-color: ${role.accent}; border: none;" href="${import.meta.env.BASE_URL}${role.resumeFile}" download>Download résumé ↓</a>
            <a class="text-link" style="color: ${role.accent};" href="${import.meta.env.BASE_URL}${role.resumeFile}" target="_blank" rel="noreferrer">View résumé ↗</a>
          </div>
        </aside>
      </div>
    </section>
  `;
}

export function renderLandingView() {
  return `
    <section class="hero container in-view">
      <div class="hero-copy">
        <p class="eyebrow">Eklakh Dewan</p>
        <h1>I build AI systems that retrieve, reason, recommend and execute.</h1>
        <p class="hero-summary">AI systems engineer focused on RAG, backend systems, agentic automation, and measurable AI workflows.</p>
        <p class="hero-status">
          <span class="status-pulse" aria-hidden="true"></span>
          <span>Currently exploring: <strong class="status-link">Agentic Systems &amp; Hybrid Retrieval</strong></span>
        </p>
        <div class="hero-actions">
          <button class="button button-primary" onclick="document.getElementById('bot-toggle').click();">Start Hiring Interview <span aria-hidden="true">↗</span></button>
        </div>
        <div class="proof-grid landing-proof">
          <article class="proof-card"><strong>8.55</strong><span>CGPA</span></article>
          <article class="proof-card"><strong>2027</strong><span>Graduation</span></article>
          <article class="proof-card"><strong>AI / ML</strong><span>Primary domain</span></article>
          <article class="proof-card"><strong>RAG</strong><span>Current focus</span></article>
        </div>
      </div>
      <aside class="hero-visual" aria-label="Profile and current focus">
        <div class="portrait-wrap">
          <img src="${import.meta.env.BASE_URL}me.png" alt="Eklakh Dewan in a navy suit" class="portrait" />
          <span class="portrait-badge">AI systems<br /><strong>with proof</strong></span>
        </div>
        <div class="hero-card">
          <div class="status-dot" aria-hidden="true"></div>
          <p class="card-label">Current focus</p>
          <h2>Reliable RAG &amp; applied AI</h2>
          <div class="signal-list">
            <span>Hybrid retrieval</span><span>Evidence grounding</span><span>Agentic workflows</span>
          </div>
        </div>
      </aside>
    </section>

    <section id="projects" class="section section-dark">
      <div class="container">
        <div class="section-heading in-view">
          <p class="eyebrow">Selected projects</p>
          <h2>Engineering work with visible implementation detail.</h2>
          <p>Selected systems spanning retrieval, agents, applied AI, and backend engineering.</p>
        </div>
        <div class="project-grid">
          <article class="project-card in-view project-featured"><div class="project-meta"><span>01</span><span>AI / RAG</span></div><h3>HCAD-RAG — Hierarchical Context-Aware Medical RAG</h3><p>Medical-domain retrieval research focused on hierarchical context preservation, evidence-grounded retrieval, reranking, and citation validation.</p></article>
          <article class="project-card in-view project-featured"><div class="project-meta"><span>02</span><span>AI SEARCH</span></div><h3>Enterprise RAG / AI Search Platform</h3><p>Dense retrieval, BM25, hybrid fusion, cross-encoder reranking, citation validation, and evidence-constrained generation.</p></article>
          <article class="project-card in-view"><div class="project-meta"><span>03</span><span>AI SYSTEMS</span></div><h3>APX — Accounts Payable Exception Resolution Agent</h3><p>Evidence retrieval and controlled decision workflow for accounts-payable exceptions.</p></article>
          <article class="project-card in-view"><div class="project-meta"><span>04</span><span>FULL STACK</span></div><h3>TaxTrace</h3><p>AI-assisted tax reconciliation and compliance platform with an exception review workspace.</p></article>
        </div>
      </div>
    </section>

    <section id="roles" class="section section-tint">
      <div class="container">
        <div class="section-heading in-view">
          <p class="eyebrow">Portfolio map</p>
          <h2>A role-specific view of the same engineering body of work.</h2>
          <p>Select a role to see the engineering evidence prioritized for that position.</p>
        </div>
        <div class="role-directory">
          ${Object.values(ROLES).map((r, i) => `
            <a href="#${r.id}" class="role-directory-item">
              <span>${String(i+1).padStart(2,'0')}</span>
              <div><strong>${r.title}</strong><small>${r.pitch}</small></div>
              <span aria-hidden="true">↗</span>
            </a>
          `).join('')}
        </div>
      </div>
    </section>

    <section id="contact" class="section contact-section container">
      <div class="contact-card contact-intro in-view" style="border: 1px solid var(--line);">
        <div>
          <p class="eyebrow">Recruiter channel</p>
          <h2>Interested in the system?<br /><em>Let’s talk.</em></h2>
          <p>Reach me directly by email, or send a message through the form below.</p>
          <div class="contact-links">
            <a href="mailto:eklakh.inplace@gmail.com">eklakh.inplace@gmail.com ↗</a>
            <a href="https://github.com/eklakhdewan" target="_blank" rel="noreferrer">GitHub ↗</a>
          </div>
        </div>
        <div class="contact-actions">
          <a class="button button-primary" href="mailto:eklakh.inplace@gmail.com">Email me ↗</a>
          <button class="button button-secondary" onclick="document.getElementById('bot-toggle').click();">Ask Haya</button>
        </div>
      </div>
      <div class="contact-layout in-view">
        <form action="https://formspree.io/f/mrbldebq" method="POST" class="contact-form">
          <div class="form-head"><span>MESSAGE / 001</span><span>DIRECT CHANNEL</span></div>
          <label>Name<input type="text" name="name" autocomplete="name" required /></label>
          <label>Email<input type="email" name="email" autocomplete="email" required /></label>
          <label>Phone <small>(optional)</small><input type="tel" name="number" autocomplete="tel" /></label>
          <label>Message<textarea name="message" rows="5" required></textarea></label>
          <button class="button button-primary" type="submit">Transmit message <span aria-hidden="true">→</span></button>
          <p class="form-note">Powered by Formspree.</p>
        </form>
        <aside class="resume-card">
          <p class="eyebrow">Recruiter contact</p>
          <h3>Prefer a direct channel?</h3>
          <p>Email me directly or use Haya for a role-specific portfolio walkthrough.</p>
          <div class="resume-actions">
            <a class="button button-primary" href="mailto:eklakh.inplace@gmail.com">Email me ↗</a>
            <button class="button button-secondary" onclick="document.getElementById('bot-toggle').click();">Ask Haya</button>
          </div>
        </aside>
      </div>
    </section>  `;
}

export function render404View() {
  return `
    <section class="hero container in-view" style="text-align: center; justify-content: center; min-height: 70vh; display: flex; align-items: center;">
      <div>
        <p class="eyebrow" style="color: var(--blue);">Error 404</p>
        <h1>System Context Not Found</h1>
        <p class="hero-summary" style="max-width: 480px; margin: 0 auto 32px;">The engineering role you are looking for does not exist in this deployment.</p>
        <a class="button button-primary" href="#landing">Return to Main Terminal</a>
      </div>
    </section>
  `;
}
