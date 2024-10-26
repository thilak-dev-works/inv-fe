// src/components/ProductTable.js
import React from 'react';
import '../styles/ProductTable.css';

const ProductTable = () => {
  return (
    <section className="product-table">
      <table>
        <thead>
          <tr>
            <th>Products</th>
            <th>Sales this month</th>
            <th>Quantity in hand</th>
            <th>Quantity Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Pink Topaz Oval</td>
            <td>36</td>
            <td>12</td>
            <td><span className="low-stock">Low stock</span></td>
            <td><button>Restock</button></td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </section>
  );
};

export default ProductTable;
