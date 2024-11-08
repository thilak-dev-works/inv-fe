import React, { useState, useEffect } from 'react';
import { Button, InputAdornment, Stack, TextField, Popover, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import AdjustStockSidebar from './adjuststocksidebar';

const ProductTitle = ({ name, row }) => {
    return (
        <Stack
            direction="row"
            spacing={2}
            sx={{
                justifyContent: "start",
                alignItems: "center",
            }}
        >
            <img alt="thumbnail.jpg" className="x50" src={row.images[0]} />
            <span>{name}</span>
        </Stack>
    );
};

const QuantityStatusBadge = ({ status }) => (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '16px',
        border: `1px solid #f0c1a1`,
        backgroundColor: '#fef4e8',
        color: '#c44e3b',
        width: '86px',
        height: '24px',
        fontWeight: 'bold',
        lineHeight: '24px',
        marginTop: '10px'
    }}>
        {status}
    </div>
);

function LowStockProducts(props) {
    const [rowData, setRowData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortAnchorEl, setSortAnchorEl] = useState(null);
    const [selectedCategory] = useState('');
    const [isAdjustStockOpen, setAdjustStockOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [sortOption, setSortOption] = useState('A to Z');

    useEffect(() => {
        fetch("https://inv-be.vercel.app/v1/inventory/low-stock")
            .then(async (res) => {
                let data = await res.json();
                data.forEach((element) => {
                    element.images[0] = "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png";
                });
                setRowData(data);
            })
            .catch((err) => console.log(err));
    }, []);

    const fetchData = () => {
        fetch(`https://inv-be.vercel.app/v1/inventory/low-stock`)
            .then(res => res.json())
            .then(data => {
                data.forEach(element => {
                    element.images[0] = "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png";
                });
                setRowData(data);
            })
            .catch(err => console.log(err));
    };

    const sortData = (data, option) => {
        switch (option) {
            case 'A to Z':
                return [...data].sort((a, b) => a.name.localeCompare(b.name));
            case 'Z to A':
                return [...data].sort((a, b) => b.name.localeCompare(a.name));
            case 'Lowest Price':
                return [...data].sort((a, b) => a.price - b.price);
            case 'Highest Price':
                return [...data].sort((a, b) => b.price - a.price);
            default:
                return data;
        }
    };

    const handleSortClick = (event) => setSortAnchorEl(event.currentTarget);
    const handleSortClose = () => setSortAnchorEl(null);

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
        handleSortClose();
    };

    const handleAdjustStockClose = () => {
        setAdjustStockOpen(false);
        setSelectedProduct(null);
    };

    const handleAdjustStockOpen = (product) => {
        setSelectedProduct(product);
        setAdjustStockOpen(true);
    };

    const openSort = Boolean(sortAnchorEl);

    const filteredData = rowData.filter((row) =>
        row.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory ? row.category === selectedCategory : true)
    );

    const sortedData = sortData(filteredData, sortOption);

    const columns = [
        {
            field: 'name',
            headerName: 'Products',
            flex: 1,
            editable: true,
            renderCell: (params) => <ProductTitle name={params.value} row={params.row} />,
        },
        {
            field: 'monthlyTotalSold', 
            headerName: 'Sales this month',
            flex: 0.5,
            editable: true,
        },
        {
            field: 'sku',
            headerName: 'Quantity in hand',
            flex: 0.5,
            editable: true,
        },
        {
            field: 'Quantity Status',
            headerName: 'Price',
            flex: 0.4,
            editable: true,
            renderCell: () => <QuantityStatusBadge status="Low stock" />,
        },
        {
            field: 'action',
            headerName: 'Action',
            flex: 0.3,
            renderCell: (params) => (
                <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() =>  handleAdjustStockOpen(params.row)}
                    sx={{
                        minWidth: '80px',
                        textTransform: 'none',
                        fontSize: '0.875rem',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        borderColor: '#d1d5db',
                        color: '#374151',
                        "&:hover": {
                            backgroundColor: "#f3f4f6"
                        },
                    }}
                >
                    Restore
                </Button>
            ),
        }
    ];

    const handleSaveStockAdjustment = async (quantity, reason, currentStock) => {
        const apiUrl = `https://inv-be.vercel.app/v1/inventory/sku/${selectedProduct.sku}/update-stock`;
        try {
            const response = await fetch(apiUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    change: quantity,
                    updatedBy: "admin",
                    reason: reason
                })
            });
            await response.json();
            fetchData(); // Recall fetchData to get updated data after adjustment
        } catch (error) {
            console.error("Error updating stock:", error);
        }
    };

    return (
        <>
            <div>
                <Stack direction="row" spacing={2} sx={{ marginBottom: '10px', marginTop: '10px', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TextField
                        variant="outlined"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{
                            width: '100%',
                            maxWidth: '300px',
                            backgroundColor: 'white',
                        }}
                        size="small"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Stack direction="row" spacing={1}>
                        <Button
                            variant="outlined"
                            startIcon={<SortIcon />}
                            onClick={handleSortClick}
                            sx={{
                                borderColor: '#d1d5db',
                                color: '#374151',
                                textTransform: 'none',
                                borderRadius: '12px',
                                "&:hover": {
                                    backgroundColor: "#f3f4f6",
                                },
                            }}
                        >
                            Sort
                        </Button>
                        <Popover
                            open={openSort}
                            anchorEl={sortAnchorEl}
                            onClose={handleSortClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            sx={{ padding: '8px' }}
                        >
                            <RadioGroup
                                value={sortOption}
                                onChange={handleSortChange}
                                sx={{ padding: '8px', display: 'flex', flexDirection: 'column' }}
                            >
                                <FormControlLabel value="A to Z" control={<Radio />} label="A to Z" />
                                <FormControlLabel value="Z to A" control={<Radio />} label="Z to A" />
                                <FormControlLabel value="Lowest Price" control={<Radio />} label="Lowest Price" />
                                <FormControlLabel value="Highest Price" control={<Radio />} label="Highest Price" />
                            </RadioGroup>
                        </Popover>
                    </Stack>
                </Stack>
                <DataGrid
                    rows={sortedData}
                    columns={columns}
                    getRowId={(row) => row._id}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 15,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    pagination
                    rowHeight={50}
                />
            </div>
            <AdjustStockSidebar
                open={isAdjustStockOpen}
                onClose={handleAdjustStockClose}
                currentStock={selectedProduct?.stock || 0}
                onSave={handleSaveStockAdjustment}
            />
        </>
    );
}

export default LowStockProducts;