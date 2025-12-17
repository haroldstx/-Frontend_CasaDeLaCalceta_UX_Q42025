import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3002/api";
const CATEGORY_ENDPOINT = `${API_BASE_URL}/category`;

export const ShowCategories = async () => {
  try {
    const response = await axios.get(`${CATEGORY_ENDPOINT}/getAll`);
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        toast.error("Categorías no encontradas");
      } else if (error.response.status === 500) {
        toast.error("Error del servidor, intente más tarde");
      }
    } else {
      throw new Error("Ocurrió un error inesperado al procesar la solicitud.");
    }
  }
};

export const CreateCategory = async (categoryData) => {
  try {
    const response = await axios.post(`${CATEGORY_ENDPOINT}`, categoryData);
    if (response.status === 201) {
      toast.success("Categoría creada exitosamente", {
        position: "bottom-right",
      });
      return response.data.data;
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        toast.error("Datos de categoría inválidos");
      } else if (error.response.status === 500) {
        toast.error("Error del servidor, intente más tarde");
      }
    } else {
      throw new Error("Ocurrió un error inesperado al procesar la solicitud.");
    }
  }
};

export const DeleteCategory = async (categoryId) => {
  try {
    const response = await axios.delete(
      `${CATEGORY_ENDPOINT}/eliminar/${categoryId}`
    );
    if (response.status === 200) {
      toast.success("Categoría eliminada exitosamente", {
        position: "bottom-right",
      });
      return response.data;
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        toast.error("Categoría no encontrada");
      } else if (error.response.status === 500) {
        toast.error("Error del servidor, intente más tarde");
      }
    } else {
      throw new Error("Ocurrió un error inesperado al procesar la solicitud.");
    }
  }
};
