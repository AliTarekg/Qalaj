import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { createInvoice, updateInvoice, getInvoice } from '../../api/invoice';

const InvoiceForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    invoice_number: '',
    client_name: '',
    client_email: '',
    date: new Date().toISOString().split('T')[0],
    due_date: '',
    items: [],
    total_amount: 0,
    status: 'pending',
    notes: ''
  });

  useEffect(() => {
    if (id) {
      loadInvoice();
    }
  }, [id]);

  const loadInvoice = async () => {
    try {
      setLoading(true);
      const response = await getInvoice(id);
      setForm({
        ...response.data,
        date: new Date(response.data.date).toISOString().split('T')[0],
        due_date: new Date(response.data.due_date).toISOString().split('T')[0]
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load invoice');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (id) {
        await updateInvoice(id, form);
      } else {
        await createInvoice(form);
      }
      navigate('/dashboard/invoices');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save invoice');
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
      <h2>{id ? t('invoice.edit') || 'Edit Invoice' : t('invoice.create') || 'Create Invoice'}</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>{t('invoice.number') || 'Invoice Number'}</Form.Label>
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
              <Form.Label>{t('invoice.status') || 'Status'}</Form.Label>
              <Form.Select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
                <option value="cancelled">Cancelled</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>{t('invoice.client_name') || 'Client Name'}</Form.Label>
              <Form.Control
                type="text"
                name="client_name"
                value={form.client_name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>{t('invoice.client_email') || 'Client Email'}</Form.Label>
              <Form.Control
                type="email"
                name="client_email"
                value={form.client_email}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>{t('invoice.date') || 'Invoice Date'}</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>{t('invoice.due_date') || 'Due Date'}</Form.Label>
              <Form.Control
                type="date"
                name="due_date"
                value={form.due_date}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>{t('invoice.total_amount') || 'Total Amount'}</Form.Label>
          <Form.Control
            type="number"
            name="total_amount"
            value={form.total_amount}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>{t('invoice.notes') || 'Notes'}</Form.Label>
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

export default InvoiceForm;