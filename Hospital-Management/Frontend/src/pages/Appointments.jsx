import { useEffect, useState } from "react";
import api from "../api";

const EMPTY = {
  patient: "",
  doctor: "",
  date: "",
  timeSlot: "",
  reason: "",
  status: "Scheduled",
};
const SLOTS = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
];

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const res = await api.get("/appointments");
      setAppointments(res.data);
    } catch {
      setError("Failed to load appointments");
    }
  };

  useEffect(() => {
    load();
    api
      .get("/patients")
      .then((r) => setPatients(r.data))
      .catch(() => {});
    api
      .get("/doctors")
      .then((r) => setDoctors(r.data))
      .catch(() => {});
  }, []);

  const openAdd = () => {
    setForm(EMPTY);
    setEditId(null);
    setShowModal(true);
    setError("");
  };
  const openEdit = (a) => {
    setForm({
      ...a,
      patient: a.patient?._id || a.patient,
      doctor: a.doctor?._id || a.doctor,
    });
    setEditId(a._id);
    setShowModal(true);
    setError("");
  };
  const close = () => {
    setShowModal(false);
    setForm(EMPTY);
    setEditId(null);
    setError("");
  };
  const change = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (editId) {
        await api.put(`/appointments/${editId}`, form);
      } else {
        await api.post("/appointments", form);
      }
      close();
      load();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this appointment?")) return;
    try {
      await api.delete(`/appointments/${id}`);
      load();
    } catch {
      alert("Delete failed");
    }
  };

  const statusBadge = (s) => {
    const cls = {
      Scheduled: "badge-blue",
      Completed: "badge-green",
      Cancelled: "badge-red",
    };
    return <span className={`badge ${cls[s] || "badge-gray"}`}>{s}</span>;
  };

  return (
    <div>
      <h1 className="page-title">Appointments</h1>
      {error && !showModal && <div className="alert alert-error">{error}</div>}

      <div className="table-wrap">
        <div className="table-header">
          <h2>All Appointments ({appointments.length})</h2>
          <button className="btn btn-primary" onClick={openAdd}>
            + Book Appointment
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="7" className="empty-row">
                  No appointments yet. Add a patient and doctor first.
                </td>
              </tr>
            ) : (
              appointments.map((a) => (
                <tr key={a._id}>
                  <td style={{ fontWeight: 600 }}>{a.patient?.name || "—"}</td>
                  <td>
                    Dr. {a.doctor?.name || "—"}
                    <br />
                    <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                      {a.doctor?.specialization}
                    </span>
                  </td>
                  <td>{a.date}</td>
                  <td>{a.timeSlot}</td>
                  <td>{a.reason || "—"}</td>
                  <td>{statusBadge(a.status)}</td>
                  <td style={{ display: "flex", gap: 6 }}>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => openEdit(a)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger  btn-sm"
                      onClick={() => handleDelete(a._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div
          className="overlay"
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <div className="modal">
            <h2>{editId ? "Edit Appointment" : "Book Appointment"}</h2>
            {error && <div className="alert alert-error">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-field full">
                  <label>Patient *</label>
                  <select
                    required
                    value={form.patient}
                    onChange={(e) => change("patient", e.target.value)}
                  >
                    <option value="">— Select Patient —</option>
                    {patients.map((p) => (
                      <option key={p._id} value={p._id}>
                        {p.name} ({p.phone})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-field full">
                  <label>Doctor *</label>
                  <select
                    required
                    value={form.doctor}
                    onChange={(e) => change("doctor", e.target.value)}
                  >
                    <option value="">— Select Doctor —</option>
                    {doctors.map((d) => (
                      <option key={d._id} value={d._id}>
                        Dr. {d.name} — {d.specialization}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-field">
                  <label>Date *</label>
                  <input
                    type="date"
                    required
                    value={form.date}
                    onChange={(e) => change("date", e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label>Time Slot *</label>
                  <select
                    required
                    value={form.timeSlot}
                    onChange={(e) => change("timeSlot", e.target.value)}
                  >
                    <option value="">Select time</option>
                    {SLOTS.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div className="form-field">
                  <label>Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => change("status", e.target.value)}
                  >
                    <option>Scheduled</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </select>
                </div>
                <div className="form-field">
                  <label>Reason / Symptoms</label>
                  <input
                    value={form.reason}
                    onChange={(e) => change("reason", e.target.value)}
                    placeholder="Fever, checkup…"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={close}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={saving}
                >
                  {saving ? "Saving…" : editId ? "Update" : "Book Appointment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
