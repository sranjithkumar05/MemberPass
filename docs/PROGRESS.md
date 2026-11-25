# MemberPass – Milestone Progression Log

## Project Summary
- **Live URL**: https://member-pass-psi.vercel.app/
- **GitHub Repository**: https://github.com/sranjithkumar05/MemberPass
- **Theme**: Mediterranean Coastal Wellness Yoga Platform

---

## Milestone 1 (M1): Architecture & Foundation
- [x] Defined MongoDB Schemas: `User`, `Plan`, `Membership`, `Payment`, `Attendance`, `WebhookEvent`.
- [x] Implemented bcrypt password hashing (cost factor 12) and JWT authentication with role-based access control (`member`, `staff`, `admin`).
- [x] Created database seed script populating 3 plans (Basic, Standard, Premium) and realistic member datasets.
- [x] Built initial React frontend with responsive layout and basic auth navigation.

---

## Milestone 2 (M2): Core Business Logic & Payments
- [x] **Razorpay Payment Integration**: Order creation endpoint (`POST /api/payments/order`) with plan price verification.
- [x] **HMAC-SHA256 Signature Verification**: Payment authorization handler (`POST /api/payments/verify`) using timing-safe comparisons.
- [x] **Razorpay Webhooks**: Webhook endpoint (`POST /api/payments/webhook`) handling `payment.captured` and `payment.failed` with `WebhookEvent` unique deduplication.
- [x] **QR Pass Generation**: Cryptographic passCode generation (32-byte hex) and QR DataURL generation with embedded JSON payload (`pass_code`, `plan`, `end_date`).
- [x] **Staff QR Scanner & Check-In**: Camera-based scanner using `html5-qrcode` and manual code lookup.
- [x] **Class Limit Enforcement**: Enforced 8-class limit on Basic, 25-class on Standard, and unlimited access on Premium with atomic rollback on failure.

---

## Milestone 3 (M3): Studio Intelligence & Enhancements
- [x] **Membership Pause Engine**: `POST /api/member/pause` allowing active members to pause for 1–15 days once per calendar year with automatic expiry date extension.
- [x] **Auto-Resume Background Job**: Periodic background job scanning paused memberships where `pauseEndDate <= now` and restoring status to `active`.
- [x] **Automated Expiry Reminders**: Daily scheduler scanning memberships expiring in 3 days using India calendar-day calculations (`Asia/Kolkata` UTC+5:30) and atomic mutex locks (`lockId`, `lockAt`).
- [x] **AI Absentee Drafts**: Staff utility (`GET /api/staff/absentees`) generating personalized re-engagement messages for members inactive for $\ge 14$ days.
- [x] **AI Microservice**: PyTorch-based `MemberPassGPT` sequence model served over FastAPI on port 8000, integrated with Node.js backend intelligent domain fallback rules.

---

## Milestone 4 (M4): Audit, Hardening & Final Verification
- [x] **Frontend Redesign**: Redesigned UI to Mediterranean Coastal Wellness theme (`#386D83` Ocean Blue, `#B8D6DF` Sky Blue, `#FFFFFF` Pure White, `#E9D8C2` Sand, `#203746` Deep Navy).
- [x] **AI Assistant UI Alignment**: Fixed squished chat input width, decoupled prompt suggestion cards into full-width 2-column grid, and centered container layout in `App.css`.
- [x] **Code Quality & Hook Hygiene**: Eliminated React compiler warnings in `QRPassModal`, `PlansSection`, `MemberDashboard`, and `StaffDashboard`.
- [x] **Automated Test Suites**: Built and verified 74 functional tests across Razorpay, QR Attendance, Class Limits, Auth, and Scheduled Jobs (100% pass rate).
- [x] **Live API Test Suite Audit**: Resolved Arun Kumar dynamic DB assertions, active member resolution, safe QR payload property access, and guaranteed `testUserId` cleanup via `try ... finally`.
- [x] **Documentation Verification**: Standardized documentation across `README.md`, `docs/AI_NOTES.md`, `docs/TEST_REPORT.md`, `docs/PROGRESS.md`, and `docs/DEMO_SCRIPT.md`.
