import React, { useState } from "react";
import { createPayment } from "../api/invoices";

const PaymentForm = ({ invoiceId, onSuccess, onCancel }) => {
  const [form, setForm] = useState({
    amount: "",
    payment_date: new Date().toISOString().split('T')[0],
    payment_method: "cash",
    reference_number: "",
    notes: "",
    recorded_by: ""
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
      await createPayment({
        ...form,
        invoice_id: invoiceId
      });
      onSuccess && onSuccess();
    } catch {
      setError("Failed to save payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-bg p-4 my-4" style={{ maxWidth: 500 }}>
      <h2 className="mb-4 text-center">New Payment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Amount</label>
          <input
            name="amount"
            type="number"
            step="0.01"
            className="form-control"
            value={form.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Payment Date</label>
          <input
            name="payment_date"
            type="date"
            className="form-control"
            value={form.payment_date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Payment Method</label>
          <select
            name="payment_method"
            className="form-select"
            value={form.payment_method}
            onChange={handleChange}
            required
          >
            <option value="cash">Cash</option>
            <option value="bank_transfer">Bank Transfer</option>
            <option value="credit_card">Credit Card</option>
            <option value="check">Check</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Reference Number</label>
          <input
            name="reference_number"
            className="form-control"
            value={form.reference_number}
            onChange={handleChange}
            placeholder="Transaction ID, Check Number, etc."
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Notes</label>
          <textarea
            name="notes"
            className="form-control"
            value={form.notes}
            onChange={handleChange}
          />
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

export default PaymentForm;
