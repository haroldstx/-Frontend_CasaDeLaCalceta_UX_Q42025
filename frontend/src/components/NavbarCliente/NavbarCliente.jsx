import React, { useState } from "react";

import style from "../NavbarAdmin/Navbaradmin.module.css";
import logo from "../../assets/logo.png";
import userProfile from "../../assets/profile-navbar.png";
import homeIcon from "../../assets/home-user.png";
import productosIcon from "../../assets/productos-user.png";
import pedidosIcon from "../../assets/pedidos-user.png";
import perfilIcon from "../../assets/perfil-user.png";
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
            {isOpen && <p className="user-role">Cliente</p>}
          </div>
        </div>

        {/* Opciones */}
        <div className={style["sidebar-menu"]}>
          <div className={style["menu-item"]}>
            <img src={homeIcon} alt="Home" />
            {isOpen && <span>Home</span>}
          </div>

          <div className={style["menu-item"]}>
            <img src={productosIcon} alt="Productos" />
            {isOpen && <span>Productos</span>}
          </div>

          <div className={style["menu-item"]}>
            <img src={pedidosIcon} alt="Pedidos" />
            {isOpen && <span>Pedidos</span>}
          </div>

          <div className={style["menu-item"]}>
            <img src={perfilIcon} alt="Perfil" />
            {isOpen && <span>Mi perfil</span>}
          </div>
        </div>

        {/* Cerrar sesión */}
        <Link to="/login" style={{ color: "#ffffffff" }}>
          <div className={style["sidebar-logout"]}>
            <img src={logoutIcon} alt="Logout" />
            {isOpen && <span>Cerrar Sesión</span>}
          </div>
        </Link>
      </div>
    </>
  );
};

export default Sidebar;
