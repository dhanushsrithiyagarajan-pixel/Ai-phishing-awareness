/**
 * Phishing Message Analyzer Controller
 * Coordinates message analysis requests, UI rendering, sample loaders, and report generation.
 */

document.addEventListener('DOMContentLoaded', () => {
  initAnalyzerEvents();
});

let latestAnalysisResult = null;

function initAnalyzerEvents() {
  const analyzeBtn = document.getElementById('btn-analyze-message');
  const clearBtn = document.getElementById('btn-clear-analyzer');
  const sampleDropdown = document.getElementById('sample-select-dropdown');
  const copyReportBtn = document.getElementById('btn-copy-analysis-report');

  if (analyzeBtn) {
    analyzeBtn.addEventListener('click', handleAnalyzeRequest);
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', resetAnalyzerForm);
  }

  if (sampleDropdown) {
    sampleDropdown.addEventListener('change', (e) => {
      const selectedId = e.target.value;
      if (selectedId) {
        loadSampleToAnalyzer(selectedId);
      }
    });
  }

  if (copyReportBtn) {
    copyReportBtn.addEventListener('click', copyAnalysisReport);
  }
}

/**
 * Populate sample dropdown selector
 */
function populateAnalyzerSamples(samples) {
  const dropdown = document.getElementById('sample-select-dropdown');
  if (!dropdown) return;

  dropdown.innerHTML = '<option value="">-- Load a Training Sample --</option>' + 
    samples.map(s => `<option value="${s.id}">${escapeHtml(s.title)}</option>`).join('');
}

/**
 * Populates message inputs from a selected training sample
 */
function loadSampleToAnalyzer(sampleId) {
  const sample = window.AppState.samples.find(s => s.id === sampleId);
  if (!sample) return;

  // Switch to analyzer tab if not already on it
  switchTab('analyzer');

  const senderInput = document.getElementById('analyzer-sender-input');
  const bodyInput = document.getElementById('analyzer-body-input');
  const dropdown = document.getElementById('sample-select-dropdown');

  if (senderInput) senderInput.value = sample.sender;
  if (bodyInput) bodyInput.value = sample.body;
  if (dropdown) dropdown.value = sampleId;

  showToast(`Loaded sample: "${sample.title}"`, 'info');
}

/**
 * Executes analysis request against backend REST API
 */
