import React, { useState, useEffect } from 'react';
import { Table, Button, Spinner, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { getInvoices, deleteInvoice } from '../../api/invoice';

const InvoicesList = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    try {
      setLoading(true);
      const response = await getInvoices();
      setInvoices(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load invoices');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      try {
        await deleteInvoice(id);
        setInvoices(invoices.filter(invoice => invoice.id !== id));
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete invoice');
      }
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{t('dashboard.invoices') || 'Invoices'}</h2>
        <Button variant="primary" href="/dashboard/invoices/new">
          {t('dashboard.new_invoice') || 'New Invoice'}
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>{t('invoice.number') || 'Invoice #'}</th>
            <th>{t('invoice.client') || 'Client'}</th>
            <th>{t('invoice.date') || 'Date'}</th>
            <th>{t('invoice.due_date') || 'Due Date'}</th>
            <th>{t('invoice.amount') || 'Amount'}</th>
            <th>{t('invoice.status') || 'Status'}</th>
            <th>{t('common.actions') || 'Actions'}</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.id}</td>
              <td>{invoice.invoice_number}</td>
              <td>{invoice.client_name}</td>
              <td>{new Date(invoice.date).toLocaleDateString()}</td>
              <td>{new Date(invoice.due_date).toLocaleDateString()}</td>
              <td>${invoice.total_amount}</td>
              <td>{invoice.status}</td>
              <td>
                <Button variant="info" size="sm" className="me-2" href={`/dashboard/invoices/${invoice.id}`}>
                  {t('common.edit') || 'Edit'}
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(invoice.id)}>
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

export default InvoicesList;