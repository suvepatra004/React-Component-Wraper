import { useEffect, useState } from "react";
import api from "../api";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/stats")
      .then((res) => setStats(res.data))
      .catch(() => setError("Could not load stats. Is the backend running?"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ color: "#6b7280" }}>Loading…</p>;

  return (
    <div>
      <h1 className="page-title">Dashboard</h1>

      {error && <div className="alert alert-error">{error}</div>}

      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <p className="stat-label">Total Patients</p>
            <p className="stat-value">{stats.patients}</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Total Doctors</p>
            <p className="stat-value">{stats.doctors}</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Appointments</p>
            <p className="stat-value">{stats.appointments}</p>
          </div>
        </div>
      )}

      <div className="table-wrap" style={{ padding: "20px" }}>
        <h2 style={{ fontWeight: 600, marginBottom: 8 }}>
          Welcome to HospitalApp 👋
        </h2>
        <p style={{ color: "#6b7280", lineHeight: 1.7 }}>
          Use the sidebar to manage patients, doctors, and appointments. All
          data is stored in MongoDB Atlas cloud.
        </p>
      </div>
    </div>
  );
}
