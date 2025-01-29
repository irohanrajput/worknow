import Job from "../models/JobModel.js";

export const createJob = async (req, res) => {
  const { title, description, experience, endDate } = req.body;
  try {
    // Check if company is verified
    if (!req.company.verified) {
      return res.status(403).json({
        message:
          "Only verified companies can create jobs. Please verify your account first.",
      });
    }

    const job = await Job.create({
      title,
      description,
      experience,
      endDate,
      company: req.company._id,
    });
    res.status(201).json({ job });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//fetching all jobs
export const fetchJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("company", "name email phone");
    res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//fetching a single job
export const fetchJob = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await Job.findById(id).populate("company", "name email phone");
    res.status(200).json({ job });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//updating a job
export const updateJob = async (req, res) => {
  const { id } = req.params;
  const { title, description, experience, endDate } = req.body;
  try {
    const job = await Job.findByIdAndUpdate(
      id,
      { title, description, experience, endDate },
      { new: true }
    );
    res.status(200).json({ job });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//deleting a job

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  try {
    await Job.findByIdAndDelete(id);
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
