import { Request, Response } from "express";
import { query } from "../../db";

export const getJobs = async (req: Request, res: Response) => {
  try {
    const result = await query("SELECT * from jobs");
    res.status(200).json({ data: result?.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database connection failed" });
  }
};
