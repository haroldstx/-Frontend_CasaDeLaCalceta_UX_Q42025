import React, { useMemo } from "react";
import NavbarAdmin from "../components/NavbarAdmin/NavbarAdmin";
import * as XLSX from "xlsx";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import "./ReportsPage.css";

const salesData = [
  { day: "Mie", value: 800 },
  { day: "Jue", value: 0 },
  { day: "Vie", value: 4000 },
  { day: "Sáb", value: 5000 },
  { day: "Dom", value: 0 },
  { day: "Lun", value: 500 },
  { day: "Mar", value: 15000 },
];

const paymentData = [
  { name: "Efectivo", value: 1350 },
  { name: "Transferencia", value: 650 },
];

const COLORS = ["#B41112", "#FDD929"];

const MONTHS = [
  { value: "1", label: "Enero" },
  { value: "2", label: "Febrero" },
  { value: "3", label: "Marzo" },
  { value: "4", label: "Abril" },
  { value: "5", label: "Mayo" },
  { value: "6", label: "Junio" },
  { value: "7", label: "Julio" },
  { value: "8", label: "Agosto" },
  { value: "9", label: "Septiembre" },
  { value: "10", label: "Octubre" },
  { value: "11", label: "Noviembre" },
  { value: "12", label: "Diciembre" },
];

export default function ReportsPage() {
  const years = useMemo(() => {
    const current = new Date().getFullYear();
    return Array.from({ length: 7 }, (_, i) => String(current - i));
  }, []);

  const handleExportExcel = () => {
    const wsResumen = XLSX.utils.json_to_sheet([
      { KPI: "Ingresos Totales", Valor: 5000 },
      { KPI: "Ganancias Totales", Valor: 2000 },
      { KPI: "Total Pedidos", Valor: 200 },
    ]);

    const wsVentas = XLSX.utils.json_to_sheet(
      salesData.map((r) => ({ Día: r.day, Ventas: r.value }))
    );

    const wsMetodos = XLSX.utils.json_to_sheet(
      paymentData.map((r) => ({ Método: r.name, Total: r.value }))
    );

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, wsResumen, "Resumen");
    XLSX.utils.book_append_sheet(wb, wsVentas, "Ventas");
    XLSX.utils.book_append_sheet(wb, wsMetodos, "Métodos de pago");

    XLSX.writeFile(wb, "reporte.xlsx");
  };

  return (
    <div className="reports-layout">
      <aside className="reports-sidebar">
        <NavbarAdmin />
      </aside>

      <main className="reports-main">
        <header className="reports-topbar">
          <h1 className="reports-topbar-title">Reportes</h1>
          <div className="reports-topbar-line" />
        </header>

        <div className="reports-page">
          {/* KPIs */}
          <div className="kpi-row">
            <div className="kpi-card">
              <div className="kpi-label">Ingresos Totales</div>
              <div className="kpi-value">L. 5,000</div>
            </div>

            <div className="kpi-card">
              <div className="kpi-label">Ganancias Totales</div>
              <div className="kpi-value">L. 2,000</div>
            </div>

            <div className="kpi-card">
              <div className="kpi-label">Total Pedidos</div>
              <div className="kpi-value">200</div>
            </div>
          </div>

          {/* Filtros */}
          <div className="filters-row">
            <span className="filters-label">Ventas:</span>

            <select className="filters-select" defaultValue="7d">
              <option value="7d">Últimos 7 días</option>
              <option value="30d">Últimos 30 días</option>
            </select>

            <select className="filters-select" defaultValue="">
              <option value="" disabled>Mes</option>
              {MONTHS.map((m) => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>

            <select className="filters-select" defaultValue="">
              <option value="" disabled>Año</option>
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>

            <button className="export-btn" type="button" onClick={handleExportExcel}>
              Exportar a Excel <span className="export-icon">⬇</span>
            </button>
          </div>

          {/* Gráfica de ventas */}
          <div className="chart-card">
            <div className="chart-responsive">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" stroke="#565656ff" strokeWidth={1} fill="#FDD929" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gráfica métodos de pago */}
          <div className="chart-card center">
            <h3 className="chart-title">Ventas por Método de Pago</h3>

            <div className="pie-wrap">
              <PieChart width={320} height={320}>
                <Pie data={paymentData} dataKey="value" outerRadius={110} label>
                  {paymentData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
