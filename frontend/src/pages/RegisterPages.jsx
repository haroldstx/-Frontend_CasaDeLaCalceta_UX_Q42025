// src/pages/RegisterPage.jsx

import React, { useState } from "react";
import InputField from "../components/RegistroUser/InputFIeld.jsx";
import style from "../components/RegistroUser/InputField.module.css";
import Establecimiento from "../assets/site.jpeg";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

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

  return (
    <div className={style["register-page-container"]}>
      <img
        src={logo}
        alt="btn-back"
        style={{
          width: "150px",
          height: "150px",
          display: "flex",
          marginTop: "20px",
          marginLeft: "20px",
          cursor: "pointer",
        }}
        onClick={() => window.history.back()}
      />

      {/* Contenedor del Formulario (con el degradado de fondo) */}
      <div className={style["form-wrapper"]}>
        <div className={style["form-header"]}>
          <h2 className={style["form-title"]}>FORMULARIO DE REGISTRO</h2>
        </div>

        {/* Cuerpo del Formulario */}
        <form className={style["registrationForm"]} onSubmit={{}}>
          <label htmlFor="nombreCompleto" className={style["input-label"]}>
            Nombre completo
          </label>
          <InputField
            label="nombreCompleto"
            type="text"
            placeholder="Tu nombre"
            tag="Register"
            value={formData.nombreCompleto}
            onChange={handleChange}
          />

          <label htmlFor="correoElectronico" className={style["input-label"]}>
            Correo electrónico
          </label>
          <InputField
            label="correoElectronico"
            type="email"
            placeholder="ej. laRacha@email.com"
            tag="Register"
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
            tag="Register"
            value={formData.contrasena}
            onChange={handleChange}
          />

          <label htmlFor="telefono" className={style["input-label"]}>
            Teléfono
          </label>
          <InputField
            label="telefono"
            type="tel"
            placeholder="ej. +504 87917000"
            tag="Register"
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
            tag="Register"
            value={formData.direccion}
            onChange={handleChange}
          />

          <button type="submit" className={style["login-button"]}>
            <Link
              to="/login"
              style={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              Registrate e Iniciar Sesión
            </Link>
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
