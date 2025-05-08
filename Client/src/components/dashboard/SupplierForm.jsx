import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { createSupplier, updateSupplier, getSupplier } from '../../api/supplier';

const SupplierForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    name: '',
    contact_person: '',
    email: '',
    phone: '',
    address: '',
    notes: ''
  });

  useEffect(() => {
    if (id) {
      loadSupplier();
    }
  }, [id]);

  const loadSupplier = async () => {
    try {
      setLoading(true);
      const response = await getSupplier(id);
      setForm(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load supplier');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (id) {
        await updateSupplier(id, form);
      } else {
        await createSupplier(form);
      }
      navigate('/dashboard/suppliers');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save supplier');
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
      <h2>{id ? t('supplier.edit') || 'Edit Supplier' : t('supplier.create') || 'Create Supplier'}</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>{t('supplier.name') || 'Company Name'}</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>{t('supplier.contact') || 'Contact Person'}</Form.Label>
          <Form.Control
            type="text"
            name="contact_person"
            value={form.contact_person}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>{t('supplier.email') || 'Email'}</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>{t('supplier.phone') || 'Phone'}</Form.Label>
          <Form.Control
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>{t('supplier.address') || 'Address'}</Form.Label>
          <Form.Control
            as="textarea"
            name="address"
            value={form.address}
            onChange={handleChange}
            rows={2}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>{t('supplier.notes') || 'Notes'}</Form.Label>
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

export default SupplierForm;