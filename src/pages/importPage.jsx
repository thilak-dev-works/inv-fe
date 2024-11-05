import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    {
        field: 'productname',
        headerName: 'Product name',
        width: 450,
        editable: false,
        renderCell: (params) => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <input type="checkbox" style={{ marginRight: '8px' }} />
                {params.value}
            </div>
        ),
    },
    {
        field: 'category',
        headerName: 'Category',
        width: 150,
        editable: false,
    },
    {
        field: 'sku',
        headerName: 'SKU',
        width: 150,
        editable: false,
    },
    {
        field: 'quantity',
        headerName: 'Quantity',
        sortable: false,
        width: 100,
    },
    {
        field: 'price',
        headerName: 'Price ($)',
        sortable: false,
        width: 100,
    },
];

const rows = [
    { id: 1, productname: 'Pink Topaz Oval 8×6mm Matching Pair Approximately 2.40 Carat', category: 'Gemstones', sku: 'DPBIG52992', quantity: 26, price: 26 },
    { id: 2, productname: 'Peridot Trillion Buff Top Shape 6mm Matching Pair Approximately 1.98 Carat', category: 'Gemstones', sku: 'GSBIG53010', quantity: 16, price: 16 },
    { id: 3, productname: 'Green Diamond Round 2.8mm Matching Pair Approximately 0.19 carat', category: 'Gemstones', sku: 'FJBIG52961', quantity: 18, price: 18 },
    { id: 4, productname: 'Australian Opal Fancy Shape 12.27×6.67 Single Piece Approximately 1.89 Carat', category: 'Gemstones', sku: 'SMBIG52818', quantity: 26, price: 26 },
    { id: 5, productname: 'Australian Opal Fancy Shape 11.80×7.09mm Single Piece Approximately1.42 Carat', category: 'Gemstones', sku: 'SMBIG52817', quantity: 34, price: 34 },
    { id: 6, productname: 'Aquamarine Emerald Cut 8.5×7mm Single Piece Approximately 2.37 Carat', category: 'Gemstones', sku: 'MOBIG51885', quantity: 66, price: 66 },
    { id: 7, productname: 'Aquamarine Emerald Cushion 10.5×7mm Single Piece Approximately 2.97 Carat', category: 'Gemstones', sku: 'MOBIG51935', quantity: 88, price: 88 },
    { id: 8, productname: 'Australian Opal Fancy Shape 12.27×6.67 Single Piece Approximately 1.89 Carat', category: 'Gemstones', sku: 'SMBIG52818', quantity: 50, price: 50 },
    { id: 9, productname: 'Fire Opal Trillion Shape 8mm Matching Pair Approximately 2.33 Carat', category: 'Gemstones', sku: 'FJBIG52962', quantity: 22, price: 22 },
    { id: 10, productname: 'Nigerian Blue Sapphire Pear Shape 11×8mm Single piece Approximately 3.12 Carat', category: 'Gemstones', sku: 'SMBIG52818', quantity: 16, price: 16 },
    { id: 11, productname: 'Nigerian Blue Sapphire Pear Shape 11×8mm Single piece Approximately 3.12 Carat', category: 'Gemstones', sku: 'SMBIG52818', quantity: 46, price: 46 },
];

export default function ImportDataGrid() {
    return (
        <Box sx={{ height: '100%', width: '100%', top:"25px" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={2}
                rowsPerPageOptions={[5, 10, 20]}
                pagination
                disableRowSelectionOnClick
                sx={{
                    '& .MuiDataGrid-row:nth-of-type(odd)': {
                        backgroundColor: '#f5f5f5',
                    },
                    '& .MuiDataGrid-row:nth-of-type(even)': {
                        backgroundColor: '#ffffff',
                    },
                }}
            />
        </Box>
    );
}
