import { useNavigate } from "react-router-dom";

const Cart = ({ cart, onRemove, onCheckout }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const navigate = useNavigate();
  return (
    <div>
      <h3>Cart</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>${Number(item.price).toFixed(2)}</td>
              <td>{item.quantity}</td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => onRemove(item.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
          {cart.length === 0 && (
            <tr>
              <td colSpan={5}>Cart is empty.</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="mb-2">
        <strong>Total: ${total.toFixed(2)}</strong>
      </div>
      <button
        className="btn btn-primary w-100 mt-2"
        onClick={() => {
          onClose();
          navigate("/checkout");
        }}
        disabled={cart.length === 0}
      >
        Checkout
      </button>
    </div>
  );
};

export default Cart;
