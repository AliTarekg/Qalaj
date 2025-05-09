import React, { useEffect, useState } from "react";
import { getCustomers, deleteCustomer } from "../api/customers";

const CustomersList = ({ onView, onEdit, onNew }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch {
      setError("Failed to load customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this customer?")) return;
    await deleteCustomer(id);
    fetchCustomers();
  };

  return (
    <div className="container-bg p-4 my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 style={{ fontWeight: 800 }}>Customers</h2>
        <button className="btn btn-success" onClick={onNew}>+ New Customer</button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>
                  <button className="btn btn-sm btn-primary me-2" onClick={() => onView(c.id)}>View</button>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(c.id)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(c.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CustomersList;
