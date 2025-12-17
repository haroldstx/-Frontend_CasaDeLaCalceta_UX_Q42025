import React, { useEffect, useState } from "react";
import style from "../components/GestionCategorias/GestionCategorias.module.css";
import {
  FaFolderOpen,
  FaPlus,
  FaPencilAlt,
  FaTrashAlt,
  FaTimes,
} from "react-icons/fa";
import Header from "../components/headerComponents/Header.jsx";
import Sidebar from "../components/NavbarAdmin/NavbarAdmin.jsx";
import {
  ShowCategories,
  CreateCategory,
  DeleteCategory,
} from "../middleware/api/Category.jsx";
import {
  ShowSubcategories,
  CreateSubcategory,
  deleteSubcategory,
} from "../middleware/api/Sucategory.jsx";

// --- COMPONENTES MODALES (OVERLAYS) ---

const FormModal = ({
  isOpen,
  onClose,
  title,
  subtext,
  onSubmit,
  initialData,
  type,
}) => {
  const [formData, setFormData] = useState({ name: "", description: "" });

  // Reiniciar o cargar datos cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          name:
            type === "category"
              ? initialData.nombre
              : initialData.nombre_subcategoria,
          description: initialData.descripcion,
        });
      } else {
        setFormData({ name: "", description: "" });
      }
    }
  }, [isOpen, initialData, type]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className={style.modalOverlay}>
      <div className={style.modalContainer}>
        <button className={style.closeButton} onClick={onClose}>
          <FaTimes />
        </button>
        <div className={style.modalHeader}>
          <h2>{title}</h2>
          <p className={style.modalSubtext}>{subtext}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={style.formGroup}>
            <label>
              Nombre de la {type === "category" ? "Categoría" : "Subcategoría"}
            </label>
            <input
              type="text"
              className={style.inputField}
              placeholder="Ej: Caricaturas, Deportivos..."
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>
          <div className={style.formGroup}>
            <label>Descripción</label>
            <textarea
              className={style.textareaField}
              placeholder={`Describe esta ${
                type === "category" ? "categoría" : "subcategoría"
              }...`}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />
          </div>
          <div className={style.modalActions}>
            <button type="button" className={style.btnCancel} onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className={style.btnConfirm}>
              {initialData
                ? "Guardar Cambios"
                : `Crear ${type === "category" ? "Categoría" : "Subcategoría"}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DeleteModal = ({ isOpen, onClose, onConfirm, itemType }) => {
  if (!isOpen) return null;
  return (
    <div className={style.modalOverlay}>
      <div className={style.modalContainer} style={{ maxWidth: "400px" }}>
        <div className={style.modalHeader}>
          <h2 style={{ color: "#000" }}>¿Estás seguro?</h2>
        </div>
        <p className={style.modalSubtext}>
          Esta acción no se puede deshacer. Esto eliminará permanentemente la{" "}
          {itemType}.
        </p>
        <div className={style.modalActions}>
          <button className={style.btnCancel} onClick={onClose}>
            Cancelar
          </button>
          <button
            className={style.btnDeleteConfirm}
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTE PADRE PRINCIPAL ---

const CategorySubcategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState({});
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [collapsed, setCollapsed] = useState(false);

  // Estados para Modales
  const [modalType, setModalType] = useState(null); // 'category' | 'subcategory' | null
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null); // Objeto si se edita, null si es nuevo
  const [itemToDelete, setItemToDelete] = useState(null); // { type: 'category'|'subcategory', id: ... }

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await ShowCategories();
      setCategories(fetchedCategories || []);
      if (fetchedCategories && fetchedCategories.length > 0) {
        setSelectedCategoryId(fetchedCategories[0].id);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategoryId !== null) {
      const fetchSubcategories = async () => {
        try {
          const response = await ShowSubcategories(selectedCategoryId);
          const filtered = Array.isArray(response)
            ? response.filter((sub) => sub.id_categoria === selectedCategoryId)
            : [];

          setSubcategories((prev) => ({
            ...prev,
            [selectedCategoryId]: filtered,
          }));
        } catch (error) {
          console.error("Error fetching subcategories:", error);
        }
      };
      fetchSubcategories();
    }
  }, [selectedCategoryId]);

  const handleToggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  const handleSelectCategory = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  // --- MANEJADORES DE MODALES ---

  // Abrir Modal de Creación/Edición
  const openFormModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item); // Si es null, es creación. Si tiene datos, es edición.
  };

  const closeFormModal = () => {
    setModalType(null);
    setEditingItem(null);
  };

  // Abrir Modal de Eliminación
  const openDeleteModal = (type, id) => {
    setItemToDelete({ type, id });
    setIsDeleteModalOpen(true);
  };

  const handleFormSubmit = async (data) => {
    console.log("Datos del formulario enviados:", data);
    try {
      if (modalType === "category") {
        if (editingItem) {
          // Aquí podrías agregar UpdateCategory si existe
          console.log(`Actualizar Categoría ID ${editingItem.id} con:`, data);
        } else {
          // Crear categoría usando API
          const payload = {
            nombre: data.name,
            descripcion: data.description,
          };
          const newCategory = await CreateCategory(payload);

          // Actualizar estado local
          setCategories((prev) => [...prev, newCategory]);
          setSelectedCategoryId(newCategory.id);
        }
      } else if (modalType === "subcategory") {
        if (editingItem) {
          // Aquí podrías agregar UpdateSubcategory si existe
          console.log(
            `Actualizar Subcategoría ID ${editingItem.id} con:`,
            data
          );
        } else {
          // // Crear subcategoría usando API
          // const payload = {
          //   nombre_subcategoria: data.name,
          // };
          const newSubcategory = await CreateSubcategory(
            { nombre_subcategoria: data.name },
            selectedCategoryId
          );
          console.log("Variable newSubcategory:", newSubcategory);

          // Actualizar estado local
          setSubcategories((prev) => ({
            ...prev,
            [selectedCategoryId]: [
              ...(Array.isArray(prev[selectedCategoryId])
                ? prev[selectedCategoryId]
                : []),
              newSubcategory,
            ],
          }));
        }
      }
    } catch (error) {
      console.error("Error al crear:", error);
      alert("Ocurrió un error al guardar. Revisa la consola.");
    }
  };

  // Lógica al confirmar eliminación
  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;

    if (itemToDelete.type === "subcategoría") {
      await deleteSubcategory(itemToDelete.id);

      // Actualizar estado local
      setSubcategories((prev) => {
        const updated = { ...prev };
        if (selectedCategoryId && Array.isArray(updated[selectedCategoryId])) {
          updated[selectedCategoryId] = updated[selectedCategoryId].filter(
            (sub) => sub.id !== itemToDelete.id
          );
        }
        return updated;
      });
    }

    if (itemToDelete.type === "categoría") {
      await DeleteCategory(itemToDelete.id);

      // Actualizar estado local
      setCategories((prev) => prev.filter((cat) => cat.id !== itemToDelete.id));

      // 2️⃣ Eliminar subcategorías asociadas
      setSubcategories((prev) => {
        const updated = { ...prev };
        delete updated[itemToDelete.id];
        return updated;
      });

      // 3️⃣ Cambiar categoría seleccionada
      if (selectedCategoryId === itemToDelete.id) {
        setSelectedCategoryId(null);
      }
    }

    setIsDeleteModalOpen(false);
  };

  // --- COMPONENTES DE TARJETA ACTUALIZADOS CON EVENTOS ---

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
          <p className={style["card-name"]}>**{category.nombre}**</p>
          <p className={style["card-description"]}>{category.descripcion}</p>
        </div>
        <div className={style.actions}>
          <button
            className={style["edit-btn"]}
            onClick={(e) => {
              e.stopPropagation();
              openFormModal("category", category);
            }}
          >
            <FaPencilAlt /> Editar
          </button>
          <button
            className="delete-btn" // Asegúrate que esta clase exista en tu CSS o usa style["delete-btn"]
            onClick={(e) => {
              e.stopPropagation();
              openDeleteModal("categoría", category.id);
            }}
          >
            <FaTrashAlt /> Eliminar
          </button>
        </div>
      </div>
      <span className="arrow-indicator">&gt;</span>
    </div>
  );

  const SubcategoryCard = ({ subcategory }) => (
    <div className={`${style.card} ${style["subcategory-card"]}`}>
      <div className={style["card-content"]}>
        <FaFolderOpen className={style.icon} />
        <div className={style["text-content"]}>
          <p className={style["card-name"]}>
            **{subcategory.nombre_subcategoria}**
          </p>
          <p className={style["card-description"]}>{subcategory.descripcion}</p>
        </div>
        <div className={style["actions-right"]}>
          <button
            className={style["edit-btn"]}
            onClick={() => openFormModal("subcategory", subcategory)}
          >
            <FaPencilAlt /> Editar
          </button>
          <button
            className={style["delete-btn"]}
            onClick={() => openDeleteModal("subcategoría", subcategory.id)}
          >
            <FaTrashAlt />
          </button>
        </div>
      </div>
    </div>
  );

  const selectedCategoryName = Array.isArray(categories)
    ? categories.find((c) => c.id === selectedCategoryId)?.nombre ||
      "Seleccionada"
    : "Seleccionada";
  const currentSubcategories = Array.isArray(subcategories[selectedCategoryId])
    ? subcategories[selectedCategoryId]
    : [];

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
        <div className={style["header-wrapper"]}>
          <Header title="Gestión de Categorías y Subcategorías" />
        </div>

        <div className={style["content-wrapper"]}>
          <div className={style["content-area"]}>
            {/* Categorías */}
            <div className={style["categories-block"]}>
              <div className={style["block-header"]}>
                <h3>Categorías</h3>
                <button onClick={() => openFormModal("category")}>
                  <FaPlus /> Nueva Categoría
                </button>
              </div>

              <div className={style["card-list"]}>
                {Array.isArray(categories) &&
                  categories.map((category) => (
                    <CategoryCard key={category.id} category={category} />
                  ))}
              </div>
            </div>

            {/* Subcategorías */}
            <div className={style["subcategories-block"]}>
              <div className={style["block-header"]}>
                <h3>Subcategorías - {selectedCategoryName}</h3>
                <button onClick={() => openFormModal("subcategory")}>
                  <FaPlus /> Nueva Subcategoría
                </button>
              </div>

              <div className={style["card-list"]}>
                {currentSubcategories
                  .filter((subcategory) => subcategory && subcategory.id) // solo los válidos
                  .map((subcategory) => (
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

      {/* --- RENDERIZADO DE MODALES --- */}

      {/* Modal de Creación/Edición */}
      <FormModal
        isOpen={modalType !== null}
        onClose={closeFormModal}
        title={
          editingItem
            ? `Editar ${
                modalType === "category" ? "Categoría" : "Subcategoría"
              }`
            : `Nueva ${modalType === "category" ? "Categoría" : "Subcategoría"}`
        }
        subtext={
          modalType === "category"
            ? "Crea una nueva categoría para tus calcetas"
            : "Crea una nueva subcategoría para tus calcetas"
        }
        type={modalType} // 'category' o 'subcategory'
        initialData={editingItem}
        onSubmit={handleFormSubmit}
      />

      {/* Modal de Eliminación */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        itemType={itemToDelete?.type}
      />
    </div>
  );
};

export default CategorySubcategoryManager;
