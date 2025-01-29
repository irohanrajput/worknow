import express from "express";
import {
  createJob,
  fetchJobs,
  fetchJob,
  updateJob,
  deleteJob,
  sendEmail
} from "../controllers/jobController.js";
import protect from "../middlewares/authenticate.middleware.js";

const router = express.Router();

router.post("/", protect, createJob);
router.get("/", fetchJobs);
router.get("/:id", fetchJob);
router.put("/:id", protect, updateJob);
router.delete("/:id", protect, deleteJob);
router.post("/:jobId/send-email", sendEmail, protect )
export default router;
