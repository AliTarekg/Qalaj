import React, { useState, useEffect } from "react";
import { getItems, deleteItem } from "../api/items";
import ItemForm from "./ItemForm";

const AdminItemsDashboard = () => {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    setLoading(true);
    setItems(await getItems());
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, [showForm]);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this item?")) {
      await deleteItem(id);
      fetchItems();
    }
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Items</h2>
        <button className="btn btn-success" onClick={() => { setEditingItem(null); setShowForm(true); }}>+ Add Item</button>
      </div>
      {showForm && (
        <ItemForm item={editingItem} onSuccess={() => { setShowForm(false); fetchItems(); }} onCancel={() => setShowForm(false)} />
      )}
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Sizes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.image_url && <img src={item.image_url.startsWith('http') ? item.image_url : `${import.meta.env.VITE_API_BASE_URL || ''}${item.image_url}`} alt={item.name} style={{ width: 60, height: 60, objectFit: 'cover' }} />}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>${Number(item.price).toFixed(2)}</td>
              <td>{item.stock}</td>
              <td>{item.sizes}</td>
              <td>
                <button className="btn btn-sm btn-primary me-2" onClick={() => { setEditingItem(item); setShowForm(true); }}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {items.length === 0 && <tr><td colSpan={7}>No items found.</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

export default AdminItemsDashboard;
