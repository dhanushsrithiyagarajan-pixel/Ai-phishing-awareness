# Interactive Quiz & Comprehensive Answer Key

This document provides the full question bank, multiple-choice options, correct answers, and pedagogical rationales for the 10-question cybersecurity quiz featured in the **AI Phishing Awareness Campaign Kit**.

---

## Question 1: Identifying Artificial Urgency
**Question:** You receive an email claiming to be from your college IT department stating your account will be disabled in 6 hours unless you click a link and log in. What is the biggest red flag in this message?
- A) The email was sent during regular working hours
- B) Artificial urgency pressuring you with a tight deadline to force immediate action **[CORRECT]**
- C) The message uses formal greeting language
- D) The IT department included their office location in the signature

**Correct Answer:** **B**  
**Category:** Social Engineering  
**Pedagogical Explanation:** Artificial urgency is the foundational psychological tactic of phishing. Attackers induce cognitive stress (such as a 6-hour deletion deadline) to rush victims into complying before they have time to evaluate domain authenticity, check for red flags, or consult with colleagues.

---

## Question 2: Analyzing Misleading Domain Structures
**Question:** Look at this sender address: `bursar@university.edu.payment-center.test`. Which part indicates whether this is the genuine college domain?
- A) The prefix `bursar@` guarantees it is the university bursar
- B) The presence of `university.edu` anywhere in the string makes it authentic
- C) The actual effective domain is `payment-center.test`; `university.edu` is just a deceiving subdomain or prefix **[CORRECT]**
- D) The word `payment-center` proves it is a secure certified financial processor

**Correct Answer:** **C**  
**Category:** URL & Domain Analysis  
**Pedagogical Explanation:** In standard Domain Name System (DNS) syntax, the true root domain sits immediately to the left of the top-level domain extension (`.test`). Attackers frequently prepend trusted names like `university.edu` as subdomains to visually deceive users glancing quickly at the address.

---

## Question 3: Remote Job Recruitment Scams
**Question:** A recruiter on a student job board sends you an offer for a remote research role paying $40/hr without an interview, and offers to mail you a check for home office supplies. What scam pattern is this?
- A) Legitimate enterprise recruitment bonus
- B) Fake check overpayment scam **[CORRECT]**
- C) University work-study matching program
- D) Direct deposit payroll verification

**Correct Answer:** **B**  
**Category:** College Scams  
**Pedagogical Explanation:** In a fake check scam, the fraudster issues a counterfeit cashier's check, asking the student to deposit it, retain an advance stipend, and wire the remainder to an "approved IT equipment vendor." Under banking regulations, funds appear available within 1-2 days, but when the counterfeit check bounces weeks later, the student is held liable for all wired funds.

---

## Question 4: Mobile SMS Attack Vectors
**Question:** You receive an SMS text message claiming: *"Your courier parcel failed delivery. Click here: bit.ly/delivery-help to pay $1.50 redelivery fee."* What phishing variant is this?
- A) Smishing (SMS phishing) **[CORRECT]**
- B) Spear phishing via LDAP
- C) Vishing (Voice phishing)
- D) Watering hole attack

**Correct Answer:** **A**  
**Category:** Phishing Variants  
**Pedagogical Explanation:** Smishing refers to phishing carried out via SMS text messages. Attackers use shortened links (`bit.ly`) and minor fee requests ($1.50) to exploit truncated mobile browser interfaces and steal credit card numbers.

---

## Question 5: Safe Out-of-Band Verification
**Question:** What is the safest way to verify an unexpected email from your bank claiming that unauthorized transactions were detected on your credit card?
- A) Reply directly to the email asking for confirmation
- B) Click the link in the email and check if the URL starts with `https://`
- C) Call the verified customer service number printed on the back of your physical payment card or use the bank's official standalone app **[CORRECT]**
- D) Search for the email subject line on social media

**Correct Answer:** **C**  
**Category:** Safe Verification  
**Pedagogical Explanation:** Never rely on contact details, phone numbers, or reply-to links contained within an unsolicited message. Always initiate independent "out-of-band" communication using a trusted phone number from your physical card or a verified mobile banking app.

---

## Question 6: Malicious File Payloads
**Question:** An email arrives with an attachment named `Campus_Grades_Report.pdf.exe`. Why is this file dangerous?
- A) Double extension disguising an executable file as a PDF document **[CORRECT]**
- B) PDF files cannot be opened on college computers
- C) Executable files are always corrupted during email transit
- D) The file name contains underscores

