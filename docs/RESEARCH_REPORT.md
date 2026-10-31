# Cybersecurity Capstone Research Report: Analysis of Social Engineering in Higher Education and Defensive AI Architectures

**Project Title:** AI Phishing Awareness Campaign Kit  
**Research Lead:** Computer Science & Cybersecurity Capstone Initiative  
**Date of Publication:** October 2026  
**Authoritative Reference Standards:** NIST SP 800-177, NIST SP 800-61 Rev 2, NIST SP 800-63B, CISA Phishing Guidance, CERT-In Cybersecurity Guidelines, Verizon DBIR 2024.

---

## 1. Project Overview & Objectives

Higher education institutions occupy a uniquely vulnerable position in the global cybersecurity threat landscape. Unlike corporate enterprises, which enforce rigid perimeter boundaries, endpoint restrictions, and uniform device management, universities intentionally operate open network environments to facilitate cross-institutional research, visitor access, and intellectual freedom.

However, this structural openness, paired with annual turnover of approximately 25% of the student population, creates an expansive attack surface. College students frequently lack formal enterprise cybersecurity training, face intense academic deadlines, and operate under significant financial constraints. These characteristics make collegiate communities primary targets for social engineering, credential harvesting, advance-fee scams, and business email compromise (BEC).

### Core Objectives
1. **Threat Taxonomy Formulation:** Analyze and document the primary social engineering vectors specifically targeting undergraduate and graduate students.
2. **Defensive AI Engineering:** Compare the efficacy, latency, cost, and safety of Large Language Model (LLM) classifiers versus deterministic heuristic rule engines.
3. **Open-Access Campaign Kit Development:** Build an interactive, zero-cost, responsive web application that equips collegiate communities with automated message screening, empirical training scenarios, and practical behavioral defenses.

---

## 2. Common Phishing Techniques Targeting Higher Education

Based on empirical data from the Cybersecurity and Infrastructure Security Agency (CISA) and the 2024 Verizon Data Breach Investigations Report (DBIR), social engineering accounts for over 68% of initial network breaches involving human interaction. In educational environments, four primary vectors dominate:

### A. Credential Harvesting & Single Sign-On (SSO) Replication
Attackers recognize that university (.edu) credentials provide authenticated internal access and carry high email reputation scores. Adversaries deploy lookalike domains (e.g. `sso-portal.example.edu.fake-auth.test`) mirroring institution-specific login pages. By simulating "Account Termination Warnings" or "Mailbox Storage Limits," attackers capture student credentials and execute real-time Multi-Factor Authentication (MFA) relay attacks to bypass secondary security layers.

### B. Employment & Fake-Check Overpayment Scams
Student-directed recruitment fraud represents a critical financial vulnerability. Scammers scrape student resumes from open directories and dispatch unsolicited offers for remote research assistants, tutors, or administrative assistants paying $35 to $45 per hour. The attacker mails a counterfeit cashier's check (typically $2,500), directing the student to deposit it, retain $500, and immediately wire the remaining $2,000 to an "approved IT equipment vendor" via Zelle or wire transfer. When the fraudulent check eventually bounces weeks later under Regulation CC clearance rules, the student bears full legal and financial restitution.

### C. Package Delivery Smishing (SMS Phishing)
The widespread adoption of mobile devices among college students has catalyzed smishing campaigns. Attackers blast automated text messages alleging that a package delivery failed due to an incomplete street address. The message embeds a shortened URL (`bit.ly` or `tinyurl.com`) directing the student to pay a nominal $1.99 redelivery fee. Mobile browser address bars truncate long hostnames, preventing users from spotting malicious domains and allowing attackers to capture credit card numbers, CVVs, and billing addresses.

### D. Authority Impersonation & Faculty Gift Card Requests
Adversaries leverage the academic hierarchy by creating lookalike external email accounts (e.g., `dean.smith.faculty@gmail.com`) impersonating department heads or course instructors. The message urgently directs a student club treasurer or teaching assistant to purchase Apple, Google, or Amazon gift cards for an alleged visiting lecturer, demanding that the scratch-off claim codes be texted immediately.

---

## 3. Research Methodology

Our research methodology utilized a dual-track analytical framework:

```
┌────────────────────────────────────────────────────────┐
│               1. Authoritative Standards               │
│   CISA Advisories | NIST Guidelines | CERT-In Rules    │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│              2. AI Tooling Comparative Audit           │
│   Heuristic Rule Engines vs. Large Language Models     │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│            3. Empirical Sandbox Implementation         │
│   RFC 2606 Reserved Domains | Deterministic Scoring    │
└────────────────────────────────────────────────────────┘
```

