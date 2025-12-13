import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import backgroundComplete from "../assets/background-complete.png";
import character from "../assets/Character.png";
import planet from "../assets/Planet.png";
import rectangle3 from "../assets/Rectangle 3.svg";
import stars from "../assets/Stars.png";
import text from "../assets/Text.png";
import styles from "../components/Error500/error500.module.css";

const Error500 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = () => {
    setIsRetrying(true);
    
    // Obtener la ruta anterior guardada
    const previousPath = sessionStorage.getItem('previousPath') || '/';
    
    // Simular un pequeño delay antes de reintentar
    setTimeout(() => {
      // Limpiar el error guardado
      sessionStorage.removeItem('hasError500');
      
      // Intentar navegar de vuelta a la ruta anterior
      navigate(previousPath, { replace: true });
      setIsRetrying(false);
    }, 500);
  };

  return (
    <div className={styles.container}>
      <div className={styles["element-error-page"]}>
        <div className={styles.rectangle} />

        <img className={styles.img} alt="Rectangle" src={rectangle3} />

        <div className={styles["element-error-lost-in"]}>
          <img
            className={styles["background-complete"]}
            alt="Background complete"
            src={backgroundComplete}
          />

          <div className={styles["text-wrapper"]}>5</div>

          <img className={styles.planet} alt="Planet" src={planet} />

          <img className={styles.text} alt="Text" src={text} />

          <img className={styles.stars} alt="Stars" src={stars} />

          <div className={styles.div}>0</div>

          <img className={styles.character} alt="Character" src={character} />
        </div>

        <button
          className={styles["text-wrapper-2"]}
          onClick={handleRetry}
          disabled={isRetrying}
        >
          {isRetrying ? 'Reintentando...' : 'Volver a cargar'}
        </button>

        <p className={styles.p}>
          Estamos teniendo un problema interno. Intenta de nuevo en un momento.
        </p>

        <p className={styles["OOPS-internal-server"]}>
          <span className={styles.span}>
            OOPS ...
            <br />
          </span>
          <span className={styles["text-wrapper-3"]}>
            Internal Server Error
          </span>
        </p>
      </div>
    </div>
  );
};

export default Error500;
