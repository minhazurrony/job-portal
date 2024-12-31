import { Request, Response } from "express";
import { query } from "../../db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Login function
export const signIn = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    // Check if user exists by email
    const result = await query(
      `SELECT id, name, email, password FROM users WHERE email = $1;`,
      [email]
    );

    const user = result.rows[0];

    // If user doesn't exist, return an error
    if (!user) {
      res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If passwords don't match, return an error
    if (!passwordMatch) {
      res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate the JWT token
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      process.env.JWT_SECRET!, // Secret key from .env file
      { expiresIn: process.env.JWT_EXPIRATION } // Token expiration
    );

    // Return success response with user data (excluding password)
    res.status(200).json({
      message: "Login successful",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        access_token: token,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
