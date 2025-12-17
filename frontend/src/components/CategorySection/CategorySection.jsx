// components/CategorySection/CategorySection.jsx
import React, { useEffect, useMemo, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import ProductGrid from "../Layout/ProductGrid";
// import Grinch from "../../assets/uploads/productos/Grinch.png";
// import HarryPotter from "../../assets/uploads/productos/HarryPoter.png";
// import Snoopy from "../../assets/uploads/productos/Snoopy.png";
// import SoutPark from "../../assets/uploads/productos/SoutPark.png";
import "./CategorySection.css";
import { getProductosHomepage } from "../../middleware/api/Products.jsx";

// const mockProducts = [
//   {
//     id: 1,
//     nombre: "Calcetines Harry Potter",
//     descripcion: "Calcetines temáticos",
//     precio: 150,
//     imagen: HarryPotter,
//     categoria: "Tematicos",
//     id_subcategoria: 2,
//     activo: true,
//   },
//   {
//     id: 2,
//     nombre: "Calcetines South Park",
//     descripcion: "Calcetines temáticos",
//     precio: 150,
//     imagen: SoutPark,
//     categoria: "Tematicos",
//     id_subcategoria: 2,
//     activo: true,
//   },
//   {
//     id: 3,
//     nombre: "Calcetines Snoopy",
//     descripcion: "Calcetines temáticos",
//     precio: 150,
//     imagen: Snoopy,
//     categoria: "Tematicos",
//     id_subcategoria: 2,
//     activo: true,
//   },
//   {
//     id: 4,
//     nombre: "Calcetines Grinch",
//     descripcion: "Calcetines temáticos",
//     precio: 150,
//     imagen: Grinch,
//     categoria: "Tematicos",
//     id_subcategoria: 2,
//     activo: true,
//   },
//   {
//     id: 5,
//     nombre: "Calcetines Harry Potter",
//     descripcion: "Calcetines temáticos",
//     precio: 150,
//     imagen: HarryPotter,
//     categoria: "Tematicos",
//     id_subcategoria: 2,
//     activo: true,
//   },
//   {
//     id: 6,
//     nombre: "Calcetines South Park",
//     descripcion: "Calcetines temáticos",
//     precio: 150,
//     imagen: SoutPark,
//     categoria: "Tematicos",
//     id_subcategoria: 2,
//     activo: true,
//   },
//   {
//     id: 7,
//     nombre: "Calcetines Snoopy",
//     descripcion: "Calcetines temáticos",
//     precio: 150,
//     imagen: Snoopy,
//     categoria: "Tematicos",
//     id_subcategoria: 2,
//     activo: true,
//   },
//   {
//     id: 8,
//     nombre: "Calcetines Grinch",
//     descripcion: "Calcetines temáticos",
//     precio: 150,
//     imagen: Grinch,
//     categoria: "Tematicos",
//     id_subcategoria: 2,
//     activo: true,
//   },
// ];

const CategorySection = ({
  title = "",
  products: initialProducts,
  searchTerm = "",
  selectedCategory = null,
}) => {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);

  const sourceProducts = useMemo(
    () =>
      Array.isArray(initialProducts) && initialProducts.length
        ? initialProducts
        : formData,
    [initialProducts, formData]
  );

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const products = await getProductosHomepage();
        setFormData(products || []);
        console.log("Fetched products:", products);
      } catch (error) {
        console.error("Error fetching products:", error);
        setFormData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const products = useMemo(() => {
    let filtered = sourceProducts.filter((p) => p.activo !== false);

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          (p.nombre || "").toLowerCase().includes(term) ||
          (p.descripcion || "").toLowerCase().includes(term)
      );
    }

    if (selectedCategory) {
      const sel = selectedCategory.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          (p.categoria || "").toLowerCase() === sel ||
          (p.subcategoria || "").toLowerCase() === sel
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
