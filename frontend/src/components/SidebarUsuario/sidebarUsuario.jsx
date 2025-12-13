import React from "react";
import styles from "./sidebarUsuario.module.css";

//import image from "../../assets/icons/image.svg";
import vector from "../../assets/icons/Vector.svg";
import vector2 from "../../assets/icons/Vector-2.svg";
import vector3 from "../../assets/icons/Vector-3.svg";
import vector4 from "../../assets/icons/Vector-4.svg";
import vector5 from "../../assets/icons/Vector-5.svg";
import vector6 from "../../assets/icons/Vector-6.svg";
import line1 from "../../assets/icons/Line 1.svg";
import sideBar1 from "../../assets/icons/side bar1.png";

const sidebarUsuario = () => {
  return (
    <div className={styles.sidebarContainer}>
      <img className={styles.side} src={sideBar1} alt="SidebarUsuario" />

      <div className={styles.menu}>
        <div className={styles.title}>Mi perfil</div>

        <div className={styles.back}>
          <img src={vector} alt="" />
          <img src={vector} alt="" />
        </div>

        <div className={styles.item}>
          <div className={styles.icon}>
            <img src={vector2} alt="" />
            <img src={vector3} alt="" />
          </div>
          <div className={styles.label}>Mi perfil</div>
        </div>

        <div className={styles.item}>
          <div className={styles.icon}>
            <img src={vector4} alt="" />
            <img src={vector5} alt="" />
          </div>
          <div className={styles.label}>Cambiar contraseña</div>
        </div>

        <img className={styles.divider} src={line1} alt="" />

        <div className={styles.item}>
          <div className={styles.icon}>
            <img src={vector6} alt="" />
            <img src={vector6} alt="" />
          </div>
          <div className={styles.label}>Editar perfil</div>
        </div>
      </div>
    </div>
  );
};

export default sidebarUsuario;
