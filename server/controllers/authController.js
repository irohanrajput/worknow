import jwt from "jsonwebtoken";
import Company from "../models/Company.js";
import sendEmail from "../utils/emailService.js";

export const registerCompany = async (req, res) => {
  const { name, email, password, phone } = req.body;
  try {
    const existingCompany = await Company.findOne({ email });
    if (existingCompany)
      return res
        .status(400)
        .json({ message: "A Company with same email is already registered" });

    const company = await Company.create({ name, email, password, phone });

    const verificationLink = `${process.env.CLIENT_URL}/api/auth/verify-email/${company._id}`;

    sendEmail(
      email,
      "jobs21 account sign-up verification",
      `<h1>Click on the link below to verify your email</h1>
      <a href="${verificationLink}">Verify email</a>`
      
    );

    res
      .status(201)
      .json({ message: "Company registered. Please verify your email." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginCompany = async (req, res) => {
  const { email, password } = req.body;
  try {
    const company = await Company.findOne({ email });
    if (!company) return res.status(404).json({ message: "Company not found" });

    //using the method we created in Company model to compare the password
    const passwordOkay = await company.matchPassword(password);
    if (!passwordOkay)
      return res.status(400).json({ message: "Invalid credentials" });

    console.log(company._id);
    const token = jwt.sign({ id: company._id }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { id } = req.params;
  console.log("we hit this route");
  console.log(id);
  console.log(req.params);
  try {
    const company = await Company.findById(id);
    if (!company) return res.status(404).json({ message: "Company not found" });

    company.verified = true;
    await company.save();

    res.status(200).json({ message: "Email verified" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
