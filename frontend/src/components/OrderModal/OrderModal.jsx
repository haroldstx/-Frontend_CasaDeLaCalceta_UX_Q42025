import React from "react";
import "./OrderModal.css";

export default function OrderModal({ order, onClose }) {
  if (!order) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>

        <button className="modal-close" onClick={onClose}>×</button>

        <h2>Detalles del Pedido</h2>

        <p><strong>ID:</strong> {order.id}</p>
        <p><strong>Cliente:</strong> {order.cliente}</p>
        <p><strong>Fecha:</strong> {order.fecha}</p>
        <p><strong>Total:</strong> ${order.total}</p>
        <p><strong>Pago:</strong> {order.pago}</p>

        <h3>Productos</h3>

        {order.productos.map((p, i) => (
          <div key={i} className="modal-product">
            <img src={p.imagen} alt={p.nombre} />

            <div>
              <strong>{p.nombre}</strong>
              <div>Talla: {p.talla}</div>
              <div>Cantidad: {p.cantidad}</div>
              <div className="p-price">${p.precio}</div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
