import React, { useEffect, useState } from "react";
import { getInquiries, deleteInquiry } from "../api/inquiries";
import InquiryFollowUps from "./InquiryFollowUps";
import { useTheme } from "../ThemeContext";

const statusColors = {
  new: "secondary",
  in_progress: "warning",
  completed: "success",
  cancelled: "danger",
};

const InquiriesList = ({ onEdit }) => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showFollowUp, setShowFollowUp] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const { theme } = useTheme();

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const data = await getInquiries();
      setInquiries(data);
    } catch (err) {
      setError("Failed to load inquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [refreshKey]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this inquiry?")) return;
    await deleteInquiry(id);
    fetchInquiries();
  };

  const handleFollowUp = (id) => {
    setShowFollowUp(showFollowUp === id ? null : id);
  };

  const handleFollowUpStatusChange = () => {
    setRefreshKey((k) => k + 1);
  };

  if (loading) return <div>Loading inquiries...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container py-4">
      <div
        className={`card shadow-sm p-3`}
        style={{
          background: theme === "dark" ? "var(--color-primary)" : "#fff",
          color: "var(--color-text-dark)",
          borderRadius: 18,
        }}
      >
        <h2 style={{ fontWeight: 700, color: "var(--color-text-dark)" }}>
          Inquiries
        </h2>
        <table
          className="table table-bordered table-hover"
          style={{ borderRadius: 12, overflow: "hidden" }}
        >
          <thead
            style={{
              background: "var(--color-primary)",
              color: "var(--color-secondary)",
            }}
          >
            <tr>
              <th>ID</th>
              <th>Client</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Subject</th>
              <th>Status</th>
              <th>Assigned To</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inq) => (
              <React.Fragment key={inq.id}>
                <tr
                  style={{
                    background: theme === "dark" ? "var(--color-bg)" : "#fff",
                  }}
                >
                  <td>{inq.id}</td>
                  <td>{inq.client_name}</td>
                  <td>{inq.client_email}</td>
                  <td>{inq.client_phone}</td>
                  <td>{inq.subject}</td>
                  <td>
                    <span
                      className={`badge bg-${
                        statusColors[inq.status] || "secondary"
                      }`}
                      style={{
                        fontSize: 13,
                        padding: "6px 12px",
                        borderRadius: 8,
                      }}
                    >
                      {inq.status}
                    </span>
                  </td>
                  <td>{inq.assigned_to || "-"}</td>
                  <td>{new Date(inq.created_at).toLocaleString()}</td>
                  <td>
                    {/* <button
                      className="btn btn-sm btn-primary me-2"
                      style={{ borderRadius: 8 }}
                      onClick={() => onEdit(inq.id)}
                    >
                      Edit
                    </button> */}
                    <button
                      className="btn btn-sm btn-outline-info me-2"
                      style={{ borderRadius: 8 }}
                      onClick={() => handleFollowUp(inq.id)}
                    >
                      {showFollowUp === inq.id
                        ? "Hide Follow Ups"
                        : "Follow Up"}
                    </button>
                    {/* <button
                      className="btn btn-sm btn-danger"
                      style={{ borderRadius: 8 }}
                      onClick={() => handleDelete(inq.id)}
                    >
                      Delete
                    </button> */}
                  </td>
                </tr>
                {showFollowUp === inq.id && (
                  <tr>
                    <td
                      colSpan={9}
                      style={{
                        background:
                          theme === "dark" ? "var(--color-bg)" : "#f8f9fa",
                      }}
                    >
                      <InquiryFollowUps
                        inquiryId={inq.id}
                        onStatusChange={handleFollowUpStatusChange}
                      />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InquiriesList;
