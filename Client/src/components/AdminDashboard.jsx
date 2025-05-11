import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="container my-5">
      <h1 className="mb-4">Admin Dashboard</h1>
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column justify-content-between">
              <h5 className="card-title">Customers</h5>
              <p className="card-text">Manage all customers and their details.</p>
              <Link to="/Customers" className="btn btn-primary mt-auto">Go to Customers</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column justify-content-between">
              <h5 className="card-title">Inquiries</h5>
              <p className="card-text">View and manage customer inquiries.</p>
              <Link to="/dashboard/inquiries" className="btn btn-primary mt-auto">Go to Inquiries</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column justify-content-between">
              <h5 className="card-title">Items</h5>
              <p className="card-text">Add, edit, or remove items for sale.</p>
              <Link to="/dashboard/items" className="btn btn-primary mt-auto">Go to Items</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column justify-content-between">
              <h5 className="card-title">Orders</h5>
              <p className="card-text">Track and manage all orders.</p>
              <Link to="/dashboard/orders" className="btn btn-primary mt-auto">Go to Orders</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column justify-content-between">
              <h5 className="card-title">Sales</h5>
              <p className="card-text">View sales analytics and reports.</p>
              <Link to="/dashboard/sales" className="btn btn-primary mt-auto">Go to Sales</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
