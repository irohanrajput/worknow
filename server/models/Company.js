import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "provide name please"],
    },
    email: {
      type: String,
      required: [true, "provide email please"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password not provided"],
    },
    verified: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      required: [true, "phone number not provided"],
    },
  },
  { timestamps: true }
);

//hashing the passwd

companySchema.pre("save", async (next) => {
  if (!this.isModified("password")) return next();
  const generatedSalt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, generatedSalt);
});

// creating a method to match the password in future

companySchema.methods.matchPassword = async (enteredPassword) => {
  return await bcrypt.compare(enteredPassword, this.password);
}

const Company = mongoose.model("Company", companySchema);
export default Company;