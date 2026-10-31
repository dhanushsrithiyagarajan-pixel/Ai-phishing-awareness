# Interactive Red-Flag Checklist Methodology & Evaluation Guide

This document specifies the technical and educational architecture of the **Red-Flag Checklist** incorporated within the AI Phishing Awareness Campaign Kit.

---

## 1. Objective & Purpose

The Red-Flag Checklist provides a structured cognitive framework allowing students to systematically screen incoming communications against eight validated social engineering indicators. Rather than relying on intuition or vague impressions, users evaluate concrete technical and psychological markers.

---

## 2. The Eight Evaluated Criteria

| Checkpoint Identifier | Criterion Name | Category | Weight | Technical / Cognitive Description |
|---|---|---|---|---|
| `chk-sender` | Sender Address & Domain Mismatch | Header Verification | 20 | The sender's friendly display name claims to be official (e.g., "Campus Registrar"), but the root domain in the `From:` or `Reply-To:` header is external, misspelled, or lookalike (e.g., `@campus-helpdesk.test` vs `@campus.edu`). |
| `chk-urgency` | Unusual Urgency or Threats | Psychological Manipulation | 20 | The message creates cognitive panic through strict deadlines (12h, 24h, 48h) threatening account termination, disciplinary action, or loss of registration. |
| `chk-attachments` | Unexpected or Suspicious Attachments | Payload Risk | 20 | Unsolicited archives (`.zip`, `.rar`), executable extensions (`.exe`, `.scr`, `.vbs`), or documents requesting users to "Enable Macros" or "Enable Content." |
| `chk-passwords` | Requests for Passwords or OTPs | Credential Harvesting | 25 | The message solicits passwords, PINs, student IDs, or prompts users to verbally disclose or input a 2-Factor Authentication (MFA) SMS code. |
| `chk-payments` | Unusual Payment or Overpayment Requests | Financial Fraud | 25 | Demands for wire transfers, gift cards, Zelle, cryptocurrency, or counterfeit check overpayment schemes directing students to wire funds to a "vendor." |
| `chk-links` | Suspicious Links or Mismatched Domains | Technical Deception | 20 | Hyperlinks where visible anchor text differs from the underlying destination URL, or URLs using non-standard TLDs, IP addresses, or URL shorteners. |
| `chk-grammar` | Grammar, Spelling, or Layout Inconsistencies | Content Quality | 10 | Unnatural syntax, mixed fonts, garbled character encodings, low-resolution logos, or awkward phrasing indicating machine translation or copied templates. |
| `chk-bypass` | Requests to Bypass Normal Procedures | Policy Circumvention | 15 | Directives to circumvent standard campus procurement workflows, maintain absolute secrecy from professors/advisors, or move discussion to personal chat apps. |

---

## 3. Threat Assessment Matrix

The interactive scoring engine calculates the cumulative risk score bound between 0 and 100:

$$\text{Threat Score} = \min\left(100, \sum_{\text{checked}} \text{Weight}_i\right)$$

### Risk Tiers

1. **Critical Phishing Threat (Score $\ge 50$ or Critical Flags Checked)**
   - *Trigger Conditions:* 3 or more total flags checked, or any check of `chk-passwords` or `chk-payments`.
   - *Assessment:* Severe likelihood of credential harvesting, advance-fee scam, or payload deployment.
   - *Remediation:* Absolute refusal of requests. Immediate reporting to university IT security.

2. **Suspicious — Needs Out-of-Band Verification (Score $15 - 49$)**
   - *Trigger Conditions:* 1 to 2 flags checked without critical credential/payment markers.
   - *Assessment:* Anomalous communication patterns requiring secondary verification.
   - *Remediation:* Do not interact with links or attachments. Contact the sender through a verified telephone number or bookmark.

3. **Baseline Safe (Score $0 - 14$)**
   - *Trigger Conditions:* 0 criteria checked.
   - *Assessment:* Low probability of overt social engineering.
   - *Remediation:* Maintain routine digital hygiene.

---

## 4. Tailored Remediation Guidance

The checklist generates contextual next steps tailored to the specific flags selected:

- If `chk-passwords` is checked: *"NEVER enter passwords or read back MFA codes on external sites. Legitimate IT staff never solicit passwords."*
- If `chk-payments` is checked: *"Refuse all wire, gift card, or check-deposit requests. Check your official student account ledger with the Bursar."*
- If `chk-links` is checked: *"Do not click links; inspect true URL destinations via mouse hover or visit the website via your saved bookmarks."*
- If `chk-attachments` is checked: *"Do not open unexpected attachments. Scan files with an updated antivirus or consult campus IT."*
- If `chk-urgency` is checked: *"Pause and take a breath: artificial urgency is engineered to disable rational thinking."*

---

## 5. Educational Disclaimer & Limitations

> [!IMPORTANT]
> **Defensive Educational Disclaimer:**
> An interactive checklist is a screening aid designed to promote structured human critical thinking. It is not an absolute cryptographic or behavioral proof of safety. Advanced adversaries may craft communications that exhibit zero overt red flags (e.g., zero-day spear phishing), while legitimate automated notices may occasionally exhibit formatting inconsistencies. Users must always combine checklist screening with independent out-of-band verification.

