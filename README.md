# AI Phishing Awareness Campaign Kit
### Cybersecurity Capstone Project | Interactive Defense & Training Platform

[![Python 3.9+](https://img.shields.io/badge/python-3.9+-blue.svg)](https://www.python.org/)
[![Flask 3.1+](https://img.shields.io/badge/flask-3.1+-green.svg)](https://palletsprojects.com/p/flask/)
[![License: Educational Capstone](https://img.shields.io/badge/license-Educational%20Capstone-navy.svg)](#)
[![Zero-Cost Ready](https://img.shields.io/badge/APIs-Zero%20Paid%20Cost%20Required-emerald.svg)](#)

---

## 1. Project Objective & Overview

The **AI Phishing Awareness Campaign Kit** is an interactive, defensive cybersecurity educational platform engineered specifically for college students, university staff, and academic communities. 

Collegiate environments present distinct security challenges: students manage academic schedules, access diverse campus portals, balance tuition obligations, and seek early-career internships while operating across open campus networks. Cybercriminals exploit these anxieties through artificial urgency, lookalike single sign-on (SSO) login portals, fake internship offers, and delivery smishing.

This kit provides a complete, modern, full-stack awareness toolkit that bridges theoretical cybersecurity standards (NIST SP 800-177, CISA Phishing Defense Guidelines, CERT-In Advisories) with practical student habit formation.

### Key Highlights
- **100% Zero-Cost & Offline Demonstration:** Operates out of the box using a transparent, explainable heuristic rule engine. No paid third-party API keys or subscriptions are required.
- **Optional Server-Side AI Integration:** Ready for external AI connectivity (Google Gemini or OpenAI) with secure server-side API key isolation and instant graceful fallback.
- **Defensive & Ethical by Design:** All scenarios utilize invented entities and reserved RFC 2606 test domains (`.test`, `example.edu`). Zero real targets, active exploits, or credential harvesting pages.
- **Responsive Cybersecurity UI:** Sleek dark navy dashboard design (`#070b14`), vibrant cyan accents, accessible contrast ratios, and fluid mobile/desktop layouts.

---

## 2. Completed Folder Structure

```
AI-Phishing-Awareness/
│
├── app.py                                   # Core Flask REST backend & route dispatcher
├── requirements.txt                         # Python dependencies (Flask, requests, dotenv)
├── .env.example                             # Configuration template for optional API keys
├── README.md                                # Master documentation & capstone demo guide
│
├── analyzer/                                # Phishing detection & evaluation package
│   ├── __init__.py                          # Package initialization
│   ├── rule_engine.py                       # Transparent, explainable heuristic rule engine
│   └── ai_client.py                         # Optional server-side LLM connector & fallback
│
├── data/                                    # Local JSON datasets for storage & curriculum
│   ├── training_samples.json                # 8 fictional campus training scenarios
│   ├── quiz_questions.json                  # 10 practical multiple-choice quiz questions
│   ├── learning_modules.json                # 8 core cybersecurity educational lessons
│   ├── checklist_items.json                 # 8 weighted red-flag screening criteria
│   ├── social_campaign.json                 # 5 ready-to-use social media awareness posts
│   └── presentation_data.json               # 7-slide capstone presentation dataset
│
├── static/                                  # Frontend assets
│   ├── css/
│   │   ├── style.css                        # Professional dark navy cybersecurity styles
│   │   └── poster.css                       # High-DPI print & PDF export stylesheet
│   └── js/
│       ├── app.js                           # Core SPA controller, tabs, search, toasts
│       ├── analyzer.js                      # Analyzer UI controller, sample loader, report copier
│       ├── quiz.js                          # 10-question quiz controller, scoring, localStorage
│       ├── checklist.js                     # Red-flag interactive scoring & recommendation engine
│       └── presentation.js                  # Interactive slide deck presenter with notes
│
├── templates/                               # HTML5 templates
│   ├── index.html                           # Single-page dashboard application
│   ├── poster.html                          # High-resolution printable cyber awareness poster
│   └── presentation.html                    # Fullscreen presentation slide deck viewer
│
├── docs/                                    # Capstone research & documentation deliverables
│   ├── AWARENESS_ARTICLE.md                 # ~1,000-word comprehensive awareness article
│   ├── TRAINING_SAMPLES.md                  # Complete documentation of all 8 scenarios
│   ├── RED_FLAG_CHECKLIST.md                # Interactive checklist evaluation matrix
│   ├── SOCIAL_MEDIA_CAMPAIGN.md             # 5 social posts, visual briefs, poster specs
│   ├── QUIZ_AND_ANSWER_KEY.md               # 10 questions, choices, answers, and rationales
│   ├── PRESENTATION_SLIDES.md               # 7-slide presentation script & presenter notes
│   ├── AUTOMATION_PLAN.md                   # Campaign automation plan (Manual + Zapier/Make)
│   ├── TEST_PLAN_AND_VERIFICATION_REPORT.md  # Comprehensive test matrix & verified results
│   ├── AI_PROMPT_LIBRARY.md                 # Documented AI prompts, purposes, and checks
│   ├── RESEARCH_REPORT.md                   # NIST/CISA/CERT-In backed research report
│   └── ETHICAL_CONSIDERATIONS.md            # Ethical charter, defensive boundaries, safety controls
│
└── tests/                                   # Automated test suite
    └── test_analyzer.py                     # Unit & integration tests for analyzer & API
```

---

## 3. Implemented Features & Deliverables

### A. Home Dashboard
- Real-time statistics counters for training samples (8), awareness modules (8), local quiz score, and offline availability.
- Quick-access launcher cards to all core modules.
- Prominent educational disclaimer banner.
- Live engine status badge displaying active operating mode (`Demo Heuristic Mode` or `Live AI`).

### B. AI Phishing Message Analyzer
- Text area supporting full email bodies, headers, or suspicious text messages.
- Quick-loader dropdown to populate any of the 8 training scenarios with a single click.
- 3-tier classification output:
  1. **Likely phishing** (High Risk)
  2. **Suspicious — needs verification** (Medium Risk)
  3. **Likely legitimate** (Low Risk)
- Multi-factor indicator detection: artificial urgency, direct password requests, one-time passcode (OTP) theft, counterfeit check schemes, wire/gift card demands, delivery smishing lures, lookalike subdomains, direct IP links, URL shorteners, and dangerous double extensions (`.pdf.exe`).
- Positive legitimacy credits recognizing authentic academic LMS terms (Canvas, Blackboard) and authenticated faculty domains (`@faculty.example.edu`).
- Tailored safe recommended actions.
- 1-click "Copy Analysis Report" button for student incident reports.
- Clear transparency banner: explicitly declares whether results were produced by the Transparent Heuristic Rule Engine or a Live AI Provider.

### C. Phishing Awareness Learning Center
- 8 structured lessons covering:
  1. Email Phishing Fundamentals
  2. Spear Phishing & Targeted Attacks
  3. Smishing (SMS) & Vishing (Voice) Scams
  4. Business Email Compromise (BEC)
  5. Fake Job & Internship Offers
  6. Malicious Attachments & Trojan Files
  7. Credential Harvesting & Password Theft
  8. Social Engineering & Psychological Manipulation
- Dynamic search and filter input for immediate keyword lookups.
- Real-world campus scenario breakdown and prevention tips for every module.

### D. Eight Fictional Training Samples
- 8 empirical scenarios with clear difficulty levels and categories:
  - Sample 1: Fake College Account Suspension Warning (`Likely phishing`)
  - Sample 2: Unsolicited International Merit Scholarship Offer (`Likely phishing`)
  - Sample 3: High-Paying Remote Internship with Check Deposit (`Likely phishing`)
  - Sample 4: Urgent Package Delivery Rescheduling SMS/Email (`Suspicious — needs verification`)
  - Sample 5: Security Alert: Fraudulent Charge on Bank Card (`Likely phishing`)
  - Sample 6: Urgent Student Tuition Remittance Overdue Notice (`Likely phishing`)
  - Sample 7: CS101 Midterm Exam Room Change Announcement (`Likely legitimate`)
  - Sample 8: Campus Career Services Placement Drive Schedule (`Likely legitimate`)
- Direct "Load into Analyzer →" button on each scenario card.
- Deep-dive metadata view showing headers, body, red flags, pedagogical explanation, and safe action.

### E. Interactive Red-Flag Checklist
- 8 weighted checkpoints covering sender mismatches, artificial urgency, unexpected attachments, password/OTP requests, unusual payments, suspicious links, grammar inconsistencies, and procedural bypass requests.
- Real-time dynamic threat score calculation (0 to 100) and risk level tiering.
- Tailored next steps generated based on the specific checkboxes selected.
- Educational disclaimer confirming checklists are screening aids, not proofs of safety.

### F. Awareness Article (~1,000 Words)
- Complete, publication-ready educational article titled: *"Don't Take the Bait: The College Student's Definitive Survival Guide to Phishing and Digital Deception"*.
- Covers cognitive triggers, SSO credential harvesting, check scams, smishing, domain inspection, the HTTPS padlock fallacy, post-click emergency triage, and campus security culture.

### G. Social Media Awareness Campaign & Poster
- 5 ready-to-use social posts with short headlines, awareness messages, safety tips, hashtags, visual concept briefs, and 1-click "Copy Post" buttons.
- Dedicated printable cybersecurity awareness poster at route `/poster` optimized with `@media print` for clean A4 PDF export.

### H. 10-Question Multiple-Choice Quiz
- 10 practical questions evaluating practical defense instincts across domains, MFA, check scams, smishing, double extensions, and quishing (QR phishing).
- 4 options per question with immediate feedback and pedagogical explanations.
- Score percentage calculation with proficiency ranking badges:
  - 90–100%: Cybersecurity Champion
  - 70–80%: Security Conscious Defender
  - 50–60%: Emerging Awareness
  - < 50%: Vulnerable to Social Engineering
- Local score persistence using browser `localStorage` and stat reflection on the Home Dashboard.
- Retake button and comprehensive question-by-question review.

### I. Training Presentation & Reports Viewer
- 7-slide interactive presentation viewer accessible within the dashboard and in full-screen mode at `/presentation`.
- Interactive slide navigation via buttons, keyboard Arrow keys, and Spacebar.
- Toggleable speaker notes and presenter script for every slide.
- In-app tab viewer for all capstone deliverables: Awareness Article, Research Report, Test Plan, Automation Strategy, AI Prompt Library, and Ethical Considerations.

---

## 4. Installation & Running Instructions

### Prerequisites
- Python 3.9, 3.10, 3.11, or 3.12 installed on your system.
- Standard web browser (Chrome, Edge, Firefox, Safari).

### Step 1: Clone or Navigate to the Project Directory
```powershell
cd c:\Users\Admin\OneDrive\Desktop\AI-Phishing-Awareness
```

### Step 2: Install Dependencies
Install the lightweight requirements (Flask, requests, python-dotenv):
```powershell
pip install -r requirements.txt
```

### Step 3: (Optional) Configure External AI Provider
*Note: The application operates completely out of the box in Demo Heuristic Mode without an API key!*

If you wish to test with an optional live LLM provider, copy `.env.example` to `.env`:
```powershell
cp .env.example .env
```
Open `.env` and set:
```env
AI_PROVIDER=gemini
GEMINI_API_KEY=your_gemini_api_key_here
```
*(Or set `AI_PROVIDER=openai` and `OPENAI_API_KEY=your_key`)*.

### Step 4: Run the Application
```powershell
python app.py
```

### Step 5: Access the Web Application
Open your browser and navigate to:
- **Main Dashboard:** [http://127.0.0.1:5000/](http://127.0.0.1:5000/)
- **Printable Awareness Poster:** [http://127.0.0.1:5000/poster](http://127.0.0.1:5000/poster)
- **Fullscreen Slide Presentation:** [http://127.0.0.1:5000/presentation](http://127.0.0.1:5000/presentation)

---

## 5. Automated Testing & Verification Results

The application includes an automated test suite verifying both the heuristic detection engine and all Flask web/API endpoints.

### Running the Test Suite
```powershell
python -m unittest tests/test_analyzer.py
```

### Execution Results
```text
..............
----------------------------------------------------------------------
Ran 14 tests in 0.051s

OK
```

### Verified Test Cases
1. `test_empty_message`: Handled gracefully with zero score.
2. `test_obvious_phishing_credential_theft`: Correctly flagged as `Likely phishing` (Score $\ge 80$).
3. `test_job_scam_fake_check`: Correctly flagged as `Likely phishing` with fake check and wire indicators.
4. `test_suspicious_delivery_smishing`: Correctly flagged as `Suspicious — needs verification`.
5. `test_legitimate_course_announcement`: Correctly classified as `Likely legitimate` (Score 0).
6. `test_legitimate_campus_placement_notice`: Correctly classified as `Likely legitimate` (Score 0).
7. `test_index_route`: Returns HTTP 200 with complete dashboard markup.
8. `test_poster_route`: Returns HTTP 200 with printable poster DOM.
9. `test_presentation_route`: Returns HTTP 200 with slide deck DOM.
10. `test_api_status`: Returns valid JSON indicating engine mode and provider.
11. `test_api_samples`: Returns exactly 8 fictional training scenarios.
12. `test_api_quiz`: Returns exactly 10 questions with 4 options each.
13. `test_api_analyze_valid`: Processes message text and returns structured analysis JSON.
14. `test_api_analyze_empty`: Returns HTTP 400 error validation.

All 8 fictional training scenarios in `data/training_samples.json` achieve a **100% classification match** against expected risk tiers.

---

## 6. Known Limitations

1. **Advisory Scope:** The detection engine is a defensive educational screening aid. It does not replace institutional out-of-band verification.
2. **Regex Syntactic Boundaries:** While deterministic and zero-cost, regex rules depend on recognizable patterns. Novel adversarial phrasing or multi-lingual homoglyphs may require augmenting with the optional server-side LLM connector.
3. **Simulated Training Domains:** All scenarios use reserved RFC 2606 test domains (`.test`, `example.edu`) to ensure zero operational risk to live systems.

---

## 7. Step-by-Step College Presentation Demonstration Guide

Follow this 5-minute structured walk-through during your academic evaluation or presentation:

### Part 1: Introduction (Slide Deck) — 1 Minute
1. Navigate to [http://127.0.0.1:5000/presentation](http://127.0.0.1:5000/presentation) or open the **Project Reports** tab.
2. Advance through Slides 1–3 to introduce the problem: why college students are premier targets for social engineering.
3. Point out the navbar badge: *"Our system operates in Demo Heuristic Mode, guaranteeing zero-cost, zero-latency demonstration without paid external dependencies."*

### Part 2: Phishing Analyzer Demonstration — 1.5 Minutes
1. Switch to the **Phishing Analyzer** tab.
2. Open the **"Load a Training Sample"** dropdown and select **"Fake College Account Warning"**.
3. Click **"Analyze Message"**.
4. Highlight the output:
   - **Classification:** `Likely Phishing` (Score: 88/100, High Risk).
   - Show the detected indicators: *Deceptive Sender Header*, *Direct Credential Request*, *Artificial Urgency*.
   - Point out the safe recommended actions and the copy report button.
5. Next, load **"Legitimate Class Announcement"** and click **"Analyze Message"**.
6. Show how the engine awards positive legitimacy credits for faculty domains and Canvas LMS references, correctly classifying it as **Likely Legitimate** (Score: 0).

### Part 3: Interactive Red-Flag Checklist — 1 Minute
1. Switch to the **Red-Flag Checklist** tab.
2. Check off *"Requests for Passwords, PINs, or One-Time Passcodes (OTP)"* and *"Unusual Urgency, Panic, or Ultimatums"*.
3. Show how the summary card dynamically updates to **CRITICAL PHISHING RISK** and provides tailored next steps.
4. Highlight the disclaimer that the checklist promotes cognitive discipline rather than automated certainty.

### Part 4: Knowledge Quiz & Poster — 1 Minute
1. Switch to the **Quiz** tab and answer 2–3 questions to demonstrate the interactive options and immediate explanations.
2. Show how scores are calculated and saved to `localStorage`.
3. Open the **Awareness Campaign** tab and click **"Open Full Poster / Print"** to display the clean, print-optimized cybersecurity poster.

### Part 5: Capstone Deliverables & Architecture — 30 Seconds
1. Open the **Project Reports** tab and show the research report, ~1,000-word awareness article, test matrix, and automation workflow.
2. Conclude the demonstration and invite questions from the evaluation committee.

---

## 8. License & Ethical Disclaimer

Developed for academic capstone presentation and educational training. Fictional scenarios are generated strictly for defensive awareness under RFC 2606 guidelines. Real-world verification must always be performed through authenticated institutional contacts.

