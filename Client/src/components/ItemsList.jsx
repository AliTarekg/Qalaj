import React, { useEffect, useState } from "react";
import { getItems } from "../api/items";

const ItemsList = ({ onAddToCart }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getItems().then(setItems).finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading items...</div>;

  return (
    <div>
      <h3>Items for Sale</h3>
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Sizes</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.image_url && <img src={item.image_url.startsWith('http') ? item.image_url : `${window.location.origin}${item.image_url}`} alt={item.name} style={{width:60, height:60, objectFit:'cover'}} />}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>${Number(item.price).toFixed(2)}</td>
              <td>{item.sizes}</td>
              <td>{item.stock}</td>
              <td>
                <button className="btn btn-primary btn-sm" onClick={() => onAddToCart(item)} disabled={item.stock <= 0}>
                  Add to Cart
                </button>
              </td>
            </tr>
          ))}
          {items.length === 0 && <tr><td colSpan={7}>No items found.</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

export default ItemsList;
