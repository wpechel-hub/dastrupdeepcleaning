/* Dastrup Deep Cleaning — Main JS */

// Enable CSS animations (progressive enhancement)
document.documentElement.classList.add('js');

// Nav solid on scroll
const nav = document.getElementById('nav');
const solidify = () => nav.classList.toggle('nav--solid', window.scrollY > 30);
window.addEventListener('scroll', solidify, { passive: true });
solidify();

// Mobile menu
const burger  = document.getElementById('hamburger');
const menu    = document.getElementById('navMenu');
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('open');
  burger.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}));

// Active nav link
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav__link').forEach(a => {
  if (a.getAttribute('href').split('#')[0] === currentPage) {
    a.classList.add('nav__link--active');
  }
});

// Scroll reveal
const revEls = document.querySelectorAll('.reveal-up, .reveal-right');
const revObs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      e.target.style.transitionDelay = `${Math.min(i % 5, 3) * 90}ms`;
      e.target.classList.add('visible');
      revObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });
revEls.forEach(el => revObs.observe(el));

// Counter animation
const easeOut = t => 1 - Math.pow(1 - t, 3);
const counters = document.querySelectorAll('.stat__n');
const cntObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el     = e.target;
    const target = +el.dataset.target;
    const dur    = 1800;
    const t0     = performance.now();
    const tick   = now => {
      const p = Math.min((now - t0) / dur, 1);
      el.textContent = Math.round(easeOut(p) * target);
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    };
    requestAnimationFrame(tick);
    cntObs.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(c => cntObs.observe(c));

// Smooth scroll with offset
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + scrollY - nav.offsetHeight - 16;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// Infinite marquee partners
const partnersTrack = document.querySelector('.partners__track');
if (partnersTrack) {
  const logos = Array.from(partnersTrack.querySelectorAll('.partners__logo'));
  logos.forEach(l => partnersTrack.appendChild(l.cloneNode(true)));

  let px = 0;
  let halfPW = 0;

  function tickP() {
    if (!halfPW) halfPW = partnersTrack.scrollWidth / 2;
    px += 0.4;
    if (px >= halfPW) px -= halfPW;
    partnersTrack.style.transform = `translateX(-${px}px)`;
    requestAnimationFrame(tickP);
  }
  requestAnimationFrame(tickP);
}

// Infinite marquee reviews
const slider = document.querySelector('.reviews-grid');
if (slider) {
  const track = document.createElement('div');
  track.className = 'reviews-track';

  const origCards = Array.from(slider.querySelectorAll('.r-card'));
  origCards.forEach(c => {
    c.classList.remove('reveal-up', 'reveal-right');
    track.appendChild(c);
  });
  origCards.forEach(c => track.appendChild(c.cloneNode(true)));
  slider.appendChild(track);

  let x = 0;
  let paused = false;
  let halfW = 0;

  track.addEventListener('mouseenter', () => { paused = true; });
  track.addEventListener('mouseleave', () => { paused = false; });

  function tick() {
    if (!halfW) halfW = track.scrollWidth / 2;
    if (!paused) {
      x += 0.5;
      if (x >= halfW) x -= halfW;
      track.style.transform = `translateX(-${x}px)`;
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// Contact form
const form = document.getElementById('contactForm');
const btn  = document.getElementById('submitBtn');
if (form && btn) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    btn.disabled = true;
    btn.innerHTML = `Sending…`;

    const data = new FormData(form);
    const res  = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: data
    });
    const json = await res.json();

    if (json.success) {
      btn.innerHTML = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m4.5 12.75 6 6 9-13.5"/></svg> Sent! We'll be in touch soon.`;
      btn.style.background = '#10B981';
      btn.style.borderColor = '#10B981';
      form.reset();
      setTimeout(() => {
        btn.disabled = false;
        btn.style.background = btn.style.borderColor = '';
        btn.innerHTML = `Send My Request <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/></svg>`;
      }, 4000);
    } else {
      btn.innerHTML = `Error — please try again`;
      btn.style.background = '#EF4444';
      btn.style.borderColor = '#EF4444';
      btn.disabled = false;
      setTimeout(() => {
        btn.style.background = btn.style.borderColor = '';
        btn.innerHTML = `Send My Request <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/></svg>`;
      }, 3000);
    }
  });
}
