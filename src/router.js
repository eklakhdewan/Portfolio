import { renderLandingView, renderRoleView, renderAboutView, render404View } from './render.js';
import { ROLES } from './data.js';

export function initRouter(bot) {
  const appRoot = document.getElementById('app-root');
  let pendingSection = null;

  function closeMobileNav() {
    const nav = document.getElementById('nav-links');
    const toggle = document.getElementById('nav-toggle');
    if (nav) nav.classList.remove('is-open');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation');
      toggle.textContent = 'Menu';
    }
  }

  function scrollToSection(id) {
    requestAnimationFrame(() => {
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function handleHashChange() {
    const hash = window.location.hash.replace(/^#/, '') || 'landing';

    if (hash === 'landing') {
      appRoot.innerHTML = renderLandingView();
      bot.updateContext('landing');
      attachFormSubmitHandler();
      initMotion();
      if (pendingSection) {
        const section = pendingSection;
        pendingSection = null;
        scrollToSection(section);
      } else {
        window.scrollTo(0, 0);
      }
    } else if (hash === 'about') {
      appRoot.innerHTML = renderAboutView();
      bot.updateContext('about');
      initMotion();
      window.scrollTo(0, 0);
    } else if (ROLES[hash]) {
      appRoot.innerHTML = renderRoleView(hash);
      bot.updateContext(hash);
      attachFormSubmitHandler();
      initMotion();
      window.scrollTo(0, 0);
    } else {
      appRoot.innerHTML = render404View();
      bot.updateContext('landing');
      initMotion();
      window.scrollTo(0, 0);
    }

    closeMobileNav();
  }

  function initMotion() {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion || !('IntersectionObserver' in window)) return;

    root.classList.add('motion-enabled');

    const targets = document.querySelectorAll(
      '.section-heading, .project-card, .case-study, .timeline-item, ' +
      '.skill-group, .credentials-grid article, .contact-form, .resume-card, .mini-card'
    );

    const observer = new IntersectionObserver((entries, instance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in-view');
        instance.unobserve(entry.target);
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -8% 0px'
    });

    targets.forEach((target) => {
      if (!target.classList.contains('in-view')) observer.observe(target);
    });
  }

  function attachFormSubmitHandler() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const submitButton = form.querySelector('button[type="submit"]');
      if (!submitButton) return;

      const originalText = submitButton.textContent;
      submitButton.textContent = 'Sending…';
      submitButton.disabled = true;
      form.setAttribute('aria-busy', 'true');

      try {
        const response = await fetch(form.action, {
          method: form.method || 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });

        if (!response.ok) throw new Error(`Formspree returned ${response.status}`);

        form.reset();
        submitButton.textContent = 'Message sent ✓';
        submitButton.focus();
      } catch (error) {
        console.error(error);
        submitButton.textContent = 'Send failed — retry';
      } finally {
        form.setAttribute('aria-busy', 'false');
        window.setTimeout(() => {
          submitButton.textContent = originalText;
          submitButton.disabled = false;
        }, 3000);
      }
    });
  }

  function attachNavigation() {
    const toggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('nav-links');

    toggle?.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      toggle.textContent = open ? 'Close' : 'Menu';
    });

    document.querySelectorAll('[data-nav]').forEach((link) => {
      link.addEventListener('click', (event) => {
        const action = link.dataset.nav;
        closeMobileNav();

        if (action === 'haya') {
          event.preventDefault();
          document.getElementById('bot-toggle')?.click();
          return;
        }

        if (action === 'about') {
          event.preventDefault();
          window.location.hash = 'about';
          return;
        }

        if (action === 'home') {
          event.preventDefault();
          if (window.location.hash === '#landing' || window.location.hash === '') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            pendingSection = null;
            window.location.hash = 'landing';
          }
          return;
        }

        if (action === 'roles') {
          event.preventDefault();
          if (window.location.hash === '#landing' || window.location.hash === '') {
            scrollToSection('roles');
          } else {
            pendingSection = 'roles';
            window.location.hash = 'landing';
          }
          return;
        }

        if (action === 'projects' || action === 'experience' || action === 'roles' || action === 'contact') {
          event.preventDefault();
          const target = document.getElementById(action === 'roles' ? 'roles' : action);
          if (target) {
            scrollToSection(action === 'roles' ? 'roles' : action);
          } else {
            pendingSection = action === 'roles' ? 'roles' : action;
            window.location.hash = 'landing';
          }
          return;
        }

        if (action === 'contact') {
          event.preventDefault();
          const target = document.getElementById('contact');
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else {
            pendingSection = 'contact';
            window.location.hash = 'landing';
          }
        }
      });
    });
  }

  window.addEventListener('hashchange', handleHashChange);
  handleHashChange();
  attachNavigation();
}