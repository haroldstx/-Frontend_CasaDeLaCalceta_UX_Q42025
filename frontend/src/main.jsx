import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { toast } from "react-toastify";

// Componente para proteger rutas (puedes importarlo si lo creaste en otro archivo)
import { ProtectedRoute } from "./components/ProtectedRoute"; // Asegúrate de crear este archivo o definirlo arriba

// --- IMPORTS DE TUS PÁGINAS ---
import FormRegister from "./pages/RegisterPages.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ErrorPage404 from "./pages/Error404.jsx";
import Error500 from "./pages/Error500.jsx";
import HomePage from "./pages/HomePage.jsx";

// Paginas Cliente
import NavbarCliente from "./components/NavbarCliente/NavbarCliente.jsx";
import VerMiPerfilPage from "./pages/VerMiPerfilPage.jsx";
import EditarPerfil from "./pages/EditarPerfilPage.jsx";
import BillingPage from "./pages/BillingPage.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import CambiarPassword from "./pages/CambiarPassword.jsx";

// Paginas Admin
import NavbarAdmin from "./components/NavbarAdmin/NavbarAdmin.jsx";
import ReportsPage from "./pages/ReportsPage.jsx";
import DashboardPage from "./pages/Dashboard.jsx";
import AdminOrdersPage from "./pages/AdminOrdersPage.jsx";
import PosPage from "./pages/PosPage.jsx";
import InventarioAdmin from "./pages/InventarioAdmin.jsx";
import GestionUsers from "./pages/GestionUsers.jsx";
import GestionCat from "./pages/GestionCategorias.jsx";

// --- SIMULACIÓN DE OBTENCIÓN DE USUARIO ---
// En tu app real, esto debería venir de un Contexto o AuthHook
const getUser = () => {
  // Ejemplo: return JSON.parse(localStorage.getItem('user'));
  // Devuelve null si no hay usuario, o un objeto con { role: 'admin' } o { role: 'cliente' }
  const user = JSON.parse(localStorage.getItem("user")) || null;
  return user;
};

const user = getUser();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <BrowserRouter>
        <Routes>
          {/* ---------------- RUTAS PÚBLICAS ---------------- */}

          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<FormRegister />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/error-500" element={<Error500 />} />
          <Route path="*" element={<ErrorPage404 />} />

          {/* ---------------- RUTAS DE CLIENTE ---------------- */}

          <Route element={<ProtectedRoute isAllowed={!!user} />}>
            <Route path="/ver-mi-perfil" element={<VerMiPerfilPage />} />
            <Route path="/editar-perfil" element={<EditarPerfil />} />
            <Route path="/cambiar-contrasena" element={<CambiarPassword />} />
            <Route path="/navbar-cliente" element={<NavbarCliente />} />

            <Route path="/facturacion" element={<BillingPage />} />
            <Route path="/Pedidos" element={<OrdersPage />} />
            <Route path="/payment" element={<PaymentPage />} />
          </Route>

          {/* ---------------- RUTAS DE ADMINISTRADOR ---------------- */}
          {/* Solo acceden si hay usuario Y su rol es 'admin' */}
          <Route
            element={
              <ProtectedRoute
                isAllowed={!!user && user.role === "administrador"}
                redirectTo="/login"
              />
            }
          >
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/navbar-admin" element={<NavbarAdmin />} />
            <Route path="/gestion-users" element={<GestionUsers />} />
            <Route path="/gestion-categorias" element={<GestionCat />} />
            <Route path="/reportes" element={<ReportsPage />} />
            <Route path="/Pedidos-admin" element={<AdminOrdersPage />} />
            <Route path="/pos" element={<PosPage />} />
            <Route path="/inventario" element={<InventarioAdmin />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </CartProvider>
  </StrictMode>
);
