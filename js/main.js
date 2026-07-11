// ===================================================================
// Alexa Bridal — site script
// ALL content lives in js/site-config.js (the SITE object).
// This file only renders it — you should not need to edit here.
// ===================================================================

/* eslint-disable no-undef */
if (typeof SITE === 'undefined') {
  console.error('site-config.js לא נטען — ודאי שהוא מופיע לפני main.js');
}

// ---------------------------------------------------------------
// Render: moving photo bands
// Each image appears exactly twice (the list, then the same list again) —
// the CSS -50% loop needs those two identical halves to run seamlessly.
// "first" is the very first thing on the page, so it loads eagerly;
// "second" is far down the page, so its images lazy-load.
// ---------------------------------------------------------------
function fillBand(name, imgs, lazy) {
  const track = document.querySelector('[data-band="' + name + '"]');
  if (!track || !imgs || !imgs.length) return;
  const loadAttr = lazy ? ' loading="lazy" decoding="async"' : ' decoding="async"';
  track.innerHTML = imgs.concat(imgs)
    .map(src => '<div class="card"><img src="' + src + '" alt=""' + loadAttr + '></div>')
    .join('');
}
fillBand('first', SITE.first_band, false);
fillBand('second', SITE.second_band, true);

// ---------------------------------------------------------------
// Render: hero image
// ---------------------------------------------------------------
const heroImg = document.querySelector('[data-hero-img]');
if (heroImg && SITE.head_pic) heroImg.src = SITE.head_pic;

// ---------------------------------------------------------------
// Render: collection (Front / Back / optional Detail + zoom)
// ---------------------------------------------------------------
(function renderCollection() {
  const grid = document.querySelector('[data-collection]');
  if (!grid) return;
  grid.innerHTML = SITE.dresses.map(d => {
    const detailImg = d.detail
      ? '<img class="img-third" src="' + d.detail + '" alt="' + d.name + ', פרט" loading="lazy" decoding="async">'
      : '';
    const detailSeg = d.detail ? '<span class="seg" data-side="third">Detail</span>' : '';
    return '' +
      '<a class="dress-card" href="' + d.link + '" target="_blank" rel="noopener">' +
        '<img class="img-front" src="' + d.front + '" alt="' + d.name + '" loading="lazy" decoding="async">' +
        '<img class="img-back" src="' + d.back + '" alt="' + d.name + ', גב השמלה" loading="lazy" decoding="async">' +
        detailImg +
        '<button type="button" class="fb-toggle" aria-label="בחרי תצוגה">' +
          '<span class="seg active" data-side="front">Front</span>' +
          '<span class="seg" data-side="back">Back</span>' +
          detailSeg +
        '</button>' +
        '<button type="button" class="zoom-btn" aria-label="הגדלה">⤢</button>' +
        '<div class="caption"><h3 class="serif">' + d.name + '</h3><div class="price">' + d.price + '</div></div>' +
      '</a>';
  }).join('');
})();

// ---------------------------------------------------------------
// Render: real brides
// ---------------------------------------------------------------
(function renderBrides() {
  const row = document.querySelector('[data-brides]');
  if (!row) return;
  row.innerHTML = SITE.real_brides.map(b =>
    '<div class="card"><img src="' + b.pic + '" alt="' + b.name + '" loading="lazy" decoding="async">' +
    '<div class="caption"><div class="name serif">' + b.name + '</div><div class="date">' + b.date + '</div></div></div>'
  ).join('');
})();

// ---------------------------------------------------------------
// Render: moments collage
// ---------------------------------------------------------------
(function renderMoments() {
  const grid = document.querySelector('[data-moments]');
  if (!grid) return;
  grid.innerHTML = SITE.moments.map(src =>
    '<div class="tile"><img src="' + src + '" alt="" loading="lazy" decoding="async"></div>'
  ).join('');
})();

// ---------------------------------------------------------------
// Render: testimonials
// ---------------------------------------------------------------
(function renderTestimonials() {
  const grid = document.querySelector('[data-testimonials]');
  if (!grid) return;
  grid.innerHTML = SITE.testimonials.map(t =>
    '<div class="card"><div class="stars">✦ ✦ ✦ ✦ ✦</div><p>' + t.text + '</p><div class="who">' + t.who + '</div></div>'
  ).join('');
})();

// ---------------------------------------------------------------
// Render: instagram grid
// ---------------------------------------------------------------
(function renderInstagram() {
  const grid = document.querySelector('[data-instagram]');
  if (!grid) return;
  const link = 'https://instagram.com/' + SITE.instagramHandle;
  grid.innerHTML = SITE.instagram_pics.map(src =>
    '<a href="' + link + '" target="_blank" rel="noopener"><img src="' + src + '" alt="פוסט אינסטגרם" loading="lazy" decoding="async"></a>'
  ).join('');
})();

