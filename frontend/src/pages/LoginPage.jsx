import React, { useState } from "react";
import style from "../components/Login/Login.module.css";
import InputField from "../components/RegistroUser/InputFIeld";
import establecimiento from "../assets/site.jpeg";
import logo from "../assets/logo.png";
import emailIcon from "../assets/email.png";
import passwordIcon from "../assets/lock.png";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={style["login-container"]}>
      {/* Panel Izquierdo (Imagen) */}
      <div className={style["left-pane"]}>
        <img
          src={establecimiento}
          alt="Imagen de Establecimiento"
          className={style["background-image"]}
        />
        <div className={style["overlay"]}>
          <h1>Casa de la Calceta</h1>
          <p>Tu tienda de calcetas favorita</p>
        </div>
      </div>

      {/* Panel Derecho (Formulario) */}
      <div className={style["right-pane"]}>
        {/* Logo */}
        <div className={style["logo-container"]}>
          <span style={{ fontSize: "3rem" }}>
            <img
              src={logo}
              alt="Logo Casa de la Calceta"
              className={style["logo"]}
            />
          </span>
        </div>

        <div className={style["login-card"]}>
          <h1>¡Bienvenido!</h1>
          <h4>Inicia sesión en tu cuenta</h4>

          <form onSubmit={{}}>
            {/* Input Correo usando tu componente */}
            <InputField
              type="email"
              name="email"
              tag="Login"
              placeholder="Correo Electrónico"
              value={credentials.email}
              icon={
                <img
                  src={emailIcon}
                  style={{ width: "25px", height: "25px" }}
                />
              }
              onChange={handleChange}
            />

            <InputField
              type="password"
              name="password"
              tag="Login"
              icon={
                <img
                  src={passwordIcon}
                  style={{ width: "20px", height: "25px" }}
                />
              }
              placeholder="Contraseña"
              value={credentials.password}
              onChange={handleChange}
            />

            <div className={style["form-options"]}>
              <label className={style["checkbox-container"]}>
                <input type="checkbox" /> Recuérdame
              </label>
              <a href="#" className={style["forgot-password"]}>
                ¿Has olvidado tu contraseña?
              </a>
            </div>

            <button type="submit" className={style["makeLogin-button"]}>
              Iniciar Sesión
            </button>
          </form>

          <div className={style["signup-link"]}>
            ¿No tienes cuenta? <Link to="/register">Crea una aquí</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
