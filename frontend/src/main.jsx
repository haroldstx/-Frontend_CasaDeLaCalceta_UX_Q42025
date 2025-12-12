import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import FormRegister from "./pages/RegisterPages.jsx";
import LoginPage from "./pages/LoginPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoginPage />
  </StrictMode>
);
