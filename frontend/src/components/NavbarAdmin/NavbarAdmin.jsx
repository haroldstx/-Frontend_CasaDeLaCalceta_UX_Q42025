import React, { useState } from "react";

import style from "../NavbarAdmin/Navbaradmin.module.css";
import logo from "../../assets/logo.png";
import userProfile from "../../assets/profile-navbar.png";
import dashboardIcon from "../../assets/dashboard.png";
import reportesIcon from "../../assets/reportes.png";
import inventarioIcon from "../../assets/inventario.png";
import categoriasIcon from "../../assets/categoria.png";
import usuariosIcon from "../../assets/usuarios.png";
import puntoVentaIcon from "../../assets/POS.png";
import logoutIcon from "../../assets/back.png";

import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div
        className={
          style["sidebar-container"] +
          (isOpen ? ` ${style["open"]}` : ` ${style["closed"]}`)
        }
      >
        <button className={style["burger-btn"]} onClick={toggleSidebar}>
          <div className={style["sidebar-logo"]}>
            <img src={logo} alt="Logo" />
          </div>
        </button>
        {/* Logo */}

        {/* Usuario */}
        <div className={style["sidebar-user"]}>
          <br />
          <img src={userProfile} alt="User" className={style["user-img"]} />
          <div className={style["user-info"]}>
            {isOpen && (
              <p className={style["user-name"]}>Diego Ferrera Matute</p>
            )}
            {isOpen && <p className="user-role">Administrador</p>}
          </div>
        </div>

        {/* Opciones */}
        <div className={style["sidebar-menu"]}>
          <div className={style["menu-item"]}>
            <img src={dashboardIcon} alt="Dashboard" />
            {isOpen && <span>Dashboard</span>}
          </div>

          <div className={style["menu-item"]}>
            <img src={reportesIcon} alt="Reportes" />
            {isOpen && <span>Gestión Reportes</span>}
          </div>

          <div className={style["menu-item"]}>
            <img src={inventarioIcon} alt="Inventario" />
            {isOpen && <span>Gestión Inventario</span>}
          </div>

          <div className={style["menu-item"]}>
            <img src={categoriasIcon} alt="Categorías" />
            {isOpen && <span>Gestión de Categorías</span>}
          </div>

          <div className={style["menu-item"]}>
            <img src={usuariosIcon} alt="Usuarios" />
            {isOpen && <span>Gestión de Usuarios</span>}
          </div>

          <div className={style["menu-item"]}>
            <img src={puntoVentaIcon} alt="Punto de venta" />
            {isOpen && <span>Punto de Venta</span>}
          </div>
        </div>

        {/* Cerrar sesión */}
        <div className={style["sidebar-logout"]}>
          <img src={logoutIcon} alt="Logout" />
          {isOpen && <span>Cerrar Sesión</span>}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
