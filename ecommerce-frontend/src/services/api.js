import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
});

export const getProducts = () => api.get('/products');
export const getProduct = (id) => api.get(`/products/${id}`);

export default api;