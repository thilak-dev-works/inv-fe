import React from "react"
import Sidebar from "./Sidebar";
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


let Layout = ({ children }) => {
    var navigate = useNavigate();
    return (
        <div className="app-container">
            <Sidebar />
            <main className="dashboard">
                <header className="dashboard-header">
                    <h1>Welcome, Olivia!</h1>
                    <p>Overview of Current Stock and Inventory Performance</p>
                    <Button color="primary" variant="contained" onClick={() => navigate("/import")} startIcon={<AddCircleOutlineIcon />}>Import</Button>
                </header>
                {children}
            </main>
        </div>
    )
}

export default Layout;