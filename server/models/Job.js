import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import e from "express";

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
            enum:['beginner','intermediate','expert'],
            required: [true, "no experience provided"],
        },
        endDate: {
            type: Date,
            required: [true, "no end date provided"],
        },
        candidates:
        [{type:String}],
        company: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Company',
        }
    },
    { timestamps: true }
)

const Job = mongoose.model("Job", jobSchema);
export default Job;