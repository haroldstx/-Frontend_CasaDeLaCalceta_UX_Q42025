import React, { useEffect, useState } from "react";
import styles from "./VerMiPerfil.module.css";

import casaDeLaCalceta1 from "../../assets/icons/casa de la calceta 1.svg";
import line1 from "../../assets/icons/Line 1.svg";
import profile1 from "../../assets/icons/Vector-1.svg";
import vector from "../../assets/icons/Vector.svg";
import vector2 from "../../assets/icons/Vector-2.svg";
import vector3 from "../../assets/icons/Vector-3.svg";
import vector4 from "../../assets/icons/Vector-4.svg";
import vector5 from "../../assets/icons/Vector-5.svg";
import vector6 from "../../assets/icons/Vector-6.svg";
import { getUserProfile } from "../../api/user";

const Perfil = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserProfile().then((data) => setUser(data));
  }, []);

  const handleBack = () => {
    console.log('Volver atrás');
  };

  const handleHome = () => {
    console.log('Ir a inicio');
  };

  const handleProfile = () => {
    console.log('Ver mi perfil');
  };

  const handleChangePassword = () => {
    console.log('Cambiar contraseña');
  };

  const handleEditProfile = () => {
    console.log('Editar perfil');
  };

  const handleNotifications = () => {
    console.log('Ver notificaciones');
  };

  if (!user) return <div>Cargando...</div>;

  return (
    <div className={styles.perfil}>
      <div className={styles.side}>
        <button className={styles.homeButton} onClick={handleHome}>
          <img
            className={styles.casaDeLaCalceta}
            alt="Casa de la calceta"
            src={casaDeLaCalceta1}
          />
        </button>
      </div>

      <div className={styles.sideBar}>
        <div className={styles.textWrapper}>Mi perfil</div>

        <button className={styles.backButton} onClick={handleBack}>
          <img className={styles.arrowIcon} alt="Volver" src={vector2} />
        </button>

        <button className={`${styles.menuButton} ${styles.menuButton1}`} onClick={handleProfile}>
          <div className={styles.person}>
            <img className={styles.personIcon} alt="Persona" src={vector4} />
          </div>
          <div className={styles.menuLabel}>Mi perfil</div>
        </button>

        <button className={`${styles.menuButton} ${styles.menuButton2}`} onClick={handleEditProfile}>
          <div className={styles.edit}>
            <img className={styles.editIcon} alt="Editar" src={vector3} />
          </div>
          <div className={styles.menuLabelInactive}>Editar perfil</div>
        </button>

        <button className={`${styles.menuButton} ${styles.menuButton3}`} onClick={handleChangePassword}>
          <div className={styles.lock}>
            <img className={styles.lockIcon} alt="Candado" src={vector6} />
          </div>
          <div className={styles.menuLabelInactive}>Cambiar contraseña</div>
        </button>

        <img className={styles.line} alt="Line" src={line1} />
      </div>

      <button className={styles.notificationButton} onClick={handleNotifications}>
        <img className={styles.profile} alt="Notificaciones" src={vector6} />
      </button>

      <div className={styles.textWrapper4}>Mi perfil</div>

      <div className={styles.firstname}>
        <div className={styles.rectangle} />
        <div className={styles.textWrapper5}>Nombre</div>
        <div className={styles.textWrapper6}>{user.nombre}</div>
      </div>

      <div className={styles.username}>
        <div className={styles.rectangle2} />
        <div className={styles.textWrapper7}>Usuario</div>
        <div className={styles.textWrapper8}>{user.usuario}</div>
      </div>

      <div className={styles.correo}>
        <div className={styles.rectangle3} />
        <div className={styles.textWrapper9}>Correo</div>
        <div className={styles.textWrapper10}>{user.correo}</div>
      </div>

      <div className={styles.telefono}>
        <div className={styles.rectangle3} />
        <div className={styles.textWrapper9}>Teléfono</div>
        <div className={styles.textWrapper10}>{user.telefono}</div>
      </div>

      <div className={styles.address}>
        <div className={styles.rectangle3} />
        <div className={styles.textWrapper9}>Dirección</div>
        <div className={styles.textWrapper10}>{user.direccion}</div>
      </div>

      <div className={styles.lastname}>
        <div className={styles.rectangle4} />
        <div className={styles.textWrapper11}>Apellido</div>
        <div className={styles.textWrapper12}>{user.apellido}</div>
      </div>
    </div>
  );
};

export default Perfil;
