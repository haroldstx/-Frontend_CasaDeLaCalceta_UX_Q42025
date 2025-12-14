// frontend/src/services/productService.js
import api from '../api/axios';

export async function getAllProductos() {
  const resp = await api.get('/productos/getAll');
  return resp?.data?.data || [];
}

export async function getProductById(id) {
  const resp = await api.get(`/productos/${id}`);
  return resp?.data?.data || null;
}

export default {
  getAllProductos,
  getProductById,
};
