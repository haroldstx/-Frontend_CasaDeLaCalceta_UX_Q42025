import styles from "../Dashboard/Dashboard.module.css";
import React from "react";

// Importar componentes de Recharts
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Datos de ejemplo para la gráfica
const data = [
  { name: "Enero", Ventas: 4000 },
  { name: "Febrero", Ventas: 3000 },
  { name: "Marzo", Ventas: 5500 },
];

const StatChart = ({ title, description }) => {
  return (
    <div className={styles["chart-container"]}>
      <h4>{title}</h4>
      <p>{description}</p>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Ventas" fill="#FF8800" />{" "}
          {/* Usando el color naranja/accent */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatChart;