**Correct Answer:** **A**  
**Category:** Malware & Attachments  
**Pedagogical Explanation:** Cybercriminals exploit default operating system configurations that conceal known file extensions. By naming a file `document.pdf.exe`, the user only sees `document.pdf` and double-clicks it, inadvertently running malicious executable code.

---

## Question 7: Immediate Post-Click Remediation
**Question:** You inadvertently clicked a suspicious link in an email and entered your campus password before realizing it might be fake. What is your immediate priority action?
- A) Wait 48 hours to see if any suspicious transactions appear
- B) Delete the email and shut down your computer for the day
- C) Immediately change your campus password from an unaffected trusted device and notify college IT security / helpdesk **[CORRECT]**
- D) Email the sender asking them to delete your credentials

**Correct Answer:** **C**  
**Category:** Incident Response  
**Pedagogical Explanation:** Immediate credential containment minimizes the attacker's window of opportunity. Changing passwords from an uncompromised device and alerting IT security allows defenders to terminate compromised sessions and audit access logs for lateral movement.

---

## Question 8: Protecting Multi-Factor Authentication (MFA)
**Question:** A scammer calls you claiming to be your campus tech support and asks for the 6-digit Multi-Factor Authentication (MFA) push code just sent to your phone. What should you do?
- A) Share the code since the caller claimed to be university tech support
- B) Refuse to provide the code, hang up, and report an unauthorized login attempt to your institution **[CORRECT]**
- C) Provide only the first 3 digits of the code
- D) Text the code back to the phone number that texted it

**Correct Answer:** **B**  
**Category:** MFA Security  
**Pedagogical Explanation:** MFA one-time passcodes are secret authorization tokens. Legitimate IT staff will NEVER ask users to disclose MFA codes over phone, chat, or email. Receiving an unprompted MFA prompt means the attacker already possesses your password and is attempting to bypass second-factor defenses.

---

## Question 9: Browser Padlocks & SSL Encryption
**Question:** Why does having "HTTPS" and a padlock icon in your browser address bar NOT automatically mean a website is trustworthy?
- A) The padlock only means encryption between your browser and the server, not that the site owner is honest or legitimate **[CORRECT]**
- B) HTTPS is an obsolete protocol that is no longer secure
- C) Browser padlocks only work on mobile devices
- D) Phishing sites cannot obtain SSL/TLS certificates

**Correct Answer:** **A**  
**Category:** Web Security  
**Pedagogical Explanation:** Modern SSL/TLS certificates are automated, free, and available to anyone via services like Let's Encrypt. Over 80% of active phishing landing pages utilize valid HTTPS certificates. The padlock proves only that traffic in transit is encrypted; it does not prove the website operator is honest.

---

## Question 10: Emerging Attack Vectors (Quishing)
**Question:** You see a printed poster on a campus bulletin board offering free student discounts if you scan a QR code. What specific threat does this represent?
- A) Denial of Service (DoS)
- B) Quishing (QR Code Phishing) leading to malicious URLs **[CORRECT]**
- C) Buffer overflow vulnerability
- D) SQL injection attack

**Correct Answer:** **B**  
**Category:** Modern Phishing Tactics  
**Pedagogical Explanation:** Quishing (QR Code Phishing) embeds malicious URLs into QR codes placed in physical or digital spaces. Because human eyes cannot read the encoded URL, attackers use QR codes to bypass email spam filters and direct mobile devices to credential-harvesting landing pages.

---

## Scoring & Proficiency Feedback Scale

| Score Percentage | Proficiency Band | Feedback & Next Steps |
|---|---|---|
| **90% – 100%** | Cybersecurity Champion | Demonstrates exceptional discernment and practical defense instincts. Ready to serve as a peer cybersecurity advocate. |
| **70% – 80%** | Vigilant Defender | Strong foundational awareness. Missed subtle nuances (e.g. subdomain structures or check clearing rules). Review targeted modules. |
| **50% – 60%** | Emerging Awareness | Moderate vulnerability risk. Susceptible to advanced urgency and overpayment schemes. Recommended to complete all 8 Learning Center lessons. |
| **< 50%** | High Vulnerability Risk | High risk of falling victim to social engineering. Immediate study of the Red-Flag Checklist and training samples is strongly advised. |

