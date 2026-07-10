// ===================================================================
// Alexa Bridal — site script
// Edit the CONFIG section below to change copy, dresses, quiz logic,
// WhatsApp number, etc. No build step needed — plain JS.
// ===================================================================

const CONFIG = {
  whatsappNumber: '972544806554', // international format, no + or leading 0
  instagramHandle: 'alexa.bridal',
  fullSiteUrl: 'https://bridals-il.com',

  // Leads by email (Web3Forms). Get a free key in 30s at https://web3forms.com
  // (enter your email, copy the "Access Key" they show/email you) and paste it
  // here. Until you do, the quiz still opens WhatsApp as before.
  web3formsKey: 'YOUR_WEB3FORMS_ACCESS_KEY',
  leadEmailSubject: 'ליד חדש ממבחן הסטייל — אלכסה בריידל',

  // Every dress shown in the collection. slot N maps to images/dress-N.jpg
  dresses: [
    { name: 'הילה', price: 'עד 3,800 ₪', img: 'images/dress-1.jpg', link: 'https://bridals-il.com/product/הילה/' },
    { name: 'קים', price: 'עד 3,800 ₪', img: 'images/dress-2.jpg', link: 'https://bridals-il.com/product/קים/' },
    { name: 'מיקה', price: 'עד 3,800 ₪', img: 'images/dress-3.jpg', link: 'https://bridals-il.com/product/מיקה/' },
    { name: 'עמית', price: 'עד 3,800 ₪', img: 'images/dress-4.jpg', link: 'https://bridals-il.com/product/עמית/' },
    { name: 'רומא', price: 'עד 3,800 ₪', img: 'images/dress-5.jpg', link: 'https://bridals-il.com/product/רומא/' },
    { name: 'פריז', price: 'עד 3,800 ₪', img: 'images/dress-6.jpg', link: 'https://bridals-il.com/product/פריז/' }
  ],

  // The 3 quiz questions. Add/remove options freely — just also update
  // questionDressMap below so every option maps to a dress name.
  quizSteps: [
    { q: 'עוד לא יודעת איזו שמלה מתאימה לך?', sub: 'עני על 3 שאלות קצרות ונבחר יחד את השמלות שהכי מתאימות לסגנון שלך.', options: ['רומנטית וקלילה', 'קלאסית ונקייה', 'נועזת ומיוחדת'] },
    { q: 'איזו גזרה הכי את?', sub: '', options: ['A-line נשית', 'מחשוף לב ותחרה', 'נשפכת ומינימליסטית'] },
    { q: 'איפה תרקדי הכי הרבה?', sub: '', options: ['אולם מרווח', 'חצר וגינה', 'חוף ים'] }
  ],

  // Maps EVERY quiz answer (across all 3 questions) to a recommended dress name.
  // At the end we take the (up to 3) unique dresses recommended by the bride's
  // 3 answers. Edit freely — dress name must match a "name" in CONFIG.dresses.
  questionDressMap: [
    { 'רומנטית וקלילה': 'הילה', 'קלאסית ונקייה': 'קים', 'נועזת ומיוחדת': 'מיקה' },
    { 'A-line נשית': 'עמית', 'מחשוף לב ותחרה': 'רומא', 'נשפכת ומינימליסטית': 'פריז' },
    { 'אולם מרווח': 'הילה', 'חצר וגינה': 'קים', 'חוף ים': 'מיקה' }
  ]
};

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

  const state = { step: 0, selections: {}, done: false };

  const dotsEl = root.querySelector('[data-quiz-dots]');
  const stepsEl = root.querySelector('[data-quiz-steps]');
  const formEl = root.querySelector('[data-quiz-form]');
  const resultEl = root.querySelector('[data-quiz-result]');
  const resultDressesEl = root.querySelector('[data-quiz-result-dresses]');
  const nameInput = root.querySelector('[data-quiz-name]');
  const phoneInput = root.querySelector('[data-quiz-phone]');

  function renderDots() {
    dotsEl.innerHTML = '';
    for (let i = 0; i < CONFIG.quizSteps.length + 1; i++) {
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

    if (state.step >= CONFIG.quizSteps.length) {
      formEl.style.display = 'block';
      return;
    }

    const s = CONFIG.quizSteps[state.step];
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
    const names = CONFIG.questionDressMap
      .map((map, i) => map[state.selections[i]])
      .filter(Boolean);
    let chosen = [...new Set(names)];
    while (chosen.length < 3) {
      const filler = CONFIG.dresses.find(d => !chosen.includes(d.name));
      if (!filler) break;
      chosen.push(filler.name);
    }
    return chosen.slice(0, 3).map(name => CONFIG.dresses.find(d => d.name === name)).filter(Boolean);
  }

  if (formEl) {
    formEl.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = nameInput ? nameInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const dresses = getResultDresses();

      state.done = true;
      renderDots();
      renderStep();

      resultEl.style.display = 'block';
      resultDressesEl.innerHTML = '';
      dresses.forEach(d => {
        const fig = document.createElement('figure');
        fig.innerHTML = `<img src="${d.img}" alt="${d.name}"><figcaption>${d.name}</figcaption>`;
        resultDressesEl.appendChild(fig);
      });

      const dressNames = dresses.map(d => d.name).join(', ');
      const msg = 'היי! השלמתי את מבחן הסטייל באתר אלכסה.\n' +
        'שם: ' + (name || '-') + '\n' +
        'טלפון: ' + (phone || '-') + '\n' +
        'השמלות שהתאימו לי: ' + dressNames;

      // 1) Send the lead to email via Web3Forms (only if a key was set).
      if (CONFIG.web3formsKey && CONFIG.web3formsKey !== 'YOUR_WEB3FORMS_ACCESS_KEY') {
        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            access_key: CONFIG.web3formsKey,
            subject: CONFIG.leadEmailSubject,
            from_name: 'אתר אלכסה בריידל',
            'שם': name || '-',
            'טלפון': phone || '-',
            'שמלות שהתאימו': dressNames
          })
        }).catch(() => { /* never block the bride's flow on a network error */ });
      }

      // 2) Also open WhatsApp with the ready-made message (as before).
      window.open('https://wa.me/' + CONFIG.whatsappNumber + '?text=' + encodeURIComponent(msg), '_blank');
    });
  }

  renderDots();
  renderStep();
})();

// ---------------------------------------------------------------
// Collection cards: front/back toggle
// ---------------------------------------------------------------
document.querySelectorAll('.dress-card').forEach(card => {
  const btn = card.querySelector('.fb-toggle');
  if (!btn) return;
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const showBack = card.classList.toggle('show-back');
    btn.querySelectorAll('.seg').forEach(seg => {
      seg.classList.toggle('active', (seg.dataset.side === 'back') === showBack);
    });
  });
});
