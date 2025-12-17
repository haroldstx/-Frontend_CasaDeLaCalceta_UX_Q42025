import React, { useState, useEffect } from "react";
import styles from "../components/InventarioAdmin/inventarioAdmin.module.css";
import NavbarAdmin from "../components/NavbarAdmin/NavbarAdmin";
import notificationIcon from "../assets/icons/notification.svg";
import searchIcon from "../assets/icons/search.svg";
import refreshIcon from "../assets/icons/refresh.svg";
import addIcon from "../assets/icons/add.svg";
import editIcon from "../assets/icons/Edit.svg";
import ProductModal from "../components/AgregarProducto/agregarProducto";
import {
  getAllProductos,
  habilitarProducto,
  deshabilitarProducto,
} from "../middleware/api/Products";
import { Link } from "react-router-dom";

const InventarioAdmin = () => {
  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
  nombre: "",
  subcategoria: "",
  talla: "",
  color: "",
  precio: "",
  stock: "",
  descripcion: "",
});

const [errors, setErrors] = useState({});
const [image, setImage] = useState(null);
const [preview, setPreview] = useState(null);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Cargar productos al montar el componente
  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    setIsLoading(true);
    try {
      const data = await getAllProductos();
      const productosFormateados = data.map((p) => ({
        ...p,
        precio: typeof p.precio === "number" ? `L ${p.precio}` : p.precio,
        estado: Number(p.stock) === 0 ? "Inactivo" : (p.activo ? "Activo" : "Inactivo"),
        imagen: p.imagenes?.[0]?.imagen || null,
      }));
      setProductos(productosFormateados);
    } catch (error) {
      console.error("Error al cargar productos:", error);
      setProductos([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filtrar productos basándose en el término de búsqueda
  const productosFiltrados = productos.filter((producto) => {
    const search = searchTerm.toLowerCase().trim();

    if (!search) return true;

    return (
      (producto.id?.toString() || "").toLowerCase().includes(search) ||
      (producto.nombre || "").toLowerCase().includes(search) ||
      (producto.subcategoria || "").toLowerCase().includes(search) ||
      (producto.talla || "").toLowerCase().includes(search) ||
      (producto.color || "").toLowerCase().includes(search) ||
      (producto.precio?.toString() || "").toLowerCase().includes(search) ||
      (producto.stock?.toString() || "").includes(search) ||
      (producto.estado || "").toLowerCase().includes(search) ||
      (producto.descripcion || "").toLowerCase().includes(search)
    );
  });

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await cargarProductos();
    setIsRefreshing(false);
  };

  const toggleEstado = async (id) => {
    const producto = productos.find((p) => p.id === id);
    if (Number(producto.stock) === 0) {
      alert("No se puede cambiar el estado de un producto sin stock");
      return;
    }

    const nuevoEstado = producto.estado === "Activo" ? "Inactivo" : "Activo";
    setProductos(
      productos.map((p) => (p.id === id ? { ...p, estado: nuevoEstado } : p))
    );

    try {
      if (nuevoEstado === "Activo") {
        await habilitarProducto(id);
      } else {
        await deshabilitarProducto(id);
      }
    } catch (error) {
      console.error("Error al actualizar estado:", error);
      setProductos(
        productos.map((p) =>
          p.id === id ? { ...p, estado: producto.estado } : p
        )
      );
    }
  };

  const handleAddProduct = async () => {
    setShowModal(false);
    await cargarProductos();
  };

  const handleEditProduct = (producto) => {
    // TODO: Implementar modal de edición
    console.log("Editar producto:", producto);
    alert(`Funcionalidad de edición en desarrollo para: ${producto.nombre}`);
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className={styles.pageContainer}>
      <NavbarAdmin />

      <main className={styles.mainContent}>
        {/* Header */}
        <header className={styles.topHeader}>
          <h1 className={styles.pageTitle}>Gestión de Inventario</h1>

          <button className={styles.notificationButton}>
            <img src={notificationIcon} alt="Notificaciones" />
          </button>
        </header>

        {/* Controls */}
        <div className={styles.controlsBar}>
          <div className={styles.searchWrapper}>
            <img src={searchIcon} alt="" />
            <input
              placeholder="Buscar por nombre, categoría, color, talla..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <div className={styles.actions}>
            <button
              className={`${styles.btnIcon} ${
                isRefreshing ? styles.refreshing : ""
              }`}
              onClick={handleRefresh}
              disabled={isRefreshing}
              title="Refrescar inventario"
            >
              <img src={refreshIcon} alt="Refrescar" />
            </button>

            <button className={styles.btnPrimary} onClick={openModal}>
              <img src={addIcon} alt="" />
              Agregar Producto
            </button>
              <Link to="/gestion-categorias" className={styles.linkNoStyle}>
            <button className={styles.btnDanger}>
              <img src={addIcon} alt="" />
              Agregar Categoría
            </button>
              </Link>
          </div>
        </div>

        {/* Tabla */}
        <div className={styles.tableWrapper}>
          <div className={styles.tableHeader}>
            <span>Id Producto</span>
            <span>Nombre</span>
            <span>Subcategoría</span>
            <span>Talla</span>
            <span>Color</span>
            <span>Precio</span>
            <span>Stock</span>
            <span>Estado</span>
            <span>Descripción</span>
            <span>Acciones</span>
          </div>

          {isLoading ? (
            <div className={styles.noResults}>
              <p>Cargando productos...</p>
            </div>
          ) : productosFiltrados.length === 0 ? (
            <div className={styles.noResults}>
              <p>
                {searchTerm
                  ? `No se encontraron productos que coincidan con "${searchTerm}"`
                  : "No hay productos disponibles"}
              </p>
            </div>
          ) : (
            productosFiltrados.map((producto) => (
              <div key={producto.id} className={styles.tableRow}>
                <span>{producto.id}</span>
                <span>{producto.nombre}</span>
                <span>{producto.subcategoria}</span>
                <span>{producto.talla}</span>
                <span>{producto.color}</span>
                <span>{producto.precio}</span>
                <span className={Number(producto.stock) === 0 ? styles.stockZero : ""}>
                  {producto.stock}
                </span>
                <span
                  className={`${styles.estadoCell} ${
                    producto.estado === "Activo"
                      ? styles.active
                      : styles.inactive
                  } ${Number(producto.stock) === 0 ? styles.disabled : ""}`}
                  onClick={() => toggleEstado(producto.id)}
                  title={
                    Number(producto.stock) === 0
                      ? "No se puede cambiar estado sin stock"
                      : "Click para cambiar estado"
                  }
                >
                  {producto.estado}
                </span>
                <span>{producto.descripcion}</span>
                <span className={styles.actionsCell}>
                  <button
                    className={styles.editButton}
                    onClick={() => handleEditProduct(producto)}
                    title="Editar producto"
                  >
                    <img src={editIcon} alt="Editar" />
                  </button>
                </span>
              </div>
            ))
          )}
        </div>
      </main>
      {showModal && (
        <ProductModal onClose={closeModal} onAddProduct={handleAddProduct} />
      )}
    </div>
  );
};

export default InventarioAdmin;
