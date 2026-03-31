const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    age: { type: Number, require: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], require: true },
    phone: { type: Number, require: true },
    bloodGroup: { type: String, default: "" },
    address: { type: String, default: "" },
    status: { type: String, enum: ["Active", "Discharged"], default: "Active" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Patient", patientSchema);
