import axios from 'axios';

const API_URL = 'https://ecommerce-backend-d7t3.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
});

export const getProducts = () => api.get('/products');
export const getProduct = (id) => api.get(`/products/${id}`);

export default api;
