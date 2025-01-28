import express from "express";
import { registerCompany, loginCompany, verifyEmail } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerCompany);
router.post("/login", loginCompany); 
router.get("/verify-email/:id/:token", verifyEmail); 

export default router;