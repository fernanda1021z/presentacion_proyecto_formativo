/* ===========================
   INSTINTOS SEX SHOP — MAIN.JS
   =========================== */

// ---- Navbar scroll state ----
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Scrolled class
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active nav link
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) {
      current = sec.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// ---- Mobile toggle ----
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  const spans = navToggle.querySelectorAll('span');
  const isOpen = navMenu.classList.contains('open');
  spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
  spans[1].style.opacity   = isOpen ? '0' : '1';
  spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
});

// Close menu on link click
navMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity   = '1';
    });
  });
});

// ---- Smooth scroll for all anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 100;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---- Fade-in on scroll (Intersection Observer) ----
const fadeEls = document.querySelectorAll(
  '.card, .specific-item, .diagram-card, .pattern-card, .methodology-card, .stack-layer, .problem-list li, .objective-general, .cta-banner, .question-card'
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

fadeEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(18px)';
  el.style.transition = `opacity 0.55s ease ${i * 0.04}s, transform 0.55s ease ${i * 0.04}s`;
  observer.observe(el);
});

// Class added by observer
document.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);
});

// ---- Hero section fade-up for [data-aos] attrs ----
document.querySelectorAll('[data-aos]').forEach((el, i) => {
  const delay = parseInt(el.getAttribute('data-aos-delay') || '0');
  el.style.opacity = '0';
  el.style.transform = 'translateY(22px)';
  el.style.transition = `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`;

  setTimeout(() => {
    el.style.opacity  = '1';
    el.style.transform = 'translateY(0)';
  }, 200 + delay);
});

// ---- Sitemap active link highlight ----
const sitemapLinks = document.querySelectorAll('.sitemap-inner a');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 140) cur = sec.id;
  });
  sitemapLinks.forEach(l => {
    l.style.color = l.getAttribute('href') === '#' + cur ? 'var(--gold)' : '';
  });
}, { passive: true });
function abrirLightbox(src, caption) {
  document.getElementById('lightboxImg').src = src;
  document.getElementById('lightboxCaption').textContent = caption;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function cerrarLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
document.getElementById('lightboxClose').addEventListener('click', cerrarLightbox);
document.getElementById('lightboxBackdrop').addEventListener('click', cerrarLightbox);
document.addEventListener('keydown', e => { if (e.key === 'Escape') cerrarLightbox(); });