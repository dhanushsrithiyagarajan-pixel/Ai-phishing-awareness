# AI Prompt Engineering Library & Verification Protocol

This library documents all standardized prompts developed and utilized across the **AI Phishing Awareness Campaign Kit** for generating the research summary, training samples, awareness article, social campaign, quiz questions, and presentation slides. Each entry records the prompt's operational purpose, parameter constraints, and the factual verification methods applied to validate the output.

---

## Prompt 1: Defensive Research Summarization & Source Verification

- **Target Deliverable:** Research Report & Threat Taxonomy (`docs/RESEARCH_REPORT.md`)
- **Operational Purpose:** Synthesizes authoritative threat intelligence from government standards (CISA, NIST, CERT-In) and industry breach reports (Verizon DBIR) regarding collegiate social engineering vectors.

### Prompt Text
```text
Role: Senior Cyber Threat Intelligence Analyst
Task: Conduct a structured threat synthesis on phishing and social engineering vectors targeting higher education institutions and college students.

Reference Ground Truth:
- NIST SP 800-177 (Trustworthy Email) and NIST SP 800-61 Rev 2.
- CISA Phishing Awareness & Defense Guidelines.
- CERT-In Security Guidelines for End-Users.
- Verizon 2024 Data Breach Investigations Report (DBIR) higher education findings.

Output Requirements:
1. Identify the 4 most prevalent social engineering pretexts targeting undergraduate students.
2. Contrast heuristic rule-based detection vs. Large Language Model (LLM) classification, evaluating latency, explainability, hallucination risks, and API costs.
3. Formulate architectural guidelines for a hybrid, zero-cost defensive awareness application.
4. Strictly avoid invented statistics or fabricated academic citations.
```

### Verification & Quality Control Method
- **Method:** Factual cross-referencing against primary source publications.
- **Verification Details:** Confirmed NIST SP 800-177 recommendations regarding SPF/DKIM/DMARC email authentication; confirmed CISA recommendations regarding student financial and internship scam patterns.

---

## Prompt 2: Fictional Campus Training Scenario Generation

- **Target Deliverable:** Training Samples Dataset (`data/training_samples.json` and `docs/TRAINING_SAMPLES.md`)
- **Operational Purpose:** Generates realistic, high-fidelity phishing and legitimate email scenarios demonstrating specific threat vectors while maintaining strict ethical safety boundaries.

### Prompt Text
```text
Role: Defensive Cybersecurity Awareness Curriculum Designer
Task: Generate a realistic, clearly labelled fictional communication scenario for college student awareness training.

Scenario Parameters:
- Vector: [Insert Scenario: e.g. Fake IT Warning / Scholarship Scam / Remote Job Scam / Legitimate Class Notice]
- Safety Boundary: Strictly use reserved RFC 2606 / RFC 6761 domains (.test, .example, example.edu).
- Never use real company trademarks, living individuals, or active exploit payloads.

Required Output Schema (JSON):
{
  "title": "Clear descriptive title",
  "scenario": "Short category descriptor",
  "expected_classification": "Likely phishing" | "Suspicious — needs verification" | "Likely legitimate",
  "risk_level": "High" | "Medium" | "Low",
  "sender": "Display Name <mailbox@domain.test>",
  "subject": "Email subject line",
  "body": "Realistic message text containing 3-5 specific cognitive red flags (or legitimate traits)",
  "warning_signs": ["List of distinct red flags"],
  "explanation": "Clear pedagogical explanation of why the message is malicious or benign",
  "safe_action": "Specific, actionable defensive step for the student"
}
```

### Verification & Quality Control Method
- **Method:** RFC conformance check and automated heuristic parsing.
- **Verification Details:** Ran every generated scenario through the regex test harness (`tests/test_analyzer.py`) to confirm that all expected red flags were accurately extracted and that classifications matched expected risk tiers with 100% accuracy.

---

## Prompt 3: College Awareness Article Drafting

- **Target Deliverable:** Comprehensive Awareness Article (`docs/AWARENESS_ARTICLE.md`)
- **Operational Purpose:** Produces an engaging, ~1,000-word educational article formatted for student portals, campus newspapers, or cybersecurity orientation drives.

