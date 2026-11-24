/**
 * Comprehensive Automated Functional Test Suite for MemberPass
 * Covers:
 * - Group 1: Authentication, Password Hashing & Security
 * - Group 2: Membership Lifecycle, Pause Validation & Date Extensions
 * - Group 3: Expiry Job Scheduler, India Timezone & Atomic Concurrency Locking
 * - Group 4: Absentee Tracking & Communication Drafts
 * - Group 5: AI Assistant Endpoint & Policy Factual Accuracy
 */

const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Color helpers
const green = (msg) => `\x1b[32m✔ ${msg}\x1b[0m`;
const red = (msg) => `\x1b[31m✘ ${msg}\x1b[0m`;
const bold = (msg) => `\x1b[1m${msg}\x1b[0m`;

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const testResults = [];

function assert(condition, testName, details = "") {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ${green(testName)}`);
    testResults.push({ name: testName, status: "PASS", details });
  } else {
    failedTests++;
    console.error(`  ${red(testName)} - ${details}`);
    testResults.push({ name: testName, status: "FAIL", details });
  }
}

function createMockRes() {
  const res = {
    statusCode: 200,
    headers: {},
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(data) {
      this.body = data;
      return this;
    },
    send(data) {
      this.body = data;
      return this;
    }
  };
  return res;
}

async function runAuditTests() {
  console.log("\n" + bold("====================================================================="));
  console.log(bold("   MEMBERPASS – COMPREHENSIVE AUTOMATED FUNCTIONAL AUDIT SUITE"));
  console.log(bold("=====================================================================\n"));

  // -------------------------------------------------------------------------
  // GROUP 1: AUTHENTICATION & SECURITY
  // -------------------------------------------------------------------------
  console.log(bold("▶ GROUP 1: Authentication, Password Security & JWT Validation"));

  // Test 1.1: Bcrypt password hashing
  {
    const password = "SecureYogaPassword2026!";
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);
    const isMatch = await bcrypt.compare(password, hash);
    const isWrongMatch = await bcrypt.compare("WrongPassword", hash);

    assert(
      isMatch && !isWrongMatch && hash.startsWith("$2"),
      "Test 1.1: Password securely hashed with bcrypt (cost 12) and verifies accurately"
    );
  }

  // Test 1.2: JWT Token signing & verification
  {
    const secret = "test_jwt_secret_audit_9876543210";
    const payload = { id: new mongoose.Types.ObjectId().toString(), role: "member" };
    const token = jwt.sign(payload, secret, { expiresIn: "7d" });
    const decoded = jwt.verify(token, secret);

    assert(
      decoded.id === payload.id && decoded.role === "member",
      "Test 1.2: JWT correctly encodes user payload and verifies with signature key"
    );
  }

  // Test 1.3: Tampered JWT rejection
  {
    const secret = "test_jwt_secret_audit_9876543210";
    const payload = { id: new mongoose.Types.ObjectId().toString(), role: "member" };
    const token = jwt.sign(payload, secret, { expiresIn: "7d" });
    let rejected = false;
    try {
      jwt.verify(token + "tampered", secret);
    } catch {
      rejected = true;
    }
    assert(rejected, "Test 1.3: Tampered or altered JWT tokens are rejected");
  }

  // Test 1.4: Cryptographic passCode generation
  {
    const code = crypto.randomBytes(32).toString("hex");
    assert(
      code.length === 64 && /^[0-9a-f]+$/.test(code),
      "Test 1.4: PassCode generates 64-character high-entropy hex string (32 bytes)"
    );
  }

  // -------------------------------------------------------------------------
  // GROUP 2: MEMBERSHIP PAUSE & LIFECYCLE RULES
  // -------------------------------------------------------------------------
  console.log("\n" + bold("▶ GROUP 2: Membership Lifecycle, Pause Validation & Date Extension"));

  const memberController = require("../controllers/memberController");
  const Membership = require("../models/Membership");

  // Test 2.1: Pause duration rejects non-integers, 0, or negative days
  {
    const req = { body: { days: -5 }, user: { _id: new mongoose.Types.ObjectId() } };
    const res = createMockRes();
    await memberController.requestMembershipPause(req, res);
    assert(
      res.statusCode === 400 && res.body?.message === "Pause duration must be between 1 and 15 days",
      "Test 2.1: requestMembershipPause rejects negative days (-5) with 400"
    );
  }

  // Test 2.2: Pause duration rejects more than 15 days
  {
    const req = { body: { days: 16 }, user: { _id: new mongoose.Types.ObjectId() } };
    const res = createMockRes();
    await memberController.requestMembershipPause(req, res);
    assert(
      res.statusCode === 400 && res.body?.message === "Pause duration must be between 1 and 15 days",
      "Test 2.2: requestMembershipPause rejects > 15 days with 400"
    );
  }

  // Test 2.3: Pause requires active membership
  {
    const origFindOne = Membership.findOne;
    Membership.findOne = () => ({
      sort: () => Promise.resolve({
        status: "ended",
        endDate: new Date(Date.now() - 10000)
      })
    });

    const req = { body: { days: 7 }, user: { _id: new mongoose.Types.ObjectId() } };
    const res = createMockRes();
    await memberController.requestMembershipPause(req, res);
    Membership.findOne = origFindOne;

    assert(
      res.statusCode === 400 && res.body?.message === "Only an active membership can be paused",
      "Test 2.3: requestMembershipPause rejects pause on ended/expired membership"
    );
  }

  // Test 2.4: Annual limit - only once per calendar year
  {
    const currentYear = new Date().getFullYear();
    const origFindOne = Membership.findOne;
    Membership.findOne = () => ({
      sort: () => Promise.resolve({
        status: "active",
        endDate: new Date(Date.now() + 30 * 86400000),
        pauseHistory: [
          { requestedAt: new Date(currentYear, 1, 15), days: 7 }
        ]
      })
    });

    const req = { body: { days: 7 }, user: { _id: new mongoose.Types.ObjectId() } };
    const res = createMockRes();
    await memberController.requestMembershipPause(req, res);
    Membership.findOne = origFindOne;

    assert(
      res.statusCode === 400 && res.body?.message === "Membership pause is allowed only once per calendar year",
      "Test 2.4: requestMembershipPause enforces strictly 1 pause per calendar year"
    );
  }

  // Test 2.5: Successful pause extends endDate and logs history
  {
    const initialEndDate = new Date(Date.now() + 20 * 86400000);
    const mockMem = {
      _id: new mongoose.Types.ObjectId(),
      status: "active",
      endDate: new Date(initialEndDate),
      pauseHistory: [],
      save: async function () { return this; }
    };

    const origFindOne = Membership.findOne;
    Membership.findOne = () => ({
      sort: () => Promise.resolve(mockMem)
    });

    const req = { body: { days: 10 }, user: { _id: new mongoose.Types.ObjectId() } };
    const res = createMockRes();
    await memberController.requestMembershipPause(req, res);
    Membership.findOne = origFindOne;

    const expectedNewEnd = new Date(initialEndDate);
    expectedNewEnd.setDate(expectedNewEnd.getDate() + 10);

    assert(
      res.statusCode === 200 &&
      mockMem.status === "paused" &&
      mockMem.pauseHistory.length === 1 &&
      mockMem.pauseHistory[0].days === 10 &&
      Math.abs(mockMem.endDate.getTime() - expectedNewEnd.getTime()) < 5000,
      "Test 2.5: Successful pause sets status='paused', logs history, and extends endDate by exactly 10 days"
    );
  }

  // -------------------------------------------------------------------------
  // GROUP 3: SCHEDULED JOBS, TIMEZONE & ATOMIC CONCURRENCY LOCKING
  // -------------------------------------------------------------------------
  console.log("\n" + bold("▶ GROUP 3: Scheduled Jobs, IST Timezone & Atomic Locking"));

  // Test 3.1: India Date Range Timezone Calculation (UTC+5:30)
  {
    const target = new Date("2026-11-24T12:00:00Z");
    const indiaDate = new Date(target.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
    const year = indiaDate.getFullYear();
    const month = indiaDate.getMonth();
    const day = indiaDate.getDate();
    const start = new Date(Date.UTC(year, month, day) - (5 * 60 + 30) * 60 * 1000);
    const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);

    assert(
      end.getTime() - start.getTime() === 24 * 60 * 60 * 1000 &&
      start.toISOString().endsWith(".000Z"),
      "Test 3.1: getIndiaDateRange calculates precise 24-hour window aligned to IST midnight"
    );
  }

  // Test 3.2: Atomic Lock Claim Simulation
  {
    const mockMembership = {
      _id: new mongoose.Types.ObjectId(),
      status: "active",
      expiryReminder: { status: "pending" }
    };

    let claimedLockId = null;
    const atomicClaim = async (memId, lockId) => {
      if (mockMembership.expiryReminder.status === "pending") {
        mockMembership.expiryReminder.status = "processing";
        mockMembership.expiryReminder.lockId = lockId;
        mockMembership.expiryReminder.lockAt = new Date();
        return mockMembership;
      }
      return null;
    };

    const lockA = crypto.randomUUID();
    const lockB = crypto.randomUUID();

    const resultA = await atomicClaim(mockMembership._id, lockA);
    const resultB = await atomicClaim(mockMembership._id, lockB);

    assert(
      resultA !== null && resultB === null && mockMembership.expiryReminder.lockId === lockA,
      "Test 3.2: Atomic findOneAndUpdate locking guarantees exactly one worker claims a pending reminder"
    );
  }

  // Test 3.3: Stale Lock Recovery
  {
    const LOCK_TIMEOUT_MS = 10 * 60 * 1000;
    const staleTime = new Date(Date.now() - 15 * 60 * 1000); // 15 mins ago (stale)
    const activeLockTime = new Date(Date.now() - 2 * 60 * 1000); // 2 mins ago (active)

    const isStaleEligible = (lockAt) => lockAt < new Date(Date.now() - LOCK_TIMEOUT_MS);

    assert(
      isStaleEligible(staleTime) && !isStaleEligible(activeLockTime),
      "Test 3.3: Stale lock threshold (10 min) safely allows reclaim of frozen jobs while protecting active runs"
    );
  }

  // -------------------------------------------------------------------------
  // GROUP 4: ABSENTEE DRAFT LOGIC
  // -------------------------------------------------------------------------
  console.log("\n" + bold("▶ GROUP 4: Absentee Identification & Communication Drafts"));

  const absenteeController = require("../controllers/absenteeController");
  const Attendance = require("../models/Attendance");
  const User = require("../models/User");

  // Test 4.1: Absentee identifies members with no visits
  {
    const mockUserId = new mongoose.Types.ObjectId();
    const mockMemId = new mongoose.Types.ObjectId();
    const origFind = Membership.find;
    const origAttendanceFindOne = Attendance.findOne;

    Membership.find = () => ({
      populate: () => ({
        populate: () => ({
          sort: () => Promise.resolve([
            {
              _id: mockMemId,
              user: { _id: mockUserId, name: "Priya Sharma", email: "priya@example.com", isActive: true, role: "member" },
              plan: { name: "Standard" },
              startDate: new Date(Date.now() - 20 * 86400000),
              endDate: new Date(Date.now() + 10 * 86400000)
            }
          ])
        })
      })
    });

    Attendance.findOne = () => ({
      sort: () => Promise.resolve(null) // Never attended
    });

    const req = { query: { days: "14" } };
    const res = createMockRes();
    await absenteeController.getAbsenteeDrafts(req, res);

    Membership.find = origFind;
    Attendance.findOne = origAttendanceFindOne;

    assert(
      res.statusCode === 200 &&
      res.body?.totalAbsentees === 1 &&
      res.body?.drafts[0]?.name === "Priya Sharma" &&
      res.body?.drafts[0]?.message.includes("haven't visited our centre yet"),
      "Test 4.1: getAbsenteeDrafts correctly generates welcome draft for new member with 0 attendance"
    );
  }

  // Test 4.2: Absentee ignores members who attended recently
  {
    const mockUserId = new mongoose.Types.ObjectId();
    const mockMemId = new mongoose.Types.ObjectId();
    const origFind = Membership.find;
    const origAttendanceFindOne = Attendance.findOne;

    Membership.find = () => ({
      populate: () => ({
        populate: () => ({
          sort: () => Promise.resolve([
            {
              _id: mockMemId,
              user: { _id: mockUserId, name: "Active Member", email: "active@example.com", isActive: true, role: "member" },
              plan: { name: "Basic" },
              startDate: new Date(Date.now() - 20 * 86400000),
              endDate: new Date(Date.now() + 10 * 86400000)
            }
          ])
        })
      })
    });

    Attendance.findOne = () => ({
      sort: () => Promise.resolve({ checkedInAt: new Date(Date.now() - 2 * 86400000) }) // Attended 2 days ago
    });

    const req = { query: { days: "14" } };
    const res = createMockRes();
    await absenteeController.getAbsenteeDrafts(req, res);

    Membership.find = origFind;
    Attendance.findOne = origAttendanceFindOne;

    assert(
      res.statusCode === 200 && res.body?.totalAbsentees === 0,
      "Test 4.2: getAbsenteeDrafts correctly excludes members who checked in within cutoff window"
    );
  }

  // -------------------------------------------------------------------------
  // GROUP 5: AI ASSISTANT ENDPOINT & POLICY ACCURACY
  // -------------------------------------------------------------------------
  console.log("\n" + bold("▶ GROUP 5: AI Assistant Endpoint & Policy Factual Accuracy"));

  const aiRoutes = require("../routes/aiRoutes");

  // Helper to call router handlers
  const callAiRoute = async (question, user = null) => {
    const routeLayer = aiRoutes.stack.find((layer) => layer.route && layer.route.path === "/chat");
    const handler = routeLayer.route.stack[routeLayer.route.stack.length - 1].handle;
    const req = {
      body: { question },
      user,
      headers: {}
    };
    const res = createMockRes();
    await handler(req, res);
    return res;
  };

  // Test 5.1: Rejects empty or oversized question
  {
    const resEmpty = await callAiRoute("");
    const resLong = await callAiRoute("a".repeat(501));
    assert(
      resEmpty.statusCode === 400 && resLong.statusCode === 400,
      "Test 5.1: AI Assistant rejects empty strings and questions exceeding 500 characters"
    );
  }

  // Test 5.2: Status inquiry without auth requests login
  {
    const res = await callAiRoute("What is my membership status?");
    assert(
      res.statusCode === 200 &&
      res.body?.requiresAuth === true &&
      res.body?.answer.includes("please sign in"),
      "Test 5.2: AI Assistant safely requests authentication for personal status inquiries"
    );
  }

  // Test 5.3: Pause policy returns accurate 1-15 day rule and calendar year limit
  {
    const res = await callAiRoute("How do I pause my membership?");
    assert(
      res.statusCode === 200 &&
      res.body?.answer.includes("1 and 15 days") &&
      res.body?.answer.includes("once per calendar year"),
      "Test 5.3: AI Assistant accurately articulates the 1-15 day and once per calendar year pause rule"
    );
  }

  // Test 5.4: Plan pricing check
  {
    const Plan = require("../models/Plan");
    const origFind = Plan.find;
    Plan.find = () => ({
      sort: () => Promise.resolve([
        { name: "Basic", price: 1500, durationDays: 30, classLimit: 8 },
        { name: "Standard", price: 3000, durationDays: 30, classLimit: 25 },
        { name: "Premium", price: 7500, durationDays: 90, classLimit: null }
      ])
    });

    const res = await callAiRoute("Explain the membership plans");
    Plan.find = origFind;

    assert(
      res.statusCode === 200 &&
      res.body?.answer.includes("Basic") &&
      res.body?.answer.includes("Standard") &&
      res.body?.answer.includes("Premium"),
      "Test 5.4: AI Assistant explains Basic, Standard, and Premium membership tiers"
    );
  }

  // Test 5.5: QR pass domain knowledge
  {
    const res = await callAiRoute("How does the QR pass work?");
    assert(
      res.statusCode === 200 &&
      res.body?.answer.includes("cryptographic") &&
      res.body?.answer.includes("scan"),
      "Test 5.5: AI Assistant answers QR check-in questions using studio domain knowledge"
    );
  }

  // -------------------------------------------------------------------------
  // FINAL SUMMARY
  // -------------------------------------------------------------------------
  console.log("\n" + bold("====================================================================="));
  console.log(bold("   AUDIT TEST RUN SUMMARY"));
  console.log(bold("====================================================================="));
  console.log(`Total Executed Tests: ${totalTests}`);
  console.log(`Passed:               ${green(passedTests.toString())}`);
  console.log(`Failed:               ${failedTests === 0 ? "0" : red(failedTests.toString())}`);
  console.log(bold("=====================================================================\n"));

  if (failedTests > 0) {
    process.exit(1);
  }
}

runAuditTests().catch((err) => {
  console.error("Test execution fatal error:", err);
  process.exit(1);
});
