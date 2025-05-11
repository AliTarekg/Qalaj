import React, { useEffect, useState } from "react";
import { getOrders } from "../api/orders";

const SalesDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders().then(setOrders).finally(() => setLoading(false));
  }, []);

  const totalSales = orders.reduce((sum, o) => sum + Number(o.total_amount), 0);
  const totalOrders = orders.length;

  return (
    <div>
      <h3>Sales Dashboard</h3>
      <div className="mb-3">
        <span className="badge bg-success me-2">Total Sales: ${totalSales.toFixed(2)}</span>
        <span className="badge bg-primary">Total Orders: {totalOrders}</span>
      </div>
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Status</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.client_name}</td>
              <td>{order.order_date}</td>
              <td>{order.status}</td>
              <td>${Number(order.total_amount).toFixed(2)}</td>
            </tr>
          ))}
          {orders.length === 0 && <tr><td colSpan={5}>No orders found.</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

export default SalesDashboard;
