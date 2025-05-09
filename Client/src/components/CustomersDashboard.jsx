import React, { useState } from "react";
import CustomersList from "./CustomersList";
import CustomerForm from "./CustomerForm";
import CustomerDetails from "./CustomerDetails";

const CustomersDashboard = () => {
  const [mode, setMode] = useState("list"); // list | form | details
  const [selectedId, setSelectedId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleView = (id) => {
    setSelectedId(id);
    setMode("details");
  };
  const handleEdit = (id) => {
    setSelectedId(id);
    setMode("form");
  };
  const handleNew = () => {
    setSelectedId(null);
    setMode("form");
  };
  const handleSuccess = () => {
    setMode("list");
    setSelectedId(null);
    setRefreshKey((k) => k + 1);
  };
  const handleCancel = () => {
    setMode("list");
    setSelectedId(null);
  };
  const handleBack = () => {
    setMode("list");
    setSelectedId(null);
  };

  return (
    <div className="container py-4">
      {mode === "list" && (
        <CustomersList
          key={refreshKey}
          onView={handleView}
          onEdit={handleEdit}
          onNew={handleNew}
        />
      )}
      {mode === "form" && (
        <CustomerForm
          customerId={selectedId}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      )}
      {mode === "details" && selectedId && (
        <CustomerDetails customerId={selectedId} onBack={handleBack} />
      )}
    </div>
  );
};

export default CustomersDashboard;
