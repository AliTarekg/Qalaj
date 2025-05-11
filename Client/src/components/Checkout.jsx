// src/components/Checkout.jsx
import React, { useState } from "react";
import { useCart } from "./CartContext";
import { createCustomer } from "../api/customers";
import { createOrder, createOrderItem } from "../api/orders";
import { useNavigate } from "react-router-dom";
import "./items.css"; // see CSS snippet below

const Checkout = () => {
  const { cart, clearCart, cartTotal } = useCart();
  const [customer, setCustomer] = useState({
    name: "", email: "", phone: "", address: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const apiBase = import.meta.env.VITE_API_URL || "";

  const handleChange = e =>
    setCustomer({ ...customer, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (!cart.length) return;
    setLoading(true);
    try {
      // 1) Create Customer
      const custRes = await createCustomer(customer);
      // 2) Create Order
      const orderRes = await createOrder({
        customer_id: custRes.id,
        client_name: customer.name,
        order_date: new Date().toISOString().split("T")[0],
        total_amount: cartTotal,
        status: "pending",
        notes: JSON.stringify(customer),
      });
      // 3) Create Items
      await Promise.all(
        cart.map(item =>
          createOrderItem({
            order_id: orderRes.id,
            item_id: item.id,
            description: item.name,
            quantity: item.quantity,
            unit_price: item.price,
          })
        )
      );
      // 4) Finish
      clearCart();
      navigate("/order-success", { state: { orderId: orderRes.id } });
    } catch (err) {
      console.error(err);
      alert("Problem placing your order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="checkout-content">
        {/* --- Cart Summary --- */}
        <div className="checkout-summary">
          <h4>Order Summary</h4>
          {cart.map(item => (
            <div className="summary-item" key={item.id}>
              <img
                src={`${apiBase}${item.image_url}`}
                alt={item.name}
                className="summary-img"
              />
              <div className="summary-info">
                <div>{item.name} × {item.quantity}</div>
                <div>${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            </div>
          ))}
          <div className="summary-total">
            <span>Total</span>
            <strong>${cartTotal.toFixed(2)}</strong>
          </div>
        </div>

        {/* --- Customer Details Form --- */}
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h4>Your Details</h4>
          {["name","email","phone","address"].map(field => (
            <div className="form-group" key={field}>
              <label className="form-label text-capitalize">{field}</label>
              <input
                name={field}
                type={field === "email" ? "email" : "text"}
                className="form-control"
                value={customer[field]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <button
            type="submit"
            className="btn btn-success w-100"
            disabled={loading}
          >
            {loading ? "Placing Order…" : "Confirm Order"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
