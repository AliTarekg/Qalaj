// src/components/CartDrawer.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import { Badge, Button, Image } from "react-bootstrap";

const CartDrawer = ({ show, onClose }) => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const navigate = useNavigate();

  return (
    <div className={`cart-drawer ${show ? "open" : ""}`}>
      <div className="cart-drawer-header d-flex justify-content-between align-items-center p-3 border-bottom">
        <h5 className="mb-0">Your Cart</h5>
        <button className="btn-close" onClick={onClose} />
      </div>

      <div className="cart-drawer-body p-3">
        {cart.length === 0 ? (
          <div className="text-center text-muted">Your cart is empty.</div>
        ) : (
          cart.map(item => (
            <div key={item.id} className="d-flex mb-3 align-items-center">
              <Image
                src={`${import.meta.env.VITE_API_URL || ''}${item.image_url}`}
                alt={item.name}
                rounded
                style={{ width: 60, height: 60, objectFit: 'cover' }}
              />
              <div className="ms-3 flex-grow-1">
                <div className="fw-semibold">{item.name}</div>
                <div className="text-muted small">{item.sizes}</div>
                <div className="d-flex align-items-center mt-1">
                  <Button
                    size="sm"
                    variant="outline-secondary"
                    disabled={item.quantity <= 1}
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </Button>
                  <Badge bg="light" text="dark" className="mx-2">
                    {item.quantity}
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline-secondary"
                    disabled={item.quantity >= item.stock}
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
              <div className="text-end">
                <div className="fw-bold">${(item.price * item.quantity).toFixed(2)}</div>
                <button
                  className="btn btn-link text-danger p-0 mt-1"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="cart-drawer-footer p-3 border-top">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="h5 mb-0">Total:</div>
          <div className="h5">${total.toFixed(2)}</div>
        </div>
        <Button
          variant="primary"
          className="w-100 mb-2"
          disabled={cart.length === 0}
          onClick={() => {
            onClose();
            navigate('/checkout');
          }}
        >
          Proceed to Checkout
        </Button>
        <Button
          variant="outline-danger"
          className="w-100"
          disabled={cart.length === 0}
          onClick={clearCart}
        >
          Clear Cart
        </Button>
      </div>
    </div>
  );
};

export default CartDrawer;
