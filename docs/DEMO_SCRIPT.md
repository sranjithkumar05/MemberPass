# MemberPass – Platform Demonstration Script

This script outlines the demonstration flow for presenting the **MemberPass** platform features, architecture, and live deployment.

- **Live URL**: https://member-pass-psi.vercel.app/
- **GitHub Repository**: https://github.com/sranjithkumar05/MemberPass

---

## Scene 1: Public Experience & Mediterranean Wellness Theme
1. **Open the Live Website**: Navigate to `https://member-pass-psi.vercel.app/`.
2. **Hero Section**: Point out the Mediterranean Coastal Wellness aesthetic (Ocean Blue `#386D83`, Sky Blue `#B8D6DF`, Warm Sand `#E9D8C2`, Deep Navy `#203746`).
3. **Membership Tiers Section**:
   - Scroll to `#plans`.
   - Show the three tiers: **Basic Plan** (₹1,500 / 30 Days / 8 classes), **Standard Plan** (₹3,000 / 30 Days / 25 classes), and **Premium Plan** (₹7,500 / 90 Days / Unlimited).
   - Point out features and instant QR pass inclusion.

---

## Scene 2: Member Registration & Razorpay Test Checkout
1. **Sign Up**: Click **Sign In / Join** in the navigation bar.
2. **Create Member Account**:
   - Enter name, email, password, and phone number.
   - Click **Create Account**. Note the issuance of a high-entropy 64-character cryptographic pass code.
3. **Select a Plan**:
   - Select the **Basic Plan** (or Standard Plan).
   - Click **Select Plan**. Razorpay Test Checkout modal opens.
   - Complete checkout with Razorpay test credentials.
   - Verify that payment verification runs, HMAC-SHA256 signature is authenticated, and membership is activated immediately.

---

## Scene 3: Member Dashboard & Digital QR Pass
1. **Member Overview**:
   - Notice the top banner displaying member name, plan tier, and active standing.
   - Point out **Classes Attended** vs **Classes Remaining** telemetry.
2. **Digital QR Pass**:
   - Click **View Pass** or open the pass modal.
   - Inspect the generated base64 DataURL QR code.
   - Show that the QR payload embeds encrypted access data (`pass_code`, `plan`, `end_date`) and excludes personal credentials or payment details.
3. **Membership Pause**:
   - Locate the **Membership Pause** panel.
   - Select a duration between **1 and 15 days** (e.g. 7 days).
   - Click **Pause Membership** and confirm.
   - Observe that status updates to `paused`, class consumption is put on hold, and the expiry date is extended forward by 7 days.
   - Note the studio rule: Pause is allowed strictly once per calendar year.

---

## Scene 4: Staff Console & QR Check-In Engine
1. **Log in as Staff**:
   - Sign in with staff credentials (or access staff view).
2. **QR Pass Validation & Entry**:
   - Open the **Staff Console**.
   - Show the dual entry methods: **Live Camera Scanner** (HTML5 QR scanner) and **Pass Code Lookup**.
   - Enter a member's pass code and click **Validate Pass**.
   - Inspect the validation telemetry: Member name, plan, classes used, and entry status (`ENTRY_ALLOWED`).
3. **Class Limit & Attendance Rollback**:
   - Show check-in execution: One class credit is deducted and attendance record is logged.
   - Demonstrate same-day check-in idempotency: Scanning a pass a second time on the same day permits entry without double-deducting classes.
   - Point out class limit enforcement: Once a Basic member reaches 8 classes, further check-ins are rejected (`8-class limit reached`).
4. **AI Absentee Drafts**:
   - Switch to the **Absentee Management** tab.
   - Click **Fetch Absentee Drafts** ($\ge 14$ days inactivity).
   - Review automatically generated personalized messages for inactive members.
5. **Scheduled Expiry Job**:
   - Click **Run Expiry Job Now** to trigger the manual reminder job.
   - Inspect job telemetry reporting expired passes ended and reminder notifications processed.

---

## Scene 5: MemberPass AI Assistant
1. **Navigate to AI Assistant**: Click **AI Assistant** in the navigation bar or member dashboard.
2. **Interface Overview**:
   - Observe the centered layout, responsive 2-column suggestion cards, and full-width chat composer.
3. **Test Inquiries**:
   - *Status Check*: Ask *"What is my membership status?"* -> AI reports active plan, expiry date, and digital pass state.
   - *Attendance Check*: Ask *"How many classes have I attended?"* -> AI provides exact session count and remaining credits.
   - *Policy Verification*: Ask *"How do I pause my membership?"* -> AI explains the 1–15 day pause option and 1 per calendar year rule.
   - *Plan Comparison*: Ask *"Explain the membership plans"* -> AI compares Basic, Standard, and Premium tiers.
   - *QR Mechanics*: Ask *"How does the QR pass work?"* -> AI explains cryptographic validation at the studio front desk.
