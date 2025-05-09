import axios from './axiosInstance';

export const getCustomers = async () => {
  const res = await axios.get('/customers');
  return res.data;
};

export const getCustomer = async (id) => {
  const res = await axios.get(`/customers/${id}`);
  return res.data;
};

export const createCustomer = async (data) => {
  const res = await axios.post('/customers', data);
  return res.data;
};

export const updateCustomer = async (id, data) => {
  const res = await axios.put(`/customers/${id}`, data);
  return res.data;
};

export const deleteCustomer = async (id) => {
  const res = await axios.delete(`/customers/${id}`);
  return res.data;
};

export const getCustomerOrders = async (id) => {
  const res = await axios.get(`/customers/${id}/orders`);
  return res.data;
};

export const getCustomerInvoices = async (id) => {
  const res = await axios.get(`/customers/${id}/invoices`);
  return res.data;
};
