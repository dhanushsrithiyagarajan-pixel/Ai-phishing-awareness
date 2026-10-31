/**
 * Core Application Controller - AI Phishing Awareness Campaign Kit
 * Handles navigation tab transitions, global state, toast alerts, and dashboard stats.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  loadDashboardData();
  setupEventListeners();
});

// Global state
window.AppState = {
  currentTab: 'dashboard',
  samples: [],
  quizQuestions: [],
  learningModules: [],
  checklistItems: [],
  socialPosts: []
};

/**
 * Initializes navigation bar tab clicks and hash-based routing.
 */
function initNavigation() {
  const navButtons = document.querySelectorAll('.nav-btn');
  const tabSections = document.querySelectorAll('.tab-section');

  navButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTab = btn.getAttribute('data-tab');
      switchTab(targetTab);
    });
  });

  // Handle URL hash changes
  const hash = window.location.hash.replace('#', '');
  if (hash && document.getElementById(`tab-${hash}`)) {
    switchTab(hash);
  }
}

/**
 * Switch active visible tab section
 */
function switchTab(tabId) {
  const targetSection = document.getElementById(`tab-${tabId}`);
  if (!targetSection) return;

  // Update navbar button states
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
  });

  // Update tab section visibility
  document.querySelectorAll('.tab-section').forEach(sec => {
    sec.classList.remove('active');
  });
  targetSection.classList.add('active');

  window.AppState.currentTab = tabId;
  window.location.hash = tabId;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Load dashboard counts and populate global datasets from REST APIs
 */
async function loadDashboardData() {
  try {
    // 1. Fetch system status
    const statusResp = await fetch('/api/status');
    if (statusResp.ok) {
      const statusData = await statusResp.json();
      updateStatusBadge(statusData);
    }

    // 2. Fetch training samples
    const samplesResp = await fetch('/api/samples');
    if (samplesResp.ok) {
      window.AppState.samples = await samplesResp.json();
      document.getElementById('stat-samples-count').textContent = window.AppState.samples.length;
      renderSamplesTab(window.AppState.samples);
      populateAnalyzerSamples(window.AppState.samples);
    }

    // 3. Fetch learning modules
    const modulesResp = await fetch('/api/modules');
    if (modulesResp.ok) {
      window.AppState.learningModules = await modulesResp.json();
      document.getElementById('stat-modules-count').textContent = window.AppState.learningModules.length;
      renderLearningModules(window.AppState.learningModules);
    }

    // 4. Load saved quiz score from localStorage
    const savedScore = localStorage.getItem('phishing_kit_latest_score');
    if (savedScore !== null) {
      document.getElementById('stat-quiz-score').textContent = `${savedScore}%`;
    } else {
      document.getElementById('stat-quiz-score').textContent = 'Not Taken';
    }

    // 5. Fetch social posts
    const socialResp = await fetch('/api/social');
    if (socialResp.ok) {
      window.AppState.socialPosts = await socialResp.json();
      renderSocialPosts(window.AppState.socialPosts);
    }

  } catch (err) {
    console.warn('Dashboard data loading error:', err);
    showToast('Failed to load some dashboard datasets.', 'warning');
  }
}

/**
 * Updates navbar status indicator badge
 */
function updateStatusBadge(status) {
  const badge = document.getElementById('engine-status-badge');
  if (!badge) return;

  if (status.mode === 'live_ai') {
    badge.className = 'nav-status-badge status-live';
    badge.innerHTML = `<span class="pulse-dot"></span> Live AI (${status.provider})`;
  } else {
    badge.className = 'nav-status-badge status-demo';
    badge.innerHTML = `<span class="pulse-dot"></span> Demo Heuristic Mode`;
  }
}

/**
 * Renders learning center modules with search capability
 */
function renderLearningModules(modules) {
  const container = document.getElementById('learning-grid-container');
  if (!container) return;

  container.innerHTML = modules.map(m => `
    <div class="module-card" data-title="${escapeHtml(m.title)}" data-summary="${escapeHtml(m.summary)}">
      <div class="module-icon-wrap">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      </div>
      <h3>${escapeHtml(m.title)}</h3>
      <p class="module-summary">${escapeHtml(m.summary)}</p>
      
      <div class="module-subhead">Attack Mechanics</div>
      <p>${escapeHtml(m.mechanics)}</p>

      <div class="module-subhead">Critical Warning Signs</div>
      <ul>
        ${m.warning_signs.map(w => `<li>${escapeHtml(w)}</li>`).join('')}
      </ul>

      <div class="module-subhead">Defensive Best Practices</div>
      <ul>
        ${m.prevention_tips.map(t => `<li>${escapeHtml(t)}</li>`).join('')}
      </ul>

      <div class="module-example-box">
        <strong>Campus Scenario:</strong> ${escapeHtml(m.real_world_example)}
      </div>
    </div>
  `).join('');
}

/**
 * Filter learning modules via search input
 */
