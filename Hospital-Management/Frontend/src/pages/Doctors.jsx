import { useEffect, useState } from "react";
import api from "../api";

const EMPTY = {
  name: "",
  specialization: "",
  phone: "",
  email: "",
  experience: "",
  consultFee: "",
};

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const res = await api.get("/doctors");
      setDoctors(res.data);
    } catch {
      setError("Failed to load doctors");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openAdd = () => {
    setForm(EMPTY);
    setEditId(null);
    setShowModal(true);
    setError("");
  };
  const openEdit = (d) => {
    setForm(d);
    setEditId(d._id);
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
        await api.put(`/doctors/${editId}`, form);
      } else {
        await api.post("/doctors", form);
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
    if (!window.confirm("Delete this doctor?")) return;
    try {
      await api.delete(`/doctors/${id}`);
      load();
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div>
      <h1 className="page-title">Doctors</h1>
      {error && !showModal && <div className="alert alert-error">{error}</div>}

      <div className="table-wrap">
        <div className="table-header">
          <h2>All Doctors ({doctors.length})</h2>
          <button className="btn btn-primary" onClick={openAdd}>
            + Add Doctor
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Specialization</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Experience</th>
              <th>Fee (₹)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.length === 0 ? (
              <tr>
                <td colSpan="7" className="empty-row">
                  No doctors yet.
                </td>
              </tr>
            ) : (
              doctors.map((d) => (
                <tr key={d._id}>
                  <td style={{ fontWeight: 600 }}>Dr. {d.name}</td>
                  <td>
                    <span className="badge badge-blue">{d.specialization}</span>
                  </td>
                  <td>{d.phone}</td>
                  <td>{d.email}</td>
                  <td>{d.experience} yrs</td>
                  <td>₹{d.consultFee}</td>
                  <td style={{ display: "flex", gap: 6 }}>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => openEdit(d)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger  btn-sm"
                      onClick={() => handleDelete(d._id)}
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
            <h2>{editId ? "Edit Doctor" : "Add New Doctor"}</h2>
            {error && <div className="alert alert-error">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-field">
                  <label>Full Name *</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => change("name", e.target.value)}
                    placeholder="Ravi Kumar"
                  />
                </div>
                <div className="form-field">
                  <label>Specialization *</label>
                  <input
                    required
                    value={form.specialization}
                    onChange={(e) => change("specialization", e.target.value)}
                    placeholder="Cardiology"
                  />
                </div>
                <div className="form-field">
                  <label>Phone *</label>
                  <input
                    required
                    value={form.phone}
                    onChange={(e) => change("phone", e.target.value)}
                    placeholder="9876543210"
                  />
                </div>
                <div className="form-field">
                  <label>Email *</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => change("email", e.target.value)}
                    placeholder="doctor@hospital.com"
                  />
                </div>
                <div className="form-field">
                  <label>Experience (years)</label>
                  <input
                    type="number"
                    value={form.experience}
                    onChange={(e) => change("experience", e.target.value)}
                    placeholder="5"
                  />
                </div>
                <div className="form-field">
                  <label>Consult Fee (₹)</label>
                  <input
                    type="number"
                    value={form.consultFee}
                    onChange={(e) => change("consultFee", e.target.value)}
                    placeholder="500"
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
                  {saving ? "Saving…" : editId ? "Update Doctor" : "Add Doctor"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