async function handleAnalyzeRequest() {
  const senderInput = document.getElementById('analyzer-sender-input');
  const bodyInput = document.getElementById('analyzer-body-input');
  const analyzeBtn = document.getElementById('btn-analyze-message');
  const resultsContainer = document.getElementById('analyzer-results-output');

  const text = (bodyInput ? bodyInput.value : '').trim();
  const sender = (senderInput ? senderInput.value : '').trim();

  if (!text) {
    showToast('Please paste or type a message to analyze.', 'warning');
    if (bodyInput) bodyInput.focus();
    return;
  }

  // Show loading state
  if (analyzeBtn) {
    analyzeBtn.disabled = true;
    analyzeBtn.innerHTML = `
      <svg class="spin-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
      </svg> Analyzing Indicators...
    `;
  }

  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, sender })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || `Server responded with status ${response.status}`);
    }

    const data = await response.json();
    latestAnalysisResult = data;
    renderAnalysisResults(data);
    showToast('Analysis completed successfully!', 'success');

  } catch (err) {
    console.error('Analysis error:', err);
    showToast(`Analysis failed: ${err.message}`, 'danger');
  } finally {
    if (analyzeBtn) {
      analyzeBtn.disabled = false;
      analyzeBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg> Analyze Message
      `;
    }
  }
}

/**
 * Renders the structured analysis results into the DOM
 */
function renderAnalysisResults(result) {
  const container = document.getElementById('analyzer-results-output');
  if (!container) return;

  const isPhishing = result.classification === 'Likely phishing';
  const isSuspicious = result.classification.includes('Suspicious');
  
  let headerClass = 'verdict-legitimate';
  let meterFillClass = 'fill-green';
  let badgeText = 'Likely Legitimate';

  if (isPhishing) {
    headerClass = 'verdict-phishing';
    meterFillClass = 'fill-red';
    badgeText = 'Likely Phishing';
  } else if (isSuspicious) {
    headerClass = 'verdict-suspicious';
    meterFillClass = 'fill-amber';
    badgeText = 'Suspicious — Needs Verification';
  }

  const indicatorsHtml = (result.indicators && result.indicators.length > 0) ? `
    <div style="margin-bottom: 1.25rem;">
      <h4 style="font-size: 0.95rem; color: #f8fafc; margin-bottom: 0.6rem; display: flex; align-items: center; gap: 0.4rem;">
        <span>⚠️</span> Detected Threat Indicators (${result.indicators.length})
      </h4>
      <div class="indicators-list">
        ${result.indicators.map(ind => `
          <div class="indicator-item severity-${escapeHtml(ind.severity)}">
            <div class="indicator-head">
              <span>${escapeHtml(ind.name)}</span>
              <span style="font-size: 0.75rem; text-transform: uppercase; color: #94a3b8;">${escapeHtml(ind.category)}</span>
            </div>
            ${ind.matches && ind.matches.length > 0 ? `
              <div class="indicator-matches">Triggered by: "${escapeHtml(ind.matches.join('", "'))}"</div>
            ` : ''}
            <div class="indicator-desc">${escapeHtml(ind.explanation)}</div>
          </div>
        `).join('')}
      </div>
    </div>
  ` : `
    <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 8px; padding: 1rem; margin-bottom: 1.25rem; font-size: 0.85rem; color: #34d399;">
      ✔ No dominant phishing or credential-harvesting indicators detected in the message text.
    </div>
  `;

  const positiveSignalsHtml = (result.positive_indicators && result.positive_indicators.length > 0) ? `
    <div style="background: rgba(56, 189, 248, 0.08); border: 1px solid rgba(56, 189, 248, 0.2); border-radius: 8px; padding: 0.85rem; margin-bottom: 1.25rem; font-size: 0.825rem; color: #cbd5e1;">
      <strong style="color: #38bdf8;">Legitimacy Indicators:</strong>
      <ul style="margin-left: 1.25rem; margin-top: 0.35rem;">
        ${result.positive_indicators.map(pos => `<li>${escapeHtml(pos.name)} — ${escapeHtml(pos.explanation)}</li>`).join('')}
      </ul>
    </div>
  ` : '';

  const safeActionsHtml = (result.safe_actions && result.safe_actions.length > 0) ? `
    <div class="safe-actions-box">
      <h4>🛡️ Recommended Defensive Actions</h4>
      <ul class="safe-actions-list">
        ${result.safe_actions.map(act => `<li>${escapeHtml(act)}</li>`).join('')}
      </ul>
    </div>
  ` : '';

  container.innerHTML = `
    <div class="verdict-header ${headerClass}">
      <div>
        <div class="verdict-title">${badgeText}</div>
        <div style="font-size: 0.85rem; margin-top: 0.2rem; opacity: 0.9;">${escapeHtml(result.qualitative_assessment || '')}</div>
      </div>
      <div class="verdict-badge">${result.score}/100 Risk Score</div>
    </div>

    <div class="score-meter">
      <div class="score-meter-label">
        <span>Assessed Threat Level: <strong>${escapeHtml(result.risk_level || 'Normal')}</strong></span>
        <span>${escapeHtml(result.confidence_score || '')}</span>
      </div>
      <div class="progress-bar-bg">
        <div class="progress-bar-fill ${meterFillClass}" style="width: ${Math.max(5, result.score)}%;"></div>
      </div>
    </div>

    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; font-size: 0.8rem; color: #94a3b8; background: rgba(0,0,0,0.25); padding: 0.4rem 0.75rem; border-radius: 6px;">
      <span><strong>Engine:</strong> ${escapeHtml(result.assessment_type)}</span>
      <span><strong>Mode:</strong> ${result.engine_mode === 'live_ai' ? 'Live AI Provider' : 'Transparent Rule Heuristics'}</span>
    </div>

    ${indicatorsHtml}
    ${positiveSignalsHtml}
    ${safeActionsHtml}

    <div style="font-size: 0.775rem; color: #64748b; font-style: italic; border-top: 1px solid #1e2e4f; padding-top: 0.75rem; margin-top: 1rem;">
      ${escapeHtml(result.disclaimer)}
    </div>

    <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
      <button class="btn btn-secondary btn-sm" id="btn-copy-analysis-report">
        📋 Copy Analysis Report
      </button>
    </div>
  `;

  // Re-attach report copy button event
  const newCopyBtn = document.getElementById('btn-copy-analysis-report');
  if (newCopyBtn) {
    newCopyBtn.addEventListener('click', copyAnalysisReport);
  }
}

/**
 * Resets the analyzer inputs and output view
 */
function resetAnalyzerForm() {
  const senderInput = document.getElementById('analyzer-sender-input');
  const bodyInput = document.getElementById('analyzer-body-input');
  const dropdown = document.getElementById('sample-select-dropdown');
  const output = document.getElementById('analyzer-results-output');

  if (senderInput) senderInput.value = '';
  if (bodyInput) bodyInput.value = '';
  if (dropdown) dropdown.value = '';

  latestAnalysisResult = null;

  if (output) {
    output.innerHTML = `
      <div class="results-placeholder">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 16v-4"/>
          <path d="M12 8h.01"/>
        </svg>
        <p style="font-size: 1rem; color: #94a3b8; font-weight: 600;">No Analysis Generated Yet</p>
        <p style="font-size: 0.85rem; max-width: 360px;">Paste an email or message on the left or select a training scenario, then click "Analyze Message".</p>
      </div>
    `;
  }
  showToast('Analyzer reset.', 'info');
}

/**
 * Copy formatted analysis report
 */
function copyAnalysisReport() {
  if (!latestAnalysisResult) {
    showToast('No analysis available to copy.', 'warning');
    return;
  }

  const r = latestAnalysisResult;
  let report = `AI PHISHING AWARENESS CAMPAIGN KIT — INCIDENT ANALYSIS REPORT\n`;
  report += `==============================================================\n`;
  report += `Classification: ${r.classification} (Risk Level: ${r.risk_level})\n`;
  report += `Threat Score:   ${r.score}/100\n`;
  report += `Engine:         ${r.assessment_type}\n`;
  report += `Assessment:     ${r.qualitative_assessment}\n\n`;

  if (r.indicators && r.indicators.length > 0) {
    report += `DETECTED RED FLAGS (${r.indicators.length}):\n`;
    r.indicators.forEach((ind, i) => {
      report += `  ${i+1}. [${ind.severity}] ${ind.name}\n`;
      if (ind.matches && ind.matches.length > 0) report += `     Triggered by: "${ind.matches.join('", "')}"\n`;
      report += `     Why it matters: ${ind.explanation}\n`;
    });
    report += `\n`;
  }

  if (r.safe_actions && r.safe_actions.length > 0) {
    report += `RECOMMENDED SAFE ACTIONS:\n`;
    r.safe_actions.forEach(act => {
      report += `  - ${act}\n`;
    });
    report += `\n`;
  }

  report += `DISCLAIMER: ${r.disclaimer}\n`;

  navigator.clipboard.writeText(report).then(() => {
    showToast('Analysis report copied to clipboard!', 'success');
  }).catch(() => {
    showToast('Failed to copy report to clipboard.', 'warning');
  });
}

// Explicit global bindings
window.loadSampleToAnalyzer = loadSampleToAnalyzer;
window.handleAnalyzeRequest = handleAnalyzeRequest;
window.resetAnalyzerForm = resetAnalyzerForm;
window.copyAnalysisReport = copyAnalysisReport;
window.populateAnalyzerSamples = populateAnalyzerSamples;


