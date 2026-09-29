import { ROLES } from './data.js';

export function renderRoleView(roleId) {
  const role = ROLES[roleId];
  if (!role) return '';

  const projectsHtml = role.projects.map((p, index) => `
    <article class="project-card in-view" style="animation-delay: ${index * 0.15}s;">
      <div class="project-meta"><span>PROJECT</span><span style="color: ${role.accent}; font-weight: bold;">${role.title}</span></div>
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <ul class="tag-list">
        ${p.tags.map(t => `<li>${t}</li>`).join('')}
      </ul>
      <div class="card-links">
        <a class="text-link" style="color: ${role.accent}" href="${p.link}" target="_blank" rel="noopener noreferrer">View Repository <span aria-hidden="true">↗</span></a>
      </div>
    </article>
  `).join('');

  // Improving technical skills layout by splitting into two groups roughly for better visual weight
  const midpoint = Math.ceil(role.skills.length / 2);
  const skillsGroup1 = role.skills.slice(0, midpoint).join(' · ');
  const skillsGroup2 = role.skills.slice(midpoint).join(' · ');

  const experienceHtml = (role.experience || []).map((exp, index) => `
    <article class="timeline-item in-view" style="animation-delay: ${index * 0.2}s; border-left-color: ${role.accent};">
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
        <p style="color: var(--ink-soft); font-size: 0.95rem; margin-top: 15px;">${exp.description}</p>
        <a class="exp-cert-link" style="color: ${role.accent}; margin-top: 15px; display: inline-block;" href="${import.meta.env.BASE_URL}EKLAKH%20DEWAN-%20Internship%20Certificate.png" target="_blank" rel="noopener noreferrer">View certificate ↗</a>
      </div>
    </article>
  `).join('');

  return `
    <section class="hero container in-view" style="min-height: auto; padding-top: 60px;">
      <div class="hero-copy">
        <p class="eyebrow" style="color: ${role.accent};">Targeted View</p>
        <h1>${role.title}</h1>
        <p class="hero-summary">${role.pitch}</p>
        <div class="hero-actions">
          <button class="button button-primary" style="background-color: ${role.accent}" onclick="document.getElementById('bot-toggle').click();">Chat with Haya <span aria-hidden="true">↗</span></button>
          <a class="button button-secondary" href="${role.resumeFile}" target="_blank" rel="noreferrer">View résumé</a>
        </div>
      </div>
      <aside class="hero-visual" aria-label="Profile and Summary">
        <div class="portrait-wrap">
          <img src="${import.meta.env.BASE_URL}me.png" alt="Eklakh Dewan" class="portrait" style="height: 380px; margin-bottom: 20px;" />
        </div>
        <div style="background: var(--white); padding: 24px; border-radius: var(--radius); border: 1px solid var(--line); box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
          <h3 style="margin: 0 0 10px; font-size: 1.1rem; color: ${role.accent};">Professional Summary</h3>
          <p style="margin: 0; font-size: 0.9rem; color: var(--ink-soft);">I am Eklakh Dewan, a dedicated systems engineer specializing as a ${role.title}. I focus on building robust, scalable solutions using state-of-the-art tools and methodologies. I prioritize clean architecture and measurable outcomes in every project I undertake.</p>
        </div>
      </aside>
    </section>

    <section class="section section-dark" style="margin-top: 40px;">
      <div class="container">
        <div class="section-heading in-view">
          <p class="eyebrow" style="color: ${role.accent}">Selected work</p>
          <h2>Engineering systems with proof.</h2>
        </div>
        <div class="project-grid">
          ${projectsHtml}
        </div>
      </div>
    </section>

    <section class="section section-tint">
      <div class="container split-layout">
        <div class="section-heading in-view">
          <p class="eyebrow" style="color: ${role.accent}">Experience & Evidence</p>
          <h2>Early-career experience with a systems mindset.</h2>
        </div>
        <div class="timeline">
          ${experienceHtml}
        </div>
      </div>
    </section>

    <!-- Improved Technical Skills Section using the original skills-grid -->
    <section class="section container">
      <div class="section-heading in-view">
        <p class="eyebrow" style="color: ${role.accent}">Capabilities</p>
        <h2>A focused toolkit for applied AI.</h2>
      </div>
      <div class="skills-grid in-view">
        <div class="skill-group" style="border-top-color: ${role.accent};">
          <h3>Core Technical Skills</h3>
          <p>${skillsGroup1}</p>
        </div>
        <div class="skill-group" style="border-top-color: ${role.accent};">
          <h3>Tools & Frameworks</h3>
          <p>${skillsGroup2}</p>
        </div>
      </div>
    </section>

    <!-- Original Exact Contact Form Layout -->
    <section id="contact" class="section contact-section container">
      <div class="contact-card contact-intro in-view" style="background: linear-gradient(120deg, var(--white), var(--paper)); border: 1px solid var(--line);">
        <div>
          <p class="eyebrow" style="color: ${role.accent};">Contact</p>
          <h2>If the system is interesting,<br /><em>let’s talk about it.</em></h2>
          <p>I’m interested in opportunities where there is something real to measure, debug, and improve. Available for job, placement, and internship opportunities.</p>
        </div>
        <div class="contact-actions">
          <a class="button button-primary" style="background-color: ${role.accent};" href="mailto:eklakh.inplace@gmail.com">Email me ↗</a>
          <a class="button button-secondary" href="https://github.com/eklakhdewan" target="_blank" rel="noreferrer">GitHub ↗</a>
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
            <a class="button button-primary" style="background-color: ${role.accent}; border: none;" href="${role.resumeFile}" download>Download résumé ↓</a>
            <a class="text-link" style="color: ${role.accent};" href="${role.resumeFile}" target="_blank" rel="noreferrer">View résumé ↗</a>
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
        <p class="hero-summary">AI systems engineer focused on RAG, backend systems, agentic automation, and measurable AI workflows. Available for roles, placement, and internships.</p>
        <p class="hero-status">
          <span class="status-pulse" aria-hidden="true"></span>
          <span>Currently exploring: <strong class="status-link">Agentic Systems & Hybrid Retrieval</strong></span>
        </p>
        <div class="hero-actions">
          <button class="button button-primary" onclick="document.getElementById('bot-toggle').click();">Start Hiring Interview <span aria-hidden="true">↗</span></button>
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
  `;
}

export function render404View() {
  return `
    <section class="hero container in-view" style="text-align: center; justify-content: center; min-height: 70vh; display: flex; align-items: center;">
      <div>
        <p class="eyebrow" style="color: var(--blue);">Error 404</p>
        <h1 style="margin-bottom: 24px;">System Context Not Found</h1>
        <p style="color: var(--ink-soft); margin-bottom: 32px; max-width: 480px; margin-left: auto; margin-right: auto;">The engineering role you are looking for does not exist in this deployment. Navigate back to the main terminal to select a valid context.</p>
        <a class="button button-primary" href="#landing">Return to Main Terminal</a>
      </div>
    </section>
  `;
}