// ---------------------------------------------------------------
// "תיאום בוואטסאפ" buttons — open WhatsApp with a ready-made message
// instead of just scrolling to the footer.
// ---------------------------------------------------------------
(function initWhatsAppCTAs() {
  const msg = 'היי, הגעתי מהאתר';
  const href = 'https://wa.me/' + SITE.whatsappNumber + '?text=' + encodeURIComponent(msg);
  document.querySelectorAll('[data-wa-cta]').forEach(a => {
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener';
  });
})();

// ---------------------------------------------------------------
// Simple lead form — alternative to the quiz for a bride who just
// wants to leave her details without answering questions.
// ---------------------------------------------------------------
(function initSimpleLead() {
  const wrap = document.querySelector('[data-simple-lead]');
  if (!wrap) return;
  const toggleBtn = wrap.querySelector('[data-simple-lead-toggle]');
  const form = wrap.querySelector('[data-simple-lead-form]');
  const resultEl = wrap.querySelector('[data-simple-lead-result]');
  const nameInput = wrap.querySelector('[data-lead-name]');
  const phoneInput = wrap.querySelector('[data-lead-phone]');
  const dateInput = wrap.querySelector('[data-lead-wedding-date]');

  if (toggleBtn && form) {
    toggleBtn.addEventListener('click', () => {
      const showing = form.style.display !== 'none';
      form.style.display = showing ? 'none' : 'block';
      toggleBtn.style.display = showing ? 'inline-block' : 'none';
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = nameInput ? nameInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const weddingDateRaw = dateInput ? dateInput.value : '';
      const weddingDate = weddingDateRaw ? weddingDateRaw.split('-').reverse().join('.') : '';

      // 1) Send the lead to email via Web3Forms (only if a key was set).
      if (SITE.web3formsKey && SITE.web3formsKey !== 'YOUR_WEB3FORMS_ACCESS_KEY') {
        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            access_key: SITE.web3formsKey,
            subject: 'ליד חדש מהאתר (בלי מבחן) — אלכסה בריידל',
            from_name: 'אתר אלכסה בריידל',
            'שם': name || '-',
            'טלפון': phone || '-',
            'תאריך החתונה': weddingDate || '-'
          })
        }).catch(() => { /* never block the bride's flow on a network error */ });
      }

      // 2) Also open WhatsApp with a ready-made message.
      const msg = 'היי, הגעתי מהאתר.\n' +
        'שם: ' + (name || '-') + '\n' +
        'טלפון: ' + (phone || '-') +
        (weddingDate ? '\nתאריך החתונה: ' + weddingDate : '');
      window.open('https://wa.me/' + SITE.whatsappNumber + '?text=' + encodeURIComponent(msg), '_blank');

      form.style.display = 'none';
      if (resultEl) resultEl.style.display = 'block';
    });
  }
})();

// ---------------------------------------------------------------
// Mobile menu
// ---------------------------------------------------------------
const menuBtn = document.querySelector('.menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    menuBtn.textContent = open ? '✕' : '☰';
  });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuBtn.textContent = '☰';
  }));
}

