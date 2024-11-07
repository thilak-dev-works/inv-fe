import React, { useState, useEffect } from 'react';
import { Button, Stack, Typography, Divider, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Menu, MenuItem, IconButton, TextField, Popover, RadioGroup, FormControlLabel, Radio, InputAdornment } from '@mui/material';
import { styled } from '@mui/system';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import AdjustStockSidebar from './adjuststocksidebar';

const StatusBadge = styled(Box)({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px 8px',
    borderRadius: '12px',
    backgroundColor: '#e8f5e9',
    color: '#388e3c',
    fontWeight: 'bold',
    fontSize: '0.875rem',
});

const ProductCard = styled(Box)({
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
    backgroundColor: '#ffffff',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

const AdjustStockButton = styled(Button)({
    position: 'absolute',
    top: '16px',
    right: '16px',
    borderColor: '#d1d5db',
    color: '#374151',
    textTransform: 'none',
    fontSize: '0.875rem',
    borderRadius: '8px',
    "&:hover": {
        backgroundColor: "#f3f4f6",
    },
});

const ColumnContainer = styled(Stack)({
    alignItems: 'flex-start',
    padding: '0 86px',
});

function StockRequestProducts() {
    const [data, setData] = useState([]);
    const [expandedRequests, setExpandedRequests] = useState({});
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterAnchorEl, setFilterAnchorEl] = useState(null);
    const [sortAnchorEl, setSortAnchorEl] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortOption, setSortOption] = useState('A to Z');
    const [isAdjustStockOpen, setAdjustStockOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const fetchData = () => {
        fetch("https://inv-be.vercel.app/v1/inventory/inventory-with-requests")
            .then(res => res.json())
            .then(data => setData(data))
            .catch(error => console.error("Error fetching data:", error));
    };

    useEffect(() => {
        fetchData();
    }, []);

    const toggleRequests = (productId) => {
        setExpandedRequests((prev) => ({
            ...prev,
            [productId]: !prev[productId]
        }));
    };

    const handleMenuOpen = (event, request, product) => {
        setAnchorEl(event.currentTarget);
        setSelectedRequest(request);
        setSelectedProduct(product);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedRequest(null);
        setSelectedProduct(null);
    };

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(selectedRequest.requestBy);
        handleMenuClose();
    };

    const handleDeleteRequest = async () => {
        if (selectedProduct) {
            const apiUrl = `https://inv-be.vercel.app/v1/inventory/sku/${selectedProduct.sku}/remove-request`;
            try {
                await fetch(apiUrl, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        requestId: selectedRequest._id
                    })
                });
                fetchData();
                handleMenuClose();
            } catch (error) {
                console.error("Error deleting request:", error);
            }
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
        setSelectedCategory(event.target.value === 'clear' ? '' : event.target.value);
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
            fetchData(); // Refresh data after adjusting stock
            setAdjustStockOpen(false); // Close sidebar after saving
        } catch (error) {
            console.error("Error updating stock:", error);
        }
    };

    const filteredData = data.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory ? product.category === selectedCategory : true)
    );

    const sortData = (data, option) => {
        switch (option) {
            case 'A to Z':
                return [...data].sort((a, b) => a.name.localeCompare(b.name));
            case 'Z to A':
                return [...data].sort((a, b) => b.name.localeCompare(a.name));
            default:
                return data;
        }
    };

    const sortedData = sortData(filteredData, sortOption);

    return (
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
                        onClick={handleFilterClick}
                        sx={{
                            borderColor: '#d1d5db',
                            color: '#374151',
                            textTransform: 'none',
                            borderRadius: '12px',
                            "&:hover": { backgroundColor: "#f3f4f6" },
                        }}
                    >
                        Filters
                    </Button>
                    <Popover
                        open={Boolean(filterAnchorEl)}
                        anchorEl={filterAnchorEl}
                        onClose={handleFilterClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <RadioGroup
                            value={selectedCategory || 'clear'}
                            onChange={handleCategoryChange}
                            sx={{ padding: '8px', display: 'flex', flexDirection: 'column' }}
                        >
                            <FormControlLabel value="clear" control={<Radio />} label="Clear Filter" />
                            <Divider />
                            {['Gemstones', 'Jewelry', 'DropsBeads', 'Semimounts', 'Findings'].map((category) => (
                                <FormControlLabel key={category} value={category} control={<Radio />} label={category} />
                            ))}
                        </RadioGroup>
                    </Popover>
                    <Button
                        variant="outlined"
                        startIcon={<SortIcon />}
                        onClick={handleSortClick}
                        sx={{
                            borderColor: '#d1d5db',
                            color: '#374151',
                            textTransform: 'none',
                            borderRadius: '12px',
                            "&:hover": { backgroundColor: "#f3f4f6" },
                        }}
                    >
                        Sort
                    </Button>
                    <Popover
                        open={Boolean(sortAnchorEl)}
                        anchorEl={sortAnchorEl}
                        onClose={handleSortClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <RadioGroup
                            value={sortOption}
                            onChange={handleSortChange}
                            sx={{ padding: '8px', display: 'flex', flexDirection: 'column' }}
                        >
                            <FormControlLabel value="A to Z" control={<Radio />} label="A to Z" />
                            <FormControlLabel value="Z to A" control={<Radio />} label="Z to A" />
                        </RadioGroup>
                    </Popover>
                </Stack>
            </Stack>

            {sortedData.map((product) => (
                <ProductCard key={product._id}>
                    <AdjustStockButton variant="outlined" onClick={() => handleAdjustStockOpen(product)}>
                        Adjust Stock
                    </AdjustStockButton>

                    {/* Existing content displaying product information */}
                    <Stack direction="row" alignItems="center" spacing={2} sx={{ width: '100%' }}>
                        <img src={product.images[0]} alt={product.name} style={{ width: '50px', height: '50px', borderRadius: '8px' }} />
                        <Stack>
                            <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                                {product.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.875rem' }}>
                                {product.description}
                            </Typography>
                        </Stack>
                    </Stack>

                    <Stack direction="row" justifyContent="center" alignItems="center" sx={{ marginTop: '16px', paddingX: '16px', width: '100%' }}>
                        <ColumnContainer>
                            <Typography variant="caption" sx={{ fontWeight: 'bold' }}>SKU</Typography>
                            <Typography variant="body2" sx={{ marginTop: '4px' }}>{product.sku}</Typography>
                        </ColumnContainer>
                        <Divider orientation="vertical" flexItem />
                        <ColumnContainer>
                            <Typography variant="caption" sx={{ fontWeight: 'bold' }}>Category</Typography>
                            <Typography variant="body2" sx={{ marginTop: '4px' }}>{product.category}</Typography>
                        </ColumnContainer>
                        <Divider orientation="vertical" flexItem />
                        <ColumnContainer>
                            <Typography variant="caption" sx={{ fontWeight: 'bold' }}>Stock In Hand</Typography>
                            <Typography variant="body2" sx={{ marginTop: '4px' }}>{product.stock}</Typography>
                        </ColumnContainer>
                        <Divider orientation="vertical" flexItem />
                        <ColumnContainer>
                            <Typography variant="caption" sx={{ fontWeight: 'bold' }}>Price ($)</Typography>
                            <Typography variant="body2" sx={{ marginTop: '4px' }}>{product.price}</Typography>
                        </ColumnContainer>
                        <Divider orientation="vertical" flexItem />
                        <ColumnContainer>
                            <Typography variant="caption" sx={{ fontWeight: 'bold' }}>Status</Typography>
                            <StatusBadge sx={{ marginTop: '4px' }}>{product.status ? 'Active' : 'Inactive'}</StatusBadge>
                        </ColumnContainer>
                    </Stack>

                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '12px' }}>
                        <Button
                            variant="outlined"
                            onClick={() => toggleRequests(product._id)}
                            sx={{
                                borderColor: '#d1d5db',
                                color: '#374151',
                                textTransform: 'none',
                                fontSize: '0.875rem',
                                borderRadius: '8px',
                                "&:hover": { backgroundColor: "#f3f4f6" },
                            }}
                        >
                            {expandedRequests[product._id] ? `Hide requests (${product.productRequests.length})` : `View requests (${product.productRequests.length})`}
                        </Button>
                    </Box>

                    {expandedRequests[product._id] && (
                        <TableContainer component={Paper} sx={{ marginTop: '10px', width: '100%' }}>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: '#f3f4f6' }}>
                                        <TableCell><strong>Requested by</strong></TableCell>
                                        <TableCell><strong>Requested on</strong></TableCell>
                                        <TableCell><strong>Action</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {product.productRequests.map((request) => (
                                        <TableRow key={request._id}>
                                            <TableCell>
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <img
                                                        src="https://via.placeholder.com/40"
                                                        alt="User Avatar"
                                                        style={{ borderRadius: '2%' }}
                                                    />
                                                    <Typography variant="body2">{request.requestBy}</Typography>
                                                </Stack>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2">{new Date(request.requestedOn).toLocaleDateString()}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <IconButton onClick={(e) => handleMenuOpen(e, request, product)}>
                                                    <MoreVertIcon />
                                                </IconButton>
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{
                                                        borderColor: '#d1d5db',
                                                        color: '#374151',
                                                        textTransform: 'none',
                                                        fontSize: '0.75rem',
                                                        borderRadius: '8px',
                                                        padding: '4px 8px',
                                                        "&:hover": {
                                                            backgroundColor: "#f3f4f6",
                                                        },
                                                    }}
                                                >
                                                    Send Mail
                                                </Button>
                                                <Menu
                                                    anchorEl={anchorEl}
                                                    open={Boolean(anchorEl)}
                                                    onClose={handleMenuClose}
                                                >
                                                    <MenuItem onClick={handleCopyEmail}>
                                                        <ContentCopyIcon fontSize="small" sx={{ marginRight: '8px' }} />
                                                        Copy Email
                                                    </MenuItem>
                                                    <MenuItem
                                                        onClick={
                                                            handleDeleteRequest
                                                        }
                                                        sx={{ color: 'red' }}
                                                    >
                                                        <DeleteIcon fontSize="small" sx={{ marginRight: '8px' }} />
                                                        Delete Request
                                                    </MenuItem>
                                                </Menu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </ProductCard>
            ))}

            <AdjustStockSidebar
                open={isAdjustStockOpen}
                onClose={handleAdjustStockClose}
                currentStock={selectedProduct?.stock || 0}
                onSave={handleSaveStockAdjustment}
            />
        </div>
    );
}

export default StockRequestProducts;