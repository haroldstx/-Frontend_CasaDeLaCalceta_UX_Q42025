// components/FilterSidebar/FilterSidebar.jsx
import React, { useState } from 'react';
import './FilterSidebar.css';

const FilterSidebar = ({ activeFilter, setActiveFilter }) => {
  const [filters, setFilters] = useState({
    priceRange: [0, 100],
    sizes: [],
    colors: []
  });

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  return (
    <aside className="filter-sidebar">
      <h3>Filtros</h3>
      
      <div className="filter-group">
        <h4>Por Precio</h4>
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={filters.priceRange[1]}
          onChange={(e) => handleFilterChange('priceRange', [0, e.target.value])}
        />
        <span>L.{filters.priceRange[1]}</span>
      </div>

      <div className="filter-group">
        <h4>Por Tamaño</h4>
        <label>
          <input 
            type="checkbox" 
            onChange={(e) => {
              if (e.target.checked) {
                setFilters(prev => ({ ...prev, sizes: [...prev.sizes, 'pequeño'] }));
              } else {
                setFilters(prev => ({ ...prev, sizes: prev.sizes.filter(s => s !== 'pequeño') }));
              }
            }}
          />
          Pequeño
        </label>
        <label>
          <input 
            type="checkbox"
            onChange={(e) => {
              if (e.target.checked) {
                setFilters(prev => ({ ...prev, sizes: [...prev.sizes, 'mediano'] }));
              } else {
                setFilters(prev => ({ ...prev, sizes: prev.sizes.filter(s => s !== 'mediano') }));
              }
            }}
          />
          Mediano
        </label>
        <label>
          <input 
            type="checkbox"
            onChange={(e) => {
              if (e.target.checked) {
                setFilters(prev => ({ ...prev, sizes: [...prev.sizes, 'grande'] }));
              } else {
                setFilters(prev => ({ ...prev, sizes: prev.sizes.filter(s => s !== 'grande') }));
              }
            }}
          />
          Grande
        </label>
      </div>

      <div className="filter-group">
        <h4>Por Color</h4>
        <label>
          <input type="checkbox" /> Rojo
        </label>
        <label>
          <input type="checkbox" /> Azul
        </label>
        <label>
          <input type="checkbox" /> Negro
        </label>
        <label>
          <input type="checkbox" /> Blanco
        </label>
      </div>
    </aside>
  );
};

export default FilterSidebar;