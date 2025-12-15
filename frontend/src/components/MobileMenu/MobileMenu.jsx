import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarCliente from "../NavbarCliente/NavbarCliente";

import './MobileMenu.css';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const raw = localStorage.getItem('user');
      setUser(raw ? JSON.parse(raw) : null);
    } catch (e) {
      setUser(null);
    }
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const go = (path) => {
    closeMenu();
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    closeMenu();
    navigate('/');
  };

  return (
    <div className="mobile-menu-container">
      <button
        className="hamburger-button"
        onClick={toggleMenu}
        aria-label="Menú de navegación"
        aria-expanded={isOpen}
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      {isOpen && (
        <div className="menu-overlay" onClick={closeMenu}></div>
      )}

      <nav className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <NavbarCliente />
      </nav>
    </div>
  );
};

export default MobileMenu;
