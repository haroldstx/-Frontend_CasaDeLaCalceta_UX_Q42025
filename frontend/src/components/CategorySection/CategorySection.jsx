// components/CategorySection/CategorySection.jsx
import React, { useEffect, useMemo, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import ProductGrid from '../Layout/ProductGrid';
import './CategorySection.css';

const mockProducts = [
  {
    id: 1,
    nombre: "Calcetines Harry Potter",
    descripcion: "Calcetines temáticos",
    precio: 150,
    imagen: "https://via.placeholder.com/600x600.png?text=Harry+Potter",
    categoria: "Tematicos",
    subcategoria: "Harry Potter",
    activo: true,
  },
  {
    id: 2,
    nombre: "Calcetines South Park",
    descripcion: "Calcetines temáticos",
    precio: 150,
    imagen: "https://via.placeholder.com/600x600.png?text=South+Park",
    categoria: "Tematicos",
    subcategoria: "South Park",
    activo: true,
  },
  {
    id: 3,
    nombre: "Calcetines Snoopy",
    descripcion: "Calcetines temáticos",
    precio: 150,
    imagen: "https://via.placeholder.com/600x600.png?text=Snoopy",
    categoria: "Tematicos",
    subcategoria: "Snoopy",
    activo: true,
  },
  {
    id: 4,
    nombre: "Calcetines Grinch",
    descripcion: "Calcetines temáticos",
    precio: 150,
    imagen: "https://via.placeholder.com/600x600.png?text=Grinch",
    categoria: "Tematicos",
    subcategoria: "Grinch",
    activo: true,
  }
];


const CategorySection = ({
  title = '',
  products: initialProducts,
  searchTerm = '',
  selectedCategory = null, // <- lo controlará HomePage después
}) => {
  const [loading, setLoading] = useState(false);

  const sourceProducts = useMemo(
    () => (Array.isArray(initialProducts) && initialProducts.length ? initialProducts : mockProducts),
    [initialProducts]
  );

  const products = useMemo(() => {
    let filtered = sourceProducts.filter(p => p.activo !== false);

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        p =>
          (p.nombre || '').toLowerCase().includes(term) ||
          ((p.descripcion || '').toLowerCase().includes(term))
      );
    }

    if (selectedCategory) {
      const sel = selectedCategory.toLowerCase();
      filtered = filtered.filter(
        p =>
          ((p.categoria || '').toLowerCase() === sel) ||
          ((p.subcategoria || '').toLowerCase() === sel)
      );
    }

    return filtered;
  }, [sourceProducts, searchTerm, selectedCategory]);

  useEffect(() => {
    setLoading(false);
  }, [searchTerm, selectedCategory, sourceProducts]);

  return (
    <section className="category-section">
      {(title || selectedCategory) && (
        <div className="category-header">
          {title ? <h2 className="section-title">{title}</h2> : <div />}
          {selectedCategory && (
            <div className="active-filter">
              Filtrando por: <strong>{selectedCategory}</strong>
            </div>
          )}
        </div>
      )}

      {loading ? (
        <div className="loading">Cargando productos...</div>
      ) : products.length === 0 ? (
        <div className="no-products">No hay productos disponibles</div>
      ) : (
        <ProductGrid columns={4}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
      )}
    </section>
  );
};

export default CategorySection;