// ---------------------------------------------------------------
// Quiz
// ---------------------------------------------------------------
(function initQuiz() {
  const root = document.querySelector('[data-quiz]');
  if (!root) return;

  const steps = SITE.quiz.steps;
  const answerDressMap = SITE.quiz.answerDressMap;
  const state = { step: 0, selections: {}, done: false };

  const dotsEl = root.querySelector('[data-quiz-dots]');
  const stepsEl = root.querySelector('[data-quiz-steps]');
  const formEl = root.querySelector('[data-quiz-form]');
  const resultEl = root.querySelector('[data-quiz-result]');
  const resultDressesEl = root.querySelector('[data-quiz-result-dresses]');
  const nameInput = root.querySelector('[data-quiz-name]');
  const phoneInput = root.querySelector('[data-quiz-phone]');
  const weddingDateInput = root.querySelector('[data-quiz-wedding-date]');

  function renderDots() {
    dotsEl.innerHTML = '';
    for (let i = 0; i < steps.length + 1; i++) {
      const dot = document.createElement('span');
      if (i <= state.step && !state.done) dot.classList.add('active');
      dotsEl.appendChild(dot);
    }
  }

  function renderStep() {
    stepsEl.innerHTML = '';
    formEl.style.display = 'none';
    resultEl.style.display = 'none';

    if (state.done) { dotsEl.style.display = 'none'; return; }
    dotsEl.style.display = 'flex';

    if (state.step >= steps.length) {
      formEl.style.display = 'block';
      return;
    }

    const s = steps[state.step];
    const wrap = document.createElement('div');
    wrap.className = 'quiz-step active';

    const h2 = document.createElement('h2');
    h2.textContent = s.q;
    wrap.appendChild(h2);

    if (s.sub) {
      const p = document.createElement('p');
      p.className = 'sub';
      p.textContent = s.sub;
      wrap.appendChild(p);
    }

    const opts = document.createElement('div');
    opts.className = 'quiz-options';
    s.options.forEach(label => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = label;
      if (state.selections[state.step] === label) btn.classList.add('selected');
      btn.addEventListener('click', () => {
        state.selections[state.step] = label;
        renderStep();
        setTimeout(() => { state.step++; renderStep(); renderDots(); }, 300);
      });
      opts.appendChild(btn);
    });
    wrap.appendChild(opts);
    stepsEl.appendChild(wrap);
  }

  function getResultDresses() {
    const names = answerDressMap
      .map((map, i) => map[state.selections[i]])
      .filter(Boolean);
    let chosen = [...new Set(names)];
    while (chosen.length < 3) {
      const filler = SITE.dresses.find(d => !chosen.includes(d.name));
      if (!filler) break;
      chosen.push(filler.name);
    }
    return chosen.slice(0, 3).map(name => SITE.dresses.find(d => d.name === name)).filter(Boolean);
  }

  if (formEl) {
    formEl.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = nameInput ? nameInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const weddingDateRaw = weddingDateInput ? weddingDateInput.value : '';
      const weddingDate = weddingDateRaw
        ? weddingDateRaw.split('-').reverse().join('.') // yyyy-mm-dd -> dd.mm.yyyy
        : '';
      const dresses = getResultDresses();

      state.done = true;
      renderDots();
      renderStep();

      resultEl.style.display = 'block';
      resultDressesEl.innerHTML = '';
      dresses.forEach(d => {
        const fig = document.createElement('figure');
        fig.innerHTML = '<img src="' + d.front + '" alt="' + d.name + '"><figcaption>' + d.name + '</figcaption>';
        resultDressesEl.appendChild(fig);
      });

      const dressNames = dresses.map(d => d.name).join(', ');
      const msg = 'היי! השלמתי את מבחן הסטייל באתר אלכסה.\n' +
        'שם: ' + (name || '-') + '\n' +
        'טלפון: ' + (phone || '-') + '\n' +
        (weddingDate ? 'תאריך החתונה: ' + weddingDate + '\n' : '') +
        'השמלות שהתאימו לי: ' + dressNames;

      // 1) Send the lead to email via Web3Forms (only if a key was set).
      if (SITE.web3formsKey && SITE.web3formsKey !== 'YOUR_WEB3FORMS_ACCESS_KEY') {
        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            access_key: SITE.web3formsKey,
            subject: SITE.leadEmailSubject,
            from_name: 'אתר אלכסה בריידל',
            'שם': name || '-',
            'טלפון': phone || '-',
            'תאריך החתונה': weddingDate || '-',
            'שמלות שהתאימו': dressNames
          })
        }).catch(() => { /* never block the bride's flow on a network error */ });
      }

      // 2) Also open WhatsApp with the ready-made message (as before).
      window.open('https://wa.me/' + SITE.whatsappNumber + '?text=' + encodeURIComponent(msg), '_blank');
    });
  }

  renderDots();
  renderStep();
})();

// ---------------------------------------------------------------
// "THE DRESS THAT YOU CHOOSES YOU" — play the drop/X/fade sequence
// ONCE when the band first becomes visible; never reset on scroll.
// ---------------------------------------------------------------
(function initDropYou() {
  const band = document.getElementById('dress-band');
  if (!band) return;
  function check() {
    const r = band.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (r.top < vh * 0.85 && r.bottom > vh * 0.1) {
      band.classList.add('in-view');
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    }
  }
  window.addEventListener('scroll', check, { passive: true });
  window.addEventListener('resize', check);
  check();
})();

// ---------------------------------------------------------------
// Collection cards: Front / Back / Detail toggle + zoom lightbox
// ---------------------------------------------------------------
(function initCollection() {
  const lb = document.getElementById('lightbox');
  const lbImg = lb ? lb.querySelector('img') : null;

  function openLightbox(src, alt) {
    if (!lb) return;
    lbImg.src = src; lbImg.alt = alt || '';
    lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false');
  }
  function closeLightbox() {
    if (!lb) return;
    lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true');
    lbImg.src = '';
  }
  if (lb) {
    lb.addEventListener('click', (e) => {
      if (e.target === lb || e.target.classList.contains('lb-close')) closeLightbox();
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
  }

  document.querySelectorAll('.dress-card').forEach(card => {
    function show(side) {
      card.classList.toggle('show-back', side === 'back');
      card.classList.toggle('show-third', side === 'third');
      card.querySelectorAll('.seg').forEach(s => s.classList.toggle('active', s.dataset.side === side));
    }
    function currentImg() {
      if (card.classList.contains('show-third')) return card.querySelector('.img-third');
      if (card.classList.contains('show-back')) return card.querySelector('.img-back');
      return card.querySelector('.img-front');
    }

    card.querySelectorAll('.fb-toggle .seg').forEach(seg => {
      seg.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); show(seg.dataset.side); });
    });
    const zoom = card.querySelector('.zoom-btn');
    if (zoom) zoom.addEventListener('click', (e) => {
      e.preventDefault(); e.stopPropagation();
      const img = currentImg();
      if (img) openLightbox(img.src, img.alt);
    });
  });
})();
