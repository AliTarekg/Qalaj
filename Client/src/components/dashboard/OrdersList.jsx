import React, { useState, useEffect } from 'react';
import { Table, Button, Spinner, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { getOrders, deleteOrder } from '../../api/order';

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await getOrders();
      setOrders(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await deleteOrder(id);
        setOrders(orders.filter(order => order.id !== id));
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete order');
      }
    }
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{t('dashboard.orders') || 'Orders'}</h2>
        <Button variant="primary" href="/dashboard/orders/new">
          {t('dashboard.new_order') || 'New Order'}
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>{t('order.customer') || 'Customer'}</th>
            <th>{t('order.status') || 'Status'}</th>
            <th>{t('order.total') || 'Total'}</th>
            <th>{t('common.actions') || 'Actions'}</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer_name}</td>
              <td>{order.status}</td>
              <td>${order.total}</td>
              <td>
                <Button variant="info" size="sm" className="me-2" href={`/dashboard/orders/${order.id}`}>
                  {t('common.view') || 'View'}
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(order.id)}>
                  {t('common.delete') || 'Delete'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default OrdersList;