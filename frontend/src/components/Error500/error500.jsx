import React from "react";
import backgroundComplete from "../../pages/Error500/background-complete.png";
import character from "../../pages/Error500/Character.png";
import planet from "../../pages/Error500/Planet.png";
import rectangle3 from "../../pages/Error500/Rectangle 3.svg";
import stars from "../../pages/Error500/Stars.png";
import text from "../../pages/Error500/Text.png";
import styles from "./error500.module.css";

const Error500Component = () => {
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
          onClick={() => window.location.reload()}
        >
          Volver a cargar
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

export default Error500Component;
