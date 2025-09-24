import jwt from "jsonwebtoken";
import Company from "../models/CompanyModel.js";
import sendEmail from "../utils/emailService.js";

export const registerCompany = async (req, res) => {
  let { name, email, password, phone } = req.body;
  email = email.toLowerCase(); // Convert email to lowercase
  try {
    const existingCompany = await Company.findOne({ email });
    if (existingCompany)
      return res
        .status(400)
        .json({ message: "A Company with same email is already registered" });

    const company = await Company.create({ name, email, password, phone });

    const verificationToken = jwt.sign(
      { id: company._id, email: email },
      process.env.JWT_EMAIL_SECRET, // Dedicated secret
      { expiresIn: "1h" }
    );

    const verificationLink = `${process.env.CLIENT_URL}/verify-email/${company._id}/${verificationToken}`;

    sendEmail(
      email,
      "workNow account sign-up verification",
      `<h1>Click on the link below to verify your email</h1>
      <a href="${verificationLink}">Verify email</a>`
    );

    res
      .status(201)
      .json({ message: `Company registered. Please verify your email.` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { id, token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_EMAIL_SECRET);

    if (decoded.id !== id) {
      return res.status(400).json({ message: "Invalid token" });
    }

    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    if (company.verified) {
      return res.status(400).json({ message: "Email already verified" });
    }

    company.verified = true;
    await company.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(400).json({ message: "Verification token expired" });
    }
    res.status(500).json({ message: error.message });
  }
};

export const loginCompany = async (req, res) => {
  let { email, password } = req.body;
  email = email.toLowerCase();
  try {
    const company = await Company.findOne({ email });
    if (!company) return res.status(404).json({ message: "Company not found" });

    //using the method we created in Company model to compare the password
    const passwordOkay = await company.matchPassword(password);
    if (!passwordOkay)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: company._id }, process.env.JWT_LOGIN_SECRET, {
      expiresIn: "15d",
    });

    res.status(200).json({
      message: "logged in successfully",
      accessToken: token,
      companyName: company.name,
      companyObjectId: company._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
