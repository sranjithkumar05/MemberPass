# MemberPass – Premium AI-Powered Membership Management

A smarter membership management platform for yoga centres and wellness studios.

**Live link:** https://member-pass-psi.vercel.app/

## Recordings

- **Project overview video:** https://drive.google.com/file/d/1kD_DCgDPRJ4E2bNUgRUM0zv5mxd_lEv0/view?usp=sharing
- **AI Assistant demo video:** https://drive.google.com/file/d/1jRWnra7mDqcQVUyQKUA1XvM04d2AKuk5/view?usp=sharing
- **GitHub repository:** https://github.com/sranjithkumar05/MemberPass

## Test logins

Demo accounts for testing. Verify availability in the deployed environment before submission.

| Role | Email | Password | Details |
|---|---|---|---|
| Member (Basic) | `arun1@example.com` | `MemberPass@123` | Basic plan, 8 classes |
| Member (Standard) | `priya2@example.com` | `MemberPass@123` | Standard plan, 25 classes |
| Member (Premium) | `karthik3@example.com` | `MemberPass@123` | Premium plan, 90 days, unlimited classes |
| Member (Paused) | `janani20@example.com` | `MemberPass@123` | Paused membership |
| Staff | `m2.staff@example.com` | `MemberPass@123` | Staff check-in console |

## What it does

1. **Membership plans and checkout:** Members can explore Basic, Standard and Premium tiers and use Razorpay test checkout.
2. **Digital membership passes:** Members receive a QR-based pass displaying membership information and validity.
3. **QR attendance check-in:** Staff can scan passes with a camera or use manual code lookup to validate entry and record attendance.
4. **Membership pause and lifecycle management:** Eligible members can pause a plan and the system handles membership lifecycle and expiry processing.
5. **AI membership assistance:** The conversational assistant answers studio-policy and membership questions, including authenticated personal membership details.

## The AI feature

- **What it does:** MemberPass provides a conversational assistant for studio policies, etiquette, membership tiers, pass validation and renewal rules. Authenticated members can also ask about their plan status, remaining classes and expiration date.
- **Which free model it uses:** MemberPass uses a custom-trained PyTorch sequence model (`MemberPassGPT`), rather than an external free inference model. The documented architecture includes token embeddings, a GRU core (hidden dimension 256), and a linear output layer. It is trained on the project's yoga-studio policy and FAQ dataset and served by a FastAPI/Uvicorn microservice.
- **What happens if the AI service is not available:** The Node.js backend activates a deterministic contextual fallback. For authenticated personal membership questions, it queries application data; for studio-policy questions, it returns defined policy responses. The fallback is designed not to guess critical membership or financial information.

## My stack

| Part | Technology | Why |
|---|---|---|
| Frontend | React, Vite | Component-based UI and development/build tooling |
| Backend | Node.js, Express | API and application logic |
| Database | MongoDB, Mongoose | Persistent membership and attendance data |
| Authentication | JWT, bcrypt | Authentication and password hashing |
| Payments | Razorpay (test mode) | Checkout and backend payment verification |
| QR attendance | QR generation, `html5-qrcode` | Digital passes and staff check-in |
| AI | PyTorch, FastAPI, Uvicorn | Custom model inference microservice |
| Email | SMTP, Nodemailer | Email configuration and notification workflows |
| Deployment | Vercel, Render | Frontend and backend hosting |

## Main design choices

- **Role-based access control:** Protected routes and role checks separate member and staff capabilities.
- **Password security:** Passwords are hashed with bcrypt.
- **Payment verification:** Backend verifies Razorpay payment signatures; webhook event tracking supports deduplication.
- **QR pass security:** Pass codes are designed to avoid embedding sensitive payment or user credentials.
- **Attendance integrity:** Server-side class-limit checks, same-day idempotency and rollback handling support attendance integrity.
- **Membership pause rules:** Pause duration is limited to 1–15 days and once per calendar year, with expiry extension.
- **Expiry processing:** Background jobs use India-calendar-day calculations and locking/status handling for expiry processing and reminders.
- **AI fallback:** The custom model service is decoupled from the main backend, with a deterministic fallback path.
- **Staff-reviewed AI drafts:** Absentee follow-up messages are drafts for staff review rather than automatic dispatch.
- **Responsive design:** Mediterranean coastal wellness visual styling is adapted for mobile, tablet and desktop.

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

### Optional AI microservice setup

```bash
cd ../memberpass-ai
python -m venv .venv

# Windows:
.venv\Scripts\activate

# Linux/macOS:
# source .venv/bin/activate

pip install -r requirements.txt
python server.py
```

### Configure settings

Create the backend environment file and configure the required values (names only listed here):

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

Run the functional suites from the repository root:

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

Live API test-suite syntax check:

```bash
node --check backend/scripts/test-live-api.js
```

SMTP test (if configured):

```bash
node backend/scripts/testSMTP.js
```

## Made-up data

The seed environment uses synthetic demo members and test records created for application testing and demonstration. The project documentation identifies the seed data as fictional. Payment testing is conducted in Razorpay Test/Sandbox mode. No real customer dataset is intended to be included in the demo seed data.

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
  - Documented automated functional suites: 74 tests passed (35 Razorpay/webhook, 20 QR/class-limit, 19 core audit), as reported in project documentation.

- **Partly done:**
  - Live API integration test script was syntax-checked, but execution against the cloud MongoDB Atlas database was restricted in the documented sandbox environment.
  - Broader external user testing beyond the documented initial peer evaluation remains to be expanded.
  - Actual end-to-end delivery verification of expiry reminders to a membership within the reminder window remains to be completed.

- **Skipped:**
  - Live Razorpay transactions; the project uses Test/Sandbox mode.
  - Real SMS/WhatsApp delivery gateway integration.
  - Physical biometric or turnstile hardware integration.

## What I would do differently with more time

- Start integration testing earlier to validate payment, QR attendance, lifecycle rules and database interactions together.
- Add secure offline QR-pass access and improved connectivity handling.
- Expand the architecture to support multiple studio locations, configurable plans and location-specific staff management.

---

## Additional project documentation

- **AI Notes:** `docs/AI_NOTES.md`
- **Progress Log:** `docs/PROGRESS.md`

**MemberPass – Smarter Membership. Better Experiences.**