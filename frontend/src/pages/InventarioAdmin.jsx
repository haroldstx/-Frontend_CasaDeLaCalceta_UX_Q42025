import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../components/EditarPerfil/editarPerfil.module.css";
import NavbarCliente from "../components/NavbarCliente/NavbarCliente";
import { getUserProfile } from "../middleware/user.js";
import profileIcon from "../assets/icons/profile_icon_grey.svg";
import lockIcon from "../assets/icons/lock_icon_grey.svg";
import editIcon from "../assets/icons/Edit.svg";
import arrowIcon from "../assets/icons/arrow_icon.svg";
import notificationIcon from "../assets/icons/notification.svg";
import checkIcon from "../assets/icons/Check.svg";

const EditarPerfilPage = () => {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    usuario: "",
    correo: "",
    telefono: "",
    direccion: "",
  });

  const limpiar = () => {
    setForm({
      nombre: "",
      apellido: "",
      usuario: "",
      correo: "",
      telefono: "",
      direccion: "",
    });
  };

  const navigate = useNavigate();

  const handleChange = (event) => {
    console.log(form);
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleHome = () => {
    navigate("/");
  };

  const handleProfile = () => {
    navigate("/ver-mi-perfil");
  };

  const handleEditProfile = () => {
    console.log("Ya estás en Editar Perfil");
  };

  const handleChangePassword = () => {
    navigate("/cambiar-contrasena");
  };

  const handleTelefonoChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // solo números

    if (value.length > 4) {
      value = value.slice(0, 4) + "-" + value.slice(4, 8);
    }

    setForm({ ...form, telefono: value });
  };

  return (
    <div className={styles.pageContainer}>
      <NavbarAdmin />


      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>Editar Perfil</h1>

          <button
            className={styles.notificationButton}
            onClick={handleEditProfile}
          >
            <img
              src={notificationIcon}
              alt="Notificaciones"
              className={styles.buttonIcon}
            />
          </button>
        </div>

        <form className={styles.form}>
        
        </form>
      </div>
    </div>
  );
};

export default EditarPerfilPage;
