import React, { useEffect, useState } from "react";
import NavbarCliente from "../components/NavbarCliente/NavbarCliente";
import OrderDetail from "../components/OrderDetail/OrderDetail";
import "./OrdersPage.css";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    // Mock (luego lo conectas a facturación / backend)
    setOrders([
      {
        orderId: "ORD-1765827921234",
        status: "Pendiente",
        date: "15 de diciembre de 2025, 13:45",
        total: 14.99,
        paymentMethod: "Efectivo",
        items: 1,
        products: [
          {
            nombre: "Calcetines Bosque Mágico",
            talla: "S",
            cantidad: 1,
            precio: 14.99,
          },
        ],
      },
      {
        orderId: "ORD-1765827921235",
        status: "Pendiente",
        date: "15 de diciembre de 2025, 13:45",
        total: 14.99,
        paymentMethod: "Efectivo",
        items: 1,
        products: [
          {
            nombre: "Calcetines Bosque Mágico",
            talla: "S",
            cantidad: 1,
            precio: 14.99,
          },
        ],
      },
    ]);
  }, []);

  return (
    <div className="orders-layout">
      {/* Sidebar */}
      <aside className="orders-sidebar">
        <NavbarCliente />
      </aside>

      {/* Content */}
      <main className="orders-content">
        <div className="orders-topbar">
          <h1 className="orders-title">Mis Pedidos</h1>
        </div>

        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.orderId} className="order-card">
              <div className="order-left">
                <div className="order-row-top">
                  <span className="order-id">#{order.orderId}</span>
                  <span
                    className={`badge ${
                      order.status === "Pendiente" ? "badge-pending" : "badge-ok"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="order-date">{order.date}</div>

                <div className="order-bottom">

                  <div className="order-pay">
                    Método de pago: <strong>{order.paymentMethod}</strong>
                  </div>
                </div>
              </div>

              <div className="order-right">
                <div className="order-money">
                  <div className="order-price">${order.total}</div>
                  <div className="order-items">{order.items} items</div>
                </div>

                <button
                  className="btn-details"
                  type="button"
                  onClick={() => setSelectedOrder(order)}
                >
                  <span className="btn-eye">👁</span>
                  Ver Detalles
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedOrder && (
          <OrderDetail order={selectedOrder} onClose={() => setSelectedOrder(null)} />
        )}
      </main>
    </div>
  );
};

export default OrdersPage;


