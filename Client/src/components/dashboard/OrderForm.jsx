import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { createOrder, updateOrder, getOrder } from '../../api/order';

const OrderForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    customer_name: '',
    email: '',
    phone: '',
    status: 'pending',
    items: [],
    total: 0,
    notes: ''
  });

  useEffect(() => {
    if (id) {
      loadOrder();
    }
  }, [id]);

  const loadOrder = async () => {
    try {
      setLoading(true);
      const response = await getOrder(id);
      setForm(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load order');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (id) {
        await updateOrder(id, form);
      } else {
        await createOrder(form);
      }
      navigate('/dashboard/orders');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save order');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div>
      <h2>{id ? t('order.edit') || 'Edit Order' : t('order.create') || 'Create Order'}</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>{t('order.customer_name') || 'Customer Name'}</Form.Label>
          <Form.Control
            type="text"
            name="customer_name"
            value={form.customer_name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>{t('order.email') || 'Email'}</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>{t('order.phone') || 'Phone'}</Form.Label>
          <Form.Control
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>{t('order.status') || 'Status'}</Form.Label>
          <Form.Select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>{t('order.notes') || 'Notes'}</Form.Label>
          <Form.Control
            as="textarea"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows={3}
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Saving...' : (id ? t('common.update') || 'Update' : t('common.create') || 'Create')}
        </Button>
      </Form>
    </div>
  );
};

export default OrderForm;