import React, { useState } from 'react';
import {
    Drawer,
    Button,
    TextField,
    IconButton,
    Stack,
    Divider,
    Typography,
    MenuItem,
    Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import InfoIcon from '@mui/icons-material/Info';

const AdjustStockSidebar = ({ open, onClose, currentStock, onSave }) => {
    const [quantity, setQuantity] = useState(1);
    const [reason, setReason] = useState('');
    const [date, setDate] = useState('');

    const handleQuantityChange = (delta) => {
        setQuantity((prev) => prev + delta);
    };

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: 500,
                    padding: 3,
                    borderRadius: 3,
                    paddingRight: 4,
                },
            }}
        >
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Box
                            sx={{
                                width: 40,
                                height: 40,
                                backgroundColor: '#f0f4f8',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <EditIcon />
                        </Box>
                        <Stack>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Adjust Stock</Typography>
                            <Typography variant="body2" color="textSecondary">Update Inventory Quantity</Typography>
                        </Stack>
                    </Stack>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Stack>

                <Divider />

                {/* Date and Reason in the Same Row */}
                <Stack direction="row" spacing={2} alignItems="center">
                    <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontWeight: 'bold', mb: 1 }}>Date</Typography>
                        <TextField
                            placeholder="Select"
                            type="text"
                            value={date}
                            onFocus={(e) => (e.target.type = "date")}
                            onBlur={(e) => {
                                e.target.type = "text";
                                if (!e.target.value) setDate('');
                            }}
                            onChange={(e) => setDate(e.target.value)}
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <IconButton size="small">
                                        <CalendarTodayIcon />
                                    </IconButton>
                                ),
                                sx: {
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '12px',
                                    },
                                },
                            }}
                        />
                    </Box>

                    <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontWeight: 'bold', mb: 1 }}>Reason</Typography>
                        <TextField
                            select
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            fullWidth
                            SelectProps={{
                                displayEmpty: true,
                                renderValue: (selected) => {
                                    if (!selected) {
                                        return <span style={{ color: "#9e9e9e" }}>Select</span>;
                                    }
                                    return selected;
                                },
                            }}
                            InputProps={{
                                sx: {
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '12px',
                                    },
                                },
                            }}
                        >
                            <MenuItem value="New Stock">New Stock</MenuItem>
                            <MenuItem value="Returns">Returns</MenuItem>
                            <MenuItem value="Damaged">Damaged</MenuItem>
                        </TextField>
                    </Box>
                </Stack>

                <Divider />

                {/* Current Quantity in a Grey Box */}
                <Stack direction="row" spacing={2} alignItems="center" sx={{ paddingY: 1 }}>
                    <Typography sx={{ fontWeight: 'bold' }}>Current Quantity</Typography>
                    <Box
                        sx={{
                            flex: 1,
                            padding: 1,
                            backgroundColor: '#f7f7f7',
                            borderRadius: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#9e9e9e',
                            fontSize: '1rem',
                        }}
                    >
                        {currentStock}
                    </Box>
                </Stack>

                {/* Add Quantity with +/- buttons */}
                <Stack direction="row" spacing={2} alignItems="center" sx={{ paddingY: 1 }}>
                    <Typography sx={{ fontWeight: 'bold' }}>Add Quantity</Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flex: 1,
                            border: '1px solid #e0e0e0',
                            borderRadius: '8px',
                            overflow: 'hidden',
                        }}
                    >
                        <Button
                            onClick={() => handleQuantityChange(-1)}
                            sx={{
                                minWidth: '40px',
                                height: '100%',
                                borderRadius: 0,
                                borderRight: '1px solid #e0e0e0',
                            }}
                        >
                            -
                        </Button>
                        <TextField
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            type="number"
                            inputProps={{ style: { textAlign: 'center' } }}
                            sx={{
                                width: '100%',
                                backgroundColor: '#f7f7f7',
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 0,
                                    height: '100%',
                                },
                            }}
                        />
                        <Button
                            onClick={() => handleQuantityChange(1)}
                            sx={{
                                minWidth: '40px',
                                height: '100%',
                                borderRadius: 0,
                                borderLeft: '1px solid #e0e0e0',
                            }}
                        >
                            +
                        </Button>
                    </Box>
                </Stack>

                {/* Total Quantity with White Background Box */}
                <Stack direction="row" spacing={2} alignItems="center" sx={{ paddingY: 1 }}>
                    <Typography sx={{ fontWeight: 'bold' }}>Total Quantity</Typography>
                    <Box
                        sx={{
                            flex: 1,
                            padding: 1,
                            backgroundColor: '#ffffff',
                            borderRadius: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#333',
                            fontSize: '1rem',
                            border: '1px solid #e0e0e0',
                        }}
                    >
                        {currentStock + quantity}
                    </Box>
                </Stack>

            </Stack>

            {/* Info Section at the Bottom */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: 2,
                    backgroundColor: '#ffffff',
                    borderRadius: 2,
                    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)',
                    mt: 2,
                }}
            >
                <InfoIcon sx={{ color: '#4caf50', mr: 1 }} />
                <Box flex={1}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'black' }}>Inventory sync</Typography>
                    <Typography variant="body2" sx={{ color: 'black' }}>
                        The updated stock will be reflecting in the connected stores (Amazon, Etsy, Bestingems, Google merchant centre).
                    </Typography>
                </Box>
                <IconButton size="small" onClick={onClose}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </Box>

            {/* Save Button at the Bottom */}
            <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={() => {
                    onSave(quantity, reason, currentStock);
                    onClose();
                }}
                disabled={!date || !reason} // Disable Save button if date or reason is empty
            >
                Save
            </Button>
        </Drawer>
    );
};

export default AdjustStockSidebar;