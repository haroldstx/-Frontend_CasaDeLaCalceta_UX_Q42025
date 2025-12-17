import axios from "axios";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3002/api";
const API_SALE = `${API_URL}/sale`;
const API_SALE_DETAILS = `${API_URL}/sale-details`;

export const SetSale = async (saleData) => {
  try {
    console.log("Datos enviados para la venta:", saleData);
    const response = await axios.post(`${API_SALE}`, saleData);
    console.log("Respuesta completa:", response);
    if (response.status === 201) {
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

// Crear una venta
export const crearVenta = async (ventaData) => {
  try {
    const response = await axios.post(`${API_SALE}`, ventaData);
    if (response.status === 201) {

      return response?.data || null;
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        toast.error("Datos de venta inválidos o incompletos");
      } else if (error.response.status === 404) {
        toast.error("Cliente o empleado no encontrado");
      } else if (error.response.status === 500) {
        toast.error("Error del servidor, intente más tarde");
      }
    } else {
      toast.error("Error de conexión al servidor");
    }
    return null;
  }
};

// Obtener todas las ventas
export const obtenerVentas = async () => {
  try {
    const response = await axios.get(`${API_SALE}`);
    if (response.status === 200) {
      return response?.data?.data || [];
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        toast.error("No hay ventas registradas");
      } else if (error.response.status === 500) {
        toast.error("Error del servidor");
      }
    } else {
      toast.error("Error de conexión al servidor");
    }
    return [];
  }
};

// Obtener una venta por ID
export const obtenerVentaPorId = async (id_venta) => {
  try {
    const response = await axios.get(`${API_SALE}/${id_venta}`);
    if (response.status === 200) {
      return response?.data || null;
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        toast.error("ID de venta inválido");
      } else if (error.response.status === 404) {
        toast.error("Venta no encontrada");
      } else if (error.response.status === 500) {
        toast.error("Error del servidor");
      }
    } else {
      toast.error("Error de conexión al servidor");
    }
    return null;
  }
};

// Actualizar estado de pago de una venta
export const actualizarEstadoVenta = async (id_venta, estado_pago) => {
  try {
    const response = await axios.patch(`${API_SALE}/${id_venta}/estado`, {
      estado_pago,
    });
    if (response.status === 200) {
      toast.success("Estado de pago actualizado");
      return response?.data || null;
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        toast.error("Datos inválidos");
      } else if (error.response.status === 404) {
        toast.error("Venta no encontrada");
      } else if (error.response.status === 500) {
        toast.error("Error del servidor");
      }
    } else {
      toast.error("Error de conexión al servidor");
    }
    return null;
  }
};

// Crear detalle de venta
export const crearDetalleVenta = async (detalleData) => {
  try {
    console.log("Datos enviados al detalle:", detalleData);
    const response = await axios.post(`${API_SALE_DETAILS}`, detalleData);
    if (response.status === 201) {
      return response?.data || null;
    }
  } catch (error) {
    console.error("Error completo:", error);
    console.error("Respuesta del servidor:", error.response?.data);
    if (error.response) {
      if (error.response.status === 400) {
        toast.error("Datos del detalle inválidos: " + JSON.stringify(error.response.data));
      } else if (error.response.status === 404) {
        toast.error("Venta o producto no encontrado");
      } else if (error.response.status === 500) {
        toast.error("Error del servidor");
      }
    } else {
      toast.error("Error de conexión al servidor");
    }
    return null;
  }
};

// Obtener detalles de una venta por ID
export const obtenerDetallesPorVenta = async (id_venta) => {
  try {
    const response = await axios.get(`${API_SALE_DETAILS}/${id_venta}`);
    if (response.status === 200) {
      return response?.data?.data || [];
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        toast.error("ID de venta inválido");
      } else if (error.response.status === 404) {
        console.log("No hay detalles para esta venta");
      } else if (error.response.status === 500) {
        toast.error("Error del servidor");
      }
    } else {
      toast.error("Error de conexión al servidor");
    }
    return [];
  }
};
