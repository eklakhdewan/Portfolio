import { renderLandingView, renderRoleView, render404View } from './render.js';
import { ROLES } from './data.js';

export function initRouter(bot) {
  const appRoot = document.getElementById('app-root');

  function handleHashChange() {
    const hash = window.location.hash.replace('#', '') || 'landing';
    
    if (hash === 'landing') {
      appRoot.innerHTML = renderLandingView();
      bot.updateContext('landing');
    } else if (ROLES[hash]) {
      appRoot.innerHTML = renderRoleView(hash);
      bot.updateContext(hash);
      attachFormSubmitHandler();
    } else {
      appRoot.innerHTML = render404View();
      bot.updateContext('landing');
    }

    window.scrollTo(0, 0);
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
          headers: {
            'Accept': 'application/json'
          }
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

  window.addEventListener('hashchange', handleHashChange);
  handleHashChange(); // Initial load
}
