import React, { useState, useEffect } from "react";
import { createCustomer, getCustomer, updateCustomer } from "../api/customers";

const CustomerForm = ({ customerId, onSuccess, onCancel }) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", notes: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (customerId) {
      setLoading(true);
      getCustomer(customerId)
        .then((data) => setForm(data))
        .catch(() => setError("Failed to load customer"))
        .finally(() => setLoading(false));
    }
  }, [customerId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (customerId) {
        await updateCustomer(customerId, form);
      } else {
        await createCustomer(form);
      }
      onSuccess && onSuccess();
    } catch {
      setError("Failed to save customer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-bg p-4 my-4" style={{ maxWidth: 500 }}>
      <h2 className="mb-4 text-center">{customerId ? "Edit Customer" : "New Customer"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input name="name" className="form-control" value={form.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input name="email" type="email" className="form-control" value={form.email} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input name="phone" className="form-control" value={form.phone} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input name="address" className="form-control" value={form.address} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Notes</label>
          <textarea name="notes" className="form-control" value={form.notes} onChange={handleChange} />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary me-2" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>
        {onCancel && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default CustomerForm;
