// HomePage.js
import React from 'react';
import Box from './Box'; // Import the reusable Box component

const HomePage = () => {
    return (
        <div className="homepage">
            {/* First row of boxes */}
            <div className="box-container">
                <Box color="#4CAF50" title="Total Income" />
                <Box color="#F44336" title="Total Expense" />
                <Box color="#FFC107" title="Total Balance" />
            </div>
            
            {/* Second row of boxes */}
            <div className="second-row">
                <Box color="#2196F3" title="Expense by Category" />
                <Box color="#FF5722" title="Income vs Expense" large />
            </div>
        </div>
    );
};

export default HomePage;
