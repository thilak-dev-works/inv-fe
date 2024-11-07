import React, { useState } from 'react';
import {
    Drawer,
    Button,
    TextField,
    IconButton,
    Stack,
    Divider,
    Typography,
    Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings'; // Import SettingsIcon

const ReorderStockSidebar = ({ open, onClose, sku }) => {
    const [reorderPoint, setReorderPoint] = useState(50); // Default value
    const [reorderQuantity, setReorderQuantity] = useState(30); // Default value

    const handleSave = async () => {
        const payload = {
            sku: sku,
            reorderPoint: reorderPoint,
            reorderQuantity: reorderQuantity,
        };

        try {
            const response = await fetch('https://inv-be.vercel.app/v1/inventory/set-reorder', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                // Handle successful response
                console.log('Reorder settings saved successfully');
                onClose();
            } else {
                // Handle error response
                console.error('Failed to save reorder settings');
            }
        } catch (error) {
            console.error('Error:', error);
        }
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
                    display: 'flex',
                    flexDirection: 'column', // Set column direction for stacking
                    height: '100%', // Ensure it occupies full height
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
                            <SettingsIcon />
                        </Box>
                        <Stack>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Reorder Settings</Typography>
                            <Typography variant="body2" color="textSecondary">Edit Reorder Settings</Typography>
                        </Stack>
                    </Stack>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Stack>

                <Divider />

                {/* Reorder Point and Quantity in the Same Row */}
                <Stack direction="row" spacing={2} alignItems="center">
                    <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontWeight: 'bold', mb: 1 }}>Reorder Point</Typography>
                        <TextField
                            value={reorderPoint}
                            onChange={(e) => setReorderPoint(Number(e.target.value))}
                            type="number"
                            inputProps={{ style: { textAlign: 'center' } }}
                            sx={{
                                width: '100%',
                                backgroundColor: '#f7f7f7',
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '12px',
                                },
                            }}
                        />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontWeight: 'bold', mb: 1 }}>Reorder Quantity</Typography>
                        <TextField
                            value={reorderQuantity}
                            onChange={(e) => setReorderQuantity(Number(e.target.value))}
                            type="number"
                            inputProps={{ style: { textAlign: 'center' } }}
                            sx={{
                                width: '100%',
                                backgroundColor: '#f7f7f7',
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '12px',
                                },
                            }}
                        />
                    </Box>
                </Stack>

                {/* Spacer to push the Info section and Save button to the bottom */}
                <Box sx={{ flexGrow: 1 }} />

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
                </Box>

                {/* Save Button at the Bottom */}
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={handleSave}
                >
                    Save
                </Button>
            </Stack>
        </Drawer>
    );
};

export default ReorderStockSidebar;