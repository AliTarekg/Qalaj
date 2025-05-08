import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { createPayment, updatePayment, getPayment } from '../../api/payment';

const PaymentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    invoice_number: '',
    amount: '',
    payment_date: new Date().toISOString().split('T')[0],
    payment_method: 'cash',
    status: 'completed',
    notes: ''
  });

  useEffect(() => {
    if (id) {
      loadPayment();
    }
  }, [id]);

  const loadPayment = async () => {
    try {
      setLoading(true);
      const response = await getPayment(id);
      setForm({
        ...response.data,
        payment_date: new Date(response.data.payment_date).toISOString().split('T')[0]
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load payment');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (id) {
        await updatePayment(id, form);
      } else {
        await createPayment(form);
      }
      navigate('/dashboard/payments');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save payment');
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
      <h2>{id ? t('payment.edit') || 'Edit Payment' : t('payment.create') || 'Create Payment'}</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>{t('payment.invoice') || 'Invoice Number'}</Form.Label>
              <Form.Control
                type="text"
                name="invoice_number"
                value={form.invoice_number}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>{t('payment.amount') || 'Amount'}</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>{t('payment.date') || 'Payment Date'}</Form.Label>
              <Form.Control
                type="date"
                name="payment_date"
                value={form.payment_date}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>{t('payment.method') || 'Payment Method'}</Form.Label>
              <Form.Select
                name="payment_method"
                value={form.payment_method}
                onChange={handleChange}
              >
                <option value="cash">Cash</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="credit_card">Credit Card</option>
                <option value="check">Check</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>{t('payment.status') || 'Status'}</Form.Label>
          <Form.Select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>{t('payment.notes') || 'Notes'}</Form.Label>
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

export default PaymentForm;