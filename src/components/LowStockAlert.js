// src/components/LowStockAlert.js
import React from 'react';
import '../styles/LowStockAlert.css';

const LowStockAlert = () => {
  return (
    <section className="low-stock-alert">
      <h2>Low Stock Alert</h2>
      <input type="text" placeholder="Search" />
    </section>
  );
};

export default LowStockAlert;
