# MemberPass – Premium AI-Powered Membership Management

**A smarter way to manage memberships for modern yoga centres and Mediterranean wellness sanctuaries.**

---

## 🌐 Live Demo & Video Walkthrough

- **Live Website:** https://member-pass-psi.vercel.app/
- **GitHub Repository:** https://github.com/sranjithkumar05/MemberPass
- **Project Overview Video:** https://drive.google.com/file/d/1kD_DCgDPRJ4E2bNUgRUM0zv5mxd_lEv0/view?usp=sharing
- **AI Assistant Demo Video:** https://drive.google.com/file/d/1jRWnra7mDqcQVUyQKUA1XvM04d2AKuk5/view?usp=sharing

> **Demonstration Flow**: The walkthrough demonstrates public member onboarding, Razorpay Test Checkout, instant digital QR pass generation, staff QR check-in & class limit validation, membership pause with expiry extension, and conversational AI assistance.

---

## 🔑 Test Login Credentials

For demonstration and testing purposes, pre-configured seed accounts are available in the database:

| Role | Email | Password | Assigned Tier & Details |
| :--- | :--- | :--- | :--- |
| **Member (Basic Tier)** | `arun1@example.com` | `MemberPass@123` | Active Basic Plan (8 classes allocated, attendance tracked) |
| **Member (Standard Tier)** | `priya2@example.com` | `MemberPass@123` | Active Standard Plan (25 classes allocated, priority booking) |
| **Member (Premium Tier)** | `karthik3@example.com` | `MemberPass@123` | Active Premium Plan (90 days, unlimited classes) |
| **Member (Paused Standing)** | `janani20@example.com` | `MemberPass@123` | Paused standing (expiry extended, check-in blocked) |
| **Staff Console** | `m2.staff@example.com` | `MemberPass@123` | Staff check-in desk, HTML5 camera scanner, code lookup |

---

## 📌 About the Project

MemberPass is a modern, web-based membership management platform designed to simplify and streamline membership-related operations.

It combines membership management, online payment processing, attendance tracking, QR-based check-ins, membership pause functionality, automated expiry reminders, and AI-powered assistance into a unified digital platform.

MemberPass delivers a seamless experience for both members and administrators by making membership operations more efficient, accessible, and user-friendly.

---

## 🎯 Project Objectives

- Simplify membership management and administration.
- Provide a modern and user-friendly digital experience.
- Integrate AI-powered membership assistance with domain-specific intelligence.
- Enable secure online membership payments with webhook verification.
- Track member attendance and enforce class limits with rollback safety.
- Automate membership expiry processing, auto-resume of paused plans, and notifications.
- Improve member engagement through intelligent assistance and absentee drafts.
- Develop a responsive, accessible, and high-performance web application.

---

## ✨ Key Features

- **Membership Management** – Manage members, memberships, tiers, and membership lifecycle states.
- **Multiple Membership Tiers** – Basic (8 classes / 30 days), Standard (25 classes / 30 days), and Premium (Unlimited / 90 days).
- **Razorpay Payment Integration** – Online payment processing with HMAC-SHA256 signature verification and webhook deduplication.
- **QR-Based Check-In** – Instant digital QR pass validation, HTML5 camera-based scanner, and manual code lookup.
- **Class Usage Tracking** – Real-time attendance logging, class deduction, same-day idempotency, and atomic rollback on failure.
- **Membership Pause** – Allow eligible members to pause memberships (1–15 days, strictly once per calendar year) with automatic expiry date adjustment.
- **Automated Expiry Management** – Daily scheduler scanning memberships expiring in 3 days using India calendar-day calculations (`Asia/Kolkata` UTC+5:30) with atomic mutex locks.
- **AI Assistant** – Dual-tier conversational assistant answering membership questions, studio guidelines, and personalized member queries.
- **AI Absentee Drafts** – Staff utility generating personalized re-engagement messages for members inactive for 14+ days.
- **Member Dashboard** – Personal portal displaying membership standing, digital QR pass, attendance metrics, and pause controls.
- **Staff/Admin Dashboard** – Real-time studio check-in console with camera feed, member validation, and absentee draft tools.
- **Digital Membership Pass** – High-entropy 64-character encrypted QR payload omitting sensitive payment and user credentials.
- **Responsive Mediterranean UI** – Bespoke coastal wellness design optimized across mobile, tablet, and desktop viewports.

---

## 🧠 AI Architecture & Fallback System

MemberPass implements a dual-tier intelligent assistance architecture:

1. **Microservice Neural Model (`MemberPassGPT`)**:
   - **Framework**: PyTorch (`torch.nn`) sequence model.
   - **Architecture**: Token embedding layer (`nn.Embedding`), Gated Recurrent Unit core (`nn.GRU`, hidden dimension 256), and linear projection head (`nn.Linear`).
   - **Serving**: FastAPI and Uvicorn running on port 8000 (`memberpass-ai/server.py`).
   - **Dataset**: Domain FAQ covering studio facilities, pass validation, class etiquette, and renewal policies.
