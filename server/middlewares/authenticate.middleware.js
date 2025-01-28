import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Company from "../models/CompanyModel.js";

dotenv.config();

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_LOGIN_SECRET);

      const company = await Company.findById(decoded.id).select("-password");
      if (!company) {
        return res.status(404).json({ message: "Company not found" });
      }

      if (!company.verified) {
        return res
          .status(403)
          .json({ message: "Please verify your email first" });
      }

      req.company = company;
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid or expired token" });
    }
  } else {
    res.status(401).json({ message: "Unauthorized: No token provided" });
  }
};

export default protect;
