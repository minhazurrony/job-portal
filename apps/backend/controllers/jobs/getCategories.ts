import { Request, Response } from "express";
import { query } from "../../db";

export const getCategories = async (req: Request, res: Response) => {
  try {
    // Select all jobs along with their category details
    const result = await query(`
      SELECT * from categories;
    `);

    // Check if jobs exist
    if (result.rows.length === 0) {
      res.status(404).json({ message: "No category found" });
      return;
    }

    // Return the jobs with their category
    res.status(200).json({ data: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database connection failed", error });
  }
};
