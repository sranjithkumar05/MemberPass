# MemberPass – Premium AI-Powered Membership Management

A premium membership management platform for yoga centres and wellness studios, supporting members and staff with memberships, payments, QR attendance and AI assistance.

**Live link:** https://member-pass-psi.vercel.app/

## Recordings

- **Final demo video:** https://drive.google.com/file/d/1-WVR4VglwpQonQJDF3HGC86lxNxquUZt/view?usp=sharing
- **Project overview video:** https://drive.google.com/file/d/1kD_DCgDPRJ4E2bNUgRUM0zv5mxd_lEv0/view?usp=sharing
- **AI Assistant demo video:** https://drive.google.com/file/d/1jRWnra7mDqcQVUyQKUA1XvM04d2AKuk5/view?usp=sharing
- **GitHub repository:** https://github.com/sranjithkumar05/MemberPass

## Test logins

Demo accounts use fictional seed data. Verify availability in the deployed environment before submission.

| Role | Email | Password |
|---|---|---|
| Member (Basic) | `arun1@example.com` | `MemberPass@123` |
| Member (Standard) | `priya2@example.com` | `MemberPass@123` |
| Member (Premium) | `karthik3@example.com` | `MemberPass@123` |
| Member (Paused) | `janani20@example.com` | `MemberPass@123` |
| Staff | `m2.staff@example.com` | `MemberPass@123` |

## What it does

1. **Membership plans and checkout:** Members can explore Basic, Standard and Premium tiers and use Razorpay test checkout.
2. **Digital membership passes:** Members receive QR-based passes with membership information and validity.
3. **QR attendance check-in:** Staff can scan passes using a camera or use manual pass-code lookup to validate entry and record attendance.
4. **Membership lifecycle:** Eligible members can pause memberships, with lifecycle and expiry processing.
5. **AI membership assistance:** Members can ask studio-policy questions and authenticated users can ask about their personal membership information.

## The AI feature

- **What it does:** A conversational assistant answers questions about studio policies, etiquette, membership tiers, pass validation and renewal rules. Authenticated members can ask about plan status, remaining classes and expiration date.
- **Which free model it uses:** MemberPass uses a custom-trained PyTorch sequence model (`MemberPassGPT`), not an external free inference model. The documented architecture includes token embeddings, a GRU core (hidden dimension 256) and a linear output layer. It is trained on the project’s yoga-studio policy and FAQ dataset and served by a FastAPI/Uvicorn microservice.
- **What happens if the AI service is not available:** The Node.js backend uses a deterministic contextual fallback. Personal membership questions query application data; studio-policy questions use defined policy responses. The fallback is designed not to guess critical membership or financial information.

## My stack

| Part | Technology | Why |
|---|---|---|
| Frontend | React, Vite | Component-based UI and development/build tooling |
| Backend | Node.js, Express | API and application logic |
| Database | MongoDB, Mongoose | Persistent membership and attendance data |
| Authentication | JWT, bcrypt | Authentication and password hashing |
| Payments | Razorpay (test mode) | Checkout and backend payment verification |
| QR attendance | QR generation, `html5-qrcode` | Digital passes and staff check-in |
| AI | PyTorch, FastAPI, Uvicorn | Custom AI model inference service |
| Email | SMTP, Nodemailer | Email configuration and notification workflows |
| Deployment | Vercel, Render | Hosting frontend and backend |

## Main design choices

- **Role-based access control:** Protected routes and role checks separate member and staff capabilities.
- **Password security:** Passwords are hashed with bcrypt.
- **Payment verification:** Backend verifies Razorpay signatures; webhook event tracking supports deduplication.
- **QR pass security:** Pass codes avoid embedding sensitive payment or user credentials.
- **Attendance integrity:** Server-side class-limit checks, same-day idempotency and rollback handling.
- **Membership pause rules:** Pause duration is limited to 1–15 days and once per calendar year, with expiry extension.
- **Expiry processing:** Background jobs use India-calendar-day calculations and locking/status handling for expiry processing and reminders.
- **AI fallback:** The custom model service is decoupled from the main backend and has a deterministic fallback.
- **Staff-reviewed AI drafts:** Absentee follow-up messages are drafts for staff review rather than automatic dispatch.
- **Responsive design:** Mediterranean coastal wellness styling adapts to mobile, tablet and desktop.
- **Performance:** Code-split dashboard components and frontend loading optimizations; latest Lighthouse mobile scores: Performance 88, Accessibility 97, Best Practices 100, SEO 100.

