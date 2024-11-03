import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Button } from '@mui/material';

const productData = [
    { name: 'Pink Topaz Oval', category: 'Gemstones', sku: 'DPBIG52992', quantity: 26, price: 26 },
    { name: 'Peridot Trillion Buff Top', category: 'Gemstones', sku: 'GSBIG53010', quantity: 16, price: 16 },
    { name: 'Green Diamond Round', category: 'Gemstones', sku: 'FJBIG52961', quantity: 18, price: 18 },
    { name: 'Australian Opal Fancy Shape', category: 'Gemstones', sku: 'SMBIG52818', quantity: 26, price: 26 },
    { name: 'Aquamarine Emerald Cut', category: 'Gemstones', sku: 'MOBIG51885', quantity: 66, price: 66 },
  ];

const ImportPage = () => {
  const [rowData] = useState(productData);
  const [searchTerm] = useState('');
  const [selectedCategory] = useState('');

  const filteredData = rowData.filter((row) =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory ? row.category === selectedCategory : true)
  );

  return (
    <div style={{ flex: 1, padding: '20px', backgroundColor: '#f9fafb' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2>Import</h2>
        <div>
          <Button variant="outlined" color="primary" style={{ marginRight: '10px' }}>
            Cancel
          </Button>
          <Button variant="contained" color="primary">
            Save & Continue
          </Button>
        </div>
      </div>

      <TableContainer className="product-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell>Product name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price ($)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((product, index) => (
              <TableRow key={index}>
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ImportPage;
