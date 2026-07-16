// Theme toggle (theme itself is set pre-paint by the inline script in <head>)
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('lamzu-theme', next); } catch (e) {}
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', next === 'light' ? '#f3f6fc' : '#060911');
  });
}

// Scroll reveal
const revealEls = document.querySelectorAll('[data-reveal]');

function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
}

const pendingEls = [];
revealEls.forEach((el) => {
  if (isInViewport(el)) {
    el.classList.add('in-view');
  } else {
    pendingEls.push(el);
  }
});

if ('IntersectionObserver' in window && pendingEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  pendingEls.forEach((el) => io.observe(el));
} else {
  pendingEls.forEach((el) => el.classList.add('in-view'));
}

// Color swatches recolor the mini mouse gradient
const stop0 = document.getElementById('miniStop0');
const stop1 = document.getElementById('miniStop1');
const stop2 = document.getElementById('miniStop2');
const swatches = document.querySelectorAll('.swatch');

swatches.forEach((btn) => {
  btn.addEventListener('click', () => {
    swatches.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    stop0.setAttribute('stop-color', btn.dataset.c0);
    stop1.setAttribute('stop-color', btn.dataset.c1);
    stop2.setAttribute('stop-color', btn.dataset.c2);
  });
});

// Subtle parallax on hero mouse following cursor
const heroMouse = document.getElementById('heroMouse');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (heroMouse && !reducedMotion) {
  document.querySelector('.hero').addEventListener('mousemove', (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    heroMouse.style.transform = `rotate(${x * 6}deg) translate(${x * 10}px, ${y * 10}px)`;
  });
}

// Anatomy — pinned scrollytelling: track which step is centered
const anatomySection = document.querySelector('.anatomy');
const anatomySteps = document.querySelectorAll('.anatomy-step');

function animateCount(el) {
  const target = parseFloat(el.dataset.count);
  const decimals = parseInt(el.dataset.decimals || '0', 10);
  const suffix = el.dataset.suffix || '';
  if (reducedMotion) {
    el.textContent = target.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
    return;
  }
  const duration = 900;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    const val = target * eased;
    el.textContent = val.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

if (anatomySection && anatomySteps.length) {
  const stepIO = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        anatomySection.dataset.activeStage = entry.target.dataset.stage;
        if (!entry.target.dataset.counted) {
          entry.target.dataset.counted = '1';
          entry.target.querySelectorAll('[data-count]').forEach(animateCount);
        }
      }
    });
  }, { threshold: 0, rootMargin: '-42% 0px -42% 0px' });
  anatomySteps.forEach((step) => stepIO.observe(step));
}

// Magnetic pull on primary buttons
function magnetic(el, strength) {
  el.addEventListener('mousemove', (e) => {
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${(x / r.width) * strength}px, ${(y / r.height) * strength}px)`;
  });
  el.addEventListener('mouseleave', () => { el.style.transform = ''; });
}
if (!reducedMotion) {
  document.querySelectorAll('.btn-primary, .nav-cta').forEach((el) => magnetic(el, 10));
}