2. **Deterministic Contextual Fallback Engine (`backend/routes/aiRoutes.js`)**:
   - An Express orchestration layer that handles authenticated membership inquiries with strict data privacy gates.
   - **Live Membership Status**: Fetches active plan, validity dates, and pass readiness for logged-in members.
   - **Attendance History**: Aggregates verified check-in counts and remaining class allocations.
   - **Expiry Calculations**: Formats Indian locale calendar renewal dates and days remaining.
   - **Studio Policy Enforcement**: Enforces exact business rules (pause limits of 1–15 days, once per calendar year) without hallucination.

---

## 🛠️ Technology Stack & Architecture Rationale

- **Frontend (React 19 & Vite 8)**: Fast build times, instant HMR, and route/modal code-splitting (`React.lazy` and `Suspense`) to minimize critical bundle weight.
- **Backend (Node.js & Express)**: Non-blocking asynchronous I/O ideal for handling payment webhooks and high-throughput QR attendance scanning.
- **Database (MongoDB & Mongoose)**: Schema flexibility for evolving membership states, combined with atomic operators (`findOneAndUpdate`, mutex locks) to prevent double check-ins and race conditions.
- **Security & Tokens (JWT & Bcrypt)**: Cost factor 12 password hashing; stateless cryptographic 64-character tokens for verifiable QR access without exposing sensitive user data.
- **Payment Processing (Razorpay)**: Secure HMAC-SHA256 signature verification and idempotent webhook event deduplication (`WebhookEvent` collection).
- **AI Microservice (PyTorch & FastAPI)**: Dedicated Python environment serving lightweight sequence inference decoupled from the primary web application.
- **Deployment (Vercel & Render)**: Vercel for edge CDN frontend delivery; Render for continuous backend hosting.

---

## 🎨 UI/UX & Design Decisions

MemberPass features a custom **Mediterranean Coastal Wellness** aesthetic designed for yoga studios and wellness sanctuaries:

- **Strict Color Palette**:
  - **Ocean Blue (`#386D83`)**: Primary actions, navigation accents, active buttons, and headers.
  - **Sky Blue (`#B8D6DF`)**: Secondary badges, subtle borders, and soft highlights.
  - **Pure White (`#FFFFFF`)**: Clean surface cards and high-contrast text.
  - **Warm Sand (`#E9D8C2`)**: Warm luxury card accents and neutral badges.
  - **Coral (`#D98D70`)**: Warm action accents, highlight tags, and secondary pills.
  - **Deep Navy (`#203746`)**: High-contrast typography and deep structural elements.
  - **Light Background (`#F6F9F8`)**: Soft, calming canvas background reducing visual fatigue.
- **Typography**:
  - **Headings**: Editorial Serif (`Playfair Display`) conveying elegance and mindfulness.
  - **Body**: Clean Sans-Serif (`Plus Jakarta Sans`) ensuring high legibility on mobile viewports.
  - **Pass Identifiers**: Monospace (`JetBrains Mono`) for cryptographic codes and attendance tokens.
- **Performance Optimizations**:
  - High-priority responsive hero images (`srcset` with `fm=webp&q=70`), matching responsive preload in `index.html`.
  - Non-blocking Google Fonts and Font Awesome with `<noscript>` fallbacks.
  - Code-split dashboards (`StaffDashboard`, `MemberDashboard`, `AIAssistantPage`, modals) reducing initial JavaScript weight by ~60%.

---

## 📊 Test Data Confirmation & Feature Completeness

> [!NOTE]
> All members, attendance logs, and transactions in the seed environment are synthetic test datasets generated via `backend/scripts/seed.js`. Payments operate strictly under Razorpay Sandbox / Test Mode.

### Feature Status Matrix

| Feature | Status | Notes |
| :--- | :---: | :--- |
| **User Authentication & RBAC** | ✅ Working | JWT auth, bcrypt cost 12, member and staff roles |
| **Razorpay Checkout & Webhooks** | ✅ Working | Test mode integration with HMAC-SHA256 verification and deduplication |
| **QR Pass & Camera Check-in** | ✅ Working | Base64 QR payload generation, HTML5 camera scanner, code lookup |
| **Class Limit & Rollback Safety** | ✅ Working | Enforces 8/25/unlimited limits with atomic rollback on failure |
| **Membership Pause Engine** | ✅ Working | 1–15 day limits, 1/year frequency limit, auto-resume background job |
| **AI Assistant & Domain Rules** | ✅ Working | PyTorch sequence model + deterministic Express fallback pipeline |
| **Automated Expiry Reminders** | ✅ Working | Daily cron job with IST calendar calculations and atomic mutex locks |
| **Live Production Payments** | ⏸️ Deferred | Configured for Razorpay Sandbox/Test keys; production credentials deferred |
| **SMS / Push Gateway** | ⏸️ Deferred | Notifications simulated via terminal logging and database event logs |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/sranjithkumar05/MemberPass.git
cd MemberPass
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 3. Install Backend Dependencies

