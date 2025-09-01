import UserModel from "../../models/auth/authUser.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { name, email, dob } = req.body;

  try {
    if (!name || !email || !dob) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already registered" });
    }

    const hashedPassword = await bcrypt.hash(dob, 10);
    const user = await UserModel.create({
      name,
      email,
      dob: hashedPassword,
    });

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET ,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, 
    });

    const { password: _, ...userData } = user.toObject();

    console.log(`User created successfully: ${user.email}`);
    return res
      .status(201)
      .json({ message: "User created successfully", user: userData });
  } catch (error) {
    console.error("Error during signup controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
