# Capstone Training Presentation Slide Deck & Presenter Script

This document provides the full slide-by-slide content, speaker scripts, presenter notes, and architectural walkthrough for the 7-slide capstone presentation of the **AI Phishing Awareness Campaign Kit**.

---

## Slide 1: Introduction to Phishing & Project Overview
- **Header Badge:** Cybersecurity Capstone Presentation
- **Slide Title:** AI Phishing Awareness Campaign Kit
- **Subtitle:** Defending College Students from Modern Social Engineering & Digital Scams

### Key Bullet Points
- College students are prime high-value targets due to high online activity, financial pressures, and frequent interactions with university systems.
- Traditional training focusing on poor spelling and Nigerian prince scams is dangerously obsolete in the era of generative AI.
- The AI Phishing Awareness Kit delivers a complete, beginner-friendly defensive ecosystem combining transparent heuristic analysis, experiential scenario analysis, and structured screening.
- 100% zero-cost and offline-capable: runs cleanly without requiring paid third-party API subscriptions.

### Presenter Notes & Script
> *"Good morning, faculty evaluators, advisors, and fellow students. Today, I am proud to present our cybersecurity capstone project: the AI Phishing Awareness Campaign Kit. Higher education campuses represent unique target environments—combining open networks, intense academic pressures, and students who are often living independently for the first time. Our objective was to engineer an accessible, transparent, and defensive educational platform that transforms passive students into active, discerning cyber defenders."*

---

## Slide 2: The Threat Landscape: Common Phishing Vectors
- **Header Badge:** Threat Intelligence
- **Slide Title:** How Cybercriminals Target Academic Environments
- **Subtitle:** Multi-Channel Attacks Across Email, SMS, Voice, and Social Media

### Key Bullet Points
- **Email & Spear Phishing:** Sophisticated messages spoofing professors, department chairs, or IT helpdesks to solicit credentials or emergency gift card purchases.
- **Employment & Internship Fraud:** High-paying remote research roles ($35+/hr) with no interview, deploying fake check overpayment schemes.
- **Smishing (SMS Phishing):** High-urgency delivery notifications exploiting textbook and online shopping habits to harvest credit card details.
- **Credential Harvesting & SSO Impersonation:** Pixel-perfect replicas of university Canvas, Blackboard, or Microsoft 365 Single Sign-On portals designed to intercept credentials and MFA tokens in real time.

### Presenter Notes & Script
> *"When we analyze the collegiate threat landscape, we observe that phishing is no longer a single isolated technique. As highlighted in CISA advisories and the Verizon DBIR, attackers utilize multi-channel social engineering. They exploit the specific anxieties of college life: the fear of losing course registrations, the urgency of paying tuition fees, and the desire for early-career internships. In this slide, we illustrate the four dominant attack vectors observed across universities."*

---

## Slide 3: Anatomy of a Phish: 6 Critical Red Flags
- **Header Badge:** Detection Heuristics
- **Slide Title:** The Anatomy of a Phish: 6 Critical Red Flags
- **Subtitle:** Heuristic Indicators That Expose Digital Deception

### Key Bullet Points
1. **Artificial Urgency & Fear:** Time-sensitive ultimatums ("Account deleted in 24 hours!") designed to trigger emotional reactions before rational analysis can intervene.
2. **Sender Domain Discrepancies:** Mismatched display names and deceptive lookalike subdomains (e.g. `campus.edu.fake-portal.test`).
3. **Unsolicited Credential Solicitation:** Explicit requests for passwords, student IDs, or Multi-Factor Authentication (MFA) one-time push codes.
4. **Advance-Fee & Check Schemes:** Demands for wire transfers, gift cards, or depositing an employer check and wiring back funds to a "vendor."
5. **URL & Link Obfuscation:** Hidden destination URLs, URL shorteners (`bit.ly`), direct IP links, or non-standard top-level domains.
6. **Dangerous File Payloads:** Hidden double extensions (`.pdf.exe`) and macro-enabled documents prompting users to "Enable Editing."

### Presenter Notes & Script
> *"At the heart of our awareness campaign is teaching students to recognize the anatomy of a phish. Attackers rely heavily on emotional coercion. When a message induces sudden panic or sudden excitement, that emotional surge itself is the primary red flag. We teach students to systematically evaluate six technical and behavioral markers rather than relying on gut feelings."*

---

## Slide 4: Fictional Case Studies: Campus Scenarios
- **Header Badge:** Case Studies
- **Slide Title:** Fictional Case Studies: College Scenarios
- **Subtitle:** Safe, Empirical Contrast of Deceptive vs. Legitimate Communications

### Key Bullet Points
- **Case Study 1 (Account Deletion):** Fake IT warning threatening course registration holds to capture student passwords.
- **Case Study 2 (Remote Internship):** Unsolicited $35/hr research assistant offer with a $2,500 cashier's check overpayment trap.
- **Case Study 3 (Package Smishing):** Courier delivery text claiming incomplete address and requesting a $1.99 redelivery fee.
- **Case Studies 7 & 8 (Legitimate Baselines):** Authentic CS midterm room change notice and career fair schedule highlighting genuine faculty domains and proactive fraud advisories.
- **Ethical Safeguards:** All scenarios use reserved RFC 2606 domains (`.test`, `.example`, `example.edu`) with zero live links or real brand names.

### Presenter Notes & Script
> *"To ensure experiential learning without risking campus systems, we engineered eight fictional training scenarios. Notice that we include two legitimate baselines alongside our phishing cases. Calibrating student discernment requires understanding what legitimate messages look like—such as an authentic professor announcement referencing Canvas—preventing unproductive paranoia while sharpening defensive vigilance."*

