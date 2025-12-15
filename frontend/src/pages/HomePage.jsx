// pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import CategorySection from '../components/CategorySection/CategorySection';
import './HomePage.css';

const HomePage = () => {
  const [activeFilter, setActiveFilter] = useState('todos');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  
  const [categories, setCategories] = useState([]);

  const handleSearch = (searchTermInput) => {
    const term = (searchTermInput || '').trim();
    setSearchTerm(term);
    setIsSearching(!!term);
    if (!term) {
      setSearchResults([]);
      return;
    }
    // Los resultados se filtran en CategorySection
  };

  const handleClearSearch = () => {
    setSearchResults([]);
    setSearchTerm('');
    setIsSearching(false);
  };


  return (
    <div className="homepage">
      {/* Header con CartIcon y SearchBar */}
      <Header 
        onSearch={handleSearch}
        onClear={handleClearSearch}
      />

      {/* Contenido principal */}
      <main className="homepage-main">
        {/* Barra de filtros */}
        <section className="filters-bar">
          <button 
            className={`filter-btn ${activeFilter === 'todos' ? 'active' : ''}`}
            onClick={() => setActiveFilter('todos')}
          >
            Todos
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'tematicos' ? 'active' : ''}`}
            onClick={() => setActiveFilter('tematicos')}
          >
            Temáticos
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'temporada' ? 'active' : ''}`}
            onClick={() => setActiveFilter('temporada')}
          >
            Temporada
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'categorias' ? 'active' : ''}`}
            onClick={() => setActiveFilter('categorias')}
          >
            Categorías
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'subcategoria' ? 'active' : ''}`}
            onClick={() => setActiveFilter('subcategoria')}
          >
            Subcategoría
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </section>

        {/* Sección única de productos */}
        <CategorySection
          title=""
          searchTerm={searchTerm}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;