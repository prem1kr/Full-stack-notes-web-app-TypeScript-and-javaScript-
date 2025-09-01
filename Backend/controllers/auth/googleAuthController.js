import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import UserModel from "../../models/auth/authUser.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleSignup = async (req, res) => {
  const { token } = req.body;

  try {
    if (!token)
      return res.status(400).json({ message: "Google token is required" });

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload)
      return res.status(400).json({ message: "Invalid Google token" });

    const { email, name, sub: googleId } = payload; 
    const normalizedEmail = email.toLowerCase();

    
    let user = await UserModel.findOne({ email: normalizedEmail });
    if (!user) {
      user = await UserModel.create({
        name,
        email: normalizedEmail,
        authType: "google",   
        googleId,            
      });
    }

    const jwtToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Google signup/login successful",
      token: jwtToken,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Google signup error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
