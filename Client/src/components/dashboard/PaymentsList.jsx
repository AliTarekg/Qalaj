import React, { useState, useEffect } from 'react';
import { Table, Button, Spinner, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { getPayments, deletePayment } from '../../api/payment';

const PaymentsList = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    try {
      setLoading(true);
      const response = await getPayments();
      setPayments(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load payments');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this payment?')) {
      try {
        await deletePayment(id);
        setPayments(payments.filter(payment => payment.id !== id));
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete payment');
      }
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{t('dashboard.payments') || 'Payments'}</h2>
        <Button variant="primary" href="/dashboard/payments/new">
          {t('dashboard.new_payment') || 'New Payment'}
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>{t('payment.invoice') || 'Invoice #'}</th>
            <th>{t('payment.amount') || 'Amount'}</th>
            <th>{t('payment.date') || 'Date'}</th>
            <th>{t('payment.method') || 'Method'}</th>
            <th>{t('payment.status') || 'Status'}</th>
            <th>{t('common.actions') || 'Actions'}</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.id}</td>
              <td>{payment.invoice_number}</td>
              <td>${payment.amount}</td>
              <td>{new Date(payment.payment_date).toLocaleDateString()}</td>
              <td>{payment.payment_method}</td>
              <td>{payment.status}</td>
              <td>
                <Button variant="info" size="sm" className="me-2" href={`/dashboard/payments/${payment.id}`}>
                  {t('common.edit') || 'Edit'}
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(payment.id)}>
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

export default PaymentsList;