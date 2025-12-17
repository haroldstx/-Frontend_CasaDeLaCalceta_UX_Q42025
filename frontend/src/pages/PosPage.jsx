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

  // Calcular total
  const total = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

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
              {cart.length === 0 ? (
                <div className="pos-panel-sub">Agrega productos para iniciar una venta.</div>
              ) : (
                <ul className="cart-list">
  {cart.map((item) => (
    <li key={item.id} className="cart-item">
      <div className="cart-item-left">
        <span className="cart-item-name">
          {item.nombre} x{item.cantidad}
        </span>
      </div>

      <div className="cart-item-right">
        <span className="cart-item-price">
          L. {(item.precio * item.cantidad).toFixed(2)}
        </span>

        <button
          className="cart-item-remove"
          onClick={() => handleRemove(item.id, item.nombre)}
                 title="Eliminar producto">
                         ✕
                     </button>
                 </div>
                 </li>
                ))}
            </ul>

              )}

              <div className="pos-total-row">
                <span>Total</span>
                <span>L. {total.toFixed(2)}</span>
              </div>

              <button className="pos-pay-btn" type="button" onClick={handlePay}>
                Cobrar
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

