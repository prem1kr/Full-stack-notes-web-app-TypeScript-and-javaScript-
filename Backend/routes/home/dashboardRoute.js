import express from "express";
import { profile } from "../../controllers/home/dashboardController.js";
const dashboardRouter = express.Router();

dashboardRouter.get("/profile/:id", profile);
export default dashboardRouter;