import styles from "../components/Dashboard/Dashboard.module.css";
import Header from "../components/headerComponents/Header.jsx";
import StatCard from "../components/Dashboard/StatCard.jsx";
import StatChart from "../components/Dashboard/StatChart.jsx";
import Sidebar from "../components/NavbarAdmin/NavbarAdmin.jsx";
import { useState } from "react";
const DashboardPage = () => {
  // --- DATOS SIMULADOS PARA LAS GRÁFICAS SPARKLINE ---
  const salesChartData = [
    { name: "S1", uv: 500 },
    { name: "S2", uv: 520 },
    { name: "S3", uv: 680 },
    { name: "S4", uv: 750 },
  ]; // Muestra una tendencia positiva

  const stockChartData = [
    { name: "S1", uv: 120 },
    { name: "S2", uv: 100 },
    { name: "S3", uv: 90 },
    { name: "S4", uv: 85 },
  ]; // Muestra una tendencia negativa (inventario decreciente)

  const productChartData = [
    { name: "S1", uv: 150 },
    { name: "S2", uv: 165 },
    { name: "S3", uv: 180 },
    { name: "S4", uv: 210 },
  ]; // Muestra una tendencia positiva

  // Datos simulados existentes
  const dashboardData = {
    totalSales: "$15,850",
    salesTrend: "2.5% más",
    stockAlerts: "12 SKU's",
    stockTrend: "5% menos",
    topProduct: "Calceta Deportiva Roja",
    productTrend: "15% más",
  };

  const [collapsed, setCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div className={styles["dashboard-layout"]}>
      <div
        className={`${styles["sidebar-section"]} ${
          collapsed ? styles.collapsed : ""
        }`}
      >
        <Sidebar onToggle={handleToggleSidebar} />
      </div>

      <div
        className={`${styles["main-content"]} ${
          collapsed ? styles.collapsed : ""
        }`}
      >
        <Header title="Dashboard" />
        <div className={styles["dashboard-body"]}>
          <h2 className={styles["dashboard-title"]}>
            Resumen Ejecutivo de Ventas
          </h2>

          <section className={styles["stats-grid"]}>
            <StatCard
              title="Ventas Totales (Mes)"
              value={dashboardData.totalSales}
              trend={dashboardData.salesTrend}
              trendType="positive"
              color="var(--color-success)"
              chartData={salesChartData} // <- PASAMOS LOS DATOS DE LA GRÁFICA
            />
            <StatCard
              title="Alertas de Inventario"
              value={dashboardData.stockAlerts}
              trend={dashboardData.stockTrend}
              trendType="negative"
              color="var(--color-warning)"
              chartData={stockChartData} // <- PASAMOS LOS DATOS DE LA GRÁFICA
            />
            <StatCard
              title="Producto Más Vendido"
              value={dashboardData.topProduct}
              trend={dashboardData.productTrend}
              trendType="positive"
              color="var(--color-secondary)"
              chartData={productChartData} // <- PASAMOS LOS DATOS DE LA GRÁFICA
            />
          </section>

          {/* 4. Sección de Gráficas y Reportes */}
          <section className={styles["reports-section"]}>
            <StatChart
              title="Ventas por Categoría (Trimestral)"
              description="Muestra el rendimiento de las categorías (Deportivas, Casuales, Ejecutivas)."
            />
            <StatChart
              title="Rendimiento por Canal de Venta"
              description="Compara las ventas entre Tienda Física y E-commerce."
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
