(function () {
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Theme toggle (theme itself is set pre-paint by the inline script in <head>)
  var themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem('lamzu-theme', next); } catch (e) {}
      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', next === 'light' ? '#f3f6fc' : '#060911');
    });
  }

  // Reveal (same pattern as main.js, kept local so shop.html has no dependency on main.js)
  var revealEls = document.querySelectorAll('[data-reveal]');
  function isInViewport(el) {
    var rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
  }
  var pendingEls = [];
  revealEls.forEach(function (el) {
    if (isInViewport(el)) {
      el.classList.add('in-view');
    } else {
      pendingEls.push(el);
    }
  });
  if ('IntersectionObserver' in window && pendingEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    pendingEls.forEach(function (el) { io.observe(el); });
  } else {
    pendingEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  // Category filter
  var filterBtns = document.querySelectorAll('.filter-btn');
  var cards = document.querySelectorAll('.product-card');
  var emptyState = document.querySelector('.empty-state');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      var filter = btn.dataset.filter;
      var visibleCount = 0;
      cards.forEach(function (card) {
        var match = filter === 'all' || card.dataset.category === filter;
        card.hidden = !match;
        if (match) visibleCount++;
      });
      emptyState.hidden = visibleCount !== 0;
    });
  });

  // Tilt-on-hover, following the cursor like a tactile card
  if (!reducedMotion) {
    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = 'perspective(700px) rotateX(' + (-py * 8).toFixed(2) + 'deg) rotateY(' + (px * 8).toFixed(2) + 'deg) translateY(-6px)';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

  // Quick-view modal
  var quickView = document.getElementById('quickView');
  var qvClose = document.getElementById('qvClose');
  var qvUse = document.getElementById('qvUse');
  var qvCat = document.getElementById('qvCat');
  var qvName = document.getElementById('qvName');
  var qvSpec = document.getElementById('qvSpec');
  var qvDesc = document.getElementById('qvDesc');
  var qvPrice = document.getElementById('qvPrice');
  var lastTrigger = null;

  if (quickView) {
    document.querySelectorAll('.qv-trigger').forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        var card = trigger.closest('.product-card');
        var iconUse = card.querySelector('.product-icon use');
        qvUse.setAttribute('href', iconUse.getAttribute('href'));
        qvUse.setAttribute('fill', iconUse.getAttribute('fill'));
        qvCat.textContent = card.querySelector('.product-cat').textContent;
        qvName.textContent = card.querySelector('h3').textContent;
        qvSpec.textContent = card.querySelector('.product-spec').textContent;
        qvDesc.textContent = card.dataset.desc || '';
        qvPrice.textContent = card.querySelector('.product-price').textContent;
        lastTrigger = trigger;
        quickView.showModal();
      });
    });

    qvClose.addEventListener('click', function () { quickView.close(); });
    quickView.addEventListener('click', function (e) {
      if (e.target === quickView) quickView.close();
    });
    quickView.addEventListener('close', function () {
      if (lastTrigger) lastTrigger.focus();
    });
  }
})();
