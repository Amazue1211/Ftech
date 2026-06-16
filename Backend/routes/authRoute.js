<<<<<<< HEAD
import express from "express";
import { isAuthenticated, login, logout, register, resetPassword, sendResetOtp, sendVerifyOtp, verifyEmail } from "../Controllers/authControllers.js";
import userAuth from "../middleware/userAuth.js";
// import { verify } from "jsonwebtoken";

const authRouter = express.Router();

/**
 * AUTH ROUTES
 */

// Register user
authRouter.post("/register", register);

// Login user
authRouter.post("/login", login);

// Logout user
authRouter.post("/logout", logout);
authRouter.post("/sendverifyotp", userAuth, sendVerifyOtp);
authRouter.post("/verify-account", userAuth, verifyEmail);
authRouter.post("/is-auth", userAuth, isAuthenticated);
authRouter.post("/send-reset-otp", userAuth, sendResetOtp);
authRouter.post("/reset-password", userAuth, resetPassword);
// Test route (optional but useful for debugging)
authRouter.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Auth routes are working 🚀",
  });
});

=======
import express from "express";
import { isAuthenticated, login, logout, register, resetPassword, sendResetOtp, sendVerifyOtp, verifyEmail } from "../Controllers/authControllers.js";
import userAuth from "../middleware/userAuth.js";
// import { verify } from "jsonwebtoken";

const authRouter = express.Router();

/**
 * AUTH ROUTES
 */

// Register user
authRouter.post("/register", register);

// Login user
authRouter.post("/login", login);

// Logout user
authRouter.post("/logout", logout);
authRouter.post("/sendverifyotp", userAuth, sendVerifyOtp);
authRouter.post("/verify-account", userAuth, verifyEmail);
authRouter.post("/is-auth", userAuth, isAuthenticated);
authRouter.post("/send-reset-otp", userAuth, sendResetOtp);
authRouter.post("/reset-password", userAuth, resetPassword);
// Test route (optional but useful for debugging)
authRouter.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Auth routes are working 🚀",
  });
});

>>>>>>> aa51118b5fc82e586cfec19823be6acebdc7a04d
export default authRouter;