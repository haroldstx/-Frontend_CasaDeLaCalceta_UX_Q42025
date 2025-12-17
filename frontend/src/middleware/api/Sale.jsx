import axios from "axios";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3002/api";
const API_SALE = `${API_URL}/sale`;

export const SetSale = async (saleData) => {
  try {
    console.log("Datos enviados para la venta:", saleData);
    const response = await axios.post(`${API_SALE}`, saleData);
    console.log("Respuesta completa:", response);
    if (response.status === 201) {
      toast.success("Venta creada exitosamente", {
        position: "bottom-right",
      });
      return response.data;
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        toast.error("Datos de venta inválidos");
      } else if (error.response.status === 404) {
        toast.error("Cliente o empleado no encontrado");
      } else {
        toast.error("Error del servidor, intente más tarde");
      }
    } else {
      throw new Error("Ocurrió un error inesperado al procesar la solicitud.");
    }
  }
};
