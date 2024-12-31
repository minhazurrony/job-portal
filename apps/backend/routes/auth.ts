import express from "express";
import { validateInput } from "../middlewares";
import { signInSchema, signUpSchema } from "../schemas";
import { signIn, signUp } from "../controllers/auth";

const router = express.Router();

router.post("/sign-up", validateInput(signUpSchema), signUp);
router.post("/sign-in", validateInput(signInSchema), signIn);

export default router;
