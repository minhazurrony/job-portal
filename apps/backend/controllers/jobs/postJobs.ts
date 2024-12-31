import { Request, Response } from "express";
import { query } from "../../db"; // Adjust the path to your query method

export const postJobs = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      company,
      designation,
      type,
      location,
      shift,
      overview,
      responsibilities,
      requirements,
      qualifications,
      office_location,
      salary,
      category_id,
    } = req.body;

    // Insert the job data into the jobs table
    const result = await query(
      `INSERT INTO jobs 
        (company, designation, type, location, shift, overview, responsibilities, 
         requirements, qualifications, office_location, salary, category_id)
        VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) 
        RETURNING id, company, designation, location, salary, category_id;`,
      [
        company,
        designation,
        type,
        location,
        shift,
        overview,
        responsibilities,
        requirements,
        qualifications,
        office_location,
        salary,
        category_id,
      ]
    );

    // Return success response with the newly created job
    const newJob = result.rows[0];
    res.status(201).json({
      message: "Job created successfully",
      data: {
        id: newJob.id,
        company: newJob.company,
        designation: newJob.designation,
        location: newJob.location,
        salary: newJob.salary,
        category_id: newJob.category_id,
      },
    });
  } catch (error) {
    console.error("Error while inserting job:", error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
};
