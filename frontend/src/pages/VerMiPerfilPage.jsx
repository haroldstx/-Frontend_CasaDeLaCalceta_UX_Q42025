import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../components/VerMiPerfil/VerMiPerfil.module.css";
import NavbarCliente from "../components/NavbarCliente/NavbarCliente";
import { getUserProfile } from "../api/user";
import profileIcon from "../assets/icons/profile_icon.svg";
import lockIcon from "../assets/icons/lock_icon_grey.svg";
import editIcon from "../assets/icons/edit_grey.svg";
import arrowIcon from "../assets/icons/arrow_icon.svg";
import notificationIcon from "../assets/icons/notification.svg";

const VerMiPerfilPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getUserProfile().then((data) => setUser(data));
  }, []);

  const handleHome = () => {
    navigate("/");
  };

  const handleProfile = () => {
    console.log("Ya estás en Mi perfil");
  };

  const handleEditProfile = () => {
    navigate("/editar-perfil");
  };

  const handleChangePassword = () => {
    navigate("/cambiar-contrasena");
  };

  if (!user) return <div>Cargando...</div>;

  return (
    <div className={styles.pageContainer}>
      <NavbarCliente />

      {/* Sidebar secundario */}
      <div className={styles.secondarySidebar}>
        <button className={styles.sidebarButton} onClick={handleHome}>
          <img src={arrowIcon} alt="Home" className={styles.buttonIcon} />
          <div className={styles.sidebarTitle}>Home</div>
        </button>

        <button
          className={`${styles.sidebarButton} ${styles.active}`}
          onClick={handleProfile}
        >
          <img
            src={profileIcon}
            alt="Mi perfil"
            className={styles.buttonIcon}
          />
          <span className={styles.buttonLabel}>Mi perfil</span>
        </button>

        <button className={styles.sidebarButton} onClick={handleEditProfile}>
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
          <h1 className={styles.title}>Mi Perfil</h1>

          <button
            className={styles.notificationButton}
            onClick={handleEditProfile}
          >
            <img src={notificationIcon} alt="Notificaciones" className={styles.buttonIcon} />
          </button>
        </div>

        <div className={styles.profileFields}>
          {/* Nombre */}
          <div className={styles.fieldContainer}>
            <label className={styles.fieldLabel}>Nombre</label>
            <div className={styles.fieldBox}>
              <span className={styles.fieldText}>{user.nombre}</span>
            </div>
          </div>

          {/* Apellido */}
          <div className={styles.fieldContainer}>
            <label className={styles.fieldLabel}>Apellido</label>
            <div className={styles.fieldBox}>
              <span className={styles.fieldText}>{user.apellido}</span>
            </div>
          </div>

          {/* Usuario */}
          <div className={styles.fieldContainer}>
            <label className={styles.fieldLabel}>Usuario</label>
            <div className={styles.fieldBox}>
              <span className={styles.fieldText}>{user.usuario}</span>
            </div>
          </div>

          {/* Correo */}
          <div className={styles.fieldContainer}>
            <label className={styles.fieldLabel}>Correo</label>
            <div className={styles.fieldBox}>
              <span className={styles.fieldText}>{user.correo}</span>
            </div>
          </div>

          {/* Teléfono */}
          <div className={styles.fieldContainer}>
            <label className={styles.fieldLabel}>Teléfono</label>
            <div className={styles.fieldBox}>
              <span className={styles.fieldText}>{user.telefono}</span>
            </div>
          </div>

          {/* Dirección */}
          <div className={styles.fieldContainer}>
            <label className={styles.fieldLabel}>Dirección</label>
            <div className={styles.fieldBox}>
              <span className={styles.fieldText}>{user.direccion}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerMiPerfilPage;
