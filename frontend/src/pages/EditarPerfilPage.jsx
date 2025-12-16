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
      <NavbarCliente />

      {/* Sidebar secundario */}
      <div className={styles.secondarySidebar}>
        <button className={styles.sidebarButton} onClick={handleHome}>
          <img src={arrowIcon} alt="Home" className={styles.buttonIcon} />
          <div className={styles.sidebarTitle}>Home</div>
        </button>

        <button className={styles.sidebarButton} onClick={handleProfile}>
          <img
            src={profileIcon}
            alt="Editar Perfil"
            className={styles.buttonIcon}
          />
          <span className={styles.buttonLabel}>Mi perfil</span>
        </button>

        <button
          className={`${styles.sidebarButton} ${styles.active}`}
          onClick={handleEditProfile}
        >
          <img src={editIcon} alt="Editar" className={styles.buttonIcon} />
          <span className={styles.buttonLabel}>Editar perfil</span>
        </button>

        <button className={styles.sidebarButton} onClick={handleChangePassword}>
          <img src={lockIcon} alt="Contraseña" className={styles.buttonIcon} />
          <span className={styles.buttonLabel}>Cambiar contraseña</span>
        </button>
      </div>

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
          {/* Nombre */}
          <div className={styles.formField}>
            <label>Nombre</label>
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
            />
          </div>

          {/* Apellido */}
          <div className={styles.formField}>
            <label>Apellido</label>
            <input
              name="apellido"
              value={form.apellido}
              onChange={handleChange}
              required
            />
          </div>

          {/* Usuario */}
          <div className={`${styles.formField} ${styles.fullWidth}`}>
            <label>Usuario</label>
            <div className={styles.inputWithIcon}>
              <input
                name="usuario"
                value={form.usuario}
                onChange={handleChange}
                required
              />
              {form.usuario.length > 3 && (
                <img
                  src={checkIcon}
                  alt="Editar Perfil"
                  className={styles.validIcon}
                />
              )}
            </div>
          </div>

          {/* Correo */}
          <div className={`${styles.formField} ${styles.fullWidth}`}>
            <label>Correo</label>
            <input
              type="email"
              name="correo"
              value={form.correo}
              onChange={handleChange}
              required
            />
          </div>

          {/* Teléfono */}
          <div className={`${styles.formField} ${styles.fullWidth}`}>
            <label>Teléfono</label>
            <input
              type="tel"
              name="telefono"
              value={form.telefono}
              onChange={handleTelefonoChange}
              placeholder="9999-9999"
              maxLength={9}
              required
            />
          </div>

          {/* Dirección */}
          <div className={`${styles.formField} ${styles.fullWidth}`}>
            <label>Dirección</label>
            <input
              name="direccion"
              value={form.direccion}
              onChange={handleChange}
              required
            />
          </div>

          {/* Botones */}
          <div className={styles.formButtons}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={limpiar}
            >
              Cancelar
            </button>
            <button type="submit" className={styles.saveButton}>
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarPerfilPage;
