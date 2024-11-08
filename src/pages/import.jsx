/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Stack, Snackbar, Alert } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from 'react-router-dom';
import Papa from 'papaparse';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { eventEmitter } from '../components/event';


export default function ImportModule() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [fileImported, setFileImported] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {
        const handleSaveAndContinue = (event) => {
            if (event.detail.message.includes('Save & Continue')) {
                if (data.length > 0) {
                    uploadSelectedRowsAsJSON();
                    setTimeout(() => {
                        navigate("/");
                    }, 5000);
                } else {
                    console.error("No data available to upload.");
                }
            }
        };

        eventEmitter.addEventListener("saveAndContinue", handleSaveAndContinue);
        return () => {
            eventEmitter.removeEventListener("saveAndContinue", handleSaveAndContinue);
        };
    }, [data]);

    useEffect(() => {
        if (data.length > 0) {
            console.log("Data ready for upload:", data);
        }
    }, [data]);

    const handleImportClick = (event) => {
        const file = event.target.files[0];
        if (file) {
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    console.log("Parsed results:", results);
                    if (results.data && results.data.length > 0) {
                        setData(results.data);
                        console.log("Parsed data:", data);

                        const allRowIds = results.data.map(row => row['SKU']);
                        setSelectedRows(allRowIds);
                        setFileImported(true);
                    } else {
                        console.error("No data found in the file.");
                        setFileImported(false);
                    }
                },
                error: (error) => {
                    console.error("Error parsing CSV:", error);
                }
            });
        }
    };

    const handleDownloadClick = () => {
        const link = document.createElement('a');
        link.href = `${process.env.PUBLIC_URL}/sample.csv`; 
        link.download = 'sample.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const uploadSelectedRowsAsJSON = () => {
        const selectedData = data
            // .filter(row => selectedRows.includes(row['SKU']))
            .map(row => ({ SKU: row['SKU'], Quantity: row['Quantity'] }));

        fetch("https://inv-be.vercel.app/v1/inventory/json/update-stock", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(selectedData),
        })
            .then(response => {
                if (response.ok) {
                    console.log("JSON upload successful");
                    setOpenSnackbar(true);
                } else {
                    console.error("JSON upload failed");
                }
            })
            .catch(error => {
                console.error("Error uploading JSON:", error);
            });
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const columns = [
        { field: 'Product name', headerName: 'Product Name', flex: 1 },
        { field: 'Category', headerName: 'Category', flex: 1 },
        { field: 'SKU', headerName: 'SKU', flex: 1 },
        { field: 'Quantity', headerName: 'Quantity', flex: 0.5 },
        { field: 'Price ($)', headerName: 'Price ($)', flex: 0.5 },
    ];

    return (
        <div className="importmodule">
            <Stack direction={"column"} spacing={2}
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: !fileImported ? 25 : 5,
                }} >
                {!fileImported && (
                    <>
                        <Button color="primary" variant="contained" startIcon={<AddCircleOutlineIcon />} component="label">
                            Import Products
                            <input type="file" accept=".csv" hidden onChange={handleImportClick} />
                        </Button>
                        <Button color="primary" variant="outlined" onClick={handleDownloadClick}> Download sample .CSV</Button>
                    </>
                )}

                {data.length > 0 && (
                    <div style={{ height: 600, width: '100%', marginTop: 20 }}>
                        <DataGrid
                            rows={data}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5, 10, 20]}
                            checkboxSelection
                            getRowId={(row) => row['SKU']}
                            selectionModel={selectedRows}
                            onSelectionModelChange={(newSelection) => {
                                setSelectedRows(newSelection);
                            }}
                        />
                    </div>
                )}
            </Stack>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Updated successfully!
                </Alert>
            </Snackbar>
        </div>
    );
}