import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const MONGO = process.env.MONGO_URL;

if (!MONGO) {
  throw new Error(" MONGO_URL is not defined in environment variables");
}

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO);
    console.log(" MongoDB connected successfully");
  } catch (error) {
    if (error instanceof Error) {
      console.error(" MongoDB connection error:", error.message);
    } else {
      console.error("MongoDB connection error:", error);
    }
    process.exit(1);
  }
};

export default connectDB;
