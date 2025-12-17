import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3002/api";
const API_SELL_DETAILS = `${API_URL}/sale-details`;

export const SetSellDetails = async (sellDetailsData) => {
  try {
    console.log("Datos enviados para los detalles de venta:", sellDetailsData);
    const response = await axios.post(`${API_SELL_DETAILS}`, sellDetailsData);
    console.log("Respuesta completa:", response);
    if (response.status === 201) {
      toast.success("Detalles de venta creados exitosamente", {
        position: "bottom-right",
      });
      return response.data;
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        toast.error("Datos de detalles de venta inválidos");
      } else if (error.response.status === 404) {
        toast.error("Detalles de venta no encontrados");
      } else {
        toast.error("Error del servidor, intente más tarde");
      }
    } else {
      throw new Error("Ocurrió un error inesperado al procesar la solicitud.");
    }
  }
};