## How to run it on your computer

### Clone the repository

```bash
git clone https://github.com/sranjithkumar05/MemberPass.git
cd MemberPass
```

### Install frontend dependencies

```bash
cd frontend
npm install
```

### Install backend dependencies

```bash
cd ../backend
npm install
```

### Optional AI service setup

```bash
cd ../memberpass-ai
python -m venv .venv

# Windows
.venv\Scripts\activate

# Linux/macOS
# source .venv/bin/activate

pip install -r requirements.txt
python server.py
```

### Configure settings

Create environment files as required and configure the following values (names only):

- `PORT`
- `MONGODB_URI`
- `JWT_SECRET`
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `RAZORPAY_WEBHOOK_SECRET`
- `AI_SERVICE_URL`
- Email/SMTP settings used by the backend
- `VITE_API_URL` (frontend configuration)

Never commit real keys, passwords, tokens or `.env` files.

### Seed demo data

```bash
cd backend
npm run seed
```

### Run the backend

```bash
cd backend
npm run dev
```

### Run the frontend

```bash
cd frontend
npm run dev
```

Open the local URL shown by Vite (usually `http://localhost:5173`).

## How to run the tests

From the repository root:

```bash
node backend/scripts/test-razorpay-suite.js
node backend/scripts/test-qr-classlimit-suite.js
node backend/scripts/test-audit-suite.js
```

Frontend lint and production build (from `frontend/`):

```bash
npm run lint
npm run build
```

Live API test script syntax check:

```bash
node --check backend/scripts/test-live-api.js
```

SMTP test (if configured):

```bash
node backend/scripts/testSMTP.js
```

## Made-up data

The seed environment uses synthetic demo members and test records created for application testing and demonstration. The seed data is fictional and is not intended to contain real people or customers. Payments are tested using Razorpay Test/Sandbox mode.

## What works

- **Fully working (documented and tested):**
  - Member and staff authentication with role-based access control.
  - Basic, Standard and Premium membership tiers.
  - Razorpay test checkout and backend signature verification.
  - Webhook deduplication.
  - Digital QR membership passes.
  - Staff QR scanner and manual pass-code lookup.
  - Class-limit enforcement, same-day attendance idempotency and rollback handling.
  - Membership pause rules and expiry extension.
  - Scheduled membership lifecycle processing.
  - Custom PyTorch AI service and deterministic backend fallback.
  - Absentee follow-up draft utility for staff review.
  - Responsive UI and code-split dashboard components.
  - 74 automated functional checks reported passing (35 Razorpay/webhook, 20 QR/class-limit and 19 core audit).

- **Partly done:**
  - Live API integration test script was syntax-checked, but execution against the cloud MongoDB Atlas database was restricted in the documented sandbox environment.
  - Broader external user testing remains to be expanded.
  - End-to-end delivery verification of expiry reminders to a member within the reminder window remains to be completed.

- **Skipped:**
  - Live Razorpay transactions; this project uses Test/Sandbox mode.
  - Real SMS/WhatsApp gateway integration.
  - Physical biometric or turnstile hardware integration.

## What I would do differently with more time

- Start integration testing earlier to validate payments, QR attendance, lifecycle rules and database interactions together.
- Add secure offline QR-pass access and improved connectivity handling.
- Expand the architecture to support multiple studio locations, configurable plans and location-specific staff management.

---

## Additional project documentation

- **AI Notes:** `docs/AI_NOTES.pdf`
- **Project Progress:** `docs/PROGRESS.pdf`
- **Lighthouse screenshot:** `docs/SPEED.png`