import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3002/api";
const USERS_ENDPOINT = `${API_URL}/users`;

export const LoginUser = async (correo, password) => {
  try {
    const response = await axios.post(`${USERS_ENDPOINT}/login`, {
      correo,
      password,
    });
    if (response.status === 200) {
      toast.success("Inicio de sesión exitoso");
      return response.data;
    } else {
      toast.error("Error en el inicio de sesión");
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        toast.error("Credenciales inválidas");
      } else if (error.response.status === 404) {
        toast.error("Usuario no encontrado");
      } else {
        toast.error("Error del servidor, intente más tarde");
      }
    } else {
      throw new Error("Ocurrió un error inesperado al procesar la solicitud.");
    }
  }
};