---

## Slide 5: System Architecture & Defensive Engineering
- **Header Badge:** System Design
- **Slide Title:** System Architecture & Defensive Engineering
- **Subtitle:** How the AI Phishing Awareness Kit Operates Under the Hood

### System Architecture Diagram
```
+-----------------------------------------------------------------------------------+
|                            USER INTERFACE LAYER (SPA)                             |
|   HTML5 Semantic Layout  |  CSS3 Dark Navy Design System  |  Vanilla JavaScript   |
|   - Dashboard Stats      |  - Phishing Analyzer UI        |  - Learning Center    |
|   - Training Viewer      |  - Red-Flag Checklist          |  - Interactive Quiz   |
+-----------------------------------------------------------------------------------+
                                         │
                                         ▼ (REST API / JSON)
+-----------------------------------------------------------------------------------+
|                           BACKEND CONTROLLER (FLASK)                              |
|   app.py: REST Endpoints (/api/analyze, /api/samples, /api/quiz, /api/status)     |
|   - Request Sanitization, Route Dispatch, Static Asset Delivery                   |
+-----------------------------------------------------------------------------------+
                                         │
                   ┌─────────────────────┴─────────────────────┐
                   ▼                                           ▼
+-------------------------------------+     +-------------------------------------+
|  TRANSPARENT HEURISTIC RULE ENGINE  |     |     OPTIONAL EXTERNAL AI CLIENT     |
|  (Default Demo Mode - 100% Offline) |     |     (Gemini 1.5 Flash / GPT-4o-mini)|
|  - Multi-Category Regex Matching    |     |     - Server-side API Key Handling  |
|  - Indicator Scoring & Weights      |     |     - Strict JSON Output Schema     |
|  - Positive Legitimacy Credits      |     |     - Automatic Safe Fallback       |
|  - Tailored Action Step Compiler    |     |                                     |
+-------------------------------------+     +-------------------------------------+
                   │                                           │
                   └─────────────────────┬─────────────────────┘
                                         ▼
+-----------------------------------------------------------------------------------+
|                              PERSISTENCE & STORAGE                                |
|   - Local JSON Data Files (/data/samples, /data/quiz, /data/modules, etc.)        |
|   - Browser localStorage (Quiz Scores, Completion Records, Privacy-Preserving)    |
+-----------------------------------------------------------------------------------+
```

### Key Technical Attributes
- **Frontend:** Lightweight, zero-dependency, responsive HTML5/CSS3 and Vanilla JS.
- **Backend:** Python Flask REST microservice with clean endpoint modularity.
- **Zero-Cost Rule Engine:** Deterministic, explainable regex pattern engine; zero external API dependency.
- **Secure Server-Side AI:** Optional connector with API keys strictly isolated to the server; safe local fallback.
- **Ethical Integrity:** Explicitly displays active engine mode; never pretends live AI is running when offline.

### Presenter Notes & Script
> *"Here we see our project architecture. A core tenet of our design was radical transparency. Unlike demo applications that simulate fake intelligence, our backend explicitly reports its operational mode. If no API key is provided, it runs our deterministic Heuristic Rule Engine, guaranteeing fast, explainable, and zero-cost demonstrations. When configured with an external model, it routes securely through server-side environment variables."*

---

## Slide 6: Interactive Defense: The 4-Step Verification Habit
- **Header Badge:** Practical Defense
- **Slide Title:** From Awareness to Reflexive Student Security Culture
- **Subtitle:** The 4-Step Practical Verification Protocol

### Key Bullet Points
- **Step 1 — Pause & Breathe:** Recognize that high emotional pressure (fear, urgency, excitement) is the attacker's weapon.
- **Step 2 — Inspect Without Clicking:** Check the true sender header and hover over hyperlinks to inspect root domains.
- **Step 3 — Out-of-Band Verification:** Navigate to official portals using saved browser bookmarks or call verified directory numbers.
- **Step 4 — Report to Campus InfoSec:** Forward suspicious communications to the university security operations center to protect peers.
- **Interactive Reinforcement:** Red-Flag Checklist and 10-Question Quiz transform theoretical rules into reflexive habits.

### Presenter Notes & Script
> *"Cybersecurity awareness is ineffective if it remains purely theoretical. Our platform focuses on habit formation. Through our interactive Red-Flag Checklist and 10-Question Quiz, students practice the four-step verification habit until it becomes an automatic cognitive reflex whenever they check their inboxes."*

---

## Slide 7: Conclusion & Capstone Deliverables
- **Header Badge:** Summary & Next Steps
- **Slide Title:** Conclusion & Capstone Deliverables
- **Subtitle:** Delivering Open, Scalable Cyber Defense for Academic Communities

### Key Bullet Points
- Delivered a complete, fully tested, responsive educational web application.
- Comprehensive capstone artifacts: ~1,000-word awareness article, print-ready poster, 5-post social campaign, research report, and test plan.
- Verified test suite: 14 passing automated unit tests, 100% classification match across all 8 training scenarios.
- Educational, ethical, and defensive: ready for open-source deployment across student orientations and campus security drives.
- **Thank you! We welcome questions and will now transition to the live system demonstration.**

### Presenter Notes & Script
> *"In conclusion, the AI Phishing Awareness Campaign Kit demonstrates that effective cybersecurity defense does not require expensive commercial subscriptions or complex software installations. By combining transparent heuristic intelligence with student-focused instructional design, we can equip collegiate communities with the tools to defend themselves. Thank you for your time, attention, and guidance. We are now delighted to answer your questions and demonstrate the live system."*

