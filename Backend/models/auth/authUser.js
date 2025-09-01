import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      default: "User",
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      index: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },

    dob: {
      type: Date,
      required: false, 
    },

    authType: {
      type: String,
      enum: ["otp", "google"],
      default: "otp",
      index: true,
    },

    googleId: { type: String, default: null },
    phone: { type: String, default: null },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
