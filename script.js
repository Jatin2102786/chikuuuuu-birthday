// ─────────────────────────────────────────────────
//  FLOATING PETALS
// ─────────────────────────────────────────────────
(function createPetals() {
  const container = document.getElementById('petals');
  const count = 22;

  for (let i = 0; i < count; i++) {
    const petal = document.createElement('div');
    petal.className = 'petal';

    const left      = Math.random() * 100;         // % across screen
    const duration  = 8 + Math.random() * 14;      // s — fall speed
    const delay     = Math.random() * 12;           // s — stagger start
    const size      = 8 + Math.random() * 14;      // px — size variation
    const hue       = Math.random() > 0.5 ? '#f48fb1' : '#e91e8c';

    petal.style.cssText = `
      left: ${left}%;
      width: ${size}px;
      height: ${size * 1.5}px;
      animation-duration: ${duration}s;
      animation-delay: -${delay}s;
      background: radial-gradient(ellipse at 30% 30%, ${hue}aa, ${hue}44);
      transform: rotate(${Math.random() * 360}deg);
    `;

    container.appendChild(petal);
  }
})();

// ─────────────────────────────────────────────────
//  INTERSECTION OBSERVER — Scroll Reveal
// ─────────────────────────────────────────────────
(function setupScrollReveal() {
  const cards  = document.querySelectorAll('.portfolio-card');
  const videos = document.querySelectorAll('.video-card');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger delay for video grid
          const delay = entry.target.classList.contains('video-card')
            ? Array.from(videos).indexOf(entry.target) * 80
            : 0;

          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  cards.forEach(card => observer.observe(card));
  videos.forEach(video => observer.observe(video));
})();

// ─────────────────────────────────────────────────
//  PARALLAX on HERO text
// ─────────────────────────────────────────────────
(function setupParallax() {
  const heroContent = document.querySelector('.hero-content');
  if (!heroContent) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const translate = scrollY * 0.35;
    const opacity   = 1 - (scrollY / window.innerHeight) * 1.2;
    heroContent.style.transform = `translateY(${translate}px)`;
    heroContent.style.opacity   = Math.max(0, opacity);
  }, { passive: true });
})();

// ─────────────────────────────────────────────────
//  SMOOTH NAV SCROLL
// ─────────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─────────────────────────────────────────────────
//  IMAGE HOVER — cursor glow effect
// ─────────────────────────────────────────────────
(function setupImageGlow() {
  const cards = document.querySelectorAll('.card-media');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width)  * 100;
      const y = ((e.clientY - rect.top)  / rect.height) * 100;
      card.style.setProperty('--glow-x', `${x}%`);
      card.style.setProperty('--glow-y', `${y}%`);
    });
  });
})();

// ─────────────────────────────────────────────────
//  VIDEO lazy load — play on view
// ─────────────────────────────────────────────────
(function setupVideoLazy() {
  const videos = document.querySelectorAll('.video-wrapper video');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const video = entry.target;
          if (!video.src && video.querySelector('source')) {
            // src already set via <source> tag, just load
            video.load();
          }
          observer.unobserve(video);
        }
      });
    },
    { threshold: 0.3 }
  );

  videos.forEach(v => observer.observe(v));
})();

// ─────────────────────────────────────────────────
//  TYPING EFFECT on hero sub
// ─────────────────────────────────────────────────
(function typingEffect() {
  const el = document.querySelector('.hero-sub');
  if (!el) return;
  const text = el.textContent.trim();
  el.textContent = '';
  let i = 0;
  const type = () => {
    if (i < text.length) {
      el.textContent += text[i++];
      setTimeout(type, 65);
    }
  };
  setTimeout(type, 800);
})();

// ─────────────────────────────────────────────────
//  STAR SPARKLE on cursor (subtle)
// ─────────────────────────────────────────────────
(function cursorSparkle() {
  const sparkles = [];
  const MAX = 8;

  document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.35) return; // throttle

    const span = document.createElement('span');
    span.style.cssText = `
      position: fixed;
      pointer-events: none;
      z-index: 9999;
      left: ${e.clientX - 4}px;
      top:  ${e.clientY - 4}px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: radial-gradient(circle, #f48fb1, transparent);
      animation: sparkleOut 0.6s ease forwards;
    `;

    document.body.appendChild(span);
    sparkles.push(span);
    if (sparkles.length > MAX) {
      sparkles.shift().remove();
    }
    setTimeout(() => span.remove(), 600);
  });

  // Inject sparkle keyframe
  const style = document.createElement('style');
  style.textContent = `
    @keyframes sparkleOut {
      0%   { transform: scale(1); opacity: 1; }
      100% { transform: scale(3) translate(${(Math.random()-0.5)*30}px, ${(Math.random()-0.5)*30}px); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
})();

console.log('🌹 Happy Birthday Chikuuuuu! This website was made with love.');
