/**
 * Presentation Slide Deck Controller
 * Keyboard navigation, presenter notes toggle, fullscreen support, and slide animations.
 */

let currentSlideIdx = 0;
let slidesData = [];

document.addEventListener('DOMContentLoaded', () => {
  initPresentation();
});

async function initPresentation() {
  const container = document.getElementById('slide-content-area');
  if (!container) return;

  try {
    const resp = await fetch('/api/presentation');
    if (resp.ok) {
      slidesData = await resp.json();
      renderSlide(0);
      setupPresentationControls();
    }
  } catch (err) {
    console.error('Presentation loading error:', err);
  }
}

function renderSlide(index) {
  if (!slidesData || slidesData.length === 0) return;
  if (index < 0) index = 0;
  if (index >= slidesData.length) index = slidesData.length - 1;
  currentSlideIdx = index;

  const s = slidesData[currentSlideIdx];
  const slideArea = document.getElementById('slide-content-area');
  const slideCounter = document.getElementById('slide-counter-badge');
  const presenterNotesBox = document.getElementById('presenter-notes-content');

  if (slideCounter) {
    slideCounter.textContent = `Slide ${currentSlideIdx + 1} of ${slidesData.length}`;
  }

  if (slideArea) {
    slideArea.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <span class="section-tag" style="margin-bottom: 0.75rem;">${escapeHtml(s.badge)}</span>
        <h2 style="font-size: 2rem; font-weight: 800; color: #ffffff; letter-spacing: -0.02em; margin-bottom: 0.5rem; line-height: 1.2;">
          ${escapeHtml(s.title)}
        </h2>
        <div style="font-size: 1.1rem; color: #38bdf8; font-weight: 500;">
          ${escapeHtml(s.subtitle)}
        </div>
      </div>

      <div style="background: rgba(14, 22, 38, 0.7); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem;">
        <h4 style="font-size: 0.95rem; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1rem;">
          Key Discussion Points:
        </h4>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.85rem; font-size: 1rem; color: #f1f5f9;">
          ${s.key_points.map(pt => `
            <li style="display: flex; align-items: flex-start; gap: 0.65rem;">
              <span style="color: #38bdf8; font-weight: bold; margin-top: 2px;">▸</span>
              <span>${escapeHtml(pt)}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  }

  if (presenterNotesBox) {
    presenterNotesBox.innerHTML = `
      <p style="font-size: 0.9rem; color: #cbd5e1; line-height: 1.6;">
        <strong style="color: #38bdf8;">Presenter Script / Speaker Notes:</strong><br>
        "${escapeHtml(s.presenter_notes)}"
      </p>
    `;
  }

  // Update prev/next button states
  const prevBtn = document.getElementById('btn-prev-slide');
  const nextBtn = document.getElementById('btn-next-slide');
  if (prevBtn) prevBtn.disabled = currentSlideIdx === 0;
  if (nextBtn) nextBtn.disabled = currentSlideIdx === slidesData.length - 1;
}

function nextSlide() {
  if (currentSlideIdx < slidesData.length - 1) {
    renderSlide(currentSlideIdx + 1);
  }
}

function prevSlide() {
  if (currentSlideIdx > 0) {
    renderSlide(currentSlideIdx - 1);
  }
}

function setupPresentationControls() {
  const prevBtn = document.getElementById('btn-prev-slide');
  const nextBtn = document.getElementById('btn-next-slide');
  const notesToggleBtn = document.getElementById('btn-toggle-notes');
  const fullscreenBtn = document.getElementById('btn-fullscreen-slide');

  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);

  if (notesToggleBtn) {
    notesToggleBtn.addEventListener('click', () => {
      const notesBox = document.getElementById('presenter-notes-container');
      if (notesBox) {
        const isHidden = notesBox.style.display === 'none';
        notesBox.style.display = isHidden ? 'block' : 'none';
        notesToggleBtn.textContent = isHidden ? 'Hide Presenter Notes' : 'Show Presenter Notes';
      }
    });
  }

  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', toggleFullscreen);
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    const isReportsPresentationActive = (window.AppState && window.AppState.currentTab === 'reports' && document.getElementById('doc-presentation-view') && document.getElementById('doc-presentation-view').style.display !== 'none');
    const isStandalonePresentation = (window.AppState && window.AppState.currentTab === 'presentation') || !window.AppState || document.fullscreenElement;

    if (!isReportsPresentationActive && !isStandalonePresentation) {
      return;
    }
    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault();
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
    }
  });
}

function toggleFullscreen() {
  const elem = document.getElementById('presentation-deck-box') || document.documentElement;
  if (!document.fullscreenElement) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch(err => console.warn(err));
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

// Explicit global bindings
window.renderSlide = renderSlide;
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.toggleFullscreen = toggleFullscreen;


