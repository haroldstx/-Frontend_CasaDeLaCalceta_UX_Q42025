import React, { useMemo, useState } from "react";
import NavbarAdmin from "../components/NavbarAdmin/NavbarAdmin";
import ProductGrid from "../components/Layout/ProductGrid"; // ajusta si tu ruta es distinta
import PosProductCard from "../components/PosProductCard/PosProductCard";

import BAC from "../assets/BAC.png";
import "./PosPage.css";

const MOCK_PRODUCTS = [
  { id: 1, nombre: "Pin Snoopy dorado", categoria: "Caricatura", precio: 95, stock: 30, imagen: BAC },
  { id: 2, nombre: "Calcetines Star Wars", categoria: "Anime", precio: 100, stock: 30, imagen: BAC },
  { id: 3, nombre: "Pin Santa Claus", categoria: "Temporada", precio: 95, stock: 0, imagen: BAC },
  { id: 4, nombre: "Calcetines Snoopy", categoria: "Caricatura", precio: 150, stock: 30, imagen: BAC },
];

export default function PosPage() {
  const [search, setSearch] = useState("");

  const products = useMemo(() => {
    const s = search.trim().toLowerCase();
    return MOCK_PRODUCTS.filter((p) => !s || p.nombre.toLowerCase().includes(s));
  }, [search]);

  const handleAdd = (p) => {
    // demo
    alert(`Agregado: ${p?.nombre ?? "Producto"}`);
  };

  return (
    <div className="pos-layout">
      <aside className="pos-sidebar">
        <NavbarAdmin />
      </aside>

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
          <section className="pos-left">
            <h2 className="pos-section-title">Productos</h2>

            <ProductGrid columns={4}>
              {products.filter(Boolean).map((p) => (
                <PosProductCard key={p.id} product={p} onAdd={handleAdd} />
              ))}
            </ProductGrid>
          </section>

          <aside className="pos-right">
            <div className="pos-panel">
              <div className="pos-panel-title">Venta actual</div>
              <div className="pos-panel-sub">Agrega productos para iniciar una venta.</div>

              <div className="pos-total-row">
                <span>Total</span>
                <span>L. 0.00</span>
              </div>

              <button className="pos-pay-btn" type="button">
                Cobrar
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
