import jwt from "jsonwebtoken";
import redis from "../../utils/redisClient.js";
import { sendEmail } from "../../utils/sendEmail.js";
import UserModel from "../../models/auth/authUser.js";
import dotenv from "dotenv";

dotenv.config();
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ message: "Email is required" });
    }

    const normalizedEmail = email.toLowerCase();

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await redis.setex(
      `otp:${normalizedEmail}`,
      300,
      JSON.stringify({ otp })
    );

    await sendEmail(normalizedEmail, "Your OTP Code", `Your OTP is: ${otp}`);

    return res.status(200).json({ message: "OTP sent successfully" });

  } catch (error) {
    console.error("Send OTP error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


export const verifyOtp = async (req, res) => {
  try {
    const { email, otp, name, dob } = req.body; 
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const normalizedEmail = email.toLowerCase();

    const storedDataStr = await redis.get(`otp:${normalizedEmail}`);
    if (!storedDataStr) {
      return res.status(401).json({ message: "Invalid or expired OTP" });
    }

    const storedData = JSON.parse(storedDataStr);

    if (storedData.otp !== otp) {
      return res.status(401).json({ message: "Invalid or expired OTP" });
    }

    await redis.del(`otp:${normalizedEmail}`);

    let user = await UserModel.findOne({ email: normalizedEmail });

    if (!user) {
      user = await UserModel.create({
        name: name,
        dob,

        email: normalizedEmail,
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, dob:user.dob },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "OTP verified successfully",
      token,
      user: { id: user._id, email: user.email, name: user.name, dob:user.dob },
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

