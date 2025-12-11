import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import "./index.css";
import FormRegister from "./pages/RegisterPages.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ErrorPage404 from "./pages/Error404.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<FormRegister />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<ErrorPage404 />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
