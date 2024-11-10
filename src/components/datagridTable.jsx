import React, { useState } from 'react';
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
    Box
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import AdjustStockSidebar from '../pages/adjuststocksidebar';
import MuiPaginationComponent from './pagination';

const DataGridTable = ({ columns, rowData , isLoading }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterAnchorEl, setFilterAnchorEl] = useState(null);
    const [sortAnchorEl, setSortAnchorEl] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortOption, setSortOption] = useState('A to Z');
    const [isAdjustStockOpen, setAdjustStockOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [page, setPage] = useState(1);
    const [pageLimit, setPageLimit] = useState(5);

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
        setPage(1); // Reset page when sort changes
        handleSortClose();
    };

    const handleFilterClick = (event) => setFilterAnchorEl(event.currentTarget);
    const handleFilterClose = () => setFilterAnchorEl(null);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value === 'clear' ? '' : event.target.value);
        setPage(1); // Reset page when filter changes
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

    const filteredData = rowData.filter((row) =>
        row.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!selectedCategory || row.category === selectedCategory)
    );

    const sortedData = sortData(filteredData, sortOption);
    const paginatedData = sortedData.slice((page - 1) * pageLimit, page * pageLimit);
    const pageCount = Math.ceil(filteredData.length / pageLimit);

    return (
        <>
            <Stack direction="row" spacing={2} sx={{ marginBottom: '10px', marginTop: '10px', alignItems: 'center', justifyContent: 'space-between' }}>
                <TextField
                    variant="outlined"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    size="small"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        )
                    }}
                />
                <Box sx={{display: 'flex' , columnGap :"10px"}}>
                <Button variant="outlined" onClick={handleFilterClick} startIcon={<FilterListIcon />}>Filters</Button>
                <Popover open={Boolean(filterAnchorEl)} anchorEl={filterAnchorEl} onClose={handleFilterClose}>
                    <RadioGroup value={selectedCategory || 'clear'} onChange={handleCategoryChange}>
                        <FormControlLabel value="clear" control={<Radio />} label="Clear Filter" />
                        <Divider />
                        <FormControlLabel value="toys" control={<Radio />} label="Toys" />
                        <FormControlLabel value="electronics" control={<Radio />} label="Electronics" />
                        {/* Additional filters */}
                    </RadioGroup>
                </Popover>
                <Button variant="outlined" onClick={handleSortClick} startIcon={<SortIcon />}>Sort By</Button>
                <Popover open={Boolean(sortAnchorEl)} anchorEl={sortAnchorEl} onClose={handleSortClose}>
                    <RadioGroup value={sortOption} onChange={handleSortChange}>
                        <FormControlLabel value="A to Z" control={<Radio />} label="A to Z" />
                        <FormControlLabel value="Z to A" control={<Radio />} label="Z to A" />
                        <FormControlLabel value="Lowest Adjusted" control={<Radio />} label="Lowest Adjusted" />
                        <FormControlLabel value="Highest Adjusted" control={<Radio />} label="Highest Adjusted" />
                    </RadioGroup>
                </Popover>
                </Box>
            </Stack>
            <DataGrid
                rows={paginatedData}
                columns={columns}
                loading={isLoading}
                disablePagination
                getRowId={(row) => row._id}
                hideFooter
                autoHeight
            />
            <MuiPaginationComponent
                page={page}
                count={pageCount}
                setPage={setPage}
                pageLimit={pageLimit}
                setPageLimit={setPageLimit}
            />
            <AdjustStockSidebar open={isAdjustStockOpen} onClose={handleAdjustStockClose} product={selectedProduct} />
        </>
    );
}

export default DataGridTable;
