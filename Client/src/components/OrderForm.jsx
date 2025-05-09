import React, { useState } from "react";
import { createOrder } from "../api/orders";

const OrderForm = ({ customerId, customerName, onSuccess, onCancel }) => {
  const [form, setForm] = useState({
    order_date: "",
    delivery_date: "",
    total_amount: "",
    status: "pending",
    notes: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await createOrder({
        ...form,
        customer_id: customerId,
        client_name: customerName // auto-fill client_name from customer
      });
      onSuccess && onSuccess();
    } catch {
      setError("Failed to save order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-bg p-4 my-4" style={{ maxWidth: 500 }}>
      <h2 className="mb-4 text-center">New Order</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Order Date</label>
          <input name="order_date" type="date" className="form-control" value={form.order_date} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Delivery Date</label>
          <input name="delivery_date" type="date" className="form-control" value={form.delivery_date} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Total Amount</label>
          <input name="total_amount" type="number" className="form-control" value={form.total_amount} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select name="status" className="form-select" value={form.status} onChange={handleChange}>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
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

export default OrderForm;
