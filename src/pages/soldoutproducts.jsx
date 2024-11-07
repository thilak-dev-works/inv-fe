import React, { useState, useEffect } from 'react';
import { Button, InputAdornment, Stack, TextField, Popover, RadioGroup, FormControlLabel, Radio, Typography, Divider } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import { styled } from '@mui/system';


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

    const openFilter = Boolean(filterAnchorEl);
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
                    onClick={() => handleRestore(params.row)}
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

    const handleRestore = (row) => {
        console.log("Restore clicked for:", row);
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
                            startIcon={<FilterListIcon />}
                            onClick={handleFilterClick}
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
                            Filters
                        </Button>
                        <Popover
                            open={openFilter}
                            anchorEl={filterAnchorEl}
                            onClose={handleFilterClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            sx={{ padding: '8px' }}
                        >
                            <RadioGroup
                                value={selectedCategory || 'clear'}
                                onChange={handleCategoryChange}
                                sx={{ padding: '8px', display: 'flex', flexDirection: 'column', gap: '0.5px' }}
                            >
                                <FormControlLabel
                                    value="clear"
                                    control={<Radio />}
                                    label={<Typography sx={{ fontSize: '0.875rem', color: '#374151' }}>Clear Filter</Typography>}
                                    sx={{
                                        margin: 0,
                                        padding: '4px 0',
                                        width: '100%',
                                    }}
                                />
                                <Divider sx={{ margin: '4px 0' }} />
                                {['Gemstones', 'Jewelry', 'DropsBeads', 'Semimounts', 'Findings'].map((category, index, arr) => (
                                    <React.Fragment key={category}>
                                        <FormControlLabel
                                            value={category}
                                            control={<Radio sx={{'&.Mui-checked': { color: '#3b82f6' } }} />}
                                            label={
                                                <Typography sx={{ fontSize: '0.875rem', color: '#374151' }}>
                                                    {category}
                                                </Typography>
                                            }
                                            sx={{
                                                margin: 0,
                                                padding: '1px 0',
                                                width: '100%',
                                            }}
                                        />
                                        {index < arr.length - 1 && <Divider sx={{ margin: '4px 0' }} />}
                                    </React.Fragment>
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
        </>
    );
}

export default SoldOutProducts;