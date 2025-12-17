import style from "../headerComponents/Header.module.css";

const Header = ({ title }) => {
  return (
    <header className={style.header}>
      <h1>{title}</h1>
      <div className={style["header-actions"]}>
        {title === "Gestión de Usuarios" && (
          <>
            <button className={style["btn-create"]}>+ Crear Usuario</button>
            <input
              type="text"
              placeholder="Buscar Usuario"
              className={style["search-input"]}
            />
          </>
        )}
        {title === "Gestión de Categorías y Subcategorías" && (
          <button className={style["btn-create"]}>+ Crear Categoría</button>
        )}
        {title === "Dashboard"}
      </div>
    </header>
  );
};

export default Header;
