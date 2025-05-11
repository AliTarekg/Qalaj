import React, { useState } from "react";
import ItemsList from "./ItemsList";
import Cart from "./Cart";
import axios from '../api/axiosInstance';

const Shop = ({ onCheckoutComplete }) => {
  const [cart, setCart] = useState([]);
  const [customer, setCustomer] = useState({ name: '', email: '', phone: '', address: '' });
  const [showCustomerForm, setShowCustomerForm] = useState(false);

  const handleAddToCart = (item) => {
    setCart((prev) => {
      const found = prev.find((i) => i.id === item.id);
      if (found) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  const handleRemove = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    if (!customer.name || !customer.email || !customer.phone || !customer.address) {
      setShowCustomerForm(true);
      return;
    }
    const orderData = {
      customer_id: 1, // Replace with actual customer logic if needed
      client_name: customer.name,
      order_date: new Date().toISOString().slice(0, 10),
      total_amount: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      status: 'completed',
      notes: `Email: ${customer.email}, Phone: ${customer.phone}, Address: ${customer.address}`
    };
    try {
      const orderRes = await axios.post('/orders', orderData);
      const orderId = orderRes.data.id;
      for (const item of cart) {
        await axios.post('/order-items', {
          order_id: orderId,
          item_id: item.id,
          description: item.name,
          quantity: item.quantity,
          unit_price: item.price
        });
      }
      setCart([]);
      onCheckoutComplete && onCheckoutComplete();
      alert('Purchase successful!');
    } catch (err) {
      alert('Error processing order.');
    }
  };

  return (
    <div className="row">
      <div className="col-md-7">
        <ItemsList onAddToCart={handleAddToCart} />
      </div>
      <div className="col-md-5">
        <Cart cart={cart} onRemove={handleRemove} onCheckout={handleCheckout} />
        {showCustomerForm && (
          <div className="mt-3 p-3 border rounded bg-light">
            <h5>Enter your details to complete purchase</h5>
            <input className="form-control mb-2" placeholder="Name" value={customer.name} onChange={e => setCustomer({ ...customer, name: e.target.value })} />
            <input className="form-control mb-2" placeholder="Email" value={customer.email} onChange={e => setCustomer({ ...customer, email: e.target.value })} />
            <input className="form-control mb-2" placeholder="Phone" value={customer.phone} onChange={e => setCustomer({ ...customer, phone: e.target.value })} />
            <input className="form-control mb-2" placeholder="Address" value={customer.address} onChange={e => setCustomer({ ...customer, address: e.target.value })} />
            <button className="btn btn-success me-2" onClick={() => setShowCustomerForm(false)}>Continue</button>
            <button className="btn btn-secondary" onClick={() => setShowCustomerForm(false)}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
