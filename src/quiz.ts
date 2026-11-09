/**
 * src/quiz.ts
 * ═══════════════════════════════════════════════════════════════
 * QUIZ MODULE — BODREN Coffee Shop
 *
 * Interactive coffee finder quiz.
 * Strictly typed with zero 'any', zero 'as', and zero '!'.
 * ═══════════════════════════════════════════════════════════════
 */

import { QuizQuestion } from './types.js';
import { t } from './i18n.js';

const QUIZ_SPEC: readonly QuizQuestion[] = [
  {
    questionKey: 'quiz.q1.question',
    options: [
      { textKey: 'quiz.q1.opt1', result: 'Latte' },
      { textKey: 'quiz.q1.opt2', result: 'Cappuccino' },
      { textKey: 'quiz.q1.opt3', result: 'Espresso' },
      { textKey: 'quiz.q1.opt4', result: 'Cold Brew' },
    ],
  },
  {
    questionKey: 'quiz.q2.question',
    options: [
      { textKey: 'quiz.q2.opt1', result: 'Caramel Macchiato' },
      { textKey: 'quiz.q2.opt2', result: 'Mocha' },
      { textKey: 'quiz.q2.opt3', result: 'Matcha Latte' },
      { textKey: 'quiz.q2.opt4', result: 'Chai Latte' },
    ],
  },
  {
    questionKey: 'quiz.q3.question',
    options: [
      { textKey: 'quiz.q3.opt1', result: 'Espresso' },
      { textKey: 'quiz.q3.opt2', result: 'Flat White' },
      { textKey: 'quiz.q3.opt3', result: 'Iced Latte' },
      { textKey: 'quiz.q3.opt4', result: 'Cappuccino' },
    ],
  },
];

let currentQuestionIndex = 0;
const recordedAnswers: string[] = [];

function getElement(id: string): HTMLElement | null {
  return document.getElementById(id);
}

function getButton(id: string): HTMLButtonElement | null {
  const el = document.getElementById(id);
  return el instanceof HTMLButtonElement ? el : null;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function showView(target: HTMLElement | null): void {
  const startView = getElement('quiz-start-view');
  const questionView = getElement('quiz-question-view');
  const resultView = getElement('quiz-result-view');

  const views = [startView, questionView, resultView];
  for (let i = 0; i < views.length; i += 1) {
    const v = views[i];
    if (v) {
      v.classList.add('hidden');
    }
  }

  if (target) {
    target.classList.remove('hidden');
  }
}

function renderQuestion(): void {
  const q = QUIZ_SPEC[currentQuestionIndex];
  if (!q) {
    return;
  }

  const progressEl = getElement('quiz-progress');
  const questionTextEl = getElement('quiz-question-text');
  const optionsEl = getElement('quiz-options');
  const questionView = getElement('quiz-question-view');

  if (progressEl) {
    progressEl.textContent = t('quiz.progress', {
      current: currentQuestionIndex + 1,
      total: QUIZ_SPEC.length,
    });
  }

  if (questionTextEl) {
    questionTextEl.textContent = t(q.questionKey);
  }

  if (optionsEl) {
    const htmlOptions: string[] = [];
    for (let i = 0; i < q.options.length; i += 1) {
      const opt = q.options[i];
      if (opt) {
        htmlOptions.push(`
          <button
            type="button"
            class="quiz-option-btn"
            data-result="${opt.result}"
            data-index="${i}"
          >${escapeHtml(t(opt.textKey))}</button>`);
      }
    }
    optionsEl.innerHTML = htmlOptions.join('');
  }

  showView(questionView);
}

function showResult(): void {
  const tally: Record<string, number> = {};
  for (let i = 0; i < recordedAnswers.length; i += 1) {
    const ans = recordedAnswers[i];
    if (ans) {
      tally[ans] = (tally[ans] || 0) + 1;
    }
  }

  let top = recordedAnswers[recordedAnswers.length - 1] || 'Cappuccino';
  let max = 0;
  const entries = Object.entries(tally);
  for (let i = 0; i < entries.length; i += 1) {
    const entry = entries[i];
    if (entry) {
      const [name, count] = entry;
      if (count > max) {
        max = count;
        top = name;
      }
    }
  }

  const slug = top.toLowerCase().replace(/\s+/g, '_');
  const descKey = `quiz.result.${slug}`;

  const resultNameEl = getElement('quiz-result-name');
  const resultDescEl = getElement('quiz-result-desc');
  const resultView = getElement('quiz-result-view');

  if (resultNameEl) {
    resultNameEl.textContent = top;
  }
  if (resultDescEl) {
    resultDescEl.textContent = t(descKey);
  }

  showView(resultView);
}

function selectAnswer(result: string): void {
  recordedAnswers.push(result);

  if (currentQuestionIndex < QUIZ_SPEC.length - 1) {
    currentQuestionIndex += 1;
    renderQuestion();
  } else {
    showResult();
  }
}

function resetQuiz(): void {
  currentQuestionIndex = 0;
  recordedAnswers.length = 0;
  const startView = getElement('quiz-start-view');
  showView(startView);
}

export function refreshQuizTranslations(): void {
  const questionView = getElement('quiz-question-view');
  const resultView = getElement('quiz-result-view');

  if (questionView && !questionView.classList.contains('hidden')) {
    renderQuestion();
  } else if (resultView && !resultView.classList.contains('hidden')) {
    showResult();
  }
}

export function initQuiz(): void {
  const startBtn = getButton('quiz-start-btn');
  const restartBtn = getButton('quiz-restart-btn');
  const optionsEl = getElement('quiz-options');

  if (!startBtn || !restartBtn || !optionsEl) {
    return;
  }

  startBtn.addEventListener('click', () => {
    currentQuestionIndex = 0;
    recordedAnswers.length = 0;
    renderQuestion();
  });

  restartBtn.addEventListener('click', resetQuiz);

  optionsEl.addEventListener('click', (event: MouseEvent) => {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }
    const btn = target.closest('.quiz-option-btn');
    if (!(btn instanceof HTMLButtonElement)) {
      return;
    }
    const res = btn.dataset['result'];
    if (res) {
      selectAnswer(res);
    }
  });
}
