import React from "react";
import styles from "./profileField.module.css";

const ProfileField = ({ label, value }) => {
  return (
    <div className={styles.field}>
      <div className={styles.label}>{label}</div>
      <div className={styles.box}>
        <span className={styles.value}>{value}</span>
      </div>
    </div>
  );
};

export default ProfileField;
