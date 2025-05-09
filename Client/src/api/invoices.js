import axios from './axiosInstance';

export const createInvoice = async (data) => {
  const res = await axios.post('/invoices', data);
  return res.data;
};

export const createPayment = async (data) => {
  const res = await axios.post('/payments', data);
  return res.data;
};

export const getInvoicePayments = async (invoiceId) => {
  const res = await axios.get(`/payments/invoice/${invoiceId}`);
  return res.data;
};
