import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import FormRegister from "./pages/RegisterPages.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FormRegister />
  </StrictMode>
);
