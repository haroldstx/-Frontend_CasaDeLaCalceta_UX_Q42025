import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
        <div className="mobile-menu-header">
          <div className="mobile-logo">La casa de la calceta</div>
          <div className="mobile-user">
            {user ? (
              <>
                <div className="mobile-user-avatar">{/* avatar placeholder */}</div>
                <div className="mobile-user-name">{user.nombre || user.name}</div>
              </>
            ) : (
              <div className="mobile-user-guest">Bienvenido</div>
            )}
          </div>
        </div>

        <ul className="menu-list">
          <li><button className="menu-link" onClick={() => go('/')}>Inicio</button></li>
          <li><button className="menu-link" onClick={() => go('/orders')}>Pedidos</button></li>
          <li><button className="menu-link" onClick={() => go('/profile')}>Mi perfil</button></li>
        </ul>

        {user && (
          <div className="mobile-menu-footer">
            <button className="logout-btn" onClick={handleLogout}>Cerrar sesión</button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default MobileMenu;
