import React, { useState } from "react";
import style from "../components/GestionCategorias/GestionCategorias.module.css";
import { FaFolderOpen, FaPlus, FaPencilAlt, FaTrashAlt } from "react-icons/fa"; // Iconos de React-Icons
import Header from "../components/headerComponents/Header.jsx";
import Sidebar from "../components/NavbarAdmin/NavbarAdmin.jsx";

// Datos simulados (puedes reemplazarlos con tu estado real o llamadas API)
const initialCategories = [
  {
    id: 1,
    name: "Caricaturas",
    description: "Calcetas con diseños de personajes animados",
  },
  {
    id: 2,
    name: "Deportivos",
    description: "Calcetas para actividades deportivas",
  },
  { id: 3, name: "Clásicos", description: "Diseños tradicionales y elegantes" },
];

const initialSubcategories = {
  1: [
    // Subcategorías para 'Caricaturas' (id: 1)
    { id: 101, name: "Disney", description: "Personajes de Disney" },
    { id: 102, name: "Anime", description: "Personajes de anime japonés" },
    { id: 103, name: "Súper Sencos", description: "Héroes animados" },
  ],
};

const CategorySubcategoryManager = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [subcategories, setSubcategories] = useState(initialSubcategories);
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  // Función de ejemplo para manejar la selección de categoría
  const handleSelectCategory = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  // Componente para renderizar una tarjeta de Categoría
  const CategoryCard = ({ category }) => (
    <div
      className={`${style.card} ${style["category-card"]} ${
        selectedCategoryId === category.id ? style.selected : ""
      }`}
      onClick={() => handleSelectCategory(category.id)}
    >
      <div className={style["card-content"]}>
        <FaFolderOpen className={style.icon} />
        <div className={style["text-content"]}>
          <p className={style["card-name"]}>**{category.name}**</p>
          <p className={style["card-description"]}>{category.description}</p>
        </div>
        <div className={style.actions}>
          <button className={style["edit-btn"]}>
            <FaPencilAlt /> Editar
          </button>
          <button className="delete-btn">
            <FaTrashAlt /> Eliminar
          </button>
        </div>
      </div>
      <span className="arrow-indicator">&gt;</span>
    </div>
  );

  // Componente para renderizar una tarjeta de Subcategoría
  const SubcategoryCard = ({ subcategory }) => (
    <div className={`${style.card} ${style["subcategory-card"]}`}>
      <div className={style["card-content"]}>
        <FaFolderOpen className={style.icon} />
        <div className={style["text-content"]}>
          <p className={style["card-name"]}>**{subcategory.name}**</p>
          <p className={style["card-description"]}>{subcategory.description}</p>
        </div>
        <div className={style["actions-right"]}>
          <button className={style["edit-btn"]}>
            <FaPencilAlt /> Editar
          </button>
          <button className={style["delete-btn"]}>
            <FaTrashAlt />
          </button>
        </div>
      </div>
    </div>
  );

  const selectedCategoryName =
    categories.find((c) => c.id === selectedCategoryId)?.name || "Seleccionada";
  const currentSubcategories = subcategories[selectedCategoryId] || [];

  return (
    <div className={style["layout-container"]}>
      {/* SIDEBAR */}
      <aside
        className={`${style["sidebar-section"]} ${
          collapsed ? style.collapsed : ""
        }`}
      >
        <Sidebar onToggle={handleToggleSidebar} />
      </aside>

      {/* MAIN */}
      <div
        className={`${style["main-container"]} ${
          collapsed ? style.collapsed : ""
        }`}
      >
        {/* HEADER */}
        <div className={style["header-wrapper"]}>
          <Header title="Gestión de Categorías y Subcategorías" />
        </div>

        <div className={style["content-wrapper"]}>
          <div className={style["content-area"]}>
            {/* Categorías */}
            <div className={style["categories-block"]}>
              <div className={style["block-header"]}>
                <h3>Categorías</h3>
                <button>
                  <FaPlus /> Nueva Categoría
                </button>
              </div>

              <div className={style["card-list"]}>
                {categories.map((category) => (
                  <CategoryCard key={category.id} category={category} />
                ))}
              </div>
            </div>

            {/* Subcategorías */}
            <div className={style["subcategories-block"]}>
              <div className={style["block-header"]}>
                <h3>Subcategorías - {selectedCategoryName}</h3>
                <button>
                  <FaPlus /> Nueva Subcategoría
                </button>
              </div>

              <div className={style["card-list"]}>
                {currentSubcategories.map((subcategory) => (
                  <SubcategoryCard
                    key={subcategory.id}
                    subcategory={subcategory}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySubcategoryManager;
