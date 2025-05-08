import axios from './axiosInstance';

export const getInvoices = () => axios.get('/invoices');
export const getInvoice = (id) => axios.get(`/invoices/${id}`);
export const createInvoice = (data) => axios.post('/invoices', data);
export const updateInvoice = (id, data) => axios.put(`/invoices/${id}`, data);
export const deleteInvoice = (id) => axios.delete(`/invoices/${id}`);