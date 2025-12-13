import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import FormRegister from "./pages/RegisterPages.jsx";
import VerMiPerfil from "./pages/VerMiPerfil/VerMiPerfil.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <VerMiPerfil />
  </StrictMode>
);
