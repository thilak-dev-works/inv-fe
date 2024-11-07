import React, { useState, useEffect } from 'react';
import { Button, InputAdornment, Stack, TextField, Popover, RadioGroup, FormControlLabel, Radio, Divider } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import { styled } from '@mui/system';
import AdjustStockSidebar from './adjuststocksidebar';

const ProductTitle = ({ name, row }) => (
    <Stack direction="row" spacing={2} sx={{ justifyContent: "start", alignItems: "center" }}>
        <img alt="thumbnail.jpg" className="x50" src={row.images[0]} />
        <span>{name}</span>
    </Stack>
);

const QuantityBadge = styled('div')(({ lowStock }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '16px',
    border: `1px solid ${lowStock ? '#f0c1a1' : '#a5d6a7'}`,
    backgroundColor: lowStock ? '#fef4e8' : '#e8f5e9',
    color: lowStock ? '#c44e3b' : '#388e3c',
    width: '36px',
    height: '24px',
    fontWeight: 'bold',
    lineHeight: '24px',
}));

const renderQuantity = (params) => {
    const lowStock = params.value < 1;
    return (
        <div style={{ display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'flex-start' }}>
            <QuantityBadge lowStock={lowStock}>{params.value}</QuantityBadge>
        </div>
    );
};

const StatusBadge = styled('div')(({ inactive }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '16px',
    border: `1px solid ${inactive ? '#f0c1a1' : '#a5d6a7'}`,
    backgroundColor: inactive ? '#fef4e8' : '#e8f5e9',
    color: inactive ? '#c44e3b' : '#388e3c',
    padding: '0 12px',
    height: '24px',
    fontWeight: 'bold',
    lineHeight: '24px',
}));

const StatusDot = styled('span')(({ inactive }) => ({
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: inactive ? '#c44e3b' : '#388e3c',
    marginRight: '8px',
}));

const renderStatus = (params) => {
    const inactive = !params.value;
    return (
        <div style={{ display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'flex-start' }}>
            <StatusBadge inactive={inactive}>
                <StatusDot inactive={inactive} />
                {inactive ? 'Inactive' : 'Active'}
            </StatusBadge>
        </div>
    );
};

function SoldOutProducts(props) {
    const [rowData, setRowData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterAnchorEl, setFilterAnchorEl] = useState(null);
    const [sortAnchorEl, setSortAnchorEl] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortOption, setSortOption] = useState('A to Z');
    const [isAdjustStockOpen, setAdjustStockOpen] = useState(false); // Sidebar visibility state
    const [selectedProduct, setSelectedProduct] = useState(null); // Selected product for adjustment

    useEffect(() => {
        fetch("https://inv-be.vercel.app/v1/inventory/stock-out")
            .then(async (res) => {
                let data = await res.json();
                data.forEach((element) => {
                    element.images[0] = "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png";
                });
                setRowData(data);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleAdjustStockOpen = (product) => {
        setSelectedProduct(product);
        setAdjustStockOpen(true);
    };

    const handleAdjustStockClose = () => {
        setAdjustStockOpen(false);
        setSelectedProduct(null);
    };

    const handleSaveStockAdjustment = async (quantity, reason) => {
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
            fetch("https://inv-be.vercel.app/v1/inventory/stock-out") // Refresh data
                .then(async (res) => setRowData(await res.json()))
                .catch((err) => console.log(err));
            handleAdjustStockClose();
        } catch (error) {
            console.error("Error updating stock:", error);
        }
    };

    const columns = [
        {
            field: 'name',
            headerName: 'Products',
            flex: 1,
            editable: true,
            renderCell: (params) => <ProductTitle name={params.value} row={params.row} />,
        },
        {
            field: 'category',
            headerName: 'Category',
            flex: 0.4,
            editable: true,
        },
        {
            field: 'sku',
            headerName: 'SKU',
            flex: 0.4,
            editable: true,
        },
        { field: 'stock', headerName: 'Quantity in hand', flex: 0.4, renderCell: renderQuantity },
        { field: 'status', headerName: 'Status', flex: 0.3, renderCell: renderStatus },
        {
            field: 'action',
            headerName: 'Action',
            flex: 0.5,
            renderCell: (params) => (
                <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => handleAdjustStockOpen(params.row)} // Opens sidebar
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
                    Adjust Stock
                </Button>
            ),
        }
    ];

    const sortedData = rowData
        .filter((row) =>
            row.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedCategory ? row.category === selectedCategory : true)
        )
        .sort((a, b) => sortOption === 'A to Z' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));

    return (
        <>
            <div>
                <Stack direction="row" spacing={2} sx={{ marginBottom: '10px', marginTop: '10px', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TextField
                        variant="outlined"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ width: '100%', maxWidth: '300px', backgroundColor: 'white' }}
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
                            startIcon={<FilterListIcon />}
                            onClick={(e) => setFilterAnchorEl(e.currentTarget)}
                            sx={{ borderColor: '#d1d5db', color: '#374151', textTransform: 'none', borderRadius: '12px', "&:hover": { backgroundColor: "#f3f4f6" } }}
                        >
                            Filters
                        </Button>
                        <Popover
                            open={Boolean(filterAnchorEl)}
                            anchorEl={filterAnchorEl}
                            onClose={() => setFilterAnchorEl(null)}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                        >
                            <RadioGroup value={selectedCategory || 'clear'} onChange={(e) => setSelectedCategory(e.target.value === 'clear' ? '' : e.target.value)}>
                                <FormControlLabel value="clear" control={<Radio />} label="Clear Filter" />
                                <Divider sx={{ margin: '4px 0' }} />
                                {['Gemstones', 'Jewelry', 'DropsBeads', 'Semimounts', 'Findings'].map((category) => (
                                    <FormControlLabel key={category} value={category} control={<Radio />} label={category} />
                                ))}
                            </RadioGroup>
                        </Popover>
                        <Button
                            variant="outlined"
                            startIcon={<SortIcon />}
                            onClick={(e) => setSortAnchorEl(e.currentTarget)}
                            sx={{ borderColor: '#d1d5db', color: '#374151', textTransform: 'none', borderRadius: '12px', "&:hover": { backgroundColor: "#f3f4f6" } }}
                        >
                            Sort
                        </Button>
                        <Popover
                            open={Boolean(sortAnchorEl)}
                            anchorEl={sortAnchorEl}
                            onClose={() => setSortAnchorEl(null)}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                        >
                            <RadioGroup value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                                <FormControlLabel value="A to Z" control={<Radio />} label="A to Z" />
                                <FormControlLabel value="Z to A" control={<Radio />} label="Z to A" />
                            </RadioGroup>
                        </Popover>
                    </Stack>
                </Stack>
                <DataGrid
                    rows={sortedData}
                    columns={columns}
                    getRowId={(row) => row._id}
                    initialState={{ pagination: { paginationModel: { pageSize: 15 } } }}
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

export default SoldOutProducts;