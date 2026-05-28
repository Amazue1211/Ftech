import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDb from "./config/mongodb.js";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";
import dns from "dns";
import waitlistRoutes from "./routes/waitlistRoutes.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);
dns.setDefaultResultOrder("ipv4first");
const app = express();
const port = process.env.PORT || 4000;

// 🔌 Connect Database
connectDb();

// 🧠 Middlewares
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = ["http://localhost:5173"]; // Update with your frontend URL
// 🌍 CORS setup (important for frontend)
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

// 🏠 Test route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// 🔐 AUTH ROUTES
// app.use("/api/auth", authRouter);
// app.use("/api/auth/user", userRouter);
// app.use("/api", waitlistRoutes);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api", waitlistRoutes);
// ❌ 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// 🚀 Start server
app.listen(port, () => {
  console.log(`Server running on PORT ${port}`);
});
