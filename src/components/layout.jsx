import React from "react";
import Sidebar from "./Sidebar";
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

let Layout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const getHeaderContent = (pathname) => {
        const headers = {
            "/deletedproducts": {
                title: "Deleted Products",
                subtitle: "View and update deleted products",
            },
            "/dashboard": {
                title: "Welcome, Olivia!",
                subtitle: "Overview of Current Stock and Inventory Performance",
            },
            "/importpage": {
                title: "Import",
                subtitle: "Update Product Quantities from CSV",
            },
            "/allproducts": {
                title: "All Products",
                subtitle: "Overview of Current Stock and Inventory Performance",
            },
            "/soldoutproducts": {
                title: "Sold-Out Products",
                subtitle: "Overview of Current Stock and Inventory Performance",
            },
            "/stockadjustedproducts": {
                title: "Stock Adjustment",
                subtitle: "Overview of Adjusted stocks",
            },
            "/stockrequestedproducts": {
                title: "Product Requests",
                subtitle: "View and update out of stocks products",
            },
        };

        return headers[pathname] || {
            title: "Welcome, Olivia!",
            subtitle: "Overview of Current Stock and Inventory Performance",
        };
    };

    const { title: headerTitle, subtitle: headerSubtitle } = getHeaderContent(location.pathname);

    // Define button and additional content outside of the return statement
    let headerAction = null;
    //let additionalContent = null;

    if (location.pathname === "/importpage") {
        headerAction = (
            <div style={{ flex: 1, padding: '20px', backgroundColor: '#ffffff;' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <div></div>
                    <div>
                        <Button variant="outlined" color="primary" style={{ marginRight: '10px' }}>
                            Cancel
                        </Button>
                        <Button variant="contained" color="primary">
                            Save & Continue
                        </Button>
                    </div>
                </div>
            </div>
        );
    }else {
        headerAction = (
            <Button
                variant="contained"
                onClick={() => navigate("/import")}
                startIcon={<AddCircleOutlineIcon />}
                endIcon={<ArrowDropDownIcon />}
                sx={{
                    minWidth: '120px',
                    textTransform: 'none',
                    borderRadius: '12px',
                    padding: '6px 16px',
                    fontSize: '1rem',
                    background: 'linear-gradient(90deg, #4f93f6 0%, #3572e6 100%)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    '&:hover': {
                        background: 'linear-gradient(90deg, #3572e6 0%, #4f93f6 100%)',
                    },
                }}
            >
                Import
            </Button>
        );
    }

    return (
        <div className="app-container">
            <Sidebar />
            <main className="dashboard">
                <header className="dashboard-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <h1 style={{ margin: 0, fontSize: '1.25rem' }}>{headerTitle}</h1>
                        <p style={{ margin: 0, color: '#6b7280' }}>{headerSubtitle}</p>
                    </div>
                    {headerAction}
                </header>
                {children}
            </main>
        </div>
    );
}

export default Layout;
