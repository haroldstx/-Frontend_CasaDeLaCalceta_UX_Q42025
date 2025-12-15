// pages/ProductListPage.jsx
import React from 'react';
import CategorySection from '../components/CategorySection/CategorySection';
import FilterSidebar from '../components/FilterSidebar/FilterSidebar';
import './ProductListPage.css';

const ProductListPage = () => {
  // Estos IDs vendrían de tu base de datos
  const categories = [
    { id: 1, title: "Temáticos" },
    { id: 2, title: "Temporada" },
    { id: 3, title: "Categorías" },
    { id: 4, title: "Subcategorías" }
  ];

  const themes = [
    { theme: "harry-potter", title: "Calcetines Harry Potter" },
    { theme: "soul-park", title: "Calcetines Soul Park" },
    { theme: "snoopy", title: "Calcetines Snoopy" },
    { theme: "grinch", title: "Calcetines Grinch" },
    { theme: "coca-cola", title: "Calcetines Coca Cola" },
    { theme: "chocos", title: "Calcetines Chocos" },
    { theme: "mesel", title: "Calcetines Mesel" },
    { theme: "dragon-ball", title: "Calcetines Dragon Ball" }
  ];

  return (
    <div className="product-list-page">
      <FilterSidebar />
      
      <main className="main-content">
        {/* Secciones por categoría */}
        {categories.map(cat => (
          <CategorySection 
            key={cat.id}
            title={cat.title}
            categoryId={cat.id}
          />
        ))}
        
        {/* Secciones por tema (como en tu Figma) */}
        {themes.map((theme, index) => (
          <CategorySection 
            key={index}
            title={theme.title}
            theme={theme.theme}
          />
        ))}
      </main>
    </div>
  );
};

export default ProductListPage;