/* ============================================
  Meus Cards de Estudo - Rogério Bueno - script.js
   ============================================ */

'use strict';

// ── State ──────────────────────────────────────
const state = {
  cards:        [],
  filtered:     [],
  current:      0,
  isFlipped:    false,
  categorias:   [],
  activeFilter: 'Todos',
  stats: {
    acertos: 0,
    erros:   0,
    vistos:  new Set()
  }
};

// ── DOM refs ────────────────────────────────────
const $ = id => document.getElementById(id);

const DOM = {
  cardInner:    $('card-inner'),
  cardCategory: $('card-category'),
  cardQuestion: $('card-question'),
  cardAnswer:   $('card-answer'),
  cardNumber:   $('card-number'),
  cardHint:     $('card-hint'),
  progressBar:  $('progress-bar'),
  progressText: $('progress-text'),
  filterWrap:   $('filter-wrap'),
  totalCards:   $('total-cards'),
  statAcertos:  $('stat-acertos'),
  statErros:    $('stat-erros'),
  statVistos:   $('stat-vistos'),
  feedbackCtrl: $('feedback-controls'),
  mainDeck:     $('main-deck'),
  completedScr: $('completed-screen'),
  completedAcertos: $('completed-acertos'),
  completedTotal:   $('completed-total'),
  btnPrev:      $('btn-prev'),
  btnNext:      $('btn-next'),
  btnFlip:      $('btn-flip'),
};

// ── Load JSON ───────────────────────────────────
async function loadCards() {
  try {
    const res  = await fetch('./assets/data/perguntas.json');
    if (!res.ok) throw new Error('Erro ao carregar perguntas.json');
    const data = await res.json();

    state.cards    = data;
    state.filtered = [...data];

    const cats = ['Todos', ...new Set(data.map(c => c.categoria))];
    state.categorias = cats;

    buildFilters(cats);
    updateCard();
    updateStats();
    DOM.totalCards.textContent = data.length;
  } catch (err) {
    console.error(err);
    showError('Não foi possível carregar as perguntas. Verifique o arquivo perguntas.json.');
  }
}

// ── Build category filter buttons ───────────────
function buildFilters(cats) {
  DOM.filterWrap.innerHTML = '';

  const label = document.createElement('span');
  label.className = 'filter-label';
  label.textContent = 'Filtrar:';
  DOM.filterWrap.appendChild(label);

  cats.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'btn-filter' + (cat === state.activeFilter ? ' active' : '');
    btn.textContent = cat;
    btn.addEventListener('click', () => setFilter(cat));
    DOM.filterWrap.appendChild(btn);
  });
}

function setFilter(cat) {
  state.activeFilter = cat;
  state.filtered     = cat === 'Todos'
    ? [...state.cards]
    : state.cards.filter(c => c.categoria === cat);
  state.current  = 0;
  state.isFlipped = false;

  // Reset completed screen
  DOM.completedScr.classList.remove('visible');
  DOM.mainDeck.style.display = '';

  DOM.filterWrap.querySelectorAll('.btn-filter').forEach(b => {
    b.classList.toggle('active', b.textContent === cat);
  });

  updateCard();
  updateStats();
}

// ── Render card ──────────────────────────────────
function updateCard() {
  const deck = state.filtered;

  if (!deck.length) {
    showEmpty();
    return;
  }

  if (state.current >= deck.length) {
    showCompleted();
    return;
  }

  const card = deck[state.current];

  // Un-flip
  state.isFlipped = false;
  DOM.cardInner.classList.remove('flipped');
  DOM.feedbackCtrl.classList.remove('visible');
  DOM.cardHint.style.display = '';

  DOM.cardCategory.textContent = card.categoria;
  DOM.cardQuestion.textContent = card.pergunta;
  DOM.cardAnswer.textContent   = card.resposta;
  DOM.cardNumber.textContent   = `${state.current + 1} / ${deck.length}`;

  // Progress
  const pct = Math.round(((state.current) / deck.length) * 100);
  DOM.progressBar.style.width = pct + '%';
  DOM.progressText.textContent = pct + '%';

  // Mark as seen
  state.stats.vistos.add(card.id);
  updateStats();

  // Animate card entrance
  DOM.cardInner.classList.remove('card-enter');
  void DOM.cardInner.offsetWidth; // reflow
  DOM.cardInner.classList.add('card-enter');
}

