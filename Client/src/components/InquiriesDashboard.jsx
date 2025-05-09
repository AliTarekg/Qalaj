import React, { useState } from "react";
import InquiriesList from "./InquiriesList";
import InquiryForm from "./InquiryForm";

const InquiriesDashboard = () => {
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleEdit = (id) => {
    setEditingId(id);
    setShowForm(true);
  };

  const handleNew = () => {
    setEditingId(null);
    setShowForm(true);
  };

  const handleSuccess = () => {
    setShowForm(false);
    setEditingId(null);
    setRefreshKey((k) => k + 1);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Inquiries Dashboard</h1>
        <button className="btn btn-success" onClick={handleNew}>
          + New Inquiry
        </button>
      </div>
      {showForm ? (
        <InquiryForm
          inquiryId={editingId}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      ) : (
        <InquiriesList key={refreshKey} onEdit={handleEdit} />
      )}
    </div>
  );
};

export default InquiriesDashboard;
