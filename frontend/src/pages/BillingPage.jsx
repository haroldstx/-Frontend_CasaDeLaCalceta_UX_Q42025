import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import "./BillingPage.css";


const formatLempiras = (value) => {
  const n = Number(value) || 0;
  return `L.${n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
};

export default function BillingPage() {
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const price = item.precio ?? item.price ?? 0;
      return sum + (Number(price) || 0) * (item.quantity || 1);
    }, 0);
  }, [cartItems]);

  const isv = Math.round(subtotal * 0.15);
  const total = subtotal + isv;

  return (
    <div className="bill-page">
      <header className="bill-header">
        <button className="bill-back" onClick={() => navigate(-1)} aria-label="Volver">
          ←
        </button>
        <h1>Detalles de Facturación</h1>
      </header>

      <main className="bill-content">
        <h2 className="bill-title">Tu Pedido</h2>
        <div className="bill-section-label">Productos:</div>

        <div className="bill-items">
          {cartItems.map((item) => {
            const qty = item.quantity || 1;
            const price = Number(item.precio ?? item.price ?? 0) || 0;
            const lineTotal = price * qty;

            return (
              <div key={item.id} className="bill-item">
                <div className="bill-item-left">
                  <div className="bill-item-name">{item.nombre ?? item.name ?? "Producto"}</div>
                  <div className="bill-item-price">Precio: {formatLempiras(price)}</div>
                </div>

                <div className="bill-item-right">
                  <div className="bill-item-qty">Cantidad: {qty}</div>
                  <div className="bill-item-total">Total: {formatLempiras(lineTotal)}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bill-summary">
          <div className="bill-row">
            <span>Subtotal</span>
            <span>{formatLempiras(subtotal)}</span>
          </div>
          <div className="bill-row">
            <span>ISV 15%</span>
            <span>{formatLempiras(isv)}</span>
          </div>
          <div className="bill-row bill-row-total">
            <span>Total</span>
            <span>{formatLempiras(total)}</span>
          </div>
        </div>

        <button className="bill-pay" onClick={() => navigate("/payment")}>
            Proceder a pagar
        </button>
      </main>
    </div>
  );
}
