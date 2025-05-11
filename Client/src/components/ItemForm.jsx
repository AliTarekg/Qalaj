import React, { useState } from "react";
import { createItem, updateItem } from "../api/items";
import axios from '../api/axiosInstance';

const ItemForm = ({ item, onSuccess, onCancel }) => {
  const [form, setForm] = useState({
    name: item?.name || "",
    description: item?.description || "",
    price: item?.price || "",
    stock: item?.stock || "",
    image_url: item?.image_url || "",
    sizes: item?.sizes || ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, imageFile: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      let image_url = form.image_url;
      if (form.imageFile) {
        const data = new FormData();
        data.append('image', form.imageFile);
        const res = await axios.post('/items/upload', data, {
          headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        const result = res.data;
        image_url = result.imageUrl;
      }
      const payload = { ...form, image_url };
      delete payload.imageFile;
      if (item) {
        await updateItem(item.id, payload);
      } else {
        await createItem(payload);
      }
      onSuccess && onSuccess();
    } catch {
      setError("Failed to save item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-bg p-4 my-4" style={{ maxWidth: 500 }}>
      <h2 className="mb-4 text-center">{item ? "Edit Item" : "New Item"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input name="name" className="form-control" value={form.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea name="description" className="form-control" value={form.description} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input name="price" type="number" step="0.01" className="form-control" value={form.price} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Stock</label>
          <input name="stock" type="number" className="form-control" value={form.stock} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input name="image_url" className="form-control" value={form.image_url} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Sizes (comma separated)</label>
          <input name="sizes" className="form-control" value={form.sizes} onChange={handleChange} placeholder="S,M,L,XL" />
        </div>
        <div className="mb-3">
          <label className="form-label">Image</label>
          <input name="image" type="file" className="form-control" accept="image/*" onChange={handleFileChange} />
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

export default ItemForm;
