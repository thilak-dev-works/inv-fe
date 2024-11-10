import React from 'react';
import DataGridTable from '../components/datagridTable';
import { Button } from '@mui/material';

const columns = [
    { field: 'name', headerName: 'Products', flex: 0.7 },
    { field: 'reason', headerName: 'Reason', flex: 0.4 },
    { field: 'stock', headerName: 'Stock', flex: 0.2 },
    { field: 'change', headerName: 'Adjusted', flex: 0.2 },
    { field: 'date', headerName: 'Adjusted On', flex: 0.4 },
    { field: 'updatedBy', headerName: 'Adjusted By', flex: 0.4 },
    { field: 'status', headerName: 'Status', flex: 0.3 },
    {
        field: 'action',
        headerName: 'Action',
        flex: 0.5,
        renderCell: (params) => (
            <Button variant="outlined" color="primary" size="small">
                Adjust Stock
            </Button>
        ),
    }
];

const rowData = [
    { _id: 1, name: 'Product A', reason: 'New Stock', stock: 50, change: 5, date: '2024-01-01', updatedBy: 'admin', status: true, images: ['https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png'] },
    { _id: 2, name: 'Product B', reason: 'Restocked', stock: 30, change: -10, date: '2024-02-15', updatedBy: 'admin', status: false, images: ['https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png'] },
    { _id: 3, name: 'Product C', reason: 'Damaged', stock: 25, change: -5, date: '2024-03-20', updatedBy: 'admin', status: true, images: ['https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png'] },
    { _id: 4, name: 'Product D', reason: 'New Arrival', stock: 60, change: 10, date: '2024-04-10', updatedBy: 'admin', status: true, images: ['https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png'] },
    { _id: 5, name: 'Product E', reason: 'Returned', stock: 15, change: -3, date: '2024-05-12', updatedBy: 'user', status: false, images: ['https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png'] },
    { _id: 6, name: 'Product F', reason: 'Restocked', stock: 45, change: 5, date: '2024-06-14', updatedBy: 'admin', status: true, images: ['https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png'] },
    { _id: 7, name: 'Product G', reason: 'Damaged', stock: 20, change: -10, date: '2024-07-21', updatedBy: 'user', status: false, images: ['https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png'] },
    { _id: 8, name: 'Product H', reason: 'Sold', stock: 35, change: -5, date: '2024-08-05', updatedBy: 'admin', status: true, images: ['https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png'] },
    { _id: 9, name: 'Product I', reason: 'New Stock', stock: 70, change: 15, date: '2024-09-10', updatedBy: 'admin', status: true, images: ['https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png'] },
    { _id: 10, name: 'Product J', reason: 'Returned', stock: 28, change: -7, date: '2024-10-18', updatedBy: 'user', status: false, images: ['https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png'] },
    { _id: 11, name: 'Product K', reason: 'Sold', stock: 40, change: -8, date: '2024-11-10', updatedBy: 'admin', status: true, images: ['https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png'] },
    { _id: 12, name: 'Product L', reason: 'Damaged', stock: 18, change: -2, date: '2024-01-15', updatedBy: 'user', status: false, images: ['https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png'] },
    { _id: 13, name: 'Product M', reason: 'Restocked', stock: 50, change: 5, date: '2024-02-20', updatedBy: 'admin', status: true, images: ['https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png'] },
    { _id: 14, name: 'Product N', reason: 'New Stock', stock: 65, change: 8, date: '2024-03-25', updatedBy: 'user', status: true, images: ['https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png'] },
    { _id: 15, name: 'Product O', reason: 'Sold', stock: 22, change: -3, date: '2024-04-30', updatedBy: 'admin', status: true, images: ['https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png'] },
    { _id: 16, name: 'Product P', reason: 'Restocked', stock: 33, change: 7, date: '2024-05-12', updatedBy: 'user', status: true, images: ['https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png'] },
    { _id: 17, name: 'Product Q', reason: 'Damaged', stock: 40, change: -6, date: '2024-06-23', updatedBy: 'admin', status: false, images: ['https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png'] },
    { _id: 18, name: 'Product R', reason: 'Returned', stock: 20, change: -4, date: '2024-07-02', updatedBy: 'user', status: false, images: ['https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png'] },
    { _id: 19, name: 'Product S', reason: 'Restocked', stock: 55, change: 10, date: '2024-08-14', updatedBy: 'admin', status: true, images: ['https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png'] },
    { _id: 20, name: 'Product T', reason: 'New Arrival', stock: 48, change: 5, date: '2024-09-09', updatedBy: 'user', status: true, images: ['https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png'] },
    { _id: 21, name: 'Product U', reason: 'Restocked', stock: 60, change: 6, date: '2024-10-22', updatedBy: 'admin', status: true, images: ['https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png'] },
    { _id: 22, name: 'Product V', reason: 'Sold', stock: 25, change: -7, date: '2024-11-30', updatedBy: 'user', status: false, images: ['https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png'] },
    { _id: 23, name: 'Product W', reason: 'New Stock', stock: 70, change: 9, date: '2024-12-08', updatedBy: 'admin', status: true, images: ['https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png'] },
    { _id: 24, name: 'Product X', reason: 'Returned', stock: 45, change: -4, date: '2024-01-05', updatedBy: 'user', status: false, images: ['https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png'] },
    { _id: 25, name: 'Product Y', reason: 'Damaged', stock: 10, change: -2, date: '2024-02-17', updatedBy: 'admin', status: false, images: ['https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png'] },
    { _id: 26, name: 'Product Z', reason: 'Damaged', stock: 10, change: -2, date: '2024-02-17', updatedBy: 'admin', status: false, images: ['https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png'] },
];

function Reports() {
    return <DataGridTable columns={columns} rowData={rowData} />;
}

export default Reports;
