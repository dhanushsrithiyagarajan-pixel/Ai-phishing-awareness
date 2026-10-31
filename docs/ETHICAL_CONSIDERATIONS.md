# Ethical Charter, Safety Boundaries & System Limitations

This document articulates the ethical charter, safety controls, defensive boundaries, and known limitations governing the **AI Phishing Awareness Campaign Kit**.

---

## 1. Ethical Charter & Defensive Mandate

The primary purpose of the AI Phishing Awareness Campaign Kit is to provide defensive cybersecurity education, increase threat literacy, and foster resilient online habits among college students and university personnel. 

This project adheres strictly to ethical standards established by the ACM Code of Ethics, the IEEE Code of Conduct, and university academic integrity policies. Under no circumstances may this application or its underlying components be adapted, modified, or deployed for offensive cyber operations, unauthorized monitoring, or deceptive credential harvesting.

---

## 2. Technical Safety Boundaries & Prohibitions

To ensure zero risk to campus networks, students, and third-party organizations, the following technical safeguards are built directly into the codebase:

1. **No Weaponized Payloads or Exploits:** The codebase contains zero executable malware, exploit payloads, malicious macros, or tracking beacons. All file extension examples (e.g. `.pdf.exe`) are static strings used strictly for illustrative training.
2. **Strict Use of Reserved Example Domains:** All training scenarios, sender headers, and sample links utilize reserved RFC 2606 and RFC 6761 domains:
   - Top-Level Domains: `.test`, `.example`, `.invalid`, `.localhost`.
   - Second-Level Domains: `example.com`, `example.edu`, `example.org`, `example.net`.
   - No real commercial brand logos, active corporate domains, or university mailboxes are spoofed.
3. **No Deceptive Credential-Harvesting Portals:** The application does not host fake login interfaces designed to capture credentials. The Analyzer and Checklist evaluate message text submitted by the user; they do not collect, transmit, or store user credentials.
4. **No Mass Email Dispatch / SMTP Infrastructure:** The project contains no outbound email sending capability, spam relays, or targeting infrastructure.
5. **No Unauthorized Scanning:** The analyzer performs passive, local pattern matching on text supplied directly by the user. It does not perform active network port scanning, DNS probing, or server fingerprinting against external hosts.

---

## 3. Privacy & Data Handling Safeguards

- **Local Storage by Default:** User quiz scores and performance metrics are stored exclusively in the user's browser `localStorage`. No personal data, student identities, or assessment logs are transmitted to external telemetry servers.
- **Server-Side API Key Isolation:** If optional external AI providers (Google Gemini or OpenAI) are configured, API keys are managed strictly server-side via environment variables (`.env`). Client-side code never exposes API tokens or transmits them across web requests.
- **Ephemeral Analysis:** Text submitted to the Phishing Analyzer is evaluated in memory and discarded upon response completion. No user-submitted email messages are persisted to server disk logs.

---

## 4. Known Technical Limitations & Honest Disclaimers

1. **Heuristic & Probabilistic Approximation:** No automated tool—whether powered by heuristic regex engines or advanced generative AI—can guarantee 100% detection accuracy. Adversaries continuously adapt phrasing and infrastructure.
2. **Advisory Scope:** Results returned by the Analyzer and Red-Flag Checklist are defensive recommendations. A classification of "Likely legitimate" does not guarantee that a message is completely benign; students must always exercise independent critical judgment.
3. **Regex Syntactic Boundaries:** While the transparent heuristic rule engine provides zero-latency, explainable analysis, it relies on pattern matching. Highly nuanced, multi-lingual, or obfuscated unicode homoglyph attacks may bypass basic rule boundaries without external AI model augmentation.

---

## 5. Academic & Educational Attribution

This project is submitted in partial fulfillment of requirements for academic cybersecurity capstone evaluation. All intellectual references to CISA, CERT-In, and NIST standards are cited strictly for educational purposes under fair use doctrine.

