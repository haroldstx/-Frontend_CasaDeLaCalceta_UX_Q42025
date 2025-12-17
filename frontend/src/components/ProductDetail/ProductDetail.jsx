import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import { useCart } from "../../contexts/CartContext";
import "./ProductDetail.css";
import { ShowProducts } from "../../middleware/api/Products.jsx";

function ProductDetail({ product = {}, onClose = () => {} }) {
  const { addToCart } = useCart();

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const API_URL = "http://localhost:3002";

  const imageUrl =
    product.imagenes?.length > 0
      ? `${API_URL}/${product.imagenes[0].imagen
          .replace("public", "")
          .replace("//", "/")}`
      : "https://via.placeholder.com/200x200?text=Sin+Imagen";

  function handleAdd() {
    addToCart(product);
    toast.success(`${product.nombre || "Producto"} añadido al carrito`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  }

  function stop(e) {
    e.stopPropagation();
  }

  const modalContent = (
    <div className="pd-overlay" onClick={onClose}>
      <div className="pd-modal" onClick={stop} role="dialog" aria-modal="true">
        <button
          className="pd-close"
          onClick={onClose}
          aria-label="Cerrar detalle"
        >
          ×
        </button>

        <div className="pd-content">
          <div className="pd-image">
            {product.imagen || (product.imagenes && product.imagenes[0]) ? (
              <img src={imageUrl} alt={product.nombre} />
            ) : (
              <div className="pd-image-placeholder">No hay imagen</div>
            )}
          </div>

          <div className="pd-info">
            <h2 className="pd-title">{product.nombre}</h2>
            <p className="pd-label">Descripcion:</p>
            <p className="pd-desc">
              {product.descripcion || "Sin descripción"}
            </p>
            <p className="pd-stock">Stock: {product.stock ?? "N/A"}</p>

            <div className="pd-footer">
              <div className="pd-price">L. {product.precio ?? "N/A"}</div>
              <button
                className="pd-add"
                onClick={handleAdd}
                aria-label={`Añadir ${product.nombre} al carrito`}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 6h15l-1.5 9h-11z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="10"
                    cy="20"
                    r="1"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                  <circle
                    cx="18"
                    cy="20"
                    r="1"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                </svg>
                Añadir al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

export default ProductDetail;
