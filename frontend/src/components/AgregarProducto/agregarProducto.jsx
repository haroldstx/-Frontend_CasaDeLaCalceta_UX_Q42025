import { useState, useRef } from "react";
import styles from "./agregarProducto.module.css";
import { crearProducto } from "../../middleware/api/Products";

const AgregarProducto = ({ onClose, onAddProduct }) => {
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
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  // Validar formulario
  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
    }

    if (!formData.subcategoria.trim()) {
      newErrors.subcategoria = "La subcategoría es requerida";
    }

    if (!formData.talla.trim()) {
      newErrors.talla = "La talla es requerida";
    }

    if (!formData.color.trim()) {
      newErrors.color = "El color es requerido";
    }

    if (!formData.precio || Number(formData.precio) <= 0) {
      newErrors.precio = "El precio debe ser mayor a 0";
    }

    if (!formData.stock || Number(formData.stock) < 0) {
      newErrors.stock = "El stock no puede ser negativo";
    }

    if (!formData.descripcion.trim()) {
      newErrors.descripcion = "La descripción es requerida";
    }

    if (!image) {
      newErrors.image = "La imagen es requerida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar cambios en inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Manejar selección de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tipo de archivo
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          image: "El archivo debe ser una imagen",
        }));
        return;
      }

      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          image: "La imagen no debe superar 5MB",
        }));
        return;
      }

      setImage(file);
      setErrors((prev) => ({
        ...prev,
        image: "",
      }));

      // Crear preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Manejar drag and drop
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const fakeEvent = { target: { files: [file] } };
      handleImageChange(fakeEvent);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Abrir selector de archivos
  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Crear FormData para enviar al backend
      const formDataToSend = new FormData();
      formDataToSend.append("nombre", formData.nombre);
      formDataToSend.append("subcategoria", formData.subcategoria);
      formDataToSend.append("talla", formData.talla);
      formDataToSend.append("color", formData.color);
      formDataToSend.append("precio", formData.precio);
      formDataToSend.append("stock", formData.stock);
      formDataToSend.append("descripcion", formData.descripcion);
      formDataToSend.append("imagen", image);

      // Llamada real al backend
      const nuevoProducto = await crearProducto(formDataToSend);

      console.log("Producto creado exitosamente:", nuevoProducto);

      onAddProduct();
      onClose();
    } catch (error) {
      console.error("Error al agregar producto:", error);
      const mensajeError = error.response?.data?.message || 
        error.message || 
        "Error al agregar el producto. Intente nuevamente.";
      
      setErrors((prev) => ({
        ...prev,
        submit: mensajeError,
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={styles.modalTitle}>Nuevo producto</h2>

        {/* Image Upload */}
        <div
          className={styles.imageUpload}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />

          {preview ? (
            <div className={styles.previewContainer}>
              <img
                src={preview}
                alt="Preview"
                className={styles.previewImage}
              />
              <button
                type="button"
                className={styles.removeImageBtn}
                onClick={() => {
                  setImage(null);
                  setPreview(null);
                }}
              >
                ✕
              </button>
            </div>
          ) : (
            <>
              <div className={styles.uploadBox}></div>
              <div className={styles.uploadText}>
                <p className={styles.textSecondary}>Arrastra la imagen aquí</p>
                <p className={styles.textSmall}>o</p>
                <p
                  className={styles.textPrimary}
                  onClick={handleBrowseClick}
                  style={{ cursor: "pointer" }}
                >
                  Buscar imagen
                </p>
              </div>
            </>
          )}
        </div>
        {errors.image && (
          <p className={styles.errorText}>{errors.image}</p>
        )}

        {/* Form */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <label>Nombre *</label>
            <input
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ingrese el nombre del producto"
              className={errors.nombre ? styles.inputError : ""}
            />
            {errors.nombre && (
              <p className={styles.errorText}>{errors.nombre}</p>
            )}
          </div>

          <div className={styles.formRow}>
            <label>Subcategoría *</label>
            <select
              name="subcategoria"
              value={formData.subcategoria}
              onChange={handleChange}
              className={errors.subcategoria ? styles.inputError : ""}
            >
              <option value="">Elija una subcategoría</option>
              <option value="Sanrio">Sanrio</option>
              <option value="Disney">Disney</option>
              <option value="Pokemon">Pokemon</option>
              <option value="Anime">Anime</option>
              <option value="Caricatura">Caricatura</option>
              <option value="Temporada">Temporada</option>
            </select>
            {errors.subcategoria && (
              <p className={styles.errorText}>{errors.subcategoria}</p>
            )}
          </div>

          <div className={styles.formRow}>
            <label>Talla *</label>
            <input
              name="talla"
              value={formData.talla}
              onChange={handleChange}
              placeholder="Ej: Adulto, Niño, S, M, L"
              className={errors.talla ? styles.inputError : ""}
            />
            {errors.talla && (
              <p className={styles.errorText}>{errors.talla}</p>
            )}
          </div>

          <div className={styles.formRow}>
            <label>Color *</label>
            <input
              name="color"
              value={formData.color}
              onChange={handleChange}
              placeholder="Ingrese el color"
              className={errors.color ? styles.inputError : ""}
            />
            {errors.color && (
              <p className={styles.errorText}>{errors.color}</p>
            )}
          </div>

          <div className={styles.formRow}>
            <label>Precio *</label>
            <div className={styles.priceInput}>
              <span>L</span>
              <input
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                min="0"
                step="0.01"
                placeholder="0.00"
                className={errors.precio ? styles.inputError : ""}
              />
            </div>
            {errors.precio && (
              <p className={styles.errorText}>{errors.precio}</p>
            )}
          </div>

          <div className={styles.formRow}>
            <label>Cantidad *</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min="0"
              placeholder="Ingrese la cantidad"
              className={errors.stock ? styles.inputError : ""}
            />
            {errors.stock && (
              <p className={styles.errorText}>{errors.stock}</p>
            )}
          </div>

          <div className={styles.formRow}>
            <label>Descripción *</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Ingrese una descripción"
              rows="3"
              className={errors.descripcion ? styles.inputError : ""}
            />
            {errors.descripcion && (
              <p className={styles.errorText}>{errors.descripcion}</p>
            )}
          </div>

          {errors.submit && (
            <p className={styles.errorTextSubmit}>{errors.submit}</p>
          )}

          {/* Footer */}
          <div className={styles.footer}>
            <button
              type="button"
              className={styles.btnCancel}
              onClick={onClose}
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={styles.btnPrimary}
              disabled={isLoading}
            >
              {isLoading ? "Agregando..." : "Agregar producto"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AgregarProducto;
