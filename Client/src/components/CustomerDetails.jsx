import React, { useEffect, useState } from "react";
import { getCustomer, getCustomerOrders, getCustomerInvoices } from "../api/customers";
import OrderForm from "./OrderForm";
import InvoiceForm from "./InvoiceForm";

const CustomerDetails = ({ customerId, onBack }) => {
  const [customer, setCustomer] = useState(null);
  const [orders, setOrders] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("orders");
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      const [c, o, i] = await Promise.all([
        getCustomer(customerId),
        getCustomerOrders(customerId),
        getCustomerInvoices(customerId)
      ]);
      setCustomer(c);
      setOrders(o);
      setInvoices(i);
      setLoading(false);
    };
    fetchAll();
  }, [customerId, showOrderForm, showInvoiceForm]);

  if (loading) return <div className="container-bg p-4 my-4">Loading...</div>;
  if (!customer) return <div className="container-bg p-4 my-4">Customer not found.</div>;

  return (
    <div className="container-bg p-4 my-4">
      <button className="btn btn-secondary mb-3" onClick={onBack}>Back</button>
      <h2 style={{ fontWeight: 800 }}>{customer.name}</h2>
      <div className="mb-2"><strong>Email:</strong> {customer.email || '-'}</div>
      <div className="mb-2"><strong>Phone:</strong> {customer.phone || '-'}</div>
      <div className="mb-2"><strong>Address:</strong> {customer.address || '-'}</div>
      <div className="mb-2"><strong>Notes:</strong> {customer.notes || '-'}</div>
      <div className="mt-4">
        <div className="btn-group mb-3">
          <button className={`btn btn-outline-primary${tab === 'orders' ? ' active' : ''}`} onClick={() => setTab('orders')}>Orders</button>
          <button className={`btn btn-outline-primary${tab === 'invoices' ? ' active' : ''}`} onClick={() => setTab('invoices')}>Invoices</button>
        </div>
        {tab === 'orders' ? (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h4>Orders</h4>
              <button className="btn btn-success" onClick={() => setShowOrderForm(true)}>+ Add Order</button>
            </div>
            {showOrderForm && (
              <OrderForm customerId={customerId} customerName={customer.name} onSuccess={() => { setShowOrderForm(false); }} onCancel={() => setShowOrderForm(false)} />
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
                {orders.length === 0 && <tr><td colSpan={4}>No orders found.</td></tr>}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h4>Invoices</h4>
              <button className="btn btn-success" onClick={() => setShowInvoiceForm(true)}>+ Add Invoice</button>
            </div>
            {showInvoiceForm && (
              <InvoiceForm customerId={customerId} onSuccess={() => { setShowInvoiceForm(false); }} onCancel={() => setShowInvoiceForm(false)} />
            )}
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Number</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv.id}>
                    <td>{inv.id}</td>
                    <td>{inv.invoice_number}</td>
                    <td>{inv.created_at && new Date(inv.created_at).toLocaleDateString()}</td>
                    <td>{inv.status}</td>
                    <td>{inv.amount}</td>
                  </tr>
                ))}
                {invoices.length === 0 && <tr><td colSpan={5}>No invoices found.</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDetails;
