import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "no title provided"],
    },
    description: {
      type: String,
      required: [true, "no description provided"],
    },
    experience: {
      type: String,
      enum: ["beginner", "intermediate", "expert"],
      required: [true, "no experience provided"],
    },
    endDate: {
      type: Date,
      required: [true, "no end date provided"],
    },
    candidates: [{ type: String }],
    company: {
      type: mongoose.Schema.Types.ObjectId,
      required: true, 
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;
