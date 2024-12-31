import { Request, Response } from "express";
import { query } from "../../db";

export const getJobs = async (req: Request, res: Response) => {
  try {
    const { id } = req.query; // Extract `id` from query parameters

    // Base query to get jobs along with their category details
    let queryText = `
      SELECT 
        jobs.id, 
        jobs.designation, 
        jobs.type, 
        jobs.location, 
        jobs.shift, 
        jobs.overview, 
        jobs.responsibilities, 
        jobs.requirements, 
        jobs.qualifications, 
        jobs.office_location, 
        jobs.salary, 
        jobs.created_at, 
        jobs.company, 
        categories.name AS category_name
      FROM jobs
      JOIN categories ON jobs.category_id = categories.id
    `;

    // Add a WHERE clause if `id` is provided
    const queryParams: any[] = [];
    if (id) {
      queryText += ` WHERE jobs.id = $1`;
      queryParams.push(id);
    }

    const result = await query(queryText, queryParams);

    // Check if jobs exist
    if (result.rows.length === 0) {
      res.status(404).json({ message: "No jobs found" });
      return;
    }

    // Return the jobs with their category
    res.status(200).json({ data: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database connection failed", error });
  }
};
