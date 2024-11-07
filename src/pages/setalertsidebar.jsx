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
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'; // Import Notifications Icon
import InfoIcon from '@mui/icons-material/Info'; // Import Info Icon

const SetAlertSidebar = ({ open, onClose, sku }) => {
    const [lowStockAlert, setLowStockAlert] = useState(50); // Default value for low stock alert
    const [highStockTrigger, setHighStockTrigger] = useState(80); // Default value for high stock trigger

    const handleSave = async () => {
        const payload = {
            sku: sku,
            lowerThan: lowStockAlert,
            higherThan: highStockTrigger,
        };

        try {
            const response = await fetch('https://inv-be.vercel.app/v1/inventory/set-alert', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                console.log('Alert settings saved successfully');
                onClose();
            } else {
                console.error('Failed to save alert settings');
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
                    flexDirection: 'column',
                    height: '100%',
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
                            <NotificationsActiveIcon />
                        </Box>
                        <Stack>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Set Alert</Typography>
                            <Typography variant="body2" color="textSecondary">Add and update inventory alerts</Typography>
                        </Stack>
                    </Stack>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Stack>

                <Divider />


                <Box sx={{ flex: 0.5 }}>
                    <Typography sx={{ fontWeight: 'bold', mb: 0.1 }}>Alert if Quantity is less than</Typography>
                    <TextField
                        value={lowStockAlert}
                        onChange={(e) => setLowStockAlert(Number(e.target.value))}
                        type="number"
                        inputProps={{ style: { textAlign: 'left' } }}
                        sx={{
                            width: '100%',
                            backgroundColor: '#f7f7f7',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '12px',
                            },
                        }}
                    />
                </Box>
                <Box sx={{ flex: 2 }}>
                    <Typography sx={{ fontWeight: 'bold', mb: 0.1 }}>Trigger alert if Quantity is more than</Typography>
                    <TextField
                        value={highStockTrigger}
                        onChange={(e) => setHighStockTrigger(Number(e.target.value))}
                        type="number"
                        inputProps={{ style: { textAlign: 'left' } }}
                        sx={{
                            width: '100%',
                            backgroundColor: '#f7f7f7',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '12px',
                            },
                        }}
                    />
                </Box>

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
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'black' }}>Inventory Alert Settings</Typography>
                        <Typography variant="body2" sx={{ color: 'black' }}>
                            Configure alerts to help manage your inventory effectively.
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

export default SetAlertSidebar;