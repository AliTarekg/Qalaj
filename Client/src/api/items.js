import axios from './axiosInstance';

export const getItems = async () => {
  const res = await axios.get('/items');
  return res.data;
};

export const getItem = async (id) => {
  const res = await axios.get(`/items/${id}`);
  return res.data;
};

export const createItem = async (data, isMultipart = false) => {
  if (isMultipart) {
    const res = await axios.post('/items', data, { headers: { 'Content-Type': 'multipart/form-data' } });
    return res.data;
  } else {
    const res = await axios.post('/items', data);
    return res.data;
  }
};

export const updateItem = async (id, data) => {
  const res = await axios.put(`/items/${id}`, data);
  return res.data;
};

export const deleteItem = async (id) => {
  const res = await axios.delete(`/items/${id}`);
  return res.data;
};
