const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to Mongodb Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("DB Connection Failed: " + err.message));

// Models
const Patient = require("./models/Patient");
const Doctor = require("./models/Doctor");
const Appointment = require("./models/Appointment");

// ---------- Patient Routes ----------
app.get("/api/patients", async (req, res) => {
  const patients = await Patient.find().sort({ createdAt: -1 });
  res.json(patients);
});

app.post("/api/patients/", async (req, res) => {
  const patients = await Patient.create(req.body);
  res.status(201).json(patients);
});

app.put("/api/patients/:id", async (req, res) => {
  const updatedPatient = await Patient.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    },
  );
  res.json(updatedPatient);
});

app.delete("/api/patients/:id", async (req, res) => {
  await Patient.findByIdAndDelete(req.params.id);
  res.json({ message: `Patient deleted successfully.` });
});

// -------- Doctor Routes ------------
app.get("/api/doctors", async (req, res) => {
  const doctor = await Doctor.find().sort({ name: 1 });
  res.json(doctor);
});

app.post("/api/doctors", async (req, res) => {
  const doctor = await Doctor.create(req.body);
  res.status(201).json(doctor);
});

app.put("/api/doctors/:id", async (req, res) => {
  const updatedDoctor = await Doctor.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    },
  );
  res.json(updatedDoctor);
});

app.delete("/api/doctors/:id", async (req, res) => {
  await Doctor.findByIdAndDelete(req.params.id);
  res.json({ message: `${req.body} deleted successfully` });
});

// ----------- Appointment Routes ------------
app.get("/api/appointments", async (req, res) => {
  const appointments = await Appointment.find()
    .populate("patient", "name")
    .populate("doctor", "name specialization")
    .sort({ createdAt: -1 });

  res.json(appointments);
});

app.post("/api/appointments", async (req, res) => {
  const appointment = await Appointment.create(req.body);
  res.status(201).json(appointment);
});

app.put("/api/appointments/:id", async (req, res) => {
  const updatedAppointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
  );
  res.json(updatedAppointment);
});

app.delete("/api/appointments/:id", async (req, res) => {
  await Appointment.findByIdAndDelete(req.params.id);
  res.json({ message: `${req.body} deleted successfully` });
});

// Dashboard Stats
app.get("/api/stats", async (req, res) => {
  const [patients, doctors, appointments] = await Promise.all([
    Patient.countDocuments(),
    Doctor.countDocuments(),
    Appointment.countDocuments(),
  ]);
  res.json({ patients, doctors, appointments });
});
// Connection to PORT=5000
app.listen(5000 || process.env.PORT, () => {
  console.log(`Server is running at PORT ${process.env.PORT}`);
});

/**
 * TODO:
 *
 * [x] Adding routes and routes handlers (Patients, Doctors, Appointments)
 * [x] Validate Patient routes (Postman) get/post/put/delete
 * [x] Validate Doctors routes (Postman) get/post/put/delete
 * [] Validate Appointments routes (Postman) get/post/put/delete
 * [] Add Error Handlers to routes (Patients, Doctors, Appointments)
 */