### Prompt Text
```text
Role: Principal Cybersecurity Educator & Technical Writer
Task: Author a comprehensive, accessible 1,000-word cybersecurity awareness article titled "Don't Take the Bait: The College Student's Definitive Survival Guide to Phishing and Digital Deception".

Target Readership: First-year and continuing university undergraduate students with non-technical backgrounds.

Content Structure:
1. Executive Introduction: Why college students are prime targets (financial stress, campus portals, job hunting).
2. The Psychology of Social Engineering: Urgency, panic, authority, and unsolicited rewards.
3. Four Dominant Campus Threats:
   - Credential Harvesting & Fake SSO
   - Remote Internship & Fake-Check Overpayment Scams
   - Parcel Delivery Smishing (SMS)
   - Spear Phishing & Executive Gift Card Scams
4. The 4-Step Practical Verification Protocol (Sender headers, hovering URLs, debunking the HTTPS padlock myth, out-of-band verification).
5. Post-Incident Triage: Exact emergency steps if a student clicked a link or entered credentials.
6. Conclusion: Fostering a supportive campus defense culture.

Tone Constraints: Professional, supportive, practical, empowering (avoid technical elitism or victim-blaming).
```

### Verification & Quality Control Method
- **Method:** Word count verification, readability scoring, and factual accuracy check.
- **Verification Details:** Verified word count (~1,050 words). Audited post-incident triage steps against NIST SP 800-61 incident response principles (containment, password reset, session termination, IT escalation).

---

## Prompt 4: Social Media Campaign Content Generation

- **Target Deliverable:** Social Posts & Campaign Visuals (`data/social_campaign.json` and `docs/SOCIAL_MEDIA_CAMPAIGN.md`)
- **Operational Purpose:** Drafts ready-to-publish social media copy and creative visual briefs for student communication channels.

### Prompt Text
```text
Role: Cybersecurity Social Media Communications Specialist
Task: Create five high-impact, educational social media posts for college students covering core phishing vectors:
1. Artificial urgency and countdown ultimatums.
2. Fake internship and check overpayment scams.
3. The HTTPS / padlock myth.
4. Parcel delivery smishing text messages.
5. The 3-step golden defense rule.

Format for each post:
- Attention-grabbing headline with high-contrast emoji.
- Concise 2-3 sentence awareness message in relatable student language.
- Actionable, memorable safety tip.
- 4-5 relevant cybersecurity hashtags.
- Detailed visual concept brief for graphic designers or poster illustration.
```

### Verification & Quality Control Method
- **Method:** Message clarity and engagement audit.
- **Verification Details:** Checked that each post contains concrete actionable advice rather than vague platitudes; ensured visual concepts are reproducible in CSS or student graphic design software.

---

## Prompt 5: Pedagogical Multiple-Choice Quiz Development

- **Target Deliverable:** Quiz Questions Dataset (`data/quiz_questions.json` and `docs/QUIZ_AND_ANSWER_KEY.md`)
- **Operational Purpose:** Formulates rigorous, practical multiple-choice questions testing hands-on discernment rather than rote memorization.

### Prompt Text
```text
Role: Pedagogical Cyber Defense Assessment Specialist
Task: Write 10 multiple-choice questions evaluating student practical phishing awareness.

Pedagogical Criteria:
- Focus on real-world scenarios: domain parsing, MFA push handling, check scams, smishing, double extensions, post-click triage.
- 4 options per question (1 clear correct answer, 3 plausible distractors reflecting common student misconceptions).
- Comprehensive pedagogical rationale explaining why the correct answer is secure and why the distractors are dangerous.
- No trick questions; test practical behavioral instincts.
```

### Verification & Quality Control Method
- **Method:** Answer key validation and cognitive difficulty review.
- **Verification Details:** Verified that each distractor reflects documented behavioral failure modes (e.g. trusting the browser padlock, believing Regulation CC check availability implies check authenticity).

---

## Prompt 6: Capstone Slide Deck Scripting

- **Target Deliverable:** Presentation Slides & Script (`data/presentation_data.json` and `docs/PRESENTATION_SLIDES.md`)
- **Operational Purpose:** Generates structured slide bullet points, presenter speaking scripts, and architecture explanations for an academic capstone evaluation.

### Prompt Text
```text
Role: Computer Science Capstone Lead Presenter
Task: Author content and presenter notes for a 7-slide academic capstone presentation on the "AI Phishing Awareness Campaign Kit".

Slide Outline:
1. Introduction to phishing & collegiate threat context.
2. Common attack techniques targeting students.
3. The anatomy of a phish (6 critical red flags).
4. Fictional case studies (contrasting phishing with legitimate baselines).
5. System architecture & defensive engineering (Flask REST API, heuristic engine, optional AI).
6. Practical defense habits (4-step protocol).
7. Conclusion & capstone deliverables.

Output Structure:
For each slide: Header Badge, Title, Subtitle, 3-4 Concise Bullet Points, and a complete Presenter Script / Speaker Notes paragraph.
```

### Verification & Quality Control Method
- **Method:** Timing and presentation flow review.
- **Verification Details:** Confirmed that the presentation flows logically from problem definition to architectural demonstration and conclusion within a standard 10–12 minute academic evaluation window.

