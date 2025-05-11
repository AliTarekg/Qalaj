import React, { useEffect, useState } from "react";
import { getItems } from "../api/items";
import { useCart } from "./CartContext";

const ProductsShowcase = ({ onCartOpen }) => {
  const [items,   setItems  ] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    getItems()
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center my-5">Loading products...</div>;
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Our Products</h2>
      <div className="row g-4">
        {items.map(item => {
          const imageLink = item.image_url.startsWith("http")
            ? item.image_url
            : `http://localhost:5001${item.image_url}`;

          return (
            <div className="col-md-4 col-lg-3" key={item.id}>
              <div className="card h-100 shadow-sm product-card-shopify">
                {imageLink && (
                  <img
                    src={imageLink}
                    alt={item.name}
                    className="card-img-top"
                    style={{
                      objectFit: "cover",
                      height: 220,
                      width: "100%",
                      display: "block",
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
                    }}
                  />
                )}

                <div className="card-body d-flex flex-column align-items-center text-center">
                  <h5 className="card-title mb-2" style={{ fontWeight: 700 }}>
                    {item.name}
                  </h5>
                  <div className="mb-2">
                    <span
                      className="badge bg-success"
                      style={{ fontSize: "1.1rem", padding: "8px 16px" }}
                    >
                      ${Number(item.price).toFixed(2)}
                    </span>
                  </div>
                  <p
                    className="card-text text-muted mb-2"
                    style={{ minHeight: 40 }}
                  >
                    {item.description}
                  </p>
                  {item.sizes && (
                    <div className="mb-2">
                      <span className="badge bg-secondary">
                        Sizes: {item.sizes}
                      </span>
                    </div>
                  )}
                  <div className="mb-3">
                    <span className="badge bg-light text-dark">
                      Stock: {item.stock}
                    </span>
                  </div>

                  <div className="d-flex gap-2 w-100">
                    <button
                      className="btn btn-outline-primary w-100"
                      style={{ fontWeight: 600 }}
                      onClick={() => {
                        addToCart(item);
                        onCartOpen();
                      }}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="btn btn-primary w-100"
                      style={{ fontWeight: 700 }}
                      onClick={() => {
                        addToCart(item);
                        onCartOpen();
                      }}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {items.length === 0 && (
          <div className="col-12 text-center">No products found.</div>
        )}
      </div>

      {/* your existing styles */}
      <style>{`
        .product-card-shopify {
          border-radius: 12px;
          transition: box-shadow 0.2s, transform 0.2s;
          box-shadow: 0 4px 24px rgba(22,31,72,0.10);
          background: #fff;
        }
        .product-card-shopify:hover {
          box-shadow: 0 8px 32px rgba(216,171,65,0.18);
          transform: translateY(-6px) scale(1.03);
        }
        .product-card-shopify .card-title {
          font-size: 1.2rem;
        }
        .product-card-shopify .btn-primary {
          background: #161f48;
          border-color: #d8ab41;
        }
        .product-card-shopify .btn-outline-primary {
          border-color: #161f48;
          color: #161f48;
        }
        .product-card-shopify .btn-outline-primary:hover {
          background: #161f48;
          color: #fff;
        }
      `}</style>
    </div>
  );
};

export default ProductsShowcase;
