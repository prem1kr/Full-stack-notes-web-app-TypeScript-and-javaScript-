import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth/authRoute.js";
import connectDB from "./config/db.js";
import dashboardRouter from "./routes/home/dashboardRoute.js";
import notesRouter from "./routes/notes/notesRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use(cors({
  origin: "https://notes-r1xt.onrender.com", 
  credentials: true,
}));

const PORT = process.env.PORT || 5000;

app.use("/api", authRouter);
app.use("/api", dashboardRouter);
app.use("/api", notesRouter);

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});

app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  connectDB();
});
