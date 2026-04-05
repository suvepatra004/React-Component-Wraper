import { useEffect, useState } from "react";
import api from "../api";

const EMPTY = {
  name: "",
  age: "",
  gender: "Male",
  phone: "",
  bloodGroup: "",
  address: "",
  status: "Active",
};

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const res = await api.get("/patients");
      setPatients(res.data);
    } catch {
      setError("Failed to load patients");
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
  const openEdit = (p) => {
    setForm(p);
    setEditId(p._id);
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
        await api.put(`/patients/${editId}`, form);
      } else {
        await api.post("/patients", form);
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
    if (!window.confirm("Delete this patient?")) return;
    try {
      await api.delete(`/patients/${id}`);
      load();
    } catch {
      alert("Delete failed");
    }
  };

  const statusBadge = (s) => {
    if (s === "Active")
      return <span className="badge badge-green">Active</span>;
    if (s === "Discharged")
      return <span className="badge badge-gray">Discharged</span>;
    return <span className="badge badge-red">{s}</span>;
  };

  return (
    <div>
      <h1 className="page-title">Patients</h1>
      {error && !showModal && <div className="alert alert-error">{error}</div>}

      <div className="table-wrap">
        <div className="table-header">
          <h2>All Patients ({patients.length})</h2>
          <button className="btn btn-primary" onClick={openAdd}>
            Add Patient +
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>Blood Group</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.length === 0 ? (
              <tr>
                <td colSpan="7" className="empty-row">
                  No patients yet. Click "Add Patient" to get started.
                </td>
              </tr>
            ) : (
              patients.map((p) => (
                <tr key={p._id}>
                  <td style={{ fontWeight: 600 }}>{p.name}</td>
                  <td>{p.age}</td>
                  <td>{p.gender}</td>
                  <td>{p.phone}</td>
                  <td>{p.bloodGroup || "—"}</td>
                  <td>{statusBadge(p.status)}</td>
                  <td style={{ display: "flex", gap: 6 }}>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => openEdit(p)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger  btn-sm"
                      onClick={() => handleDelete(p._id)}
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
            <h2>{editId ? "Edit Patient" : "Add New Patient"}</h2>
            {error && <div className="alert alert-error">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-field">
                  <label>Full Name *</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => change("name", e.target.value)}
                    placeholder="John Doe"
                  />
                </div>
                <div className="form-field">
                  <label>Age *</label>
                  <input
                    type="number"
                    required
                    value={form.age}
                    onChange={(e) => change("age", e.target.value)}
                    placeholder="25"
                  />
                </div>
                <div className="form-field">
                  <label>Gender *</label>
                  <select
                    value={form.gender}
                    onChange={(e) => change("gender", e.target.value)}
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-field">
                  <label>Blood Group</label>
                  <select
                    value={form.bloodGroup}
                    onChange={(e) => change("bloodGroup", e.target.value)}
                  >
                    <option value="">Select</option>
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                      (b) => (
                        <option key={b}>{b}</option>
                      ),
                    )}
                  </select>
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
                  <label>Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => change("status", e.target.value)}
                  >
                    <option>Active</option>
                    <option>Discharged</option>
                  </select>
                </div>
                <div className="form-field full">
                  <label>Address</label>
                  <input
                    value={form.address}
                    onChange={(e) => change("address", e.target.value)}
                    placeholder="123 Street, City"
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
                  {saving
                    ? "Saving…"
                    : editId
                      ? "Update Patient"
                      : "Add Patient"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
