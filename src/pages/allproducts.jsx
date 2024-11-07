import React, { useState, useEffect } from 'react';
import {
    Button,
    InputAdornment,
    Stack,
    TextField,
    Popover,
    RadioGroup,
    FormControlLabel,
    Radio,
    Divider,
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InventoryIcon from '@mui/icons-material/Inventory';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/system';
import { useLocation } from 'react-router-dom';
import AdjustStockSidebar from './adjuststocksidebar';
import ReorderStockSidebar from './reordersidebar';
import SetAlertSidebar from './setalertsidebar';

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

const ProductTitle = ({ name, row }) => (
    <Stack direction="row" spacing={2} sx={{ justifyContent: "start", alignItems: "center" }}>
        <img alt="thumbnail" className="x50" src={row.images[0]} />
        <span>{name}</span>
    </Stack>
);

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

const AllProducts = () => {
    const [rowData, setRowData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterAnchorEl, setFilterAnchorEl] = useState(null);
    const [sortAnchorEl, setSortAnchorEl] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortOption, setSortOption] = useState('A to Z');
    const [isAdjustStockOpen, setAdjustStockOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isReorderStockOpen, setReorderStockOpen] = useState(false); // State for ReorderStockSidebar
    const [isSetAlertOrderOpen, setSetAlertOrderOpen] = useState(false); // State for ReorderStockSidebar
    const location = useLocation();

    // Fetch data function to be used both in useEffect and after saving stock adjustment
    const fetchData = () => {
        const categoryQuery = selectedCategory ? `?category=${selectedCategory}` : '';
        fetch(`https://inv-be.vercel.app/v1/inventory${categoryQuery}`)
            .then(res => res.json())
            .then(data => {
                data.forEach(element => {
                    element.images[0] = "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png";
                });
                setRowData(data);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const category = queryParams.get('category');
        setSelectedCategory(category || '');
    }, [location.search]);

    useEffect(() => {
        fetchData();
    }, [selectedCategory]);

    const sortData = (data, option) => {
        switch (option) {
            case 'A to Z':
                return [...data].sort((a, b) => a.name.localeCompare(b.name));
            case 'Z to A':
                return [...data].sort((a, b) => b.name.localeCompare(a.name));
            case 'Last Modified':
                return [...data].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
            case 'Newly Added':
                return [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
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

    const handleFilterClick = (event) => setFilterAnchorEl(event.currentTarget);
    const handleFilterClose = () => setFilterAnchorEl(null);

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

    const handleReorderStockOpen = (product) => {
        setSelectedProduct(product);
        setReorderStockOpen(true);
    };

    const handleReorderStockClose = () => {
        setReorderStockOpen(false);
        setSelectedProduct(null);
    };

    const handleSetAlertOrderOpen = (product) => {
        setSelectedProduct(product);
        setSetAlertOrderOpen(true);
    };

    const handleSetAlertOrderClose = () => {
        setSetAlertOrderOpen(false);
        setSelectedProduct(null);
    };

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

    const deleteProductsBySku = async (sku) => {
        const apiUrl = `https://inv-be.vercel.app/v1/inventory/sku/${sku.sku}/change-status`;
        try {
            const response = await fetch(apiUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "status": false
                })
            });
            await response.json();
            fetchData(); 
        } catch (error) {
            console.error("Error updating stock:", error);
        }
    };

    const sortedData = sortData(rowData, sortOption);

    const filteredData = sortedData.filter((row) =>
        row.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory ? row.category === selectedCategory : true)
    );

    const columns = [
        { field: 'name', headerName: 'Products', flex: 1, renderCell: (params) => <ProductTitle name={params.value} row={params.row} /> },
        { field: 'sku', headerName: 'SKU', flex: 0.5 },
        { field: 'stock', headerName: 'Quantity', flex: 0.5, renderCell: renderQuantity },
        { field: 'price', headerName: 'Price', flex: 0.4 },
        { field: 'status', headerName: 'Status', flex: 0.5, renderCell: renderStatus },
        { field: 'action', headerName: 'Action', flex: 0.3, renderCell: (params) => <ActionMenu row={params.row} /> }
    ];

    const ActionMenu = ({ row }) => {
        const [anchorEl, setAnchorEl] = useState(null);
        const open = Boolean(anchorEl);

        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };

        const handleClose = () => {
            setAnchorEl(null);
        };

        return (
            <>
                <IconButton onClick={handleClick}>
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <MenuItem onClick={() => { handleClose(); handleAdjustStockOpen(row); }}>
                        <ListItemIcon><InventoryIcon fontSize="small" /></ListItemIcon>
                        <ListItemText primary="Adjust Stock" />
                    </MenuItem>
                    <MenuItem onClick={() => { handleClose(); handleReorderStockOpen(row); }}> {/* Call ReorderStockSidebar */}
                        <ListItemIcon><SettingsIcon fontSize="small" /></ListItemIcon>
                        <ListItemText primary="Edit reorder point" />
                    </MenuItem>
                    <MenuItem onClick={() => { handleClose(); handleSetAlertOrderOpen(row); }}>
                        <ListItemIcon><NotificationsActiveIcon fontSize="small" /></ListItemIcon>
                        <ListItemText primary="Edit Alert settings" />
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => { handleClose(); deleteProductsBySku(row); }} sx={{ color: 'red' }}>
                        <ListItemIcon><DeleteIcon fontSize="small" color="error" /></ListItemIcon>
                        <ListItemText primary="Delete item" />
                    </MenuItem>
                </Menu>
            </>
        );
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
                                <FormControlLabel value="Last Modified" control={<Radio />} label="Last Modified" />
                                <FormControlLabel value="Newly Added" control={<Radio />} label="Newly Added" />
                            </RadioGroup>
                        </Popover>
                    </Stack>
                </Stack>
                <DataGrid
                    rows={filteredData}
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

            <ReorderStockSidebar // Add the ReorderStockSidebar component
                open={isReorderStockOpen}
                onClose={handleReorderStockClose}
                sku={selectedProduct?.sku}
            />

            <SetAlertSidebar // Add the ReorderStockSidebar component
                open={isSetAlertOrderOpen}
                onClose={handleSetAlertOrderClose}
                sku={selectedProduct?.sku}
            />
        </>
    );
};

export default AllProducts;