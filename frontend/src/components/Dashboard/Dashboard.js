import React from 'react';
import { AddTransaction } from '../AddTransaction';
import { GlobalProvider } from '../../context/GlobalState'; // Global context provider for managing state
import TransactionsOverview from '../TransactionsOverview'; // Component displaying an overview of transactions
import PieChart from '../PieChart'; // Component for displaying a pie chart of transaction data
import './Dashboard.css'; 

// Define the Dashboard component
export const Dashboard = () => {
  return (
     // Wrappin the dashboard in the GlobalProvider to provide global state access
    <GlobalProvider>
      <div className="dashboard-container">
        <div className="overview-section">
          <TransactionsOverview /> 
        </div>
        <div className="transaction-section">
          <AddTransaction /> 
          <PieChart />
        </div>
      </div>
    </GlobalProvider>
  );
};

export default Dashboard;




