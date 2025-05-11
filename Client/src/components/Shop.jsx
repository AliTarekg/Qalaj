import  { useEffect, useState } from "react";
import { getItems } from "../api/items";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import { Card, Button, Row, Col, Spinner, Badge } from "react-bootstrap";

const Shop = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cart, addToCart, cartCount, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const data = await getItems();
        setItems(data);
      } catch (err) {
        console.error("Error loading items:", err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Shop</h2>
        <Button variant="primary" onClick={() => navigate('/checkout')} disabled={cart.length === 0}>
          View Cart <Badge bg="light" text="dark">{cartCount}</Badge>
          <span className="ms-2">(${cartTotal.toFixed(2)})</span>
        </Button>
      </div>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {items.map(item => {
          const imgSrc = item.image_url.startsWith('http')
            ? item.image_url
            : `${import.meta.env.VITE_API_URL || ''}${item.image_url}`;
          return (
            <Col key={item.id}>
              <Card className="h-100">
                {imgSrc && <Card.Img variant="top" src={imgSrc} style={{ objectFit: 'cover', height: 200 }} />}
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text className="text-truncate" style={{ flex: 1 }}>
                    {item.description}
                  </Card.Text>
                  <div className="mb-2">
                    <strong>${Number(item.price).toFixed(2)}</strong>
                    {' '}<Badge bg="warning" text="dark">Stock: {item.stock}</Badge>
                  </div>
                  <Button
                    variant="outline-success"
                    onClick={() => addToCart(item)}
                    disabled={item.stock <= 0}
                    className="mt-auto"
                  >
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Shop;
