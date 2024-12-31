import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

interface CustomRequest extends Request {
  user?: JwtPayload;
}

export const verifyToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Get the token from Authorization header
    const authHeader = req.headers.authorization;

    // If no token is provided
    if (!authHeader) {
      res.status(401).json({ message: "Access token is required" });
      return;
    }

    // Extract the token from the "Bearer <token>" format
    const token = authHeader.split(" ")[1];

    // If token is missing after splitting
    if (!token) {
      res.status(401).json({ message: "Invalid token format" });
      return;
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
      }

      // Attach the decoded user info to the request object

      req.user = decoded as JwtPayload;

      // Proceed to the next middleware or route handler
      next();
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
