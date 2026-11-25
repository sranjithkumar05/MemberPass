# MemberPass – Premium AI-Powered Membership Management

**A smarter way to manage memberships.**

## 🌐 Live Demo

- **Live Website:** https://member-pass-psi.vercel.app/
- **Project Drive:** https://drive.google.com/file/d/1kD_DCgDPRJ4E2bNUgRUM0zv5mxd_lEv0/view?usp=sharing
- **AI Assistant Demo:** https://drive.google.com/file/d/1jRWnra7mDqcQVUyQKUA1XvM04d2AKuk5/view?usp=sharing

---

## 📌 About the Project

MemberPass is a modern, web-based membership management platform designed to simplify and streamline membership-related operations.

It combines membership management, online payment processing, attendance tracking, QR-based check-ins, membership pause functionality, automated expiry reminders and AI-powered assistance into a unified digital platform.

MemberPass aims to deliver a seamless experience for both members and administrators by making membership operations more efficient, accessible and user-friendly.

## 🎯 Project Objectives

- Simplify membership management and administration.
- Provide a modern and user-friendly digital experience.
- Integrate AI-powered membership assistance.
- Enable secure online membership payments.
- Track member attendance and class usage.
- Automate membership expiry processing and notifications.
- Improve member engagement through intelligent assistance.
- Develop a responsive and scalable web application.

## ✨ Key Features

- **Membership Management** – Manage members, memberships, plans and membership-related information.
- **Multiple Membership Tiers** – Basic, Standard and Premium membership plans.
- **Razorpay Payment Integration** – Online payment processing with payment verification and webhook handling.
- **QR-Based Check-In** – QR pass validation and attendance check-in functionality.
- **Class Usage Tracking** – Track class attendance and enforce membership class limits.
- **Membership Pause** – Allow eligible members to pause memberships with expiry-date adjustments.
- **Automated Expiry Management** – Automatically process expired memberships and manage expiry reminders.
- **AI Assistant** – AI-powered assistance for membership-related questions and queries.
- **AI Absentee Drafts** – Generate draft messages for members with attendance concerns.
- **Member Dashboard** – Access membership status, digital passes, attendance history and membership information.
- **Staff/Admin Dashboard** – Manage membership-related administrative operations.
- **Digital Membership Pass** – Access membership pass information and QR-based validation.
- **Responsive UI** – Modern interface designed for convenient access across devices.

## 🛠️ Technologies Used

- **Frontend:** React.js, Vite, JavaScript, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT-based authentication
- **Payment Integration:** Razorpay
- **AI Integration:** AI service integration
- **Deployment:** Vercel and Render
- **Version Control:** Git and GitHub

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/sranjithkumar05/MemberPass.git
```

### 2. Navigate to the Project

```bash
cd MemberPass
```

### 3. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 4. Install Backend Dependencies

Open another terminal:

```bash
cd backend
npm install
```

### 5. Configure Environment Variables

Configure the required environment variables in the backend `.env` file.

These may include:

- MongoDB connection configuration
- JWT authentication configuration
- Razorpay API credentials
- AI service configuration

**Never commit sensitive credentials, API keys or environment variables to GitHub.**

### 6. Run the Backend

```bash
cd backend
npm run dev
```

### 7. Run the Frontend

```bash
cd frontend
npm run dev
```

Open the local URL displayed in the frontend terminal to access the application.

## 🔗 Project Links

- **Live Website:** https://member-pass-psi.vercel.app/
- **Project Drive:** https://drive.google.com/file/d/1kD_DCgDPRJ4E2bNUgRUM0zv5mxd_lEv0/view?usp=sharing
- **AI Assistant Demo:** https://drive.google.com/file/d/1jRWnra7mDqcQVUyQKUA1XvM04d2AKuk5/view?usp=sharing
- **GitHub Repository:** https://github.com/sranjithkumar05/MemberPass

## 📚 Project Documentation

- **[AI Notes](docs/AI_NOTES.md)** – MemberPassGPT neural model architecture, checkpoint specifications, FastAPI serving, and backend fallback integration.
- **[Test Report](docs/TEST_REPORT.md)** – Comprehensive verification report covering 74 automated functional tests, build metrics, and Live API suite audit.
- **[Progress Log](docs/PROGRESS.md)** – Milestone progression from M1 (Architecture) through M4 (Audit & Documentation Verification).
- **[Demo Script](docs/DEMO_SCRIPT.md)** – Step-by-step demonstration walkthrough covering member onboarding, Razorpay payment, digital QR pass, staff check-in, and AI Assistant.

## 🧪 Testing & Verification

MemberPass features an automated test suite across all critical business logic:

| Test Suite | Scope | Status | Executed Count |
| :--- | :--- | :--- | :--- |
| **Razorpay & Webhooks** (`scripts/test-razorpay-suite.js`) | Payment orders, HMAC-SHA256 signature verification, webhook deduplication & idempotency | **PASS** | 35 / 35 tests (100%) |
| **QR Check-In & Class Limits** (`scripts/test-qr-classlimit-suite.js`) | QR validation, staff RBAC, daily idempotency, class limits (8/25/unlimited), atomic rollback | **PASS** | 20 / 20 tests (100%) |
| **Core Audit & Lifecycle** (`scripts/test-audit-suite.js`) | Bcrypt (cost 12), JWT auth, pause rules (1–15 days, 1/year), atomic expiry locks, absentee drafts, AI routes | **PASS** | 19 / 19 tests (100%) |
| **Frontend Static Analysis** (`oxlint`) | React component hygiene, rules of hooks, dependency closure integrity | **PASS** | 20 files, 0 errors |
| **Frontend Production Build** (`vite build`) | Production asset bundling, CSS & JS chunk compilation | **PASS** | 0 errors (899ms) |
| **Live API Suite** (`scripts/test-live-api.js`) | HTTP integration tests (auth, profile, QR pass, payments) | **CODE VERIFIED** | Syntax verified (0 errors); real Atlas DB run restricted by sandbox network isolation |

## 🔮 Future Enhancements

- Advanced membership analytics and reporting.
- Enhanced AI-powered recommendations.
- Additional member engagement automation.
- Improved dashboard visualization and analytics.
- Expanded membership insights and attendance reporting.
- Additional integrations and management capabilities.

## 📈 Project Status

MemberPass is an actively developed membership management platform. Features are continuously enhanced through development, testing, integration and UI/UX improvements.

---

**MemberPass – Smarter Membership. Better Experiences.**
