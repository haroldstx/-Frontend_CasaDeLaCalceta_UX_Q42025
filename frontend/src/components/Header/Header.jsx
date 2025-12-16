import React from 'react';
import CartIcon from '../CartIcon/CartIcon';
import SearchBar from '../SearchBar/SearchBar';
import MobileMenu from '../MobileMenu/MobileMenu';
import { siteConfig } from '../../config/siteConfig';
import './Header.css';

const Header = ({ onSearch, onClear }) => {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="header-left">
          <MobileMenu />
          <div className="logo-section">
            <img 
              src={siteConfig.logo} 
              alt={siteConfig.logoAlt}
              className="logo-image"
            />
          </div>
        </div>

        <div className="header-content">
          <div className="header-search">
            <SearchBar 
              onSearch={onSearch}
              onClear={onClear}
              placeholder="Buscar..."
            />
          </div>
        </div>
        
        <nav className="header-nav">
          <CartIcon />
        </nav>
      </div>
    </header>
  );
};

export default Header;