1. **Source Ground Truth Verification:** We reviewed official advisories and technical standards from CISA, CERT-In, and NIST to establish baseline indicators of phishing attacks.
2. **AI Tooling Evaluation:** We conducted comparative evaluations of two AI research and classification methodologies:
   - Tool A: Cloud Large Language Model inference (Google Gemini 1.5 Flash / OpenAI GPT-4o-mini).
   - Tool B: Deterministic Heuristic Regex Rule Engine.
3. **Synthetic Dataset Construction:** To adhere to defensive ethics, we constructed eight synthetic training scenarios using reserved RFC 2606 top-level domains (`.test`, `.example`, `example.edu`), testing classification boundaries against both attack indicators and authentic academic communications.

---

## 4. Findings & Source Verification

All cybersecurity findings incorporated in this project were audited and verified against authoritative institutional sources:

| Topic / Finding | Authoritative Reference | Source URL & Access Date |
|---|---|---|
| **Multi-Factor Authentication Defense** | NIST Special Publication 800-63B: Digital Identity Guidelines (Authentication and Lifecycle Management) | https://pages.nist.gov/800-63-3/sp800-63b.html (Accessed: Oct 2026) |
| **Email Authentication (SPF, DKIM, DMARC)** | NIST Special Publication 800-177 Rev 1: Trustworthy Email | https://csrc.nist.gov/publications/detail/sp/800-177/rev-1/final (Accessed: Oct 2026) |
| **Phishing Triage & Incident Handling** | NIST Special Publication 800-61 Rev 2: Computer Security Incident Handling Guide | https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final (Accessed: Oct 2026) |
| **Academic Social Engineering Trends** | CISA: Phishing Infographic & Awareness Guidelines | https://www.cisa.gov/resources-tools/resources/phishing-infographic (Accessed: Oct 2026) |
| **Smishing & Advance-Fee Fraud Patterns** | CERT-In Security Guidelines & Consumer Advisories | https://www.cert-in.org.in (Accessed: Oct 2026) |
| **Higher Education Breach Statistics** | Verizon 2024 Data Breach Investigations Report (DBIR) | https://www.verizon.com/business/resources/reports/dbir/ (Accessed: Oct 2026) |

---

## 5. AI Tooling Comparison: Rule Engine vs. Large Language Model

To determine the optimal engineering architecture for a collegiate capstone project, we conducted a systematic comparative analysis across six operational dimensions:

| Evaluation Dimension | Deterministic Heuristic Rule Engine | Large Language Model (e.g. Gemini / OpenAI) | Architectural Decision |
|---|---|---|---|
| **Inference Latency** | $< 5\text{ milliseconds}$ (Local execution) | $800 - 2,500\text{ milliseconds}$ (Network roundtrip) | **Rule Engine Selected for Baseline** |
| **Cost & Dependencies** | **$0.00 (Zero paid APIs, 100% offline)** | Requires paid tier or API key management | **Rule Engine Default; AI Optional** |
| **Explainability** | **100% Deterministic & Auditable** (Exact regex matches shown) | Probabilistic; exact weight calculation opaque | **Rule Engine Superior for Education** |
| **Hallucination Risk** | **0% Risk** (Explicit pattern rules only) | Non-zero risk of hallucinating CVEs or rules | **Rule Engine Guarantees Safety** |
| **Contextual Nuance** | Limited to predefined syntactic/structural rules | High nuance across multilingual syntax | **LLM Superior for Novel Variations** |
| **Prompt Injection Risk** | **Immune** (Regex evaluates strings as literals) | Vulnerable to adversarial payload manipulation | **Rule Engine Immune to Jailbreaks** |

### Architectural Conclusion
Relying solely on external commercial LLM APIs creates critical vulnerabilities for academic capstone projects: network failures during presentations, expired API keys, and recurring billing costs. 

Consequently, we implemented a **Hybrid Defensive Architecture**:
- A robust, deterministic Heuristic Rule Engine serves as the core operational foundation, guaranteeing instantaneous, 100% offline functionality.
- An optional server-side LLM connector (supporting Gemini and OpenAI) is provided for advanced deployments, featuring strict JSON schema validation and automatic fallback to the rule engine if external services become unreachable.

---

## 6. Limitations & Ethical Considerations

1. **Advisory Scope:** Automated detection tools provide probabilistic or heuristic screening; they do not constitute cryptographic proof. A "Likely legitimate" verdict must never replace human verification.
2. **Defensive Boundary:** The kit does not provide offensive capabilities, credential interception infrastructure, or automated bulk mailing modules.
3. **Synthetic Constraints:** All training samples strictly use reserved example domains to eliminate any risk to production systems.

---

## 7. Conclusion

This research demonstrates that empowering college students against social engineering requires closing the gap between complex enterprise standards and practical student workflows. By combining transparent heuristic intelligence, empirical scenario analysis, and actionable verification habits, the AI Phishing Awareness Campaign Kit provides an open, robust, and cost-free defensive framework for higher education institutions.

