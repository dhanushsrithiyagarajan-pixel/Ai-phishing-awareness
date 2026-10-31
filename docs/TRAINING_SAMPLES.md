# Fictional Training Samples Documentation

This document provides complete documentation for the eight fictional training scenarios featured in the **AI Phishing Awareness Campaign Kit**.

All organizations, sender addresses, hostnames, and URLs are entirely fictional and utilize reserved RFC 2606 / RFC 6761 domains (`.test`, `.example`, `example.edu`, `example.com`, `example.org`, `example.net`). No real targets, active exploits, living individuals, or legitimate brand trademarks are used.

---

## Scenario Summary Matrix

| ID | Title / Scenario | Expected Classification | Assessed Risk | Primary Deception Technique |
|---|---|---|---|---|
| Sample 1 | Fake College Account Warning | Likely phishing | High | Cognitive panic, credential harvesting, lookalike subdomain |
| Sample 2 | Suspicious Scholarship Message | Likely phishing | High | Advance-fee scam, gift card demand, unapplied award |
| Sample 3 | Fake Internship Offer | Likely phishing | High | Fake check overpayment scam, recruitment fraud, wire demand |
| Sample 4 | Unexpected Parcel Notification | Suspicious — needs verification | Medium | Smishing lure, small card harvesting fee ($1.99), URL link |
| Sample 5 | Impersonation of a Bank | Likely phishing | High | Panic transaction pretext, phone vishing & OTP code theft |
| Sample 6 | Urgent Tuition Payment Request | Likely phishing | High | Urgent deadline ultimatum, fake bursar gateway domain |
| Sample 7 | CS101 Room Change Announcement | Likely legitimate | Low | Authentic faculty address, Canvas reference, zero pressure |
| Sample 8 | Campus Placement Drive Schedule | Likely legitimate | Low | Verified campus SSO link, explicit anti-fraud reminder |

---

## Sample 1: Fake College Account Warning

- **Scenario Identifier:** `sample-1`
- **Expected Classification:** Likely phishing
- **Assessed Risk Level:** High
- **Sender Header:** `Campus IT Support <admin@security-verification-example.edu.fake-portal.test>`
- **Subject:** `URGENT: Your Campus Account Will Be Terminated Within 24 Hours`

### Full Message Body
```text
Dear Student,

Our system detected multiple unauthorized login attempts to your college portal from an unknown location. To prevent immediate account deletion and disruption of your course registrations, you must verify your identity within 24 hours.

Please click the secure verification link below and submit your campus student ID, date of birth, and current password:
https://auth.example-campus-portal.test/login/verify-credentials

Failure to complete this verification will result in permanent loss of campus email and student portal access.

Regards,
Campus Information Security Helpdesk
Central University Campus
```

### Warning Signs & Red Flags
1. **Artificial Urgency:** Demands action within 24 hours under threat of immediate account termination.
2. **Subdomain Masking:** The sender and link domain (`.fake-portal.test`) visually embeds `example.edu` as a deceptive subdomain prefix to mislead recipients.
3. **Explicit Credential Solicitation:** Solicits current passwords and sensitive identity attributes (student ID, date of birth).
4. **Punitive Threats:** Threatens academic disruption (loss of course registration and portal access).

### Pedagogical Explanation
Real institutional IT departments never require users to submit passwords through web form links and never issue 24-hour account deletion ultimatums without prior formal administrative notices. Attackers rely on panic to bypass logical verification.

### Recommended Safe Action
Do not click the link or supply credentials. Forward the message as an attachment to your real college IT security office (e.g., `security@example.edu`) or click the "Report Phishing" button in your email client.

---

## Sample 2: Suspicious Scholarship Message

- **Scenario Identifier:** `sample-2`
- **Expected Classification:** Likely phishing
- **Assessed Risk Level:** High
- **Sender Header:** `Global Education Foundation <awards@apex-merit-scholarship.example.org>`
- **Subject:** `Congratulations! You have been selected for a $5,000 Academic Excellence Award`

