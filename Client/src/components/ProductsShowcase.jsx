import  { useEffect, useState } from "react";
import { getItems } from "../api/items";
import { useCart } from "./CartContext";
import { Spinner, Card, Button, Badge, Row, Col } from "react-bootstrap";
import "./items.css";

const ProductsShowcase = ({ onCartOpen }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const apiBase = import.meta.env.VITE_API_URL || "";

  useEffect(() => {
    getItems()
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Our Products</h2>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {items.map((item) => {
          const imageUrl = item.image_url.startsWith("http")
            ? item.image_url
            : `${apiBase}${item.image_url}`;

          return (
            <Col key={item.id}>
              <Card className="product-card h-100">
                <div className="card-img-container">
                  <Card.Img
                    variant="top"
                    src={imageUrl}
                    alt={item.name}
                    className="product-img"
                  />
                  {item.stock === 0 && (
                    <Badge bg="danger" className="stock-overlay">
                      Out of Stock
                    </Badge>
                  )}
                </div>
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-truncate">
                    {item.name}
                  </Card.Title>
                  <Card.Text className="flex-grow-1 text-muted small">
                    {item.description}
                  </Card.Text>
                  <div className="d-flex align-items-center mb-3">
                    <h5 className="mb-0 me-auto">
                      ${Number(item.price).toFixed(2)}
                    </h5>
                    <Badge bg={item.stock > 0 ? "success" : "secondary"}>
                      {item.stock} {item.stock > 1 ? "in stock" : "left"}
                    </Badge>
                  </div>
                  <Button
                    variant="outline-primary"
                    className="mb-2"
                    disabled={item.stock === 0}
                    onClick={() => {
                      addToCart(item);
                      onCartOpen();
                    }}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="primary"
                    disabled={item.stock === 0}
                    onClick={() => {
                      addToCart(item);
                      onCartOpen();
                    }}
                  >
                    Buy Now
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
      {items.length === 0 && (
        <div className="col-12 text-center">No products found.</div>
      )}
    </div>
  );
};

export default ProductsShowcase;
