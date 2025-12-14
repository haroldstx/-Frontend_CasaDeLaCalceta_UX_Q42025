import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Placeholder: you can replace this with a fetch to your API
  const product = {
    id,
    nombre: `Producto ${id}`,
    descripcion: 'Descripción detallada del producto. Reemplazar con datos reales desde la API.',
    precio: 'N/A',
    imagen: null
  };

  return (
    <div className="product-detail-page">
      <button className="back-btn" onClick={() => navigate(-1)}>← Volver</button>
      <h2>{product.nombre}</h2>
      <div className="product-detail-main">
        <div className="image-area">
          {product.imagen ? (
            <img src={product.imagen} alt={product.nombre} />
          ) : (
            <div className="image-placeholder">No hay imagen</div>
          )}
        </div>
        <div className="info-area">
          <p><strong>Precio:</strong> {product.precio}</p>
          <p>{product.descripcion}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
