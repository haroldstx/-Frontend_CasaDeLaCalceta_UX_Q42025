import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { toast } from 'react-toastify';
import ProductDetail from '../ProductDetail/ProductDetail';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const formatPrice = (value) => {
    const n = Number(value) || 0;
    return `L.${n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    setIsAdding(true);
    try {
      addToCart({
        id: product.id,
        nombre: product.nombre,
        precio: product.precio,
        imagen: product.imagen || product.ProductoImagenes?.[0]?.ruta,
        quantity: 1
      });
      toast.success(`${product.nombre} agregado al carrito!`);
    } catch (error) {
      toast.error('Error al agregar al carrito');
    } finally {
      setIsAdding(false);
    }
  };

  const handleViewDetails = (e) => {
    e.stopPropagation();
    setShowDetail(true);
  };

  const imageUrl = product.ProductoImagenes && product.ProductoImagenes.length > 0
    ? product.ProductoImagenes[0].ruta
    : 'https://via.placeholder.com/200x200?text=Sin+Imagen';

  return (
    <>
      <div className="product-card">
        <div className="product-image-container">
          <img 
            src={imageUrl}
            alt={product.nombre}
            className="product-image"
          />
          {product.descuento && (
            <div className="discount-badge">{product.descuento}%</div>
          )}
        </div>
        
        <div className="product-info">
          <h3 className="product-name">{product.nombre}</h3>
          
          {/* Precio y botón de añadir en la misma fila */}
          <div className="product-bottom">
            <div className="product-price">
              <span className="current-price">{formatPrice(product.precio)}</span>
              {product.precioOriginal && (
                <span className="original-price">{formatPrice(product.precioOriginal)}</span>
              )}
            </div>

            <div className="product-buttons">
              <button 
                className="add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={product.stock === 0 || isAdding}
                title="Añadir al carrito"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                Añadir
              </button>
              
              <button 
                className="detail-btn-side"
                onClick={handleViewDetails}
                aria-label="Ver detalles del producto"
                title="Ver detalles"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de detalles */}
      {showDetail && (
        <ProductDetail 
          product={product} 
          onClose={() => setShowDetail(false)}
        />
      )}
    </>
  );
};

export default ProductCard;
