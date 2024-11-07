import React, { useState, useEffect } from 'react';
import { Button, InputAdornment, Stack, TextField, Popover, RadioGroup, FormControlLabel, Radio, Typography, Divider } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import { styled } from '@mui/system';
import AdjustStockSidebar from './adjuststocksidebar';

const ProductTitle = ({ name, row }) => {
    return (
        <Stack direction="row" spacing={2} sx={{ justifyContent: "start", alignItems: "center" }}>
            <img alt="thumbnail.jpg" className="x50" src={row.images[0]} />
            <span>{name}</span>
        </Stack>
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

function StockAdjustmentsProducts(props) {
    const [rowData, setRowData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterAnchorEl, setFilterAnchorEl] = useState(null);
    const [sortAnchorEl, setSortAnchorEl] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortOption, setSortOption] = useState('A to Z');
    const [isAdjustStockOpen, setAdjustStockOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        fetch("https://inv-be.vercel.app/v1/inventory/stock-history")
            .then(async (res) => {
                let data = await res.json();
                data.forEach((element) => {
                    element.images[0] = "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png";
                });
                setRowData(data);
            })
            .catch((err) => console.log(err));
    }, []);

    const sortData = (data, option) => {
        switch (option) {
            case 'A to Z':
                return [...data].sort((a, b) => a.name.localeCompare(b.name));
            case 'Z to A':
                return [...data].sort((a, b) => b.name.localeCompare(a.name));
            case 'Lowest Adjusted':
                return [...data].sort((a, b) => a.change - b.change);
            case 'Highest Adjusted':
                return [...data].sort((a, b) => b.change - a.change);
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

    const handleFilterClick = (event) => {
        setFilterAnchorEl(event.currentTarget);
    };

    const handleFilterClose = () => {
        setFilterAnchorEl(null);
    };

    const handleCategoryChange = (event) => {
        const value = event.target.value;
        setSelectedCategory(value === 'clear' ? '' : value);
        handleFilterClose();
    };

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
            fetch("https://inv-be.vercel.app/v1/inventory/stock-history")
                .then(async (res) => {
                    let data = await res.json();
                    data.forEach((element) => {
                        element.images[0] = "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png";
                    });
                    setRowData(data);
                })
                .catch((err) => console.log(err));
            setAdjustStockOpen(false); // Close the sidebar after saving
        } catch (error) {
            console.error("Error updating stock:", error);
        }
    };

    const filteredData = rowData.filter((row) =>
        row.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory ? row.category === selectedCategory : true)
    );

    const sortedData = sortData(filteredData, sortOption);

    const columns = [
        {
            field: 'name',
            headerName: 'Products',
            flex: 0.7,
            editable: true,
            renderCell: (params) => <ProductTitle name={params.value} row={params.row} />,
        },
        {
            field: 'reason',
            headerName: 'Reason',
            flex: 0.4,
            editable: true,
        },
        {
            field: 'stock',
            headerName: 'Stock',
            flex: 0.2,
            editable: true,
        },
        {
            field: 'change',
            headerName: 'Adjusted',
            flex: 0.2,
            editable: true,
            renderCell: (params) => (
                <span style={{ color: params.value > 0 ? 'green' : 'red' }}>
                    {params.value}
                </span>
            ),
        },
        {
            field: 'date',
            headerName: 'Adjusted On',
            flex: 0.4,
            editable: true,
        },
        {
            field: 'updatedBy',
            headerName: 'Adjusted By',
            flex: 0.4,
            editable: true,
        },
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
                    onClick={() => handleAdjustStockOpen(params.row)}
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
                        InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }}
                    />
                    <Stack direction="row" spacing={1}>
                        <Button
                            variant="outlined"
                            startIcon={<FilterListIcon />}
                            onClick={handleFilterClick}
                            sx={{ borderColor: '#d1d5db', color: '#374151', textTransform: 'none', borderRadius: '12px', "&:hover": { backgroundColor: "#f3f4f6" } }}
                        >
                            Filters
                        </Button>
                        <Popover
                            open={Boolean(filterAnchorEl)}
                            anchorEl={filterAnchorEl}
                            onClose={handleFilterClose}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                        >
                            <RadioGroup
                                value={selectedCategory || 'clear'}
                                onChange={handleCategoryChange}
                                sx={{ padding: '8px', display: 'flex', flexDirection: 'column' }}
                            >
                                <FormControlLabel value="clear" control={<Radio />} label="Clear Filter" />
                                <Divider sx={{ margin: '4px 0' }} />
                                {['Gemstones', 'Jewelry', 'DropsBeads', 'Semimounts', 'Findings'].map((category) => (
                                    <FormControlLabel
                                        key={category}
                                        value={category}
                                        control={<Radio sx={{ '&.Mui-checked': { color: '#3b82f6' } }} />}
                                        label={category}
                                    />
                                ))}
                            </RadioGroup>
                        </Popover>
                        <Button
                            variant="outlined"
                            startIcon={<SortIcon />}
                            onClick={handleSortClick}
                            sx={{ borderColor: '#d1d5db', color: '#374151', textTransform: 'none', borderRadius: '12px', "&:hover": { backgroundColor: "#f3f4f6" } }}
                        >
                            Sort
                        </Button>
                        <Popover
                            open={Boolean(sortAnchorEl)}
                            anchorEl={sortAnchorEl}
                            onClose={handleSortClose}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                        >
                            <RadioGroup
                                value={sortOption}
                                onChange={handleSortChange}
                                sx={{ padding: '8px', display: 'flex', flexDirection: 'column' }}
                            >
                                <FormControlLabel value="A to Z" control={<Radio />} label="A to Z" />
                                <FormControlLabel value="Z to A" control={<Radio />} label="Z to A" />
                                <FormControlLabel value="Lowest Adjusted" control={<Radio />} label="Lowest Adjusted" />
                                <FormControlLabel value="Highest Adjusted" control={<Radio />} label="Highest Adjusted" />
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

export default StockAdjustmentsProducts;