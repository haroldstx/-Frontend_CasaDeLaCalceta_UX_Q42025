import React, { useMemo, useState } from "react";
import NavbarAdmin from "../components/NavbarAdmin/NavbarAdmin";
import ProductGrid from "../components/Layout/ProductGrid";
import PosProductCard from "../components/PosProductCard/PosProductCard";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import producto1 from "../assets/producto1.png";
import producto2 from "../assets/producto2.png";
import producto3 from "../assets/producto3.png";
import producto4 from "../assets/producto4.png";
import "./PosPage.css";

const MOCK_PRODUCTS = [
  { id: 1, nombre: "Pin Snoopy dorado", categoria: "Caricatura", precio: 95, stock: 30, imagen: producto1 },
  { id: 2, nombre: "Calcetines Star Wars", categoria: "Anime", precio: 100, stock: 30, imagen: producto2 },
  { id: 3, nombre: "Pin Santa Claus", categoria: "Temporada", precio: 95, stock: 0, imagen: producto4 },
  { id: 4, nombre: "Calcetines Snoopy", categoria: "Caricatura", precio: 150, stock: 30, imagen: producto3 },
];

export default function PosPage() {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]); // carrito
  const [tipoVenta, setTipoVenta] = useState("tienda"); // "tienda" o "online"
  const [metodoPago, setMetodoPago] = useState("efectivo"); // "efectivo" o "transferencia"

  // Filtrado de productos
  const products = useMemo(() => {
    const s = search.trim().toLowerCase();
    return MOCK_PRODUCTS.filter((p) => !s || p.nombre.toLowerCase().includes(s));
  }, [search]);

  // Agregar producto al carrito
  const handleAdd = (p) => {
    if (p.stock <= 0) {
        toast.warn('No se puede agregar un producto sin stock.');
      return;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.id === p.id);
      if (existing) {
        return prev.map((item) =>
          item.id === p.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prev, { ...p, cantidad: 1 }];
    });

    toast.success('Producto agregado a la venta');
  };

  const handleRemove = (id, nombre) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    toast.info(`${nombre} eliminado de la venta`);
  };

  const handleUpdateQuantity = (id, delta) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQuantity = item.cantidad + delta;
          if (newQuantity <= 0) return item;
          if (newQuantity > item.stock) {
            toast.warn('No hay suficiente stock');
            return item;
          }
          return { ...item, cantidad: newQuantity };
        }
        return item;
      })
    );
  };

  const handleClearCart = () => {
    if (cart.length === 0) {
      toast.info("El carrito ya está vacío");
      return;
    }
    setCart([]);
    toast.info("Carrito vaciado");
  };

  // Calcular total
  const subtotal = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const total = subtotal; // Aquí puedes agregar impuestos si es necesario
  const cantidadItems = cart.reduce((acc, item) => acc + item.cantidad, 0);

  // Cobrar venta
  const handlePay = () => {
    if (cart.length === 0) {
      toast.info("No hay productos en la venta");
      return;
    }
    toast.success("Venta cobrada con éxito");
    setCart([]); 
  };
  
  return (
    <div className="pos-layout">
      <NavbarAdmin />

      <div className="pos-main">
        <header className="pos-header">
          <h1 className="pos-title">Punto de Venta</h1>

          <div className="pos-search">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar productos"
            />
          </div>
        </header>

        <div className="pos-body">
          {/* IZQUIERDA - Productos */}
          <section className="pos-left">
            <h2 className="pos-section-title">Productos</h2>
            <div className="products-scroll-container">
              <ProductGrid columns={4}>
                {products.map((p) => (
                  <PosProductCard key={p.id} product={p} onAdd={handleAdd} />
                ))}
              </ProductGrid>
            </div>
          </section>

          {/* DERECHA - Carrito */}
          <aside className="pos-right">
            <div className="pos-panel">
              <div className="pos-panel-title">Venta actual</div>
              
              {/* Dropdown Tipo de Venta */}
              <div className="pos-field">
                <label className="pos-field-label">Tipo de venta</label>
                <select 
                  className="pos-select"
                  value={tipoVenta}
                  onChange={(e) => setTipoVenta(e.target.value)}
                >
                  <option value="tienda">Cliente en tienda</option>
                  <option value="online">Venta en línea</option>
                </select>
              </div>

              {/* Detalles de orden */}
              <div className="pos-section-header">
                <h3 className="pos-section-subtitle">Detalles de orden</h3>
                <span className="pos-items-count">{cantidadItems} items</span>
              </div>

              {cart.length === 0 ? (
                <div className="pos-panel-sub">Agrega productos para iniciar una venta.</div>
              ) : (
                <div className="pos-table-wrapper">
                  <table className="pos-table">
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item) => (
                        <tr key={item.id}>
                          <td className="pos-table-product">
                            <span>{item.nombre}</span>
                            <button
                              className="pos-table-remove"
                              onClick={() => handleRemove(item.id, item.nombre)}
                              title="Eliminar"
                            >
                              ✕
                            </button>
                          </td>
                          <td>L. {item.precio.toFixed(2)}</td>
                          <td>
                            <div className="pos-quantity-controls">
                              <button
                                className="pos-qty-btn"
                                onClick={() => handleUpdateQuantity(item.id, -1)}
                                disabled={item.cantidad <= 1}
                              >
                                -
                              </button>
                              <span className="pos-qty-value">{item.cantidad}</span>
                              <button
                                className="pos-qty-btn"
                                onClick={() => handleUpdateQuantity(item.id, 1)}
                                disabled={item.cantidad >= item.stock}
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="pos-table-subtotal">
                            L. {(item.precio * item.cantidad).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Totales */}
              {cart.length > 0 && (
                <>
                  <div className="pos-totals">
                    <div className="pos-total-row-small">
                      <span>Subtotal</span>
                      <span>L. {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="pos-total-row">
                      <span>Total</span>
                      <span>L. {total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Método de Pago */}
                  <div className="pos-payment-methods">
                    <label className="pos-field-label">Método de pago</label>
                    <div className="pos-payment-buttons">
                      <button
                        className={`pos-payment-btn ${metodoPago === 'efectivo' ? 'active' : ''}`}
                        onClick={() => setMetodoPago('efectivo')}
                      >
                        Efectivo
                      </button>
                      <button
                        className={`pos-payment-btn ${metodoPago === 'transferencia' ? 'active' : ''}`}
                        onClick={() => setMetodoPago('transferencia')}
                      >
                        Transferencia
                      </button>
                    </div>
                  </div>

                  {/* Botones de acción */}
                  <div className="pos-action-buttons">
                    <button className="pos-pay-btn" type="button" onClick={handlePay}>
                      Pagar
                    </button>
                    <button className="pos-clear-btn" type="button" onClick={handleClearCart}>
                      Eliminar
                    </button>
                  </div>
                </>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

