import express, { Request, Response } from "express";
import { query } from "../db";

const router = express.Router();

router.get("/jobs", async (req: Request, res: Response) => {
  try {
    const result = await query("SELECT * from jobs");
    res.status(200).json({ data: result?.rows });
  } catch (error) {
    console.error(error);
    res.status(500).send("Database connection failed");
  }
});

export default router;
