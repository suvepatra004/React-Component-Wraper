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
 * [x] Add api.js file - That will handle all http request methods
 * [x] Add index.css file
 * [x] Add Dashboard.jsx file
 * [x] Add Patients.jsx file
 * [x] Add Doctors.jsx file
 * [x] Add Appointments.jsx file
 *
 * FIXME:
 * [] Fixing the Mongodb IP connection
 * [] Fix Frontend running PORT
 */
