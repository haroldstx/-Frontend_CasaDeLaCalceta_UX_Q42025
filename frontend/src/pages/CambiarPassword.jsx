import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../components/CambiarPassword/cambiarPassword.module.css";
import NavbarCliente from "../components/NavbarCliente/NavbarCliente";
import profileIcon from "../assets/icons/profile_icon_grey.svg";
import lockIcon from "../assets/icons/Lock.svg";
import editIcon from "../assets/icons/edit_grey.svg";
import arrowIcon from "../assets/icons/arrow_icon.svg";
import notificationIcon from "../assets/icons/notification.svg";
import checkIcon from "../assets/icons/check.svg";
import eyeClosed from "../assets/icons/eye.svg";
import eyeOpen from "../assets/icons/lock.svg";

const CambiarPassword = () => {
  const [form, setForm] = useState({
    actual: "",
    nueva: "",
    confirmar: "",
  });
  const [showPassword, setShowPassword] = useState({
    actual: false,
    nueva: false,
    confirmar: false,
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    console.log(form);
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  const handleHome = () => {
    navigate("/");
  };

  const handleProfile = () => {
    navigate("/ver-mi-perfil");
  };

  const handleEditProfile = () => {
    navigate("/editar-perfil");
  };

  const handleChangePassword = () => {
    console.log("Ya estás en Cambiar Contraseña");
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

        <button className={styles.sidebarButton} onClick={handleEditProfile}>
          <img src={editIcon} alt="Editar" className={styles.buttonIcon} />
          <span className={styles.buttonLabel}>Editar perfil</span>
        </button>

        <button
          className={`${styles.sidebarButton} ${styles.active}`}
          onClick={handleChangePassword}
        >
          <img src={lockIcon} alt="Contraseña" className={styles.buttonIcon} />
          <span className={styles.buttonLabel}>Cambiar contraseña</span>
        </button>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>Cambiar Contraseña</h1>

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
          {/* Actual */}
          <div className={styles.formField}>
            <label>Contraseña actual</label>

            <div className={styles.inputWrapper}>
              <input
                type={showPassword.actual ? "text" : "password"}
                name="actual"
                value={form.actual}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => togglePasswordVisibility("actual")}
              >
                <img
                  src={showPassword.actual ? eyeOpen : eyeClosed}
                  alt="Mostrar contraseña"
                />
              </button>
            </div>
          </div>

          {/* Nueva */}
          <div className={styles.formField}>
            <label>Nueva Contraseña</label>

            <div className={styles.inputWrapper}>
              <input
                type={showPassword.nueva ? "text" : "password"}
                name="nueva"
                value={form.nueva}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => togglePasswordVisibility("nueva")}
              >
                <img
                  src={showPassword.nueva ? eyeOpen : eyeClosed}
                  alt="Mostrar contraseña"
                />
              </button>

              {form.nueva && form.nueva === form.confirmar && (
                <img
                  src={checkIcon}
                  alt="Coincide"
                  className={styles.checkIcon}
                />
              )}
            </div>
          </div>

          {/* Confirmar */}
          <div className={styles.formField}>
            <label>Confirmar Nueva Contraseña</label>

            <div className={styles.inputWrapper}>
              <input
                type={showPassword.confirmar ? "text" : "password"}
                name="confirmar"
                value={form.confirmar}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => togglePasswordVisibility("confirmar")}
              >
                <img
                  src={showPassword.confirmar ? eyeOpen : eyeClosed}
                  alt="Mostrar contraseña"
                />
              </button>

              {form.confirmar && form.nueva === form.confirmar && (
                <img
                  src={checkIcon}
                  alt="Coincide"
                  className={styles.checkIcon}
                />
              )}
            </div>
          </div>

          {/* Boton */}
          <div className={styles.formButtons}>
            <button type="button" className={styles.saveButton}>
              {" "}
              Cambiar Contraseña
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CambiarPassword;
