import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../components/CambiarPassword/cambiarPassword.module.css";
import NavbarCliente from "../components/NavbarCliente/NavbarCliente";
import profileIcon from "../assets/icons/profile_icon_grey.svg";
import lockIcon from "../assets/icons/Lock.svg";
import editIcon from "../assets/icons/edit_grey.svg";
import arrowIcon from "../assets/icons/arrow_icon.svg";
import notificationIcon from "../assets/icons/notification.svg";
import checkIcon from "../assets/icons/Check.svg";
import eyeClosed from "../assets/icons/eye.svg";
import eyeOpen from "../assets/icons/Lock.svg";

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
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();

  // Validar fortaleza de contraseña
  const getPasswordStrength = (password) => {
    if (!password) return { level: 0, text: "" };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 2) return { level: 1, text: "Débil", color: "#ff4444" };
    if (strength <= 3) return { level: 2, text: "Media", color: "#ffaa00" };
    return { level: 3, text: "Fuerte", color: "#00cc66" };
  };

  // Validar contraseña
  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) errors.push("Mínimo 8 caracteres");
    if (!/[A-Z]/.test(password)) errors.push("Al menos 1 mayúscula");
    if (!/[a-z]/.test(password)) errors.push("Al menos 1 minúscula");
    if (!/[0-9]/.test(password)) errors.push("Al menos 1 número");
    if (!/[^A-Za-z0-9]/.test(password))
      errors.push("Al menos 1 carácter especial");
    return errors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });

    // Limpiar error cuando el usuario escribe
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.actual) {
      newErrors.actual = "La contraseña actual es requerida";
    }

    if (!form.nueva) {
      newErrors.nueva = "La nueva contraseña es requerida";
    } else {
      const passwordErrors = validatePassword(form.nueva);
      if (passwordErrors.length > 0) {
        newErrors.nueva = passwordErrors.join(", ");
      }
      if (form.nueva === form.actual) {
        newErrors.nueva = "La nueva contraseña debe ser diferente a la actual";
      }
    }

    if (!form.confirmar) {
      newErrors.confirmar = "Debes confirmar la nueva contraseña";
    } else if (form.nueva !== form.confirmar) {
      newErrors.confirmar = "Las contraseñas no coinciden";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulación de llamada API (reemplazar con tu API real)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Aquí iría tu llamada real al backend:
      // const response = await axios.post('/api/cambiar-password', {
      //   passwordActual: form.actual,
      //   passwordNueva: form.nueva
      // });

      // Si exitoso
      setShowSuccessModal(true);

      // Limpiar formulario
      setForm({ actual: "", nueva: "", confirmar: "" });
      setTouched({});

      // Cerrar modal y redirigir después de 2 segundos
      setTimeout(() => {
        setShowSuccessModal(false);
        navigate("/ver-mi-perfil");
      }, 2000);
    } catch (error) {
      setErrors({
        actual: "La contraseña actual es incorrecta",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/ver-mi-perfil");
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

        <form className={styles.form} onSubmit={handleSubmit}>
          {/* Actual */}
          <div className={styles.formField}>
            <label>Contraseña actual</label>

            <div className={styles.inputWrapper}>
              <input
                type={showPassword.actual ? "text" : "password"}
                name="actual"
                value={form.actual}
                onChange={handleChange}
                onBlur={() => handleBlur("actual")}
                autoFocus
                className={
                  errors.actual && touched.actual ? styles.inputError : ""
                }
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
            {errors.actual && touched.actual && (
              <span className={styles.errorMessage}>{errors.actual}</span>
            )}
          </div>

          {/* Nueva */}
          <div className={styles.formField}>
            <label>Nueva Contraseña</label>

            <div className={styles.inputRow}>
              <div className={styles.inputWrapper}>
                <input
                  type={showPassword.nueva ? "text" : "password"}
                  name="nueva"
                  value={form.nueva}
                  onChange={handleChange}
                  onBlur={() => handleBlur("nueva")}
                  className={
                    errors.nueva && touched.nueva ? styles.inputError : ""
                  }
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
              </div>

              {form.nueva &&
                form.confirmar &&
                form.nueva === form.confirmar && (
                  <img
                    src={checkIcon}
                    alt="Coincide"
                    className={styles.checkIconOutside}
                  />
                )}
            </div>

            {/* Indicador de fortaleza */}
            {form.nueva && (
              <div className={styles.strengthIndicator}>
                <div className={styles.strengthBar}>
                  <div
                    className={styles.strengthFill}
                    style={{
                      width: `${
                        (getPasswordStrength(form.nueva).level / 3) * 100
                      }%`,
                      backgroundColor: getPasswordStrength(form.nueva).color,
                    }}
                  />
                </div>
                <span
                  className={styles.strengthText}
                  style={{ color: getPasswordStrength(form.nueva).color }}
                >
                  {getPasswordStrength(form.nueva).text}
                </span>
              </div>
            )}

            {errors.nueva && touched.nueva && (
              <span className={styles.errorMessage}>{errors.nueva}</span>
            )}

            <div className={styles.passwordRequirements}>
              <p>La contraseña debe contener:</p>
              <ul>
                <li className={form.nueva.length >= 8 ? styles.valid : ""}>
                  Mínimo 8 caracteres
                </li>
                <li className={/[A-Z]/.test(form.nueva) ? styles.valid : ""}>
                  Al menos 1 mayúscula
                </li>
                <li className={/[a-z]/.test(form.nueva) ? styles.valid : ""}>
                  Al menos 1 minúscula
                </li>
                <li className={/[0-9]/.test(form.nueva) ? styles.valid : ""}>
                  Al menos 1 número
                </li>
                <li
                  className={
                    /[^A-Za-z0-9]/.test(form.nueva) ? styles.valid : ""
                  }
                >
                  Al menos 1 carácter especial (!@#$%^&*)
                </li>
              </ul>
            </div>
          </div>

          {/* Confirmar */}
          <div className={styles.formField}>
            <label>Confirmar Nueva Contraseña</label>

            <div className={styles.inputRow}>
              <div className={styles.inputWrapper}>
                <input
                  type={showPassword.confirmar ? "text" : "password"}
                  name="confirmar"
                  value={form.confirmar}
                  onChange={handleChange}
                  onBlur={() => handleBlur("confirmar")}
                  onPaste={(e) => e.preventDefault()}
                  className={
                    errors.confirmar && touched.confirmar
                      ? styles.inputError
                      : ""
                  }
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
              </div>

              {form.confirmar && form.nueva === form.confirmar && (
                <img
                  src={checkIcon}
                  alt="Coincide"
                  className={styles.checkIconOutside}
                />
              )}
            </div>

            {errors.confirmar && touched.confirmar && (
              <span className={styles.errorMessage}>{errors.confirmar}</span>
            )}
          </div>

          {/* Botones */}
          <div className={styles.formButtons}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={styles.saveButton}
              disabled={isLoading}
            >
              {isLoading ? "Cambiando..." : "Cambiar Contraseña"}
            </button>
          </div>
        </form>

        {/* Modal de Éxito */}
        {showSuccessModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <div className={styles.successIcon}>✓</div>
              <h2>¡Contraseña Actualizada!</h2>
              <p>Tu contraseña ha sido cambiada exitosamente.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CambiarPassword;
