import './styles.css';

const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('#nav-links');
toggle?.addEventListener('click', () => {
  const expanded = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!expanded));
  links?.classList.toggle('is-open', !expanded);
});

links?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    toggle?.setAttribute('aria-expanded', 'false');
    links.classList.remove('is-open');
  });
});

const revealItems = document.querySelectorAll('.section-heading, .project-card, .case-study, .timeline-item, .skill-group, .credentials-grid article, .contact-form, .resume-card');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealItems.forEach((item) => observer.observe(item));
