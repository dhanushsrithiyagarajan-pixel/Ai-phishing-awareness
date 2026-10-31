"""
Rule-Based Phishing Detection & Heuristic Analysis Engine
Provides a transparent, explainable, and deterministic analyzer for educational demonstrations.
Analyzes messages across multiple cybersecurity indicator categories without requiring external paid APIs.
"""

import re
from typing import Dict, List, Any


class PhishingRuleEngine:
    def __init__(self):
        # Compiled regex patterns for behavioral and syntactic indicators
        # Format: (regex_pattern, name, category, explanation, weight, severity)

        self.rules = [
            # 1. Psychological Manipulation & Urgency
            (r"\b(urgent|urgently|immediately|immediate action|within \d{1,2} hours?|final notice|account termination|suspended|action required|promptly|without delay|terminate|deletion)\b",
             "Urgent or Coercive Language",
             "Psychological Manipulation & Urgency",
             "High urgency creates cognitive pressure, inducing victims to act hastily before verifying authenticity.",
             18, "Medium"),

            (r"\b(loss of access|account will be (?:deleted|disabled|terminated)|registration hold|permanent loss|disciplinary action)\b",
             "Punitive Account Consequences",
             "Psychological Manipulation & Urgency",
             "Threats of disciplinary or administrative penalties bypass rational skepticism by instilling fear.",
             22, "High"),

            # 2. Credential Harvesting & MFA Interception
            (r"\b(password|passcode|current password|verify credentials|confirm your password|submit your credentials|login details|pin|student id and password)\b",
             "Direct Credential Request",
             "Credential Harvesting",
             "Legitimate institutions, helpdesks, and service providers will never request passwords or login credentials via email or form links.",
             30, "Critical"),

            (r"\b(one-time (?:sms|code|passcode)|mfa|2fa|verification code|security code|push notification)\b",
             "Multi-Factor Authentication (MFA/OTP) Interception",
             "Credential Harvesting",
             "Requesting one-time passcodes indicates an attacker attempting to bypass second-factor authentication protections in real time.",
             28, "Critical"),

            # 3. Financial Fraud, Advance-Fee & Overpayment Schemes
            (r"\b(cashier'?s check|counterfeit check|overpayment|deposit (?:this|the|a) check)\b",
             "Fake Check / Overpayment Pretext",
             "Financial Fraud & Advance-Fee",
             "Counterfeit check schemes send a check and ask victims to wire back money before the check bounces.",
             28, "High"),

            (r"\b(wire transfer|wire the|wire remaining|gift cards?|zelle|venmo|western union|moneygram|processing fee|advance fee|refundable fee)\b",
             "Irreversible Payment or Wire Demand",
             "Financial Fraud & Advance-Fee",
             "Demands for wire transfers, gift cards, or peer-to-peer payment apps cannot be reversed once sent.",
             25, "High"),

            (r"(?:^|[^\w])(?:\$\s*\d+(?:\.\d{2})?/(?:hr|hour)|work from home \$\d+)",
             "Unusually High Student Wage Lure",
             "Social Engineering / Employment Fraud",
             "Unrealistically high hourly wages for flexible entry-level student work are designed to attract financially stressed applicants.",
             20, "Medium"),

            (r"\b(approved (?:it )?(?:equipment )?vendor|advance stipend|remote research assistant)\b",
             "Recruitment Scam Vendor Pretext",
             "Social Engineering / Employment Fraud",
             "Directing victims to an 'approved vendor' to purchase equipment with check funds is the core mechanism of job scams.",
             25, "High"),

            (r"\b(no interview required|no interview needed|immediate hire|immediate offer)\b",
             "Unverified Employment Offer",
             "Social Engineering / Employment Fraud",
             "Legitimate research positions and corporate roles require formal application and interviewing procedures.",
             22, "High"),

            (r"(?:^|[^\w])(?:\$\d{1,3}(?:,\d{3})*(?:\.\d{2})?|\b(?:tuition balance|overdue balance|remittance|disbursement|award|scholarship fund)\b)",
             "Financial Reference or Balance Claim",
             "Financial Fraud & Advance-Fee",
             "References to unapplied prizes, outstanding bursar balances, or unexpected stipends exploit financial anxiety or greed.",
             15, "Medium"),

            # 4. Parcel Delivery / Courier Smishing
            (r"\b(parcel|package|delivery|redelivery|courier|holding depot|undelivered|reschedule delivery|dispatch-notification|shipping address)\b",
             "Parcel Delivery / Smishing Lure",
             "Smishing & Delivery Fraud",
             "Delivery failure notices with fee links exploit expectations of online textbook deliveries to capture payment cards.",
             15, "Medium"),

            # 5. Technical & URL Deception
            (r"https?://[^\s/]*\.(?:test|xyz|top|buzz|click|club|work|link|ru|tk|ga|cf|gq|fake-[^\s/]*)[^\s]*",
             "Suspicious / Simulated Non-Standard Domain",
             "Technical & URL Deception",
             "Cybercriminals frequently register cheap or non-standard top-level domains, or use lookalike subdomains to masquerade as reputable entities.",
             25, "High"),

            (r"https?://\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(?::\d+)?(?:/[^\s]*)?",
             "Direct IP Address URL",
             "Technical & URL Deception",
             "Legitimate commercial and university websites utilize registered domain names with valid SSL/TLS certificates, not raw IP addresses.",
             25, "High"),

            (r"https?://(?:bit\.ly|tinyurl\.com|t\.co|is\.gd|cutt\.ly|goo\.gl)/[a-zA-Z0-9]+",
             "Shortened URL Service",
             "Technical & URL Deception",
             "URL shorteners conceal the true destination hostname, preventing users and basic email filters from inspecting the landing address.",
             20, "Medium"),

            (r"https?://[^\s<>\"']+",
             "Embedded External Hyperlink",
             "Technical & URL Deception",
             "External URLs can redirect users to deceptive credential-harvesting landing pages that clone trusted services.",
             10, "Medium"),

            # 6. Payload & Attachment Risks
            (r"\b\w+\.(?:exe|scr|vbs|bat|cmd|ps1|docm|xlsm|zip\.exe|pdf\.exe)\b",
             "Dangerous or Double File Extension",
             "Payload & Attachment Risk",
             "Executables or macro-enabled documents masquerading as harmless reports carry malicious payloads (ransomware, keyloggers).",
             28, "Critical"),

            (r"\b(attached file|open the attached|see attachment|download the attachment|enable macros|enable editing)\b",
             "Attachment Call to Action",
             "Payload & Attachment Risk",
             "Unsolicited prompts urging recipients to execute attachments or enable macros are common vectors for malware delivery.",
             15, "Medium")
        ]

        # Positive / Legitimate heuristics (reduce phishing score)
        self.legitimate_indicators = [
            (r"\b(canvas|blackboard|moodle|syllabus|office hours|science hall|turing hall|student union|registrar's office)\b",
             "Authentic Academic Coursework Context",
             "Consistent academic terminology aligning with standard university operations.",
             -14),
            (r"\b(will never ask for payment|never share your password|official campus sso|contact: \(\d{3}\))\b",
             "Defensive Security Hygiene / Official Warnings",
             "Official institutions frequently embed proactive fraud reminders advising students never to share credentials or payments.",
             -16),
            (r"@faculty\.example\.edu|@campus\.example\.edu",
             "Authenticated Institutional Sender Domain",
             "Sender domain matches verified internal university subdomains.",
             -15)
        ]

    def analyze(self, text: str, sender_header: str = "") -> Dict[str, Any]:
        """
        Executes a deterministic rule-based analysis of the provided text and optional sender header.
        Returns a structured dictionary containing classification, qualitative score, detected indicators,
        and safe recommended actions.
        """
        if not text or not text.strip():
            return {
                "classification": "Indeterminate",
                "risk_level": "None",
                "score": 0,
                "assessment_type": "Heuristic Rule-Based Engine (Demo Mode)",
                "summary": "No text provided for analysis.",
                "indicators": [],
                "positive_indicators": [],
                "safe_actions": ["Please paste or type an email message body or header to inspect."],
                "disclaimer": "This analysis is produced by a transparent heuristic rule-based engine for educational demonstration. AI/heuristic results are advisory and must be verified independently."
            }

        combined_text = f"{sender_header}\n{text}".strip()
        raw_score = 0
        detected_indicators = []
        positive_indicators = []
        applied_names = set()

        # 1. Match Threat Heuristics using re.finditer to capture full matches
        for pattern, name, category, explanation, weight, severity in self.rules:
            matches = [m.group(0).strip() for m in re.finditer(pattern, combined_text, flags=re.IGNORECASE)]
            if matches and name not in applied_names:
                applied_names.add(name)
                unique_snippets = list(dict.fromkeys(matches))[:3]
                raw_score += weight
                detected_indicators.append({
                    "name": name,
                    "category": category,
                    "severity": severity,
                    "weight": weight,
                    "matches": unique_snippets,
                    "explanation": explanation
                })

        # 2. Check Sender Header Discrepancies if present
        if sender_header:
            if re.search(r"\.test|\.fake-|\.ru|\.xyz|\.top|@.*fake", sender_header, re.IGNORECASE):
                if "Deceptive Sender Header" not in applied_names:
                    applied_names.add("Deceptive Sender Header")
                    raw_score += 25
                    detected_indicators.append({
                        "name": "Deceptive Sender Header",
                        "category": "Header Spoofing / Lookalike Domain",
                        "severity": "High",
                        "weight": 25,
                        "matches": [sender_header],
                        "explanation": "Sender address includes simulated deception, lookalike subdomains, or unauthenticated domain elements."
                    })

        # 3. Check Legitimate Signals
        for pattern, name, explanation, credit in self.legitimate_indicators:
            matches = [m.group(0).strip() for m in re.finditer(pattern, combined_text, flags=re.IGNORECASE)]
            if matches:
                unique_snippets = list(dict.fromkeys(matches))[:3]
                raw_score += credit  # credit is negative
                positive_indicators.append({
                    "name": name,
                    "matches": unique_snippets,
                    "explanation": explanation
                })

        # Bound score to [0, 100]
        final_score = max(0, min(100, raw_score))

        # Classification mapping
        # 1. Likely phishing
        # 2. Suspicious — needs verification
        # 3. Likely legitimate
        has_critical = any(i["severity"] == "Critical" for i in detected_indicators)
        high_severity_count = sum(1 for i in detected_indicators if i["severity"] in ("Critical", "High"))

        if final_score >= 60 or has_critical or high_severity_count >= 2:
            classification = "Likely phishing"
            risk_level = "High"
            qualitative = f"High Risk ({final_score}/100) — Significant phishing characteristics detected."
        elif final_score >= 20 or (final_score >= 15 and len(detected_indicators) >= 2):
            classification = "Suspicious — needs verification"
            risk_level = "Medium"
            qualitative = f"Moderate Risk ({final_score}/100) — Suspicious patterns present; requires secondary verification."
        else:
            classification = "Likely legitimate"
            risk_level = "Low"
            qualitative = f"Low Risk ({final_score}/100) — No dominant threat indicators detected in text."

        # Compile tailored safe recommended actions
        safe_actions = self._generate_safe_actions(classification, detected_indicators)

        return {
            "classification": classification,
            "risk_level": risk_level,
            "score": final_score,
            "qualitative_assessment": qualitative,
            "confidence_score": f"{final_score}% Heuristic Confidence",
            "assessment_type": "Transparent Heuristic Rule-Based Engine",
            "engine_mode": "demo_heuristic",
            "indicators": detected_indicators,
            "positive_indicators": positive_indicators,
            "safe_actions": safe_actions,
            "disclaimer": "Educational Advisory Notice: This classification is generated by an automated defensive heuristic model. AI and rule-based analyzers cannot guarantee 100% accuracy. Always verify unexpected communications using out-of-band institutional contacts."
        }

    def _generate_safe_actions(self, classification: str, indicators: List[Dict[str, Any]]) -> List[str]:
        actions = []
        if classification == "Likely phishing":
            actions.append("Do NOT click any hyperlinks, buttons, or shortened links in the message.")
            actions.append("Never submit passwords, student IDs, credit cards, or two-factor authorization codes.")
            actions.append("Do not open, download, or execute attached files, even if they look like invoices or PDFs.")
            actions.append("Forward the message as an attachment to your campus Information Security office (e.g., security@example.edu) or use your email client's 'Report Phishing' tool.")
            actions.append("If you already entered credentials or transferred funds, immediately change your university password from a separate device and contact campus IT and your bank.")
        elif classification == "Suspicious — needs verification":
            actions.append("Pause and verify: independently navigate to the official department website using a saved bookmark.")
            actions.append("Inspect the true sender header and full destination URLs by hovering your mouse without clicking.")
            actions.append("Contact the stated sender via a known, trusted directory phone number—do NOT reply to the email or call phone numbers written in the message.")
            actions.append("Consult your college helpdesk or academic advisor before taking requested actions.")
        else:
            actions.append("Message appears consistent with standard communication, but maintain standard digital vigilance.")
            actions.append("Confirm any academic schedule or room changes on your official LMS (Canvas / Blackboard / Moodle).")
            actions.append("Remember: institutional staff will never email you to request your password or personal payment.")

        return actions
