import Header from "../components/headerComponents/Header.jsx";
import style from "../components/GestionUsers/GestionUsers.module.css";
import Sidebar from "../components/NavbarAdmin/NavbarAdmin.jsx";
import PaginationComponent from "../components/pagination/pagination.jsx";
import { useEffect, useState } from "react";

const users = Array.from({ length: 9 }, (_, i) => ({
  id: String(i + 1).padStart(3, "0"),
  nombre: "Harold",
  apellido: "Díaz",
  org: "Casa de niños",
  estado: i === 4 ? "Deshabilitado" : "Activo",
}));

const handleToggleSidebar = (setCollapsed) => {
  setCollapsed((prev) => !prev);
};

//?Inicio componente
const GestionUsers = () => {
  const [collapsed, setCollapsed] = useState(false);

  //manejar datos de la paginacion
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const totalPages = Math.ceil(users.length / rowsPerPage);

  const visibleUsers = users.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  //!fin datos para paginacion

  return (
    <>
      <div className={style["gestion-users-container"]}>
        <div
          className={`${style["sidebar-section"]} ${
            collapsed ? style.collapsed : ""
          }`}
        >
          <Sidebar onToggle={() => handleToggleSidebar(setCollapsed)} />
        </div>

        <div
          className={`${style["users-page"]} ${
            collapsed ? style.collapsed : ""
          }`}
        >
          <Header title="Gestión de Usuarios" />

          <table className={style["users-table"]}>
            <thead>
              <tr>
                <th>ID Usuario</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Organización</th>
                <th>Estado</th>
                <th>Opciones</th>
              </tr>
            </thead>

            <tbody>
              {visibleUsers.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.nombre}</td>
                  <td>{u.apellido}</td>
                  <td>{u.org}</td>
                  <td>
                    <span
                      className={`${style.status} ${
                        u.estado === "Activo" ? style.active : style.disabled
                      }`}
                    >
                      {u.estado}
                    </span>
                  </td>
                  <td className={style.options}>👁 ✏️ ❌</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={style.pagination}>
            <PaginationComponent
              page={page}
              totalPages={totalPages}
              onPageChange={(value) => setPage(value)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default GestionUsers;
