import React, { useState, useEffect } from "react";
import {
  createInquiry,
  getInquiry,
  updateInquiry,
  getUsers,
} from "../api/inquiries";
import { useTheme } from "../ThemeContext";

const InquiryForm = ({ inquiryId, onSuccess, onCancel }) => {
  const [form, setForm] = useState({
    client_name: "",
    client_email: "",
    client_phone: "",
    subject: "",
    message: "",
    status: "new",
    assigned_to: "",
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { theme } = useTheme();

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => setUsers([]));
    if (inquiryId) {
      setLoading(true);
      getInquiry(inquiryId)
        .then((data) => setForm(data))
        .catch(() => setError("Failed to load inquiry"))
        .finally(() => setLoading(false));
    }
  }, [inquiryId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (inquiryId) {
        await updateInquiry(inquiryId, form);
      } else {
        await createInquiry(form);
      }
      onSuccess && onSuccess();
    } catch (err) {
      setError("Failed to save inquiry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: 800 }}>
      <div
        className={`card shadow p-4`}
        style={{ background: "var(--color-bg)", borderRadius: 18,color: 'var(--color-text-dark)' }}
      >
        <h2 className="mb-4 text-center" style={{ fontWeight: 700 }}>
          {inquiryId ? "Edit Inquiry" : "New Inquiry"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Client Name</label>
            <input
              name="client_name"
              className="form-control"
              value={form.client_name}
              onChange={handleChange}
              required
              style={{ borderRadius: 10 }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Client Email</label>
            <input
              name="client_email"
              type="email"
              className="form-control"
              value={form.client_email}
              onChange={handleChange}
              style={{ borderRadius: 10 }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Client Phone</label>
            <input
              name="client_phone"
              className="form-control"
              value={form.client_phone}
              onChange={handleChange}
              style={{ borderRadius: 10 }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Subject</label>
            <input
              name="subject"
              className="form-control"
              value={form.subject}
              onChange={handleChange}
              required
              style={{ borderRadius: 10 }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea
              name="message"
              className="form-control"
              value={form.message}
              onChange={handleChange}
              required
              style={{ borderRadius: 10 }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Status</label>
            <select
              name="status"
              className="form-select"
              value={form.status}
              onChange={handleChange}
              style={{ borderRadius: 10 }}
            >
              <option value="new">New</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Assigned To</label>
            <select
              name="assigned_to"
              className="form-select"
              value={form.assigned_to || ""}
              onChange={handleChange}
              style={{ borderRadius: 10 }}
            >
              <option value="">-- Unassigned --</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username} ({user.email})
                </option>
              ))}
            </select>
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button
            type="submit"
            className="btn btn-primary me-2 w-100"
            style={{ borderRadius: 10 }}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
          {onCancel && (
            <button
              type="button"
              className="btn btn-secondary w-100 mt-2"
              style={{ borderRadius: 10 }}
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default InquiryForm;
