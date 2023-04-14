import express from "express";
import { GoogleSignUp, SignIn, SignUp } from "../controllers/Auth.js";

const router = express.Router();

// CREATE USER
router.post("/signUp", SignUp);

// SIGN IN
router.post("/signIn", SignIn);

// GOOGLE AUTH
router.post("/google", GoogleSignUp);

export default router;
