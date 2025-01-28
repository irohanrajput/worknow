import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const sendMail = async (userEmail, subject, content) => {
  //1. create an email transportr
  // SMTP (Simple Mail Transfer Protocol)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  //2. Config email content
  const mailOption = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: subject,
    html: content,
  };

  //3. Send Mail
  try {
    const result = await transporter.sendMail(mailOption);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default sendMail;
