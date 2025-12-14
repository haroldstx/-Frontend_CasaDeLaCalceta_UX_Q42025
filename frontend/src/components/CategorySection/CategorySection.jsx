// components/CategorySection/CategorySection.jsx
import React, { useState, useEffect } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './CategorySection.css';

// Productos de prueba
const mockProducts = [
  {
    id: 1,
    nombre: 'Calcetines Rojo Brillante',
    precio: 50,
    activo: true,
    ProductoImagenes: [
      { ruta: 'https://via.placeholder.com/200x200?text=Calcetines+Rojo' }
    ]
  },
  {
    id: 2,
    nombre: 'Calcetines Azul Marino',
    precio: 45,
    activo: true,
    ProductoImagenes: [
      { ruta: 'https://via.placeholder.com/200x200?text=Calcetines+Azul' }
    ]
  },
  {
    id: 3,
    nombre: 'Calcetines Negro Clásico',
    precio: 35,
    activo: true,
    ProductoImagenes: [
      { ruta: 'https://via.placeholder.com/200x200?text=Calcetines+Negro' }
    ]
  },
  {
    id: 4,
    nombre: 'Calcetines Blanco Puro',
    precio: 40,
    activo: true,
    ProductoImagenes: [
      { ruta: 'https://via.placeholder.com/200x200?text=Calcetines+Blanco' }
    ]
  }
];

const CategorySection = ({ title, categoryId, theme, products: initialProducts, searchTerm = '' }) => {
  const [products, setProducts] = useState(initialProducts || mockProducts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Filtrar productos por búsqueda
    let filtered = mockProducts.filter(p => p.activo);
    
    if (searchTerm.trim()) {
      filtered = filtered.filter(p => 
        p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.descripcion && p.descripcion.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    setProducts(filtered);
    setLoading(false);
  }, [searchTerm]);

  return (
    <section className="category-section">
      <h2 className="section-title">{title}</h2>
      
      {loading ? (
        <div className="loading">Cargando productos...</div>
      ) : products.length === 0 ? (
        <div className="no-products">No hay productos disponibles</div>
      ) : (
        <div className="products-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default CategorySection;