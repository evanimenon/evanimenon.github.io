(function () {
  'use strict';

  // ── Email JS ──────────────────────────────────────────────────
  if (typeof emailjs !== 'undefined') {
    emailjs.init('FKlcLUbZedV_wNlJU');
  }

  // ── Theme toggle ──────────────────────────────────────────────
  const toggle = document.getElementById('theme-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  const stored = localStorage.getItem('theme');

  if (stored) {
    document.documentElement.setAttribute('data-theme', stored);
  } else if (prefersDark.matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  toggle?.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  // ── Contact form ──────────────────────────────────────────────
  const form = document.getElementById('contact-form');
  const msg  = document.getElementById('form-message');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);

    if (typeof emailjs === 'undefined') {
      msg.textContent = 'Email service unavailable — please email me directly.';
      msg.className = 'form-message error';
      return;
    }

    emailjs.send('service_kbnpjmy', 'template_8ta5ygc', {
      user_name:    data.get('user_name'),
      user_email:   data.get('user_email'),
      user_subject: data.get('user_subject'),
      user_message: data.get('user_message'),
    }).then(() => {
      msg.textContent = 'Message sent — I\'ll be in touch soon.';
      msg.className = 'form-message success';
      form.reset();
      setTimeout(() => { msg.textContent = ''; msg.className = 'form-message'; }, 6000);
    }).catch(() => {
      msg.textContent = 'Something went wrong. Please try emailing me directly.';
      msg.className = 'form-message error';
    });
  });

  /* ── Slideshow ──────────────────────────────── */
  function initSlideshow(container) {
    if (!container) return;
    const imgs = Array.from(container.querySelectorAll('img'));
    if (imgs.length <= 1) return;
    let current = 0, timer;

    const dotsWrap = document.createElement('div');
    dotsWrap.className = 'slide-dots';
    imgs.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'slide-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Slide ' + (i + 1));
      dot.addEventListener('click', () => { goTo(i); resetTimer(); });
      dotsWrap.appendChild(dot);
    });
    container.appendChild(dotsWrap);

    ['prev', 'next'].forEach(dir => {
      const btn = document.createElement('button');
      btn.className = 'slide-arrow ' + dir;
      btn.innerHTML = dir === 'prev' ? '&#8249;' : '&#8250;';
      btn.setAttribute('aria-label', dir === 'prev' ? 'Previous' : 'Next');
      btn.addEventListener('click', () => {
        goTo(dir === 'prev' ? (current - 1 + imgs.length) % imgs.length : (current + 1) % imgs.length);
        resetTimer();
      });
      container.appendChild(btn);
    });

    function goTo(idx) {
      imgs[current].classList.remove('active');
      dotsWrap.children[current].classList.remove('active');
      current = idx;
      imgs[current].classList.add('active');
      dotsWrap.children[current].classList.add('active');
    }
    function resetTimer() {
      clearInterval(timer);
      timer = setInterval(() => goTo((current + 1) % imgs.length), 3500);
    }
    resetTimer();

    container.addEventListener('mouseenter', () => clearInterval(timer));
    container.addEventListener('mouseleave', () => resetTimer());
  }
  document.querySelectorAll('.proj-media').forEach(el => initSlideshow(el));

  /* ── PDF toggle ─────────────────────────────── */
  window.togglePdf = function(btn, panelId) {
    const panel = document.getElementById(panelId);
    const isOpen = panel.classList.contains('open');
    panel.classList.toggle('open', !isOpen);
    btn.classList.toggle('open', !isOpen);
    btn.setAttribute('aria-expanded', String(!isOpen));
    btn.querySelector('.pdf-btn-label').textContent = isOpen ? 'View Report' : 'Hide Report';
  };

  /* ── Project filter ─────────────────────────── */
  const projFilterBtns = document.querySelectorAll('.filter-btn');
  const projCards = document.querySelectorAll('.proj-card');

  projFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      projFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      projCards.forEach(card => {
        const cats = card.dataset.cat.split(' ');
        card.style.display = (f === 'all' || cats.includes(f)) ? '' : 'none';
      });
    });
  });
})();