### Full Message Body
```text
Dear Applicant,

We are pleased to inform you that your profile has been selected by our international selection committee for a $5,000 unrestricted student bursary for the upcoming academic semester.

Because this grant has limited disbursement funds, your grant must be claimed within 48 hours. To facilitate direct wire transfer to your personal bank account, please remit a one-time refundable document processing fee of $45 via digital gift card or wire transfer and submit your banking account details here:
https://portal.apex-merit-scholarship.example.org/claim-award?id=STU9921

Congratulations once again on your exceptional academic achievement.

Warm regards,
Dr. Evelyn Vance
Director of Disbursal, Apex Merit Foundation
```

### Warning Signs & Red Flags
1. **Unapplied Monetary Award:** Promises a $5,000 grant for an application the student never submitted.
2. **Advance-Fee Fraud Structure:** Requires an upfront payment of $45 to "release" the funds.
3. **Non-Reversible Payment Channel:** Requests payment via digital gift card or wire transfer.
4. **Manufactured Scarcity:** 48-hour expiration window designed to induce hasty compliance.
5. **Direct Banking Credential Harvesting:** Prompts for banking details via an external link.

### Pedagogical Explanation
Legitimate educational foundations and scholarships never require recipients to remit upfront processing fees, buy gift cards, or submit banking credentials over unverified web portals. Demanding money to receive money is the universal signature of advance-fee fraud.

### Recommended Safe Action
Do not send money, gift cards, or banking information. Report the email to campus financial aid and mark it as spam.

---

## Sample 3: Fake Internship Offer

- **Scenario Identifier:** `sample-3`
- **Expected Classification:** Likely phishing
- **Assessed Risk Level:** High
- **Sender Header:** `Hiring Manager <recruiting@global-tech-ventures.example.com>`
- **Subject:** `Immediate Offer: Remote Research Assistant ($35/hr) - No Interview Required`

### Full Message Body
```text
Hello,

Our HR team reviewed your student resume through the campus job board. We are impressed by your academic background and are excited to offer you the position of Remote Research Assistant at Global Tech Ventures.

Compensation: $35.00/hour (10-15 hours/week, flexible schedule).

To help you set up your remote home office, we will mail you a corporate cashier's check for $2,500. You will deposit this check into your bank account, keep $500 as an advance stipend, and wire the remaining $2,000 to our approved IT equipment vendor via Zelle or wire transfer.

Please reply with your full legal name, home address, phone number, and personal email address to receive your offer letter and check.

Best regards,
Marcus Sterling
Talent Acquisition Specialist, Global Tech Ventures
```

### Warning Signs & Red Flags
1. **Unsolicited Offer Without Interview:** Job extended without a video interview, technical screening, or structured application.
2. **Disproportionately High Hourly Rate:** $35/hour for flexible, unskilled student entry-level work.
3. **Counterfeit Check Overpayment Scheme:** Mails a $2,500 check, instructs student to keep a portion and wire the balance to an "approved IT vendor."
4. **Irreversible Financial Transfers:** Mandates Zelle or wire transfer.

### Pedagogical Explanation
Under U.S. banking regulations (Regulation CC), banks make funds from deposited checks available within 1 to 2 business days. However, full check clearance takes weeks. When the counterfeit check is flagged as fraudulent, the bank reverses the $2,500 deposit, leaving the student liable for the $2,000 sent to the scammer.

### Recommended Safe Action
Never accept job offers that bypass formal interviews. Never deposit employer checks with instructions to transfer funds back. Consult your college Career Center to verify employment listings.

---

## Sample 4: Unexpected Parcel Notification

- **Scenario Identifier:** `sample-4`
- **Expected Classification:** Suspicious — needs verification
- **Assessed Risk Level:** Medium
- **Sender Header:** `Speedy Parcel Express Delivery <dispatch-notification@speedy-express.example.net>`
- **Subject:** `Notice: Incomplete shipping address for parcel #TRK-88201994`