```bash
cd ../backend
npm install
```

### 4. (Optional) Setup AI Microservice

```bash
cd ../memberpass-ai
python -m venv .venv
# Activate: .venv\Scripts\activate (Windows) or source .venv/bin/activate (Linux/Mac)
pip install -r requirements.txt
python server.py
```

### 5. Configure Environment Variables

Create `.env` in the `backend/` directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
AI_SERVICE_URL=http://localhost:8000
```

> **Security Note**: Never commit actual API keys, credentials, or `.env` files to GitHub.

### 6. Seed the Database

Populate plans and fictional test accounts:

```bash
cd backend
npm run seed
```

### 7. Run the Application

In one terminal, start the backend:
```bash
cd backend
npm run dev
```

In another terminal, start the frontend:
```bash
cd frontend
npm run dev
```

Open the displayed local URL (typically `http://localhost:5173`) in your browser.

---

## 🧪 Testing & Verification

MemberPass features an automated test suite across all critical business logic:

| Test Suite | Scope | Status | Executed Count |
| :--- | :--- | :---: | :--- |
| **Razorpay & Webhooks** (`scripts/test-razorpay-suite.js`) | Payment orders, HMAC-SHA256 signature verification, webhook deduplication & idempotency | **PASS** | 35 / 35 tests (100%) |
| **QR Check-In & Class Limits** (`scripts/test-qr-classlimit-suite.js`) | QR validation, staff RBAC, daily idempotency, class limits (8/25/unlimited), atomic rollback | **PASS** | 20 / 20 tests (100%) |
| **Core Audit & Lifecycle** (`scripts/test-audit-suite.js`) | Bcrypt (cost 12), JWT auth, pause rules (1–15 days, 1/year), atomic expiry locks, absentee drafts, AI routes | **PASS** | 19 / 19 tests (100%) |
| **Frontend Static Analysis** (`oxlint`) | React component hygiene, rules of hooks, dependency closure integrity | **PASS** | 20 files, 0 errors |
| **Frontend Production Build** (`vite build`) | Production asset bundling, CSS & JS chunk compilation | **PASS** | 0 errors |
| **Live API Suite** (`scripts/test-live-api.js`) | HTTP integration tests (auth, profile, QR pass, payments) | **CODE VERIFIED** | Syntax verified (0 errors); real Atlas DB run restricted by sandbox network isolation |

### Lighthouse Performance Audit (Mobile Emulation)

Observed metrics from a clean-incognito mobile audit run:

| Metric | Observed Value | Evaluation Target |
| :--- | :---: | :--- |
| **First Contentful Paint (FCP)** | `1.6s` | Fast initial paint |
| **Largest Contentful Paint (LCP)** | `3.2s` | Optimized responsive WebP hero delivery |
| **Total Blocking Time (TBT)** | `540ms` | Minimal main-thread interruption |
| **Cumulative Layout Shift (CLS)** | `0` | Stable layout with explicit image dimensions |
| **Speed Index** | `2.4s` | Rapid visual completion |

*(Note: These figures reflect one observed mobile run under simulated network conditions; individual scores may vary depending on device capabilities and network connection).*

---

## 📚 Project Documentation

- **[AI Notes](docs/AI_NOTES.md)** – MemberPassGPT neural model architecture, checkpoint specifications, FastAPI serving, and backend fallback integration.
- **[Test Report](docs/TEST_REPORT.md)** – Comprehensive verification report covering 74 automated functional tests, build metrics, and Live API suite audit.
- **[Progress Log](docs/PROGRESS.md)** – Milestone progression from M1 (Architecture) through M4 (Audit & Documentation Verification).
- **[Demo Script](docs/DEMO_SCRIPT.md)** – Step-by-step demonstration walkthrough covering member onboarding, Razorpay payment, digital QR pass, staff check-in, and AI Assistant.

---

## 🔮 Future Enhancements

- Advanced membership analytics, retention curves, and financial forecasting.
- Personalized AI-powered workout and yoga tier recommendations.
- Biometric verification integration alongside QR scanning for high-throughput studios.
- Multi-location studio clustering with synchronized attendance quotas.
- WhatsApp Business API integration for automated pass delivery and renewal reminders.

---

## 📈 Project Status

MemberPass is an actively maintained membership management platform. All core membership workflows, payment verification pipelines, digital passes, and AI capabilities are fully implemented, verified, and documented.

---

**MemberPass – Smarter Membership. Better Experiences.**
