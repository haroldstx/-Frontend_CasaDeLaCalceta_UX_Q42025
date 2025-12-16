import axios from "axios";
import { BiExport } from "react-icons/bi";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3002/api";
const PRODUCTS_ENDPOINT = `${API_URL}/products`;

export const ShowProducts = async () => {
  try {
    const response = await axios.get(`${PRODUCTS_ENDPOINT}/getAll`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        toast.error("Usuarios no encontrados");
      } else if (error.response.status === 500) {
        toast.error("Error del servidor, intente más tarde");
      }
    } else {
      throw new Error("Ocurrió un error inesperado al procesar la solicitud.");
    }
  }
};