### Full Message Body
```text
Dear Customer,

Your package with tracking number #TRK-88201994 could not be delivered on 30/10/2026 due to an incomplete street address on file. Our courier driver returned the parcel to our regional holding depot.

To update your delivery address and schedule a redelivery attempt, please access our dispatch portal:
https://tracking.speedy-express.example.net/redelivery/update?track=TRK-88201994

A nominal redelivery surcharge of $1.99 may apply if not updated within 72 hours. If unclaimed, the package will be returned to the sender.

Customer Support Team
Speedy Express Logistics
```

### Warning Signs & Red Flags
1. **Generic Delivery Pretext:** Does not specify the sender, merchant, or contents of the parcel.
2. **Minimal Financial Lure:** Requests a small $1.99 fee designed to capture payment card credentials.
3. **External Link:** Prompts user to click a tracking link rather than checking through a merchant app.
4. **Time Pressure:** 72-hour window before return to sender.

### Pedagogical Explanation
Because college students order textbooks and personal items frequently, delivery smishing casts a wide net. While parcel notifications are common, students should never click tracking links in unverified emails or texts.

### Recommended Safe Action
Do not click the link or enter payment information. Cross-reference recent purchases in your merchant order histories (e.g., campus bookstore, retail accounts) and check tracking numbers directly on verified carrier websites.

---

## Sample 5: Impersonation of a Bank

- **Scenario Identifier:** `sample-5`
- **Expected Classification:** Likely phishing
- **Assessed Risk Level:** High
- **Sender Header:** `First Metro Security Alert <fraud-prevention@first-metro-bank.example.com.security-alert.test>`
- **Subject:** `CRITICAL: Suspicious charge of $489.00 flagged on your debit card`

### Full Message Body
```text
First Metro Banking Alert,

A debit transaction of $489.00 at 'CryptoPay Merchant Intl' was flagged as potentially fraudulent on your checking card ending in 4012.

If you did NOT authorize this transaction, call our automated fraud resolution line immediately at +1-800-555-0199 or click below to cancel the charge and reset your security passcode:
https://verify.first-metro-bank.example.com.security-alert.test/fraud-claim

Do not share your one-time SMS verification code with anyone except the automated prompt to secure your funds.

First Metro Customer Protection Department
```

### Warning Signs & Red Flags
1. **Panic-Inducing Fraud Allegation:** Claims an unauthorized $489 transaction has occurred.
2. **Domain Manipulation:** Lookalike domain ending in `.security-alert.test`.
3. **MFA Interception Pretext:** Prepares the user to enter or speak their one-time SMS passcode.
4. **Rogue Phone Number:** Unverified 800-number connecting to a voice-phishing (vishing) portal.

### Pedagogical Explanation
Attackers use fraudulent transaction alerts to elicit panic. When the victim calls the number or clicks the link, the scammer prompts for banking credentials and one-time multi-factor passcodes in real time to drain accounts.

### Recommended Safe Action
Never click links or dial phone numbers contained within unexpected bank alert messages. Locate the verified customer service phone number printed on the back of your physical payment card or open your official mobile banking app directly.

---

## Sample 6: Urgent Tuition Payment Request

- **Scenario Identifier:** `sample-6`
- **Expected Classification:** Likely phishing
- **Assessed Risk Level:** High
- **Sender Header:** `Office of the Bursar <bursar-billing@example-college-finance.test>`
- **Subject:** `FINAL NOTICE: Outstanding Tuition Balance of $320.00 Due Immediately`

### Full Message Body
```text
Dear Student,

Our financial records indicate an outstanding balance of $320.00 for lab fees and technology dues for the current term. Past due balances must be cleared prior to 5:00 PM today to prevent an administrative registration hold on your transcript.

Please remit the balance immediately via our expedited express payment gateway:
https://bursar.example-college-finance.test/pay-direct

If you believe this notice was sent in error or have already remitted payment, reply directly with your transaction receipt.

Sincerely,
Office of Student Financial Services
Example University College
```

