// src/components/InventoryOverview.js
import React from 'react';
import '../styles/InventoryOverview.css';

const InventoryOverview = () => {
  return (
    <section className="inventory-overview">
      <h2>Inventory Overview</h2>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Quantity in hand</th>
            <th>Quantity to be received</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Gemstones</td>
            <td>36</td>
            <td>12</td>
          </tr>
          <tr>
            <td>Jewelry</td>
            <td>26</td>
            <td>18</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </section>
  );
};

export default InventoryOverview;
