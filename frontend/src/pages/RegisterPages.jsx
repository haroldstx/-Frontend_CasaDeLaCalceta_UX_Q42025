// src/pages/RegisterPage.jsx

import React, { useState } from "react";
import InputField from "../components/RegistroUser/InputFIeld.jsx";
import style from "../components/RegistroUser/InputField.module.css";
import Establecimiento from "../assets/site.jpeg";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { RegisterUser } from "../middleware/api/Users.jsx";

const RegisterPage = () => {
  const navigate = useNavigate();
  // Estado para manejar los datos del formulario (simulando un control de estado)
  const [formData, setFormData] = useState({
    nombre_usuario: "",
    correo: "",
    password: "",
    nombre: "",
    telefono: "",
    direccion: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos al servidor
    const response = await RegisterUser(formData);

    console.log(response);
    if (response) {
      navigate("/Login");
    }
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
        <form className={style["registrationForm"]} onSubmit={handleSubmit}>
          <label className={style["input-label"]}>Nombre De Usuario</label>
          <InputField
            label="nombre_usuario"
            type="text"
            name="nombre_usuario"
            placeholder="Suarez_10"
            tag="Register"
            value={formData.nombre_usuario}
            onChange={handleChange}
          />

          <label className={style["input-label"]}>Correo electrónico</label>
          <InputField
            label="correo"
            type="email"
            name="correo"
            placeholder="ej. laRacha@email.com"
            tag="Register"
            value={formData.correo}
            onChange={handleChange}
          />

          <label className={style["input-label"]}>Contraseña</label>
          <InputField
            label="password"
            type="password"
            name="password"
            placeholder="......"
            tag="Register"
            value={formData.password}
            onChange={handleChange}
          />

          <label className={style["input-label"]}>Nombre De la Persona</label>
          <InputField
            label="nombre"
            type="text"
            name="nombre"
            placeholder="Harold Diaz"
            tag="Register"
            value={formData.nombre}
            onChange={handleChange}
          />

          <label className={style["input-label"]}>Teléfono</label>
          <InputField
            label="telefono"
            type="tel"
            placeholder="ej. +504 87917000"
            tag="Register"
            value={formData.telefono}
            onChange={handleChange}
          />

          <label className={style["input-label"]}>Dirección</label>
          <InputField
            label="direccion"
            type="text"
            placeholder="ej. Calle, número, ciudad"
            tag="Register"
            value={formData.direccion}
            onChange={handleChange}
          />

          <button type="submit" className={style["login-button"]}>
            Registrate e Iniciar Sesión
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
