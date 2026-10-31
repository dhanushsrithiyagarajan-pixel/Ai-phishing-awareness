/**
 * Interactive Cybersecurity Quiz Controller
 * 10-question MCQ quiz, score evaluation, category feedback, and localStorage persistence.
 */

document.addEventListener('DOMContentLoaded', () => {
  initQuiz();
});

let quizState = {
  questions: [],
  currentIndex: 0,
  userAnswers: {}, // questionId -> selectedIndex
  isCompleted: false
};

async function initQuiz() {
  try {
    const resp = await fetch('/api/quiz');
    if (resp.ok) {
      quizState.questions = await resp.json();
      renderCurrentQuestion();
    }
  } catch (err) {
    console.error('Quiz initialization error:', err);
  }

  const retakeBtn = document.getElementById('btn-retake-quiz');
  if (retakeBtn) {
    retakeBtn.addEventListener('click', resetQuiz);
  }
}

/**
 * Renders the active question view
 */
function renderCurrentQuestion() {
  const container = document.getElementById('quiz-active-view');
  const resultsContainer = document.getElementById('quiz-results-view');
  if (!container) return;

  if (quizState.isCompleted) {
    container.style.display = 'none';
    if (resultsContainer) resultsContainer.style.display = 'block';
    renderQuizResults();
    return;
  }

  container.style.display = 'block';
  if (resultsContainer) resultsContainer.style.display = 'none';

  const q = quizState.questions[quizState.currentIndex];
  if (!q) return;

  const total = quizState.questions.length;
  const currentNum = quizState.currentIndex + 1;
  const progressPercent = Math.round((currentNum / total) * 100);
  const selectedIdx = quizState.userAnswers[q.id];

  const letters = ['A', 'B', 'C', 'D'];

  container.innerHTML = `
    <div class="quiz-progress-bar">
      <span>Question <strong>${currentNum}</strong> of ${total}</span>
      <span class="section-tag">${escapeHtml(q.category)}</span>
    </div>

    <div class="progress-bar-bg" style="margin-bottom: 1.5rem;">
      <div class="progress-bar-fill fill-green" style="width: ${progressPercent}%;"></div>
    </div>

    <div class="question-text">${escapeHtml(q.question)}</div>

    <div class="options-list">
      ${q.options.map((opt, idx) => `
        <button class="option-btn ${selectedIdx === idx ? 'selected' : ''}" onclick="selectQuizOption(${q.id}, ${idx})">
          <span style="width: 26px; height: 26px; border-radius: 50%; background: rgba(255,255,255,0.08); display: inline-flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.8rem;">${letters[idx]}</span>
          <span>${escapeHtml(opt)}</span>
        </button>
      `).join('')}
    </div>

    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem;">
      <button class="btn btn-secondary btn-sm" onclick="previousQuestion()" ${quizState.currentIndex === 0 ? 'disabled' : ''}>
        ← Previous
      </button>

      <div>
        ${currentNum < total ? `
          <button class="btn btn-primary" onclick="nextQuestion()" ${selectedIdx === undefined ? 'disabled' : ''}>
            Next Question →
          </button>
        ` : `
          <button class="btn btn-primary" onclick="finishQuiz()" ${selectedIdx === undefined ? 'disabled' : ''}>
            Complete & View Results ✔
          </button>
        `}
      </div>
    </div>
  `;
}

/**
 * Handle option selection
 */
function selectQuizOption(questionId, optionIndex) {
  quizState.userAnswers[questionId] = optionIndex;
  renderCurrentQuestion();
}

function nextQuestion() {
  if (quizState.currentIndex < quizState.questions.length - 1) {
    quizState.currentIndex++;
    renderCurrentQuestion();
  }
}

function previousQuestion() {
  if (quizState.currentIndex > 0) {
    quizState.currentIndex--;
    renderCurrentQuestion();
  }
}

/**
 * Calculates score and transitions to the results review screen
 */
function finishQuiz() {
  quizState.isCompleted = true;
  renderCurrentQuestion();
}

/**
 * Renders results, score percentage, feedback badge, and question-by-question review
 */
