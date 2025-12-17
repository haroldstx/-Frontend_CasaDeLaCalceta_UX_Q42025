import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3002/api";
const SUCATEGORY_ENDPOINT = `${API_BASE_URL}/subcategory`;

export const ShowSubcategories = async () => {
  try {
    const response = await axios.get(`${SUCATEGORY_ENDPOINT}/getAll`);
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        toast.error("Subcategorías no encontradas");
      } else if (error.response.status === 500) {
        toast.error("Error del servidor, intente más tarde");
      }
    } else {
      throw new Error("Ocurrió un error inesperado al procesar la solicitud.");
    }
  }
};

export const CreateSubcategory = async (SubcategoryData, categoryId) => {
  try {
    console.log(
      "Datos enviados para la subcategoría:",
      SubcategoryData,
      categoryId
    );
    const response = await axios.post(
      `${SUCATEGORY_ENDPOINT}/${categoryId}`,
      SubcategoryData
    );
    if (response.status === 201) {
      toast.success("Subcategoría creada exitosamente", {
        position: "bottom-right",
      });
      return response.data.data;
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        toast.error("Datos de subcategoría inválidos");
      } else if (error.response.status === 500) {
        toast.error("Error del servidor, intente más tarde");
      }
    } else {
      throw new Error("Ocurrió un error inesperado al procesar la solicitud.");
    }
  }
};

export const deleteSubcategory = async (subcategoryId) => {
  try {
    const response = await axios.delete(
      `${SUCATEGORY_ENDPOINT}/eliminar/${subcategoryId}`
    );
    if (response.status === 200) {
      toast.success("Subcategoría eliminada exitosamente", {
        position: "bottom-right",
      });
      return response.data;
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        toast.error("Subcategoría no encontrada");
      } else if (error.response.status === 500) {
        toast.error("Error del servidor, intente más tarde");
      }
    } else {
      throw new Error("Ocurrió un error inesperado al procesar la solicitud.");
    }
  }
};
