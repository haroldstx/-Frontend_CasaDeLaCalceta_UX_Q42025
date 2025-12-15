import api from '../api/axios';

export async function getAllProductos() {
  const resp = await api.get('/productos/getAll');
  return resp?.data?.data || [];
}

export async function getProductsByCategory(categoryId) {
  const resp = await api.get(`/productos/category/${categoryId}`);
  return resp?.data?.data || [];
}

export async function getProductsByTheme(theme) {
  const resp = await api.get(`/productos/theme/${theme}`);
  return resp?.data?.data || [];
}

export default {
  getAllProductos,
  getProductsByCategory,
  getProductsByTheme,
};