// ── Flip ─────────────────────────────────────────
function flipCard() {
  state.isFlipped = !state.isFlipped;
  DOM.cardInner.classList.toggle('flipped', state.isFlipped);

  if (state.isFlipped) {
    DOM.feedbackCtrl.classList.add('visible');
    DOM.cardHint.style.display = 'none';
  } else {
    DOM.feedbackCtrl.classList.remove('visible');
    DOM.cardHint.style.display = '';
  }
}

// ── Navigation ───────────────────────────────────
function prevCard() {
  if (state.current > 0) {
    state.current--;
    updateCard();
  }
}

function nextCard() {
  if (state.current < state.filtered.length - 1) {
    state.current++;
    updateCard();
  } else {
    showCompleted();
  }
}

// ── Feedback ─────────────────────────────────────
function markCorrect() {
  state.stats.acertos++;
  updateStats();
  nextCard();
}

function markWrong() {
  state.stats.erros++;
  updateStats();
  nextCard();
}

// ── Shuffle ──────────────────────────────────────
function shuffle() {
  for (let i = state.filtered.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [state.filtered[i], state.filtered[j]] = [state.filtered[j], state.filtered[i]];
  }
  state.current = 0;
  state.isFlipped = false;
  updateCard();

  // Visual feedback on button
  const btn = document.querySelector('.btn-shuffle');
  if (btn) {
    btn.textContent = '✓ Embaralhado!';
    setTimeout(() => { btn.innerHTML = '🔀 Embaralhar'; }, 1200);
  }
}

// ── Stats ────────────────────────────────────────
function updateStats() {
  DOM.statAcertos.textContent = state.stats.acertos;
  DOM.statErros.textContent   = state.stats.erros;
  DOM.statVistos.textContent  = state.stats.vistos.size;
}

function resetStats() {
  state.stats.acertos = 0;
  state.stats.erros   = 0;
  state.stats.vistos  = new Set();
  state.current       = 0;
  state.isFlipped     = false;
  DOM.completedScr.classList.remove('visible');
  DOM.mainDeck.style.display = '';
  updateCard();
  updateStats();
}

// ── Completed screen ─────────────────────────────
function showCompleted() {
  DOM.mainDeck.style.display = 'none';
  DOM.completedScr.classList.add('visible');

  const total = state.filtered.length;
  const acc   = state.stats.acertos;
  const pct   = total > 0 ? Math.round((acc / total) * 100) : 0;

  DOM.completedAcertos.textContent = acc;
  DOM.completedTotal.textContent   = total;
  $('completed-pct').textContent   = pct + '%';

  DOM.progressBar.style.width = '100%';
  DOM.progressText.textContent = '100%';
}

// ── Error / Empty states ─────────────────────────
function showError(msg) {
  DOM.mainDeck.innerHTML = `
    <div class="empty-state">
      <span style="font-size:2.5rem">⚠️</span>
      <p>${msg}</p>
    </div>`;
}

function showEmpty() {
  DOM.cardInner.style.display = 'none';
}

// ── Keyboard shortcuts ───────────────────────────
document.addEventListener('keydown', e => {
  switch (e.key) {
    case ' ':
    case 'Enter': e.preventDefault(); flipCard(); break;
    case 'ArrowRight': nextCard(); break;
    case 'ArrowLeft':  prevCard(); break;
    case 'ArrowUp':    if (state.isFlipped) markCorrect(); break;
    case 'ArrowDown':  if (state.isFlipped) markWrong();   break;
  }
});

// ── Event listeners ──────────────────────────────
$('btn-flip').addEventListener('click', flipCard);
$('btn-prev').addEventListener('click', prevCard);
$('btn-next').addEventListener('click', nextCard);
$('btn-correct').addEventListener('click', markCorrect);
$('btn-wrong').addEventListener('click', markWrong);
$('btn-shuffle').addEventListener('click', shuffle);
$('btn-reset').addEventListener('click', resetStats);
$('btn-restart').addEventListener('click', resetStats);

// Click on card face also flips
$('card-inner').addEventListener('click', flipCard);

// ── Init ─────────────────────────────────────────
loadCards();
