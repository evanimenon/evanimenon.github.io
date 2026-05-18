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
})();