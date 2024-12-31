import express from "express";
import {
  deleteJobs,
  getCategories,
  getJobs,
  postJobs,
} from "../controllers/jobs";
import { validateInput, verifyToken } from "../middlewares";
import { jobSchema } from "../schemas";

const router = express.Router();

router.get("/jobs", verifyToken, getJobs);
router.delete("/jobs", verifyToken, deleteJobs);
router.post("/jobs", verifyToken, validateInput(jobSchema), postJobs);
router.get("/categories", verifyToken, getCategories);

export default router;
