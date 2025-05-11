import axios from './axiosInstance';

export const createOrder = async (data) => {
  const res = await axios.post('/orders', data);
  return res.data;
};

export const createOrderItem = async (data) => {
  const res = await axios.post('/order-items', data);
  return res.data;
};

export const getOrderItems = async (orderId) => {
  const res = await axios.get(`/order-items/${orderId}`);
  return res.data;
};

export const getOrders = async () => {
  const res = await axios.get('/orders');
  return res.data;
};
