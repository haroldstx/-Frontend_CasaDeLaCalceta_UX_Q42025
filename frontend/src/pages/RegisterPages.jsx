// src/pages/RegisterPage.jsx

import React, { useState } from "react";
import InputField from "../components/RegistroUser/InputFIeld.jsx";
import style from "../components/RegistroUser/InputField.module.css";
import Establecimiento from "../assets/site.jpeg";

const RegisterPage = () => {
  // Estado para manejar los datos del formulario (simulando un control de estado)
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    correoElectronico: "",
    contrasena: "",
    telefono: "",
    direccion: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
    alert("Simulación de envío de formulario. Revisa la consola.");
  };

  return (
    <div className={style["register-page-container"]}>
      {/* Contenedor del Formulario (con el degradado de fondo) */}
      <div className={style["form-wrapper"]}>
        <div className={style["form-header"]}>
          <h2 className={style["form-title"]}>FORMULARIO DE REGISTRO</h2>
        </div>

        {/* Cuerpo del Formulario */}
        <form className={style["registrationForm"]} onSubmit={handleSubmit}>
          <label htmlFor="nombreCompleto" className={style["input-label"]}>
            Nombre completo
          </label>
          <InputField
            label="nombreCompleto"
            type="text"
            placeholder="Tu nombre"
            value={formData.nombreCompleto}
            onChange={handleChange}
          />

          <label htmlFor="correoElectronico" className={style["input-label"]}>
            Correo electrónico
          </label>
          <InputField
            label="correoElectronico"
            type="email"
            placeholder="ej. id@email.com"
            value={formData.correoElectronico}
            onChange={handleChange}
          />

          <label htmlFor="contrasena" className={style["input-label"]}>
            Contraseña
          </label>
          <InputField
            label="contrasena"
            type="password"
            placeholder="......"
            value={formData.contrasena}
            onChange={handleChange}
          />

          <label htmlFor="telefono" className={style["input-label"]}>
            Teléfono
          </label>
          <InputField
            label="telefono"
            type="tel"
            placeholder="ej. +57 300 123 4567"
            value={formData.telefono}
            onChange={handleChange}
          />

          <label htmlFor="direccion" className={style["input-label"]}>
            Dirección
          </label>
          <InputField
            label="direccion"
            type="text"
            placeholder="ej. Calle, número, ciudad"
            value={formData.direccion}
            onChange={handleChange}
          />

          {/* Botón de envío */}
          <button type="submit" className={style["login-button"]}>
            Iniciar Sesión
          </button>
        </form>
      </div>

      <div className={style["image-display"]}>
        <img
          src={Establecimiento}
          alt="Imagen de Establecimiento"
          className={style["establishment-image"]}
        />
      </div>
    </div>
  );
};

export default RegisterPage;
