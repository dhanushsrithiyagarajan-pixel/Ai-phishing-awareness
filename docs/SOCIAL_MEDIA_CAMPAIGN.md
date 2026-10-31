# Social Media Awareness Campaign & Poster Documentation

This document outlines the public communication assets developed for the **AI Phishing Awareness Campaign Kit**, including five ready-to-publish social media awareness posts and the structural specifications for the print-optimized cybersecurity poster.

---

## 1. Social Media Posts

### Campaign Post #1: Defeating Artificial Urgency
- **Target Audience:** College students during midterms and finals.
- **Short Headline:** 🚨 Panic is the Attacker's Weapon: Spot Artificial Urgency!
- **Awareness Message:** Did you just receive an email screaming that your campus account will be DELETED in 24 hours? Pause before you panic. Cybercriminals use artificial countdown clocks and scary ultimatums to bypass your critical thinking.
- **Practical Safety Tip:** Campus IT will NEVER give you a 24-hour ultimatum to verify passwords over a web link. Always verify directly through your bookmarked student portal (`student.example.edu`), never through emailed links.
- **Suitable Hashtags:** `#CyberSecurityAwareness #PhishingDefense #CollegeCyberSafety #ThinkBeforeYouClick #InfoSec`
- **Suggested Visual Concept:** High-contrast graphic showing a glowing digital countdown clock ticking down to zero with a mouse cursor hovering hesitantly over a red "Verify Now" button, with a prominent caution shield stating "Stop. Think. Verify."

---

### Campaign Post #2: Fake Internship & Check Scams
- **Target Audience:** Students seeking summer internships and remote work-study.
- **Short Headline:** 💼 Remote Job Offer with No Interview? Check Before You Cash In!
- **Awareness Message:** College students are prime targets for employment fraud! An unsolicited email offering $35/hour for a "remote research assistant"—no interview required, plus a $2,000 home office supply check? It is 100% a fake-check scam.
- **Practical Safety Tip:** If an employer sends you a check and asks you to wire money back to an "approved equipment vendor," STOP. The check will bounce weeks later, and your bank will hold you responsible for every single dollar wired.
- **Suitable Hashtags:** `#StudentJobs #InternshipScams #CyberAwareness #CollegeLife #FinancialDefense`
- **Suggested Visual Concept:** Split graphic: on the left, an illustrated cheerful student receiving an envelope labeled "$2,500 Cashier's Check"; on the right, an exposed trap door revealing the bouncing check and bank overdraft warning.

---

### Campaign Post #3: The HTTPS / Padlock Myth
- **Target Audience:** General student body and faculty.
- **Short Headline:** 🔒 Look Beyond the Padlock: HTTPS Doesn't Mean "Safe"!
- **Awareness Message:** Myth Buster: "If the website has a padlock and HTTPS in the address bar, it must be safe!" FALSE! Over 80% of active phishing sites now use free SSL certificates. HTTPS only encrypts the connection—it doesn't prove the site isn't run by a criminal.
- **Practical Safety Tip:** Always inspect the actual root domain before typing passwords. `canvas-login.example.edu.phish.test` is NOT your university portal, even if it has a shiny green padlock icon.
- **Suitable Hashtags:** `#CyberMyths #HTTPS #InfoSecTips #DigitalLiteracy #StaySecure`
- **Suggested Visual Concept:** An illustrated browser address bar featuring a glowing green lock next to a clearly deceptive domain (`secure-login.test`), with a magnifying glass zooming in on the deceptive top-level domain.

---

### Campaign Post #4: Package Delivery Smishing
- **Target Audience:** Mobile-first smartphone users and campus residents.
- **Short Headline:** 📱 Courier Delivery SMS at 10 PM? Beware of Smishing!
- **Awareness Message:** Expecting an online textbook delivery? Scammers blast millions of SMS texts saying: "Your package failed delivery due to missing street address. Pay $1.99 redelivery fee at bit.ly/delivery-x". Don't tap that link!
- **Practical Safety Tip:** That $1.99 fee is just bait to steal your credit card number, CVV, and billing identity. Real postal couriers don't text you from 10-digit mobile numbers demanding card payments for address fixes.
- **Suitable Hashtags:** `#SmishingAlert #MobileSecurity #PackageScams #CyberHygiene #StudentSafety`
- **Suggested Visual Concept:** A smartphone screen displaying an incoming SMS alert notification with a shortened link, overlaid with bright yellow caution tape stamped with "DO NOT TAP".

---

### Campaign Post #5: The Golden 3-Step Campus Defense
- **Target Audience:** Freshmen orientation and campus security weeks.
- **Short Headline:** 🛡️ The Golden 3-Step Rule for Every College Student
- **Awareness Message:** Protecting your tuition funds, personal identity, and academic standing takes just three simple habits every time you check your inbox.
- **Practical Safety Tip:** 
  1. CHECK THE SENDER DOMAIN (look past friendly display names).
  2. HOVER BEFORE YOU CLICK (verify true URLs in your status bar).
  3. REPORT DON'T IGNORE (forward phish to IT to protect your classmates).
- **Suitable Hashtags:** `#SecurityFirst #CyberCulture #CampusDefense #ZeroTrust #StudentHacks`
- **Suggested Visual Concept:** Three clean modern vector badge icons in a row: Eye (Inspect Sender), Hand (Hover URLs), and Megaphone (Report to IT), set against a sleek navy and cyan cyber grid.

---

## 2. Awareness Poster & Infographic Specification

The project includes an exportable, high-resolution HTML/CSS awareness poster located at route `/poster` (template: `templates/poster.html`, styling: `static/css/poster.css`).

### Key Structural Sections
1. **Header Banner:** Prominent branding with high-contrast typography ("CAMPUS CYBER DEFENSE").
2. **Three Golden Rules Bar:** Numbered badges highlighting:
   - Rule 1: Inspect the Sender Domain
   - Rule 2: Hover Before Clicking
   - Rule 3: Pause on Panic
3. **Six Critical Red Flags Grid:** Compact card elements covering urgency, lookalike subdomains, password/MFA solicitation, fake check recruitment, delivery smishing, and double file extensions.
4. **Action Steps Grid:** Two distinct columns comparing routine defensive habits with emergency incident response steps (password reset, session revocation, IT reporting).
5. **Footer:** Institutional emergency contact pill (`security-response@example.edu`).

### Print & PDF Optimization
- Configured with `@page { size: A4 portrait; margin: 1cm; }`.
- Print stylesheet automatically suppresses web navigation chrome and resets dark backgrounds to high-contrast monochrome/accent styling for cost-effective physical printing.

