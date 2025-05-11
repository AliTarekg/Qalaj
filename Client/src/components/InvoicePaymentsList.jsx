import React, { useState, useEffect } from "react";
import { getInvoicePayments } from "../api/invoices";

const InvoicePaymentsList = ({ invoiceId, totalAmount }) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPayments();
  }, [invoiceId]);

  const loadPayments = async () => {
    try {
      setLoading(true);
      const data = await getInvoicePayments(invoiceId);
      setPayments(data);
    } catch (error) {
      console.error("Failed to load payments:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalPaid = payments.reduce((sum, payment) => sum + Number(payment.amount), 0);
  const remaining = totalAmount - totalPaid;

  return (
    <div className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Payment History</h4>
        <div>
          <span className="badge bg-primary me-2">Total Paid: ${totalPaid.toFixed(2)}</span>
          <span className={`badge ${remaining > 0 ? 'bg-warning' : 'bg-success'}`}>
            Remaining: ${remaining.toFixed(2)}
          </span>
        </div>
      </div>
      {loading ? (
        <p>Loading payments...</p>
      ) : (
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Reference</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td>{new Date(payment.payment_date).toLocaleDateString()}</td>
                <td>${Number(payment.amount).toFixed(2)}</td>
                <td>{payment.payment_method.replace('_', ' ')}</td>
                <td>{payment.reference_number || '-'}</td>
                <td>{payment.notes || '-'}</td>
              </tr>
            ))}
            {payments.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">No payments recorded yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InvoicePaymentsList;
