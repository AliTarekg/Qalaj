// src/components/OrderSuccess.jsx
import React from "react";
import { useLocation, Link } from "react-router-dom";

const OrderSuccess = () => {
  const { state } = useLocation();
  return (
    <div className="container text-center my-5">
      <h2>Thank you for your order!</h2>
      {state?.orderId && (
        <p>Your order reference is <strong>#{state.orderId}</strong>.</p>
      )}
      <Link to="/" className="btn btn-primary mt-3">
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderSuccess;
