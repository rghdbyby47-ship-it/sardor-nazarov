/* =============================================
   NAV — add .scrolled class on scroll
   ============================================= */
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
  updateBackground();
}, { passive: true });

/* =============================================
   SCROLL-DRIVEN BACKGROUND COLOR SHIFT
   ============================================= */
function updateBackground() {
  const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  const body = document.body;

  body.classList.remove('scroll-1', 'scroll-2', 'scroll-3', 'scroll-4');

  if (progress < 0.25) {
    // hero — very dark, near black
    body.classList.add('scroll-1');
  } else if (progress < 0.5) {
    // projects — slightly lighter
    body.classList.add('scroll-2');
  } else if (progress < 0.75) {
    // achievements — a touch brighter
    body.classList.add('scroll-3');
  } else {
    // contact — back toward deep
    body.classList.add('scroll-4');
  }
}

/* =============================================
   SCROLL REVEAL — fade-in on enter viewport
   ============================================= */
const revealTargets = document.querySelectorAll(
  '.card, .achievement-card, .contact-card, .meeting-block, .section-header, .hero-inner'
);

revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // stagger siblings slightly
      const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealTargets.forEach(el => revealObserver.observe(el));

/* =============================================
   MEETING BUTTON — placeholder notice
   ============================================= */
const meetingBtn = document.getElementById('meetingBtn');
if (meetingBtn) {
  meetingBtn.addEventListener('click', (e) => {
    const href = meetingBtn.getAttribute('href');
    if (!href || href === '#') {
      e.preventDefault();
      meetingBtn.textContent = 'Link coming soon…';
      meetingBtn.style.opacity = '0.7';
      setTimeout(() => {
        meetingBtn.innerHTML = `Schedule on Google Meet
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M7 17L17 7M17 7H7M17 7v10"/>
          </svg>`;
        meetingBtn.style.opacity = '1';
      }, 2000);
    }
  });
}
