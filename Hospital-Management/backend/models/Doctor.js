const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    specialization: { type: String, require: true },
    phone: { type: Number, require: true },
    email: { type: String, require: true },
    experience: { type: String, default: 0 },
    consultFee: { type: String, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Doctor", doctorSchema);
