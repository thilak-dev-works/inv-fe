import { Button, Stack } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import { useNavigate } from 'react-router-dom';
import Papa from 'papaparse';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';



export default function ImportModule(props) {
    // const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [fileImported, setFileImported] = useState(false); // State to track file import
    const [selectedRows, setSelectedRows] = useState([]); // State to track selected rows

    const handleImportClick = (event) => {
        const file = event.target.files[0];
        if (file) {
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    setData(results.data);
                    // Preselect all rows based on SKU
                    const allRowIds = results.data.map(row => row['SKU']);
                    setSelectedRows(allRowIds);
                    setFileImported(true); // Set to true when file is imported
                },
                error: (error) => {
                    console.error("Error parsing CSV:", error);
                }
            });
        }
    };

    const handleDownloadClick = () => {
        // Your download logic here
        console.log("Download sample CSV functionality is not implemented yet.");
    };

    // Define columns for the DataGrid
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
                {!fileImported && ( // Show import buttons only if no file is imported
                    <>
                        <Button color="primary" variant="contained" startIcon={<AddCircleOutlineIcon />} component="label">
                            Import Products
                            <input type="file" accept=".csv" hidden onChange={handleImportClick} />
                        </Button>
                        <Button color="primary" variant="outlined" onClick={handleDownloadClick}> Download sample .CSV</Button>
                    </>
                )}

                {/* Display the DataGrid if data exists */}
                {data.length > 0 && (
                    <div style={{ height: 600, width: '100%', marginTop: 20 }}>
                        <DataGrid
                            rows={data}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5, 10, 20]}
                            checkboxSelection
                            getRowId={(row) => row['SKU']} // Use SKU as the unique identifier
                            selectionModel={selectedRows} // Set the selection model
                            onSelectionModelChange={(newSelection) => {
                                setSelectedRows(newSelection); // Update selected rows when selection changes
                            }}
                        />
                    </div>
                )}
            </Stack>
        </div>
    );
}