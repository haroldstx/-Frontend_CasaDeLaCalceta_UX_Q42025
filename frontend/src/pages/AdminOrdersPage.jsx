import React, { useState } from "react";
import NavbarAdmin from "../components/NavbarAdmin/NavbarAdmin";
import OrderModal from "../components/OrderModal/OrderModal";
import "./AdminOrdersPage.css";

const MOCK_ORDERS = [
  {
    id: "ORD-1765827921234",
    cliente: "loo",
    fecha: "15 dic 2025, 13:45",
    items: 1,
    total: 14.99,
    pago: "Efectivo",
    estado: "Pendiente",
    productos: [
      {
        nombre: "Calcetines Bosque Mágico",
        talla: "S",
        cantidad: 1,
        precio: 14.99,
        imagen: "https://via.placeholder.com/56",
      },
    ],
  },
];

export default function AdminOrdersPage() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="admin-layout">
      <NavbarAdmin />

      <main className="admin-content">
        <h1>Pedidos</h1>

        <div className="orders-table">
          {MOCK_ORDERS.map((o) => (
            <div className="order-row" key={o.id}>
              <div>
                <strong>{o.id}</strong> – {o.cliente}
                <div className="order-date">{o.fecha}</div>
              </div>

              <div className={`badge ${o.estado.toLowerCase()}`}>
                {o.estado}
              </div>

              <div className="order-total">${o.total}</div>

              <button
                className="btn-view"
                onClick={() => setSelected(o)}
              >
                Ver
              </button>
            </div>
          ))}
        </div>

        {selected && (
          <OrderModal order={selected} onClose={() => setSelected(null)} />
        )}
      </main>
    </div>
  );
}

