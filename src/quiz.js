/**
 * src/quiz.js
 * ═══════════════════════════════════════════════════════════════
 * QUIZ MODULE — BODREN Coffee Shop
 *
 * RESPONSIBILITY: Coffee recommender quiz — data, logic, and
 * DOM interactions for the quiz section only.
 *
 * NOTE: This module is allowed to touch quiz-specific DOM nodes
 * because it is a self-contained widget. It does NOT interact
 * with the product grid, cart, or filter DOM elements.
 * ═══════════════════════════════════════════════════════════════
 */

/** @typedef {{ text: string, result: string }} QuizOption */
/** @typedef {{ question: string, options: QuizOption[] }} QuizQuestion */

/** @type {QuizQuestion[]} */
const QUIZ_QUESTIONS = [
  {
    question: "How do you like your coffee strength?",
    options: [
      { text: "Light & mild", result: "Latte" },
      { text: "Balanced", result: "Cappuccino" },
      { text: "Bold & intense", result: "Espresso" },
      { text: "Extra strong", result: "Cold Brew" },
    ],
  },
  {
    question: "What flavor notes do you enjoy most?",
    options: [
      { text: "Creamy & sweet", result: "Caramel Macchiato" },
      { text: "Chocolatey", result: "Mocha" },
      { text: "Earthy & green", result: "Matcha Latte" },
      { text: "Spiced & warm", result: "Chai Latte" },
    ],
  },
  {
    question: "What time of day are you having coffee?",
    options: [
      { text: "Morning kick-start", result: "Espresso" },
      { text: "Lazy morning", result: "Flat White" },
      { text: "Afternoon pick-me-up", result: "Iced Latte" },
      { text: "Any time!", result: "Cappuccino" },
    ],
  },
];

/** Short descriptions for each recommended drink result */
const RESULT_DESCRIPTIONS = {
  Latte: "Smooth, creamy, and comforting — perfect for those who enjoy a gentle coffee experience.",
  Cappuccino: "A timeless Italian classic with the perfect balance of espresso and velvety foam.",
  Espresso: "Pure, concentrated intensity — for those who mean serious business.",
  "Cold Brew": "Ultra-smooth and naturally sweet cold concentrate. Zero acidity, maximum flavour.",
  "Caramel Macchiato": "Sweet, silky, and indulgent — a dessert in a cup.",
  Mocha: "Rich espresso meets chocolate. The best of both worlds.",
  "Matcha Latte": "Earthy, vibrant, and energising — a mindful alternative to coffee.",
  "Chai Latte": "Warm spices and creamy milk — cozy comfort in every sip.",
  "Flat White": "Stronger than a latte, smoother than a cappuccino. Perfectly balanced.",
  "Iced Latte": "Chilled espresso over ice. Refreshingly simple.",
};

// ─── State ──────────────────────────────────────────────────────

let _currentQuestion = 0;
/** @type {string[]} */
let _answers = [];

// ─── DOM References ─────────────────────────────────────────────

const startView = document.getElementById("quiz-start-view");
const questionView = document.getElementById("quiz-question-view");
const resultView = document.getElementById("quiz-result-view");
const progressEl = document.getElementById("quiz-progress");
const questionTextEl = document.getElementById("quiz-question-text");
const optionsEl = document.getElementById("quiz-options");
const resultNameEl = document.getElementById("quiz-result-name");
const resultDescEl = document.getElementById("quiz-result-desc");
const startBtn = document.getElementById("quiz-start-btn");
const restartBtn = document.getElementById("quiz-restart-btn");

// ─── View Transitions ───────────────────────────────────────────

function _showView(view) {
  [startView, questionView, resultView].forEach((v) => v.classList.add("hidden"));
  view.classList.remove("hidden");
}

// ─── Quiz Logic ─────────────────────────────────────────────────

function _renderQuestion() {
  const q = QUIZ_QUESTIONS[_currentQuestion];
  progressEl.textContent = `Question ${_currentQuestion + 1} of ${QUIZ_QUESTIONS.length}`;
  questionTextEl.textContent = q.question;

  optionsEl.innerHTML = q.options
    .map(
      (opt, i) => `
      <button
        type="button"
        class="quiz-option-btn"
        data-result="${opt.result}"
        data-index="${i}"
      >${opt.text}</button>`
    )
    .join("");

  _showView(questionView);
}

function _selectAnswer(result) {
  _answers.push(result);

  if (_currentQuestion < QUIZ_QUESTIONS.length - 1) {
    _currentQuestion++;
    _renderQuestion();
  } else {
    _showResult();
  }
}

function _showResult() {
  // Tally: pick the answer that appears most; on tie, use last answer
  const tally = {};
  _answers.forEach((ans) => {
    tally[ans] = (tally[ans] || 0) + 1;
  });

  let top = _answers[_answers.length - 1];
  let max = 0;
  for (const [name, count] of Object.entries(tally)) {
    if (count > max) {
      max = count;
      top = name;
    }
  }

  resultNameEl.textContent = top;
  resultDescEl.textContent =
    RESULT_DESCRIPTIONS[top] || "A wonderful coffee choice — enjoy every sip!";
  _showView(resultView);
}

function _reset() {
  _currentQuestion = 0;
  _answers = [];
  _showView(startView);
}

// ─── Initialise ─────────────────────────────────────────────────

/**
 * Bootstraps the quiz — attaches all listeners.
 * Called once from main.js.
 */
export function initQuiz() {
  if (!startBtn || !restartBtn || !optionsEl) return;

  startBtn.addEventListener("click", () => {
    _currentQuestion = 0;
    _answers = [];
    _renderQuestion();
  });

  restartBtn.addEventListener("click", _reset);

  // Delegated listener for quiz option buttons
  optionsEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".quiz-option-btn");
    if (!btn) return;
    _selectAnswer(btn.dataset.result);
  });
}
