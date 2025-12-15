import style from "../headerComponents/Header.module.css";

const Header = ({ title }) => {
  return (
    <header className={style.header}>
      <h1>{title}</h1>
      <div className={style["header-actions"]}>
        <button className={style["btn-create"]}>+ Crear Usuario</button>
        <input
          type="text"
          placeholder="Buscar Usuario"
          className={style["search-input"]}
        />
      </div>
    </header>
  );
};

export default Header;