function renderQuizResults() {
  const resultsContainer = document.getElementById('quiz-results-view');
  if (!resultsContainer) return;

  let correctCount = 0;
  quizState.questions.forEach(q => {
    if (quizState.userAnswers[q.id] === q.correct_index) {
      correctCount++;
    }
  });

  const total = quizState.questions.length;
  const percentage = Math.round((correctCount / total) * 100);

  // Save to localStorage
  localStorage.setItem('phishing_kit_latest_score', percentage);
  const bestScore = localStorage.getItem('phishing_kit_best_score');
  if (!bestScore || percentage > parseInt(bestScore, 10)) {
    localStorage.setItem('phishing_kit_best_score', percentage);
  }

  // Update stat on dashboard
  const statElement = document.getElementById('stat-quiz-score');
  if (statElement) statElement.textContent = `${percentage}%`;

  let rankTitle = 'Cybersecurity Champion';
  let rankDesc = 'Exceptional security awareness! You have demonstrated the knowledge needed to detect advanced phishing and social engineering.';
  let circleColor = 'var(--color-success)';

  if (percentage < 50) {
    rankTitle = 'Vulnerable to Social Engineering';
    rankDesc = 'Significant risk identified. Attackers exploit these exact blind spots. Review the Learning Center lessons carefully.';
    circleColor = 'var(--color-danger)';
  } else if (percentage < 80) {
    rankTitle = 'Security Conscious Defender';
    rankDesc = 'Good baseline awareness! You caught most traps but missed subtle indicators like spoofed subdomains or advance fee schemes.';
    circleColor = 'var(--color-warning)';
  }

  resultsContainer.innerHTML = `
    <div style="text-align: center; margin-bottom: 2rem;">
      <div class="score-display-circle" style="border-color: ${circleColor};">
        <span class="score-number">${percentage}%</span>
        <span class="score-total">${correctCount} of ${total} Correct</span>
      </div>

      <h3 style="font-size: 1.5rem; color: #f8fafc; margin-bottom: 0.5rem;">${rankTitle}</h3>
      <p style="color: #94a3b8; max-width: 600px; margin: 0 auto 1.5rem auto; font-size: 0.95rem;">${rankDesc}</p>

      <button class="btn btn-primary" onclick="resetQuiz()">
        🔄 Retake Quiz
      </button>
    </div>

    <div style="border-top: 1px solid var(--border-subtle); padding-top: 1.5rem;">
      <h4 style="font-size: 1.15rem; color: #f8fafc; margin-bottom: 1rem;">Detailed Question Review & Explanations</h4>
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        ${quizState.questions.map((q, idx) => {
          const userChoice = quizState.userAnswers[q.id];
          const isCorrect = userChoice === q.correct_index;
          return `
            <div style="background: rgba(0,0,0,0.25); border: 1px solid ${isCorrect ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}; border-left: 4px solid ${isCorrect ? '#10b981' : '#ef4444'}; border-radius: 8px; padding: 1rem;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem; font-size: 0.8rem; color: #94a3b8;">
                <span>Question ${idx + 1} (${escapeHtml(q.category)})</span>
                <span style="font-weight: 700; color: ${isCorrect ? '#34d399' : '#f87171'};">
                  ${isCorrect ? '✔ CORRECT' : '✘ INCORRECT'}
                </span>
              </div>
              <div style="font-weight: 600; color: #f8fafc; margin-bottom: 0.5rem; font-size: 0.95rem;">${escapeHtml(q.question)}</div>
              
              <div style="font-size: 0.85rem; margin-bottom: 0.35rem;">
                <span style="color: #94a3b8;">Your Answer:</span> 
                <span style="color: ${isCorrect ? '#34d399' : '#f87171'};">${escapeHtml(q.options[userChoice] || 'No answer selected')}</span>
              </div>

              ${!isCorrect ? `
                <div style="font-size: 0.85rem; margin-bottom: 0.5rem;">
                  <span style="color: #94a3b8;">Correct Answer:</span> 
                  <span style="color: #34d399; font-weight: 600;">${escapeHtml(q.options[q.correct_index])}</span>
                </div>
              ` : ''}

              <div style="background: rgba(255,255,255,0.03); padding: 0.65rem; border-radius: 6px; font-size: 0.825rem; color: #cbd5e1; margin-top: 0.5rem;">
                <strong>Explanation:</strong> ${escapeHtml(q.explanation)}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

/**
 * Resets the quiz for a new attempt
 */
function resetQuiz() {
  quizState.currentIndex = 0;
  quizState.userAnswers = {};
  quizState.isCompleted = false;
  renderCurrentQuestion();
  showToast('Quiz reset. Good luck!', 'info');
}

// Explicit global bindings
window.selectQuizOption = selectQuizOption;
window.nextQuestion = nextQuestion;
window.previousQuestion = previousQuestion;
window.finishQuiz = finishQuiz;
window.resetQuiz = resetQuiz;


