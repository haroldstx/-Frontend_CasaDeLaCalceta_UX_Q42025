import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import "./PaymentPage.css";

import BACIcon from "../assets/BAC.png";
import FICOHSA from "../assets/ficohsaa.png";

const formatLempiras = (value) => {
  const n = Number(value) || 0;
  return `L.${n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
};

export default function PaymentPage() {
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const [metodo, setMetodo] = useState("transferencia"); // transferencia | tienda
  const [comprobante, setComprobante] = useState(null);

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const price = item.precio ?? item.price ?? 0;
      return sum + (Number(price) || 0) * (item.quantity || 1);
    }, 0);
  }, [cartItems]);

  const isv = Math.round(subtotal * 0.15);
  const total = subtotal + isv;

  return (
    <div className="pay-page">
      <header className="pay-header">
        <button className="pay-back" onClick={() => navigate(-1)} aria-label="Volver">
          ←
        </button>
        <h1>Carrito</h1>
      </header>

      <main className="pay-content">
        {/* IZQUIERDA */}
        <section className="pay-left">
          <h2 className="pay-title">Pago</h2>

            <div className="pay-label">Método de pago:</div>

            <div className="pay-radio-group">
              <label className="pay-radio">
            <input
          type="radio"
      name="metodo"
      checked={metodo === "transferencia"}
      onChange={() => setMetodo("transferencia")}
    />
    <span>Transferencia</span>
  </label>

        <label className="pay-radio">
    <input
      type="radio"
      name="metodo"
      checked={metodo === "tienda"}
      onChange={() => setMetodo("tienda")}
    />
    <span>En tienda</span>
  </label>
</div>

          {metodo === "transferencia" && (
            <>
              <div className="bank-card">
                <img className="bank-logo" src={BACIcon} alt="BAC" />
                <div className="bank-info">
                  <div className="bank-title">748567720</div>
                  <div className="bank-sub">Julia Martinez Sandoval</div>
                </div>
              </div>

              <div className="bank-card">
                <img className="bank-logo" src={FICOHSA} alt="Ficohsa" />
                <div className="bank-info">
                  <div className="bank-title">22655786201</div>
                  <div className="bank-sub">Julia Martinez Sandoval</div>
                </div>
              </div>

              <div className="pay-upload">
                <div className="upload-text">Subir imagen de transferencia en el siguiente apartado.</div>

                <input
                  id="comprobante"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/gif"
                  className="upload-input"
                  onChange={(e) => setComprobante(e.target.files?.[0] || null)}
                />

                <label className="upload-btn" htmlFor="comprobante">
                  Upload
                </label>

                <div className="upload-help">
                  {comprobante ? `Archivo: ${comprobante.name}` : "Solamente se aceptan archivos en formato .png, .jpeg, .jpg, .gif."}
                </div>
              </div>             
            </> 
          )}
          <button type="button" className="pay-btn" disabled={metodo === "transferencia" && !comprobante}
                    onClick={() => alert("Pedido realizado con éxito!")}>
                      Realizar pedido
                </button>
        </section>

        {/* DERECHA */}
        <aside className="pay-right">
          <h3 className="sum-title">Order Summary</h3>

          <div className="sum-block">
            <div className="sum-label">Productos:</div>

            {cartItems.map((item) => {
              const qty = item.quantity || 1;
              const price = Number(item.precio ?? item.price ?? 0) || 0;
              const lineTotal = price * qty;

              return (
                <div key={item.id} className="sum-item">
                  <div className="sum-item-left">
                    <div className="sum-item-name">{item.nombre ?? item.name ?? "Producto"}</div>
                    <div className="sum-item-price">Precio: {formatLempiras(price)}</div>
                  </div>

                  <div className="sum-item-right">
                    <div className="sum-item-qty">Cantidad: {qty}</div>
                    <div className="sum-item-total">Total: {formatLempiras(lineTotal)}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="sum-totals">
            <div className="sum-row">
              <span>Subtotal</span>
              <span>{formatLempiras(subtotal)}</span>
            </div>
            <div className="sum-row">
              <span>ISV 15%</span>
              <span>{formatLempiras(isv)}</span>
            </div>
            <div className="sum-row sum-row-strong">
              <span>Total</span>
              <span>{formatLempiras(total)}</span>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
