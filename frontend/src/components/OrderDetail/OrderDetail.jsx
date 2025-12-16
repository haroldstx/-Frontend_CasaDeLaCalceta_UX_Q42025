import React, { useEffect } from "react";
import "./OrderDetail.css";

const OrderDetail = ({ order, onClose }) => {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = prev);
  }, []);

  if (!order) return null;

  const statusClass =
    (order.status || order.estado || "").toLowerCase() === "pendiente"
      ? "od-badge-pending"
      : "od-badge-ok";

  return (
    <div className="od-overlay" onClick={onClose}>
      <div className="od-modal" onClick={(e) => e.stopPropagation()}>
        <button className="od-close" onClick={onClose} aria-label="Cerrar">
          ×
        </button>

        <h2 className="od-title">Detalles del Pedido</h2>

        <div className="od-box">
          <div className="od-grid">
            <div>
              <span className="od-label">ID de Orden</span>
              <strong className="od-strong">{order.orderId || order.id}</strong>
            </div>

            <div>
              <span className="od-label">Estado</span>
              <span className={`od-badge ${statusClass}`}>
                {order.status || order.estado}
              </span>
            </div>

            <div>
              <span className="od-label">Fecha</span>
              <strong className="od-strong">{order.date || order.fecha}</strong>
            </div>

            <div>
              <span className="od-label">Total</span>
              <strong className="od-total">
                ${order.total}
              </strong>
            </div>
          </div>
        </div>

        <div className="od-paybox">
          <span className="od-label">Método de Pago</span>
          <strong className="od-strong">
            {order.paymentMethod || order.metodoPago}
          </strong>
        </div>

        <h3 className="od-subtitle">Productos</h3>

        <div className="od-products">
          {(order.products || order.productos || []).map((p, i) => (
            <div key={i} className="od-product">
              <img src={p.imagen} alt={p.nombre} />
              <div className="od-pinfo">
                <div className="od-pname">{p.nombre}</div>
                <div className="od-pmeta">
                  <span>Talla: {p.talla}</span>
                  <span>Cantidad: {p.cantidad}</span>
                </div>
                <div className="od-pprice">${p.precio}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;

