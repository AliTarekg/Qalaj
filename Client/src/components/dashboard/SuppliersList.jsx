import React, { useState, useEffect } from 'react';
import { Table, Button, Spinner, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { getSuppliers, deleteSupplier } from '../../api/supplier';

const SuppliersList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    try {
      setLoading(true);
      const response = await getSuppliers();
      setSuppliers(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load suppliers');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      try {
        await deleteSupplier(id);
        setSuppliers(suppliers.filter(supplier => supplier.id !== id));
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete supplier');
      }
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{t('dashboard.suppliers') || 'Suppliers'}</h2>
        <Button variant="primary" href="/dashboard/suppliers/new">
          {t('dashboard.new_supplier') || 'New Supplier'}
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>{t('supplier.name') || 'Name'}</th>
            <th>{t('supplier.contact') || 'Contact'}</th>
            <th>{t('supplier.phone') || 'Phone'}</th>
            <th>{t('supplier.email') || 'Email'}</th>
            <th>{t('common.actions') || 'Actions'}</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier.id}>
              <td>{supplier.id}</td>
              <td>{supplier.name}</td>
              <td>{supplier.contact_person}</td>
              <td>{supplier.phone}</td>
              <td>{supplier.email}</td>
              <td>
                <Button variant="info" size="sm" className="me-2" href={`/dashboard/suppliers/${supplier.id}`}>
                  {t('common.edit') || 'Edit'}
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(supplier.id)}>
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

export default SuppliersList;