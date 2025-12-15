import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import CartDropdown from '../CartDropdown/CartDropdown';
import CartIconSvg from '../Icons/CartIcon';
import './CartIcon.css';

const CartIconButton = () => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen(v => !v);
  const close = () => setOpen(false);

  return (
    <div className="cart-icon-container">
      <button 
        className="cart-button"
        onClick={toggleOpen}
        aria-expanded={open}
        aria-label={`Carrito de compras con ${totalItems} producto${totalItems !== 1 ? 's' : ''}`}
        title={`Carrito: ${totalItems} producto${totalItems !== 1 ? 's' : ''}`}
      >
        <CartIconSvg width={24} height={24} className="cart-svg" />

        {/* Badge con el contador */}
        {totalItems > 0 && (
          <span className="cart-badge">
            {totalItems > 99 ? '99+' : totalItems}
          </span>
        )}
      </button>

      {/* Overlay para cerrar al hacer click fuera (se muestra sólo si open) */}
      {open && (
        <>
          <div className="cart-overlay" onClick={close} />
          <div className="cart-dropdown-wrapper">
            <CartDropdown onClose={close} />
          </div>
        </>
      )}
    </div>
  );
};

export default CartIconButton;
