import { Request, Response } from "express";
import { signUpSchema } from "../../schemas";
import { z } from "zod";
import { query } from "../../db";
import bcrypt from "bcryptjs";

// Infer the type of the request body from the Zod schema
type SignUpRequestBody = z.infer<typeof signUpSchema>;

export const signUp = async (
  req: Request<{}, {}, SignUpRequestBody>,
  res: Response
): Promise<void> => {
  const { email, name, password } = req.body;

  try {
    // Check if email already exists
    const result = await query(
      `SELECT EXISTS (SELECT 1 FROM users WHERE email = $1);`,
      [email]
    );

    const emailExists = result.rows[0].exists;

    if (emailExists) {
      res.status(400).json({ message: "User already exists with this email" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database and get the user ID
    const insertResult = await query(
      `INSERT INTO users (name, email, password) 
       VALUES ($1, $2, $3) 
       RETURNING id, name, email;`,
      [name, email, hashedPassword]
    );

    const newUser = insertResult.rows[0]; // The new user's data

    // Return success response with the user data
    res.status(201).json({
      message: "User created successfully",
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error during sign-up:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