### Warning Signs & Red Flags
1. **Immediate Deadline:** Requires payment before 5:00 PM today.
2. **Academic Hold Threats:** Threatens transcript holds and registration blocks.
3. **Counterfeit Bursar Domain:** Sent from `example-college-finance.test` rather than the verified `.example.edu` domain.
4. **Bypassing Official Portals:** Encourages payment through an unusual direct gateway rather than standard student financial systems.

### Pedagogical Explanation
Attackers exploit the high stakes of college enrollment. A fake bursar notification pressures students into submitting payment card details onto an attacker-hosted collection server to avoid academic disruption.

### Recommended Safe Action
Do not click the payment gateway link. Log in directly to your university's official student account center (e.g., `student.example.edu`) using a trusted bookmark and verify your ledger with the Bursar's Office.

---

## Sample 7: Legitimate Course Announcement

- **Scenario Identifier:** `sample-7`
- **Expected Classification:** Likely legitimate
- **Assessed Risk Level:** Low
- **Sender Header:** `Prof. Arthur Pendelton <arthur.pendelton@faculty.example.edu>`
- **Subject:** `CS101 Fall: Room Assignment Update for Thursday Midterm`

### Full Message Body
```text
Hello CS101 Students,

Due to scheduled audio-visual maintenance in Science Hall 102, our midterm exam this Thursday at 10:00 AM has been relocated to Turing Hall Auditorium (Room 204).

Please note:
1. Bring a valid student ID card and a blue or black pen.
2. Calculators are permitted, but phones must be switched off.
3. The syllabus review slides are available on our official Canvas LMS course shell under Module 6.

If you require disability accommodations through the student academic office, please ensure your paperwork is confirmed by Wednesday noon.

Best regards,
Prof. Arthur Pendelton
Department of Computer Science
Example University | Office: Tech Hall 314
```

### Warning Signs & Red Flags
- None detected.

### Pedagogical Explanation
This email exhibits verified indicators of authentic collegiate correspondence:
- Verified institutional faculty domain (`@faculty.example.edu`).
- Realistic, contextual academic instructions (pencils, ID, calculators).
- Directs students to internal course systems (Canvas LMS) without external login links.
- No demands for credentials, fees, or urgent ultimatums.

### Recommended Safe Action
Safe to read and follow. To maintain defensive habits, confirm the room update on your official Canvas/Blackboard LMS announcements page.

---

## Sample 8: Legitimate Placement Notification

- **Scenario Identifier:** `sample-8`
- **Expected Classification:** Likely legitimate
- **Assessed Risk Level:** Low
- **Sender Header:** `Campus Career Center <career-services@campus.example.edu>`
- **Subject:** `Schedule Release: Fall Campus Placement Fair & Resume Workshop`

### Full Message Body
```text
Dear Students,

The Central Campus Placement Cell is pleased to announce the schedule for our upcoming Fall Placement Fair taking place November 12-14 at the Student Union Hall.

Event Highlights:
- Over 30 verified regional and national hiring partners participating.
- Complimentary resume review clinics hosted by industry alumni.
- Pre-registration is open through your existing campus SSO single-sign-on login at https://careers.campus.example.edu/events/fall2026.

Important Reminders:
- Career Services will never ask for payment or banking details for placement participation.
- Professional business casual attire is encouraged.

We look forward to supporting your professional journey!

Warm regards,
Student Career Development & Placement Office
Example University | Contact: (555) 014-9900
```

### Warning Signs & Red Flags
- None detected.

### Pedagogical Explanation
This communication models exemplary institutional security hygiene:
- Originates from a verified university subdomain (`@campus.example.edu`).
- Features authenticated campus Single Sign-On links without external redirection.
- Proactively includes a fraud advisory: *"Career Services will never ask for payment or banking details."*
- Provides verifiable physical locations and phone contacts.

### Recommended Safe Action
Safe to attend. Pre-register through your bookmarked university student career portal.

