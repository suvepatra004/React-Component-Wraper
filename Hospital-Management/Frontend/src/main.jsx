import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

/**
 *
 * TODO:
 *
 * [] Add api.js file - That will handle all http request methods
 * [] Add index.css file
 * [] Add Dashboard.jsx file
 * [] Add Patients.jsx file
 * [] Add Doctors.jsx file
 * [] Add Appointments.jsx file
 */
