import express from "express";
import { signup } from "../../controllers/auth/SignupController.js";
import { googleSignup } from "../../controllers/auth/googleAuthController.js";
import { sendOtp, verifyOtp } from "../../controllers/auth/otpController.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);

authRouter.post("/google-signup", googleSignup);


authRouter.post("/send-otp", sendOtp);
authRouter.post("/verify-otp", verifyOtp);

export default authRouter;
