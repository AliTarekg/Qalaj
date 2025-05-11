import React from "react";
import { useCart } from "./CartContext";

const CartDrawer = ({ show, onClose }) => {
  const { cart, updateQuantity, removeFromCart, checkout } = useCart();
  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  return (
    <div className={`cart-drawer ${show ? "open" : ""}`}>
      <div className="cart-drawer-header">
        <h5>Your Cart</h5>
        <button className="close-btn" onClick={onClose}>&times;</button>
      </div>
      <div className="cart-drawer-body">
        {cart.length === 0 ? (
          <div className="empty-cart">Your cart is empty.</div>
        ) : (
          cart.map(item => (
            <div className="cart-item" key={item.id}>
              <img src={item.image_url} alt={item.name} className="cart-item-img" />
              <div className="cart-item-info">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-size">{item.sizes}</div>
                <div className="cart-item-qty">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} disabled={item.quantity >= item.stock}>+</button>
                </div>
                <div className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</div>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>&times;</button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="cart-drawer-footer">
        <div className="cart-total">Total: <b>${total.toFixed(2)}</b></div>
        <button className="btn btn-primary w-100 mt-2" onClick={checkout} disabled={cart.length === 0}>Checkout</button>
      </div>
    </div>
  );
};
export default CartDrawer;
