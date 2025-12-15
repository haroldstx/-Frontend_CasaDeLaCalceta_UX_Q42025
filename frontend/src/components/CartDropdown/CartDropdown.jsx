import React from 'react';
import { toast } from 'react-toastify';
import { useCart } from '../../contexts/CartContext';
import './CartDropdown.css';
import { useNavigate } from "react-router-dom";


const CartDropdown = ({ onClose }) => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();



  const formatPrice = (value) => {
    const n = Number(value) || 0;
    // Formato simple con punto como separador de miles y sin decimales
    return `L.${n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.precio ?? item.price ?? 0;
    return sum + (Number(price) || 0) * (item.quantity || 1);
  }, 0);

  return (
    <div className="cart-dropdown" role="dialog" aria-label="Carrito de Compras">
      <div className="cart-dropdown-header">
        <h3>Carrito</h3>
      </div>

      <div className="cart-dropdown-body">
        <h4 className="cart-section-title">Productos:</h4>

        {cartItems.length === 0 ? (
          <div className="empty-cart">carrito vacio</div>
        ) : (
          <ul className="cart-items-list">
            {cartItems.map(item => (
              <li key={item.id} className="cart-item">
                <div className="cart-item-left">
                  <div className="cart-item-name">{item.nombre ?? item.name ?? 'Producto'}</div>
                  <div className="cart-item-price">{formatPrice(item.precio ?? item.price ?? 0)}</div>
                </div>

                <div className="cart-item-right">
                  <div style={{display: 'flex', gap: 8, alignItems: 'center'}}>
                    <div className="qty-controls">
                      <button aria-label="Disminuir" onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}>-</button>
                      <span className="qty">{item.quantity ?? 1}</span>
                      <button aria-label="Aumentar" onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}>+</button>
                    </div>

                    <button className="remove-item" onClick={() => removeFromCart(item.id)} aria-label="Eliminar">×</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="cart-dropdown-footer">
        <div className="subtotal-row">
          <div className="subtotal-label">Subtotal</div>
          <div className="subtotal-value">{formatPrice(subtotal)}</div>
        </div>

        <div className="footer-actions">
          <button className="clear-cart" onClick={() => {
            clearCart();
            toast.info('Carrito vaciado', { autoClose: 2000 });
          }}>Vaciar</button>
          <button className="checkout-btn" onClick={() => navigate("/facturacion", { state: { asOverlay: true } })}>
            Finalizar compra
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartDropdown;
