import React, { useState, useEffect } from 'react';
import { Table, Button, Spinner, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { getInquiries, deleteInquiry } from '../../api/inquiry';

const InquiriesList = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    loadInquiries();
  }, []);

  const loadInquiries = async () => {
    try {
      setLoading(true);
      const response = await getInquiries();
      setInquiries(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load inquiries');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      try {
        await deleteInquiry(id);
        setInquiries(inquiries.filter(inquiry => inquiry.id !== id));
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete inquiry');
      }
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{t('dashboard.inquiries') || 'Inquiries'}</h2>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>{t('inquiry.name') || 'Name'}</th>
            <th>{t('inquiry.email') || 'Email'}</th>
            <th>{t('inquiry.subject') || 'Subject'}</th>
            <th>{t('inquiry.status') || 'Status'}</th>
            <th>{t('common.actions') || 'Actions'}</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((inquiry) => (
            <tr key={inquiry.id}>
              <td>{inquiry.id}</td>
              <td>{inquiry.name}</td>
              <td>{inquiry.email}</td>
              <td>{inquiry.subject}</td>
              <td>{inquiry.status}</td>
              <td>
                <Button variant="info" size="sm" className="me-2" href={`/dashboard/inquiries/${inquiry.id}`}>
                  {t('common.view') || 'View'}
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(inquiry.id)}>
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

export default InquiriesList;