import React from "react";
import style from "../components/Error404/Error404.module.css";
import ImageError from "../assets/error404.png";
import { Link } from "react-router-dom";

const ErrorPage404 = () => {
  return (
    <div className={style["error-container"]}>
      {/* Sección Izquierda: Contenido del Error */}
      <div className={style["error-content-section"]}>
        <h1 className={style["error-code"]}>404</h1>
        <h2 className={style["error-title"]}>PÁGINA NO ENCONTRADA</h2>
        <p className={style["error-message"]}>
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
          Verifica la URL o regresa a la página de inicio.
        </p>
        <Link to="/Login" className={style["back-button"]}>
          Volver atrás
        </Link>
      </div>

      <div className={style["error-illustration-section"]}>
        <img
          src={ImageError}
          alt="Imagen de Error 404"
          className={style["error-image"]}
          style={{ width: "1000px", height: "800px" }}
        />
        <div className={style["illustration-placeholder"]}>
          {/* Puedes imaginar aquí un componente de icono o imagen del portátil triste */}
        </div>
      </div>
    </div>
  );
};

export default ErrorPage404;
