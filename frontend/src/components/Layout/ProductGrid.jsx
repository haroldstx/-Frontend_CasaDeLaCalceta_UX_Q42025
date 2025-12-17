import React from 'react';
import './ProductGrid.css';


const ProductGrid = ({ children, columns = 4 }) => {
  return (
    <div className={`product-grid cols-${columns}`}>
      {children}
    </div>
  );
};

export default ProductGrid;


