import React from "react";
import "./PosProductCard.css";


const formatLempiras = (value) => {
  const n = Number(value) || 0;
  return `L.${n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
};

export default function PosProductCard({ product, onAdd }) {
  
  if (!product) return null;

  
    const nombre = product?.nombre ?? "Producto";
  const categoria =
    product?.categoria?.nombre ??
    product?.categoria_nombre ??
    product?.categoria ??
    "Categoría";

  const precio = Number(product?.precio ?? product?.price ?? 0) || 0;
  const stock = Number(product?.stock ?? 0) || 0;

  // Ajusta estos campos según cómo viene tu imagen del backend
  const imageUrl =
    product?.imagen ||
    product?.image ||
    product?.url_imagen ||
    product?.imagenes?.[0]?.url ||
    "https://via.placeholder.com/300x300";

  const disabled = stock <= 0;

  return (
    <div className="pos-card">
      <div className="pos-card-imgwrap">
        <img className="pos-card-img" src={imageUrl} alt={nombre} />
      </div>

      <div className="pos-card-body">
        <div className="pos-card-category">{categoria}</div>

        <div className="pos-card-row">
          <div className="pos-card-name">{nombre}</div>
          <div className="pos-card-price">{formatLempiras(precio)}</div>
        </div>

        <div className={`pos-card-stock ${disabled ? "out" : "in"}`}>
          {disabled ? "Sin stock" : `Stock: ${stock}`}
        </div>

        <button
          type="button"
          className="pos-card-btn"
          disabled={disabled}
          onClick={() => onAdd?.(product)}
        >
          <span className="pos-card-btn-icon">🛒</span>
          Agregar a venta
        </button>
      </div>
    </div>
  );
}
