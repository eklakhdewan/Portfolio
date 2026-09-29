import { renderLandingView, renderRoleView, render404View } from './render.js';
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
    const hash = window.location.hash.replace('#', '') || 'landing';
    
    if (hash === 'landing') {
      appRoot.innerHTML = renderLandingView();
      bot.updateContext('landing');
      attachFormSubmitHandler();
      if (pendingSection) {
        const section = pendingSection;
        pendingSection = null;
        scrollToSection(section);
      } else {
        window.scrollTo(0, 0);
      }
    } else if (ROLES[hash]) {
      appRoot.innerHTML = renderRoleView(hash);
      bot.updateContext(hash);
      attachFormSubmitHandler();
      window.scrollTo(0, 0);
    } else {
      appRoot.innerHTML = render404View();
      bot.updateContext('landing');
      window.scrollTo(0, 0);
    }

    closeMobileNav();
  }

  function attachFormSubmitHandler() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = 'Sending...';
      btn.disabled = true;

      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });
        
        if (response.ok) {
          form.reset();
          btn.innerHTML = 'Message Sent! ✓';
          btn.style.backgroundColor = 'var(--blue)';
        } else {
          throw new Error('Failed');
        }
      } catch (err) {
        btn.innerHTML = 'Error. Try Again.';
      }

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
      }, 3000);
    });
  }

  function attachNavigation() {
    const toggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('nav-links');

    toggle?.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Close' : 'Menu';
    });

    document.querySelectorAll('[data-nav]').forEach(link => {
      link.addEventListener('click', (e) => {
        const action = link.dataset.nav;
        closeMobileNav();

        if (action === 'haya') {
          e.preventDefault();
          document.getElementById('bot-toggle')?.click();
          return;
        }

        if (action === 'home') {
          e.preventDefault();
          if (window.location.hash === '#landing') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            pendingSection = null;
            window.location.hash = 'landing';
          }
          return;
        }

        if (action === 'roles') {
          e.preventDefault();
          if (window.location.hash === '#landing') {
            scrollToSection('portfolio-map');
          } else {
            pendingSection = 'portfolio-map';
            window.location.hash = 'landing';
          }
          return;
        }

        if (action === 'contact') {
          e.preventDefault();
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