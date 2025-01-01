import express, { Application } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import jobsRoutes from "./routes/jobs";
import cors from "cors";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors());

// Add a base path for API routes
app.use("/api", (req, res, next) => {
  next();
});

app.use("/api", authRoutes);
app.use("/api", jobsRoutes);

// Error handling middleware (optional)
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

export default app;
