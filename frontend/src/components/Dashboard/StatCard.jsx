// src/components/StatCard.jsx (MODIFICADO)
import styles from "../Dashboard/Dashboard.module.css";
import React from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const StatCard = ({ title, value, trend, trendType, color, chartData }) => {
  const trendClass = trendType === "negative" ? "negative" : "positive";
  const arrowIcon = trendType === "negative" ? "⬇️" : "⬆️";

  // Determinar el color de la línea basado en la tendencia
  const lineColor =
    trendType === "positive" ? "var(--color-success)" : "var(--color-primary)";

  return (
    <div
      className={styles["stat-card"]}
      style={{ "--card-border-color": color }}
    >
      <h4>{title}</h4>

      {/* Contenedor principal de la métrica y la gráfica */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Valor y Tendencia */}
        <div>
          <div className={styles.value}>{value}</div>
          <div className={`${styles.trend} ${styles[trendClass]}`}>
            {arrowIcon} {trend} vs. mes anterior
          </div>
        </div>

        {/* Mini-gráfica (Sparkline) */}
        {chartData && (
          <div style={{ width: "50%", height: "60px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
              >
                <Line
                  type="monotone"
                  dataKey="uv" // 'uv' es el valor de la métrica en el tiempo
                  stroke={lineColor}
                  strokeWidth={2}
                  dot={false} // No mostrar los puntos de datos
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
