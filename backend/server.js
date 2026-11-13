
const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// ==========================================
// ENVIRONMENT CONFIGURATION
// ==========================================

dotenv.config({
  path: path.join(__dirname, ".env")
});

if (!process.env.MONGO_URI) {
  dotenv.config();
}

// ==========================================
// IMPORTS
// ==========================================

const connectDB = require("./config/db");

const app = express();

// ==========================================
// ALLOWED FRONTEND ORIGINS
// ==========================================

const allowedOrigins = [
  "https://member-pass-psi.vercel.app",
  "http://localhost:5173",
  "http://127.0.0.1:5173"
];

// ==========================================
// CORS CONFIGURATION
// ==========================================

const corsOptions = {
  origin: (origin, callback) => {

    // Allow requests without Origin header
    if (!origin) {
      return callback(null, true);
    }

    // Allow approved frontend origins
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.error(`CORS blocked for origin: ${origin}`);

    return callback(
      new Error(`CORS blocked for origin: ${origin}`)
    );
  },

  methods: [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS"
  ],

  allowedHeaders: [
    "Content-Type",
    "Authorization"
  ],

  credentials: true,

  optionsSuccessStatus: 204
};

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));

// ==========================================
// API ROUTES
// ==========================================

app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/plans", require("./routes/planRoutes"));

app.use("/api/payments", require("./routes/paymentRoutes"));

app.use("/api/member", require("./routes/memberRoutes"));

app.use("/api/qr", require("./routes/qrRoutes"));

app.use("/api/ai", require("./routes/aiRoutes"));

// ==========================================
// HOME ROUTE
// ==========================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to MemberPass API"
  });
});

// ==========================================
// HEALTH CHECK ROUTE
// ==========================================

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "MemberPass server is running",
    frontend: "https://member-pass-psi.vercel.app"
  });
});

// ==========================================
// 404 HANDLER
// ==========================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found"
  });
});

// ==========================================
// ERROR HANDLER
// ==========================================

app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);

  if (err.message.startsWith("CORS blocked")) {
    return res.status(403).json({
      success: false,
      message: "CORS policy blocked this request"
    });
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

// ==========================================
// START SERVER
// ==========================================

const startServer = async () => {
  try {

    await connectDB();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {

      console.log(`Server running on port ${PORT}`);

      console.log("--------------------------------");

      console.log("MemberPass Backend Started");

      console.log("Backend URL:");
      console.log("https://memberpass-gdur.onrender.com");

      console.log("--------------------------------");

      console.log("Allowed Frontend Origins:");

      allowedOrigins.forEach((origin) => {
        console.log(`- ${origin}`);
      });

      console.log("--------------------------------");
    });

  } catch (error) {

    console.error(
      "Server startup failed:",
      error.message
    );

    process.exit(1);
  }
};

startServer();