function filterModules(query) {
  const q = query.toLowerCase().trim();
  const cards = document.querySelectorAll('.module-card');
  cards.forEach(card => {
    const title = (card.getAttribute('data-title') || '').toLowerCase();
    const summary = (card.getAttribute('data-summary') || '').toLowerCase();
    const isMatch = title.includes(q) || summary.includes(q);
    card.style.display = isMatch ? 'flex' : 'none';
  });
}

/**
 * Renders training samples tab with filter pills
 */
function renderSamplesTab(samples) {
  const container = document.getElementById('samples-list-container');
  if (!container) return;

  container.innerHTML = samples.map(s => {
    const isPhishing = s.expected_classification === 'Likely phishing';
    const isSuspicious = s.expected_classification.includes('Suspicious');
    const badgeClass = isPhishing ? 'badge-phishing' : (isSuspicious ? 'badge-suspicious' : 'badge-legitimate');

    return `
      <div class="sample-card" data-category="${isPhishing ? 'phishing' : (isSuspicious ? 'suspicious' : 'legitimate')}">
        <div class="sample-card-header">
          <div>
            <h3 style="font-size: 1.15rem; color: #f8fafc; margin-bottom: 0.25rem;">${escapeHtml(s.title)}</h3>
            <span style="font-size: 0.8rem; color: #94a3b8;">Scenario: ${escapeHtml(s.scenario)}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span class="sample-badge ${badgeClass}">${escapeHtml(s.expected_classification)}</span>
            <button class="btn btn-secondary btn-sm" onclick="loadSampleToAnalyzer('${s.id}')">
              Load into Analyzer →
            </button>
          </div>
        </div>

        <div class="sample-email-preview">
          <div class="sample-headers-block">
            <strong>From:</strong> ${escapeHtml(s.sender)}<br>
            <strong>Subject:</strong> ${escapeHtml(s.subject)}
          </div>
          <div class="sample-body-block">${escapeHtml(s.body)}</div>
        </div>

        <div class="sample-analysis-grid">
          <div class="sample-meta-box">
            <h4>Key Indicators & Red Flags</h4>
            <ul style="margin-left: 1.25rem; color: #cbd5e1; font-size: 0.825rem;">
              ${s.warning_signs.map(w => `<li>${escapeHtml(w)}</li>`).join('')}
            </ul>
          </div>
          <div class="sample-meta-box">
            <h4>Educational Rationale & Safe Action</h4>
            <p style="font-size: 0.825rem; color: #94a3b8; margin-bottom: 0.5rem;">${escapeHtml(s.explanation)}</p>
            <div style="font-size: 0.825rem; color: #34d399;">
              <strong>Safe Action:</strong> ${escapeHtml(s.safe_action)}
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Filter samples by category
 */
function filterSamples(category) {
  const cards = document.querySelectorAll('.sample-card');
  const pills = document.querySelectorAll('.sample-pill-btn');

  pills.forEach(p => p.classList.toggle('active', p.getAttribute('data-filter') === category));

  cards.forEach(card => {
    if (category === 'all' || card.getAttribute('data-category') === category) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

/**
 * Renders social media campaign cards
 */
function renderSocialPosts(posts) {
  const container = document.getElementById('social-posts-container');
  if (!container) return;

  container.innerHTML = posts.map((p, idx) => `
    <div class="social-post-card">
      <div class="post-meta-header">
        <span style="font-size: 0.75rem; font-weight: 700; color: #38bdf8; text-transform: uppercase;">Campaign Post #${idx + 1}</span>
        <button class="btn btn-secondary btn-sm" onclick="copyPostText('${p.id}')">Copy Post</button>
      </div>
      <div class="post-headline">${escapeHtml(p.headline)}</div>
      <div class="post-body">${escapeHtml(p.message)}</div>
      <div class="post-tip-box">
        <strong>Safety Tip:</strong> ${escapeHtml(p.safety_tip)}
      </div>
      <div class="post-hashtags">${p.hashtags.map(h => escapeHtml(h)).join(' ')}</div>
      <div class="visual-concept-box">
        <strong>Suggested Visual Concept:</strong> ${escapeHtml(p.visual_concept)}
      </div>
    </div>
  `).join('');
}

/**
 * Copy social post to clipboard
 */
function copyPostText(postId) {
  const post = window.AppState.socialPosts.find(p => p.id === postId);
  if (!post) return;

  const textToCopy = `${post.headline}\n\n${post.message}\n\nSafety Tip: ${post.safety_tip}\n\n${post.hashtags.join(' ')}`;
  navigator.clipboard.writeText(textToCopy).then(() => {
    showToast('Post copied to clipboard!', 'success');
  }).catch(() => {
    showToast('Failed to copy to clipboard.', 'warning');
  });
}

/**
 * Global toast notification system
 */
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/**
 * Escape HTML utility
 */
function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Wire up global event listeners
 */
function setupEventListeners() {
  const searchInput = document.getElementById('module-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => filterModules(e.target.value));
  }
}

// Explicit global bindings
window.switchTab = switchTab;
window.filterSamples = filterSamples;
window.filterModules = filterModules;
window.copyPostText = copyPostText;
window.showToast = showToast;
window.escapeHtml = escapeHtml;
window.loadDashboardData = loadDashboardData;


