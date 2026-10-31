/**
 * Red-Flag Checklist Controller
 * Real-time scoring, threat assessment computation, and dynamic remediation steps.
 */

document.addEventListener('DOMContentLoaded', () => {
  initChecklist();
});

let checklistItems = [];
const checkedSet = new Set();

async function initChecklist() {
  try {
    const resp = await fetch('/api/checklist');
    if (resp.ok) {
      checklistItems = await resp.json();
      renderChecklistItems();
      updateChecklistSummary();
    }
  } catch (err) {
    console.error('Checklist loading error:', err);
  }

  const resetBtn = document.getElementById('btn-reset-checklist');
  if (resetBtn) {
    resetBtn.addEventListener('click', resetChecklist);
  }
}

/**
 * Renders the 8 checklist criteria into interactive cards
 */
function renderChecklistItems() {
  const container = document.getElementById('checklist-items-container');
  if (!container) return;

  container.innerHTML = checklistItems.map(item => `
    <label class="checklist-item" for="${item.id}">
      <input type="checkbox" id="${item.id}" value="${item.id}" onchange="toggleChecklistItem('${item.id}', this.checked)">
      <div class="checklist-content">
        <h4>${escapeHtml(item.name)}</h4>
        <p>${escapeHtml(item.description)}</p>
        <span class="guidance-tip">💡 Verification Tip: ${escapeHtml(item.guidance)}</span>
      </div>
    </label>
  `).join('');
}

/**
 * Toggle checked item state
 */
function toggleChecklistItem(itemId, isChecked) {
  if (isChecked) {
    checkedSet.add(itemId);
  } else {
    checkedSet.delete(itemId);
  }
  updateChecklistSummary();
}

/**
 * Calculates threat score and updates dynamic summary sidebar
 */
function updateChecklistSummary() {
  const summaryBox = document.getElementById('checklist-summary-output');
  if (!summaryBox) return;

  const count = checkedSet.size;
  let rawScore = 0;
  const triggeredItems = [];

  checkedSet.forEach(id => {
    const item = checklistItems.find(i => i.id === id);
    if (item) {
      rawScore += item.weight;
      triggeredItems.push(item);
    }
  });

  const finalScore = Math.min(100, rawScore);

  let statusClass = 'verdict-legitimate';
  let statusTitle = 'No Red Flags Selected';
  let statusDesc = 'If none of the 8 warning indicators are present, the message is less likely to be an immediate phishing attack. However, continue verifying unexpected attachments or unknown senders.';

  if (finalScore >= 50 || count >= 3 || checkedSet.has('chk-passwords') || checkedSet.has('chk-payments')) {
    statusClass = 'verdict-phishing';
    statusTitle = 'CRITICAL PHISHING RISK';
    statusDesc = `${count} red flags detected. The message exhibits serious indicators of deceptive credential harvesting or financial fraud.`;
  } else if (count >= 1) {
    statusClass = 'verdict-suspicious';
    statusTitle = 'SUSPICIOUS — VERIFY FIRST';
    statusDesc = `${count} warning flag(s) identified. Do not comply with requests without independently verifying the sender.`;
  }

  // Generate tailored next steps
  const nextSteps = [];
  if (checkedSet.has('chk-passwords')) {
    nextSteps.push("NEVER enter passwords or read back MFA codes on external sites.");
  }
  if (checkedSet.has('chk-payments')) {
    nextSteps.push("Refuse all payment, wire, or gift card requests; verify ledger with Bursar.");
  }
  if (checkedSet.has('chk-links')) {
    nextSteps.push("Do not click links; inspect true URL destination via mouse hover.");
  }
  if (checkedSet.has('chk-attachments')) {
    nextSteps.push("Do not open unexpected attachments; have IT scan questionable files.");
  }
  if (checkedSet.has('chk-urgency')) {
    nextSteps.push("Pause and take a breath: urgency is a psychological weapon to rush you.");
  }
  if (nextSteps.length === 0) {
    nextSteps.push("Verify the sender via a known institutional directory if unexpected.");
    nextSteps.push("Keep student account security up to date with multi-factor authentication.");
  }

  summaryBox.innerHTML = `
    <div class="verdict-header ${statusClass}" style="margin-bottom: 1rem;">
      <div>
        <div class="verdict-title" style="font-size: 1.15rem;">${statusTitle}</div>
        <div style="font-size: 0.8rem; margin-top: 0.25rem;">${escapeHtml(statusDesc)}</div>
      </div>
      <div class="verdict-badge">${finalScore}/100</div>
    </div>

    <div style="margin-bottom: 1.25rem;">
      <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #94a3b8; margin-bottom: 0.35rem;">
        <span>Checked Criteria: <strong>${count} of 8</strong></span>
        <span>Risk Score: <strong>${finalScore}%</strong></span>
      </div>
      <div class="progress-bar-bg">
        <div class="progress-bar-fill ${finalScore >= 50 ? 'fill-red' : (finalScore > 0 ? 'fill-amber' : 'fill-green')}" style="width: ${Math.max(5, finalScore)}%;"></div>
      </div>
    </div>

    <div class="safe-actions-box" style="margin-bottom: 1.25rem;">
      <h4 style="font-size: 0.9rem;">Recommended Next Steps:</h4>
      <ul class="safe-actions-list">
        ${nextSteps.map(s => `<li>${escapeHtml(s)}</li>`).join('')}
      </ul>
    </div>

    <div style="font-size: 0.775rem; color: #64748b; font-style: italic; border-top: 1px solid var(--border-subtle); padding-top: 0.75rem;">
      Educational Notice: This interactive checklist is an instructional screening guide. A checklist alone does not prove whether a message is malicious or legitimate. Always apply multi-factor defense and institutional verification.
    </div>
  `;
}

/**
 * Resets all checkboxes and recalculates
 */
function resetChecklist() {
  checkedSet.clear();
  document.querySelectorAll('#checklist-items-container input[type="checkbox"]').forEach(cb => {
    cb.checked = false;
  });
  updateChecklistSummary();
  showToast('Checklist reset.', 'info');
}

// Explicit global bindings
window.toggleChecklistItem = toggleChecklistItem;
window.resetChecklist = resetChecklist;


