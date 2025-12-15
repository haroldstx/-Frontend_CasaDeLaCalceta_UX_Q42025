import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "./index.css";
import FormRegister from "./pages/RegisterPages.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import LoginPage from "./pages/LoginPage.jsx";
import ErrorPage404 from "./pages/Error404.jsx";
import NavbarAdmin from "./components/NavbarAdmin/NavbarAdmin.jsx";
import NavbarCliente from "./components/NavbarCliente/NavbarCliente.jsx";
import GestionUsers from "./pages/GestionUsers.jsx";
import GestionCat from "./pages/GestionCategorias.jsx";
import Error500 from "./pages/Error500.jsx";
import VerMiPerfilPage from "./pages/VerMiPerfilPage.jsx";
import EditarPerfil from "./pages/EditarPerfilPage.jsx";
import BillingPage from "./pages/BillingPage.jsx";
import ReportsPage from "./pages/ReportsPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import DashboardPage from "./pages/Dashboard.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<FormRegister />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/navbar-admin" element={<NavbarAdmin />} />
          <Route path="/navbar-cliente" element={<NavbarCliente />} />
          <Route path="/gestion-users" element={<GestionUsers />} />
          <Route path="/gestion-categorias" element={<GestionCat />} />
          <Route path="*" element={<ErrorPage404 />} />
          <Route path="/error-500" element={<Error500 />} />
          <Route path="/ver-mi-perfil" element={<VerMiPerfilPage />} />
          <Route path="/editar-perfil" element={<EditarPerfil />} />
          <Route path="/facturacion" element={<BillingPage />} />
          <Route path="/reportes" element={<ReportsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/Pedidos" element={<OrdersPage />} />
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
