import React, { useState } from "react";
import styles from "../components/InventarioAdmin/inventarioAdmin.module.css";
import NavbarAdmin from "../components/NavbarAdmin/NavbarAdmin";
import notificationIcon from "../assets/icons/notification.svg";
import searchIcon from "../assets/icons/search.svg";
import refreshIcon from "../assets/icons/refresh.svg";
import filterIcon from "../assets/icons/filter.svg";
import addIcon from "../assets/icons/add.svg";

const InventarioAdmin = () => {
  const [productos, setProductos] = useState([
    {
      id: "01",
      nombre: "Calcetín Hello Kitty",
      subcategoria: "Sanrio",
      talla: "Adulto",
      color: "Rosado",
      precio: "L 100",
      stock: 20,
      estado: "Activo",
      descripcion: "Calcetines suaves",
    },
    {
      id: "02",
      nombre: "Calcetín Mickey Mouse",
      subcategoria: "Disney",
      talla: "Niño",
      color: "Negro",
      precio: "L 80",
      stock: 0,
      estado: "Inactivo",
      descripcion: "Calcetines de algodón",
    },
    {
      id: "03",
      nombre: "Calcetín Pikachu",
      subcategoria: "Pokemon",
      talla: "Adulto",
      color: "Amarillo",
      precio: "L 120",
      stock: 15,
      estado: "Activo",
      descripcion: "Calcetines deportivos",
    },
  ]);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filtrar productos basándose en el término de búsqueda
  const productosFiltrados = productos.filter((producto) => {
    const search = searchTerm.toLowerCase().trim();
    
    if (!search) return true;

    return (
      producto.id.toLowerCase().includes(search) ||
      producto.nombre.toLowerCase().includes(search) ||
      producto.subcategoria.toLowerCase().includes(search) ||
      producto.talla.toLowerCase().includes(search) ||
      producto.color.toLowerCase().includes(search) ||
      producto.precio.toLowerCase().includes(search) ||
      producto.stock.toString().includes(search) ||
      producto.estado.toLowerCase().includes(search) ||
      producto.descripcion.toLowerCase().includes(search)
    );
  });

  const handleRefresh = async () => {
    setIsRefreshing(true);
    
    // Simula llamada al backend para obtener datos actualizados
    // En producción, reemplaza esto con tu API real
    try {
      // await fetch('/api/inventario')
      //   .then(res => res.json())
      //   .then(data => setProductos(data));
      
      // Por ahora simula un delay de carga
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // Opcional: actualizar los datos
      console.log("Datos del inventario actualizados");
    } catch (error) {
      console.error("Error al refrescar inventario:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const toggleEstado = async (id) => {
    const producto = productos.find((p) => p.id === id);
    
    // No permitir activar productos sin stock
    if (producto.stock === 0 && producto.estado === "Inactivo") {
      alert("No se puede activar un producto sin stock");
      return;
    }

    const nuevoEstado = producto.estado === "Activo" ? "Inactivo" : "Activo";

    // Actualizar localmente
    setProductos(
      productos.map((p) =>
        p.id === id ? { ...p, estado: nuevoEstado } : p
      )
    );

    // Simula llamada al backend para actualizar el estado
    try {
      // await fetch(`/api/inventario/${id}/estado`, {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ estado: nuevoEstado })
      // });
      
      console.log(`Estado del producto ${id} actualizado a ${nuevoEstado}`);
    } catch (error) {
      console.error("Error al actualizar estado:", error);
      // Revertir cambio si falla
      setProductos(
        productos.map((p) =>
          p.id === id ? { ...p, estado: producto.estado } : p
        )
      );
    }
  };

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
              className={`${styles.btnIcon} ${isRefreshing ? styles.refreshing : ''}`}
              onClick={handleRefresh}
              disabled={isRefreshing}
              title="Refrescar inventario"
            >
              <img src={refreshIcon} alt="Refrescar" />
            </button>

            <button className={styles.btnPrimary}>
              <img src={addIcon} alt="" />
              Agregar Producto
            </button>

            <button className={styles.btnDanger}>
              <img src={addIcon} alt="" />
              Agregar Categoría
            </button>
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
          </div>

          {productosFiltrados.length === 0 ? (
            <div className={styles.noResults}>
              <p>No se encontraron productos que coincidan con "{searchTerm}"</p>
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
              <span className={producto.stock === 0 ? styles.stockZero : ''}>
                {producto.stock}
              </span>
              <span
                className={`${styles.estadoCell} ${
                  producto.estado === "Activo" ? styles.active : styles.inactive
                } ${producto.stock === 0 ? styles.disabled : ''}`}
                onClick={() => toggleEstado(producto.id)}
                title={producto.stock === 0 && producto.estado === "Inactivo" 
                  ? "No se puede activar sin stock" 
                  : "Click para cambiar estado"}
              >
                {producto.estado}
              </span>
              <span>{producto.descripcion}</span>
            </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default InventarioAdmin;
