import React from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function ProductCharts({ products }) {
  const colorData = products.reduce((acc, product) => {
    const color = product.data?.color || "N/A";
    acc[color] = (acc[color] || 0) + 1;
    return acc;
  }, {});

  const capacityData = products.reduce((acc, product) => {
    const capacity = product.data?.capacity || "N/A";
    acc[capacity] = (acc[capacity] || 0) + 1;
    return acc;
  }, {});

  const colorChartData = Object.keys(colorData).map((color) => ({
    name: color,
    value: colorData[color],
  }));

  const capacityChartData = Object.keys(capacityData).map((capacity) => ({
    name: capacity,
    value: capacityData[capacity],
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <ResponsiveContainer width="45%" height={300}>
        <BarChart data={colorChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" />
          <Bar dataKey="value" fill="#8884d8">
            {colorChartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="45%" height={300}>
        <PieChart>
          <Pie
            data={capacityChartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {capacityChartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="top" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ProductCharts;
