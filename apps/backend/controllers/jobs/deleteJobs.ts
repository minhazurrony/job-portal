import { Request, Response } from "express";
import { query } from "../../db"; // Adjust the path to your query method

export const deleteJobs = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { jobId } = req.body;

  try {
    // Check if the job exists before deleting
    const checkJob = await query("SELECT * FROM jobs WHERE id = $1", [jobId]);

    if (checkJob.rows.length === 0) {
      res.status(404).json({ message: "Job not found" });
    }

    // Delete the job by ID
    const result = await query("DELETE FROM jobs WHERE id = $1 RETURNING id;", [
      jobId,
    ]);

    if (result.rowCount === 0) {
      res.status(500).json({ message: "Failed to delete the job" });
    }

    // Return a success response
    res
      .status(200)
      .json({ message: `Job with ID ${jobId} deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database connection failed" });
  }
};
