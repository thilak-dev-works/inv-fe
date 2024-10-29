import React from "react"
import Sidebar from "./Sidebar";
import Button from './Button';


let Layout = ({ children }) => {
    return (
        <div className="app-container">
            <Sidebar />
            <main className="dashboard">
                <header className="dashboard-header">
                    <h1>Welcome, Olivia!</h1>
                    <p>Overview of Current Stock and Inventory Performance</p>
                    <Button text="Import" />
                </header>
                {children}
            </main>
        </div>
    )
}

export default Layout;