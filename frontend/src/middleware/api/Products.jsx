import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3002/api";
const PRODUCTS_ENDPOINT = `${API_URL}/products`;

export const getAllProductos = async () => {
  try {
    const response = await axios.get(`${PRODUCTS_ENDPOINT}/getAll`);
    if (response.status === 200) {
      return response?.data?.data || [];
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        toast.error("Productos no encontrados");
      } else if (error.response.status === 500) {
        toast.error("Error del servidor, intente más tarde");
      }
    } else {
      toast.error("Error de conexión al servidor");
    }
    return [];
  }
};

export const crearProducto = async (formData) => {
  try {
    const response = await axios.post(`${PRODUCTS_ENDPOINT}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response.status === 200 || response.status === 201) {
      toast.success("Producto creado exitosamente");
      return response?.data?.data;
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        toast.error("Datos inválidos");
      } else if (error.response.status === 500) {
        toast.error("Error del servidor, intente más tarde");
      }
    } else {
      toast.error("Error de conexión al servidor");
    }
    throw error;
  }
};

export const habilitarProducto = async (id) => {
  try {
    const response = await axios.patch(`${PRODUCTS_ENDPOINT}/habilitar/${id}`);
    if (response.status === 200) {
      toast.success("Producto habilitado");
      return response?.data;
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        toast.error("Producto no encontrado");
      } else if (error.response.status === 500) {
        toast.error("Error del servidor, intente más tarde");
      }
    } else {
      toast.error("Error de conexión al servidor");
    }
    throw error;
  }
};

export const deshabilitarProducto = async (id) => {
  try {
    const response = await axios.patch(`${PRODUCTS_ENDPOINT}/deshabilitar/${id}`);
    if (response.status === 200) {
      toast.success("Producto deshabilitado");
      return response?.data;
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        toast.error("Producto no encontrado");
      } else if (error.response.status === 500) {
        toast.error("Error del servidor, intente más tarde");
      }
    } else {
      toast.error("Error de conexión al servidor");
    }
    throw error;
  }
};


export const ShowProducts = async () => {
  try {
    const response = await axios.get(`${PRODUCTS_ENDPOINT}`);
    if (response.status === 200) {
      return response?.data?.data || [];
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        toast.error("Productos no encontrados");
      } else if (error.response.status === 500) {
        toast.error("Error del servidor, intente más tarde");
      }
    } else {
      toast.error("Error de conexión al servidor");
    }
    return [];
  }
};
