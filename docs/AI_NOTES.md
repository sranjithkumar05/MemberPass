# MemberPass – AI Architecture & Implementation Notes

## 1. Overview

MemberPass incorporates a dual-tier intelligent assistance architecture designed for wellness and yoga membership management:
1. **Domain Microservice (`memberpass-ai`)**: A dedicated lightweight PyTorch sequence model serving NLP chat responses over FastAPI.
2. **Backend Contextual Intelligence (`backend/routes/aiRoutes.js`)**: A Node.js Express orchestration layer that handles authenticated membership queries, live database lookups, security guardrails, and deterministic studio policy enforcement.

---

## 2. Model Specifications & Microservice Architecture

* **Model Class Name**: `MemberPassGPT` (defined in `memberpass-ai/models/model.py`)
* **Framework**: PyTorch (`torch.nn`)
* **Architecture**:
  - **Token Embedding Layer**: `nn.Embedding(vocab_size, embedding_dim=128)`
  - **Recurrent Core**: Gated Recurrent Unit (`nn.GRU(embedding_dim=128, hidden_dim=256, batch_first=True)`)
  - **Projection Head**: Linear output layer (`nn.Linear(hidden_dim=256, vocab_size)`)
* **Trained Weights Checkpoint**: `memberpass-ai/checkpoints/memberpass_model.pth`
* **Device Target**: CPU / CUDA (configured with CPU map-location fallback in `server.py`)
* **Microservice Framework**: FastAPI / Uvicorn running on port 8000
  - `GET /` — Service status check
  - `GET /health` — Health check returning `model_loaded: true` and device target
  - `POST /chat` — Chat inference accepting `{ "question": str }` with length validation (1–500 chars)
* **Training Dataset**: `memberpass-ai/data/memberpass_qa.jsonl` (FAQ and domain rules for studio facilities, pass validation, and renewal policies)

---

## 3. Backend Routing & Intelligent Fallback Engine

The Express backend (`backend/routes/aiRoutes.js`) exposes `POST /api/ai/chat` with optional JWT authentication (`optionalAuth`). It processes inquiries through a prioritized evaluation pipeline:

### Priority 1: Live Authenticated Membership Status
- Triggered by queries matching: *"membership status"*, *"my status"*, *"check my status"*.
- **Auth Gate**: If unauthenticated, prompts the user to sign in to protect member privacy.
- **Data Lookup**: Fetches latest membership via `Membership.findOne({ user: req.user._id }).sort({ createdAt: -1 }).populate("plan")`.
- **Response**: Formatted breakdown of plan tier, active/paused status, classes attended, expiry date, and digital pass readiness.

### Priority 2: Verified Attendance Records & Class Counts
- Triggered by queries matching: *"classes attended"*, *"how many classes"*, *"attendance history"*, *"classes left"*.
- **Data Lookup**: Aggregates `Attendance.countDocuments({ member: req.user._id })` and computes `classLimit - classesUsed`.
- **Response**: Accurate count of sessions attended, remaining sessions, and lifetime studio check-ins.

### Priority 3: Expiry Date Calculations
- Triggered by queries matching: *"expire"*, *"expiry"*, *"valid until"*, *"end date"*.
- **Computation**: Formats `endDate` in Indian locale and computes calendar days remaining until renewal.

### Priority 4: Verified Tier Pricing & Inclusions
- Triggered by queries matching: *"plans"*, *"pricing"*, *"tiers"*, *"cost"*.
- **Dynamic Lookup**: Queries active plans from MongoDB (`Plan.find({ isActive: true })`) with deterministic fallback to studio tiers:
  1. **Basic Plan (₹1,500 / 30 Days)** — 8 classes, encrypted QR pass, attendance tracking.
  2. **Standard Plan (₹3,000 / 30 Days)** — 25 classes, priority booking, flexible scheduling.
  3. **Premium Plan (₹7,500 / 90 Days)** — Unlimited sessions, wellness consultations, 90-day extended validity.

### Priority 5: Studio Policy Enforcement (Membership Pause)
- Triggered by queries matching: *"pause"*, *"freeze"*, *"hold"*, *"suspend"*.
- **Accurate Policy**: Formulates the exact business logic enforced by `memberController.js`:
  - Pause duration: **1 to 15 days**.
  - Frequency limit: **Strictly once per calendar year**.
  - Effect: Automatically shifts `endDate` forward by the paused duration without extra fees.

### Priority 6: External Microservice Forwarding
- For general natural language inquiries, the backend forwards the prompt to `http://127.0.0.1:8000/chat` with an `AbortSignal.timeout(4000)`.
- If the FastAPI microservice is offline or times out, the backend gracefully falls back to deterministic studio knowledge responses without failing the request.

---

## 4. AI Absentee Draft Intelligence

Implemented in `backend/controllers/absenteeController.js` (`GET /api/staff/absentees`):
- Scans active memberships (`status: "active"`, `endDate >= now`) whose last check-in exceeds a configurable threshold (default: 14 days, clamped between 1 and 365).
- Generates personalized draft re-engagement communications for studio staff:
  - **New Members with 0 Visits**: Welcome and orientation message offering assistance scheduling their first session.
  - **Inactive Members with Past Visits**: Consistency encouragement message referencing the exact number of days since their last visit.
- Accessible exclusively to staff/admin roles (`staffOnly` middleware).

---

## 5. Security & Privacy Guardrails

- **Zero Credential Exposure**: Passwords, bcrypt hashes, JWT secrets, and payment tokens are excluded from all AI responses and logs.
- **RBAC & PII Isolation**: Attendance history and personal status are strictly gated behind verified JWT tokens; members cannot query other members' records.
- **Input Sanitization**: Max question length is enforced at 500 characters to prevent prompt injection and buffer overflow.
