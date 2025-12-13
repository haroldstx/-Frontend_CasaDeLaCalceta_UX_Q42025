import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import "./index.css";
import FormRegister from "./pages/RegisterPages.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ErrorPage404 from "./pages/Error404.jsx";
import NavbarAdmin from "./components/NavbarAdmin/NavbarAdmin.jsx";
import NavbarCliente from "./components/NavbarCliente/NavbarCliente.jsx";
import Error500 from "./pages/Error500.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<FormRegister />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/navbar-admin" element={<NavbarAdmin />} />
        <Route path="/navbar-cliente" element={<NavbarCliente />} />
        <Route path="*" element={<ErrorPage404 />} />
        <Route path="/error-500" element={<Error500 />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
