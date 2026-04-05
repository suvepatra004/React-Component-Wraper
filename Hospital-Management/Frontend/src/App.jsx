import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";

export default function App() {
  return (
    <BrowserRouter>
      <div className="layout">
        <aside className="sidebar">
          <div className="sidebar-title">Mo Hospital</div>
          <nav>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                "nav-link" + (isActive ? " active" : "")
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/patients"
              className={({ isActive }) =>
                "nav-link" + (isActive ? " active" : "")
              }
            >
              Patients
            </NavLink>
            <NavLink
              to="/doctors"
              className={({ isActive }) =>
                "nav-link" + (isActive ? " active" : "")
              }
            >
              Doctors
            </NavLink>
            <NavLink
              to="/appointments"
              className={({ isActive }) =>
                "nav-link" + (isActive ? " active" : "")
              }
            >
              Appointments
            </NavLink>
          </nav>
        </aside>

        <main className="main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/appointments" element={<Appointments />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
