import express from "express";
import { getJobs } from "../controllers/jobs";
import { verifyToken } from "../middlewares";

const router = express.Router();

router.get("/jobs", verifyToken, getJobs);

export default router;
