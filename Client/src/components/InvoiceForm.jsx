import React, { useState, useEffect } from "react";
import { createInvoice } from "../api/invoices";
import { getCustomerOrders } from "../api/customers";

const InvoiceForm = ({ customerId, onSuccess, onCancel }) => {
  const [form, setForm] = useState({
    order_id: "",
    amount: "",
    due_date: "",
    status: "pending",
    notes: ""
  });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getCustomerOrders(customerId).then(setOrders).catch(() => setOrders([]));
  }, [customerId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await createInvoice({
        ...form,
        customer_id: customerId
      });
      onSuccess && onSuccess();
    } catch {
      setError("Failed to save invoice");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-bg p-4 my-4" style={{ maxWidth: 500 }}>
      <h2 className="mb-4 text-center">New Invoice</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Order</label>
          <select name="order_id" className="form-select" value={form.order_id} onChange={handleChange} required>
            <option value="">-- Select Order --</option>
            {orders.map((order) => (
              <option key={order.id} value={order.id}>
                Order #{order.id} - {order.order_date} - {order.status}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Amount</label>
          <input name="amount" type="number" className="form-control" value={form.amount} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Due Date</label>
          <input name="due_date" type="date" className="form-control" value={form.due_date} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select name="status" className="form-select" value={form.status} onChange={handleChange}>
            <option value="pending">Pending</option>
            <option value="partial">Partial</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
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

export default InvoiceForm;
