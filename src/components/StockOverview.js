// src/components/StockOverview.js
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import '../styles/StockOverview.css';

const data = [
  { name: 'Quantity in hand', value: 90, color: '#82ca9d' },    // Green for quantity in hand
  { name: 'Quantity to be received', value: 10, color: '#FF8042' } // Orange for quantity to be received
];

const StockOverview = () => {
  return (
    <section className="stock-overview">
      <h2>Total Stock Overview</h2>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <p>Total value of all stocks: $32,000</p>
    </section>
  );
};

export default StockOverview;
