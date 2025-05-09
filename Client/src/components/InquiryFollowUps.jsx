import React, { useEffect, useState } from "react";
import { getFollowUps, createFollowUp } from "../api/inquiries";

const statusOptions = [
  { value: "new", label: "New" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

const InquiryFollowUps = ({ inquiryId, onStatusChange }) => {
  const [followUps, setFollowUps] = useState([]);
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchFollowUps = async () => {
    setLoading(true);
    try {
      const data = await getFollowUps(inquiryId);
      setFollowUps(data);
    } catch {
      setError("Failed to load follow-ups");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inquiryId) fetchFollowUps();
  }, [inquiryId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await createFollowUp(inquiryId, { note, status });
      setNote("");
      setStatus("");
      fetchFollowUps();
      if (status && onStatusChange) onStatusChange(status);
    } catch {
      setError("Failed to add follow-up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <h4>Follow Ups</h4>
      <form className="mb-3" onSubmit={handleSubmit}>
        <div className="row g-2 align-items-end">
          <div className="col-md-6">
            <input
              className="form-control"
              placeholder="Add a follow-up note..."
              value={note}
              onChange={e => setNote(e.target.value)}
              required
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              value={status}
              onChange={e => setStatus(e.target.value)}
            >
              <option value="">-- Status (optional) --</option>
              {statusOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <button className="btn btn-primary w-100" type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Follow Up"}
            </button>
          </div>
        </div>
        {error && <div className="alert alert-danger mt-2">{error}</div>}
      </form>
      <ul className="list-group">
        {followUps.map(fu => (
          <li className="list-group-item" key={fu.id}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <strong>{fu.username || "User"}</strong> &mdash; {new Date(fu.created_at).toLocaleString()}
                {fu.status && (
                  <span className={`badge bg-secondary ms-2`}>{fu.status}</span>
                )}
                <div>{fu.note}</div>
              </div>
            </div>
          </li>
        ))}
        {followUps.length === 0 && <li className="list-group-item">No follow-ups yet.</li>}
      </ul>
    </div>
  );
};

export default InquiryFollowUps;
