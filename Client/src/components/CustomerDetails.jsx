import React, { useEffect, useState } from "react";
import {
  getCustomer,
  getCustomerOrders,
  getCustomerInvoices,
} from "../api/customers";
import OrderForm from "./OrderForm";
import InvoiceForm from "./InvoiceForm";
import PaymentForm from "./PaymentForm";
import InvoicePaymentsList from "./InvoicePaymentsList";

const CustomerDetails = ({ customerId, onBack }) => {
  const [customer, setCustomer] = useState(null);
  const [orders, setOrders] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("orders");
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [expandedInvoiceId, setExpandedInvoiceId] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const fetchAll = async () => {
    setLoading(true);
    const [c, o, i] = await Promise.all([
      getCustomer(customerId),
      getCustomerOrders(customerId),
      getCustomerInvoices(customerId),
    ]);
    setCustomer(c);
    setOrders(o);
    setInvoices(i);
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, [customerId, showOrderForm, showInvoiceForm]);

  if (loading) return <div className="container-bg p-4 my-4">Loading...</div>;
  if (!customer)
    return <div className="container-bg p-4 my-4">Customer not found.</div>;

  return (
    <div className="container-bg p-4 my-4">
      <button className="btn btn-secondary mb-3" onClick={onBack}>
        Back
      </button>
      <h2 style={{ fontWeight: 800 }}>{customer.name}</h2>
      <div className="mb-2">
        <strong>Email:</strong> {customer.email || "-"}
      </div>
      <div className="mb-2">
        <strong>Phone:</strong> {customer.phone || "-"}
      </div>
      <div className="mb-2">
        <strong>Address:</strong> {customer.address || "-"}
      </div>
      <div className="mb-2">
        <strong>Notes:</strong> {customer.notes || "-"}
      </div>
      <div className="mt-4">
        <div className="btn-group mb-3">
          <button
            className={`btn btn-outline-primary${
              tab === "orders" ? " active" : ""
            }`}
            onClick={() => setTab("orders")}
          >
            Orders
          </button>
          <button
            className={`btn btn-outline-primary${
              tab === "invoices" ? " active" : ""
            }`}
            onClick={() => setTab("invoices")}
          >
            Invoices
          </button>
        </div>
        {tab === "orders" ? (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h4>Orders</h4>
              <button
                className="btn btn-success"
                onClick={() => setShowOrderForm(true)}
              >
                + Add Order
              </button>
            </div>
            {showOrderForm && (
              <OrderForm
                customerId={customerId}
                customerName={customer.name}
                onSuccess={() => {
                  setShowOrderForm(false);
                }}
                onCancel={() => setShowOrderForm(false)}
              />
            )}
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td>{o.id}</td>
                    <td>{o.order_date}</td>
                    <td>{o.status}</td>
                    <td>{o.total_amount}</td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={4}>No orders found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h4>Invoices</h4>
              <button
                className="btn btn-success"
                onClick={() => setShowInvoiceForm(true)}
              >
                + Add Invoice
              </button>
            </div>
            {showInvoiceForm && (
              <InvoiceForm
                customerId={customerId}
                onSuccess={() => {
                  setShowInvoiceForm(false);
                }}
                onCancel={() => setShowInvoiceForm(false)}
              />
            )}
            <table className="table table-bordered table-hover">
              {" "}
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Number</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <React.Fragment key={inv.id}>
                    <tr>
                      <td>{inv.id}</td>
                      <td>{inv.invoice_number}</td>
                      <td>
                        {inv.created_at &&
                          new Date(inv.created_at).toLocaleDateString()}
                      </td>
                      <td>{inv.status}</td>
                      <td>${Number(inv.amount).toFixed(2)}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => {
                            setExpandedInvoiceId(
                              expandedInvoiceId === inv.id ? null : inv.id
                            );
                            setShowPaymentForm(false);
                          }}
                        >
                          {expandedInvoiceId === inv.id
                            ? "Hide Details"
                            : "View Payments"}
                        </button>
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => {
                            setExpandedInvoiceId(inv.id);
                            setShowPaymentForm(true);
                          }}
                        >
                          Add Payment
                        </button>
                      </td>
                    </tr>
                    {expandedInvoiceId === inv.id && (
                      <tr>
                        <td colSpan="6" className="p-0">
                          <div className="p-4">
                            {showPaymentForm ? (
                              <PaymentForm
                                invoiceId={inv.id}
                                onSuccess={() => {
                                  setShowPaymentForm(false);
                                  fetchAll();
                                }}
                                onCancel={() => setShowPaymentForm(false)}
                              />
                            ) : (
                              <InvoicePaymentsList
                                invoiceId={inv.id}
                                totalAmount={Number(inv.amount)}
                              />
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
                {invoices.length === 0 && (
                  <tr>
                    <td colSpan={6}>No invoices found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDetails;
