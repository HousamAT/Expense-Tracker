import React from 'react';
import { AddTransaction } from '../AddTransaction';
import { GlobalProvider } from '../../context/GlobalState'; 
import TransactionsOverview from '../TransactionsOverview'; 
import './Dashboard.css'; 

export const Dashboard = () => {
  return (
    <GlobalProvider>
      <div className="container">
        <TransactionsOverview /> 
        <AddTransaction /> 
      </div>
    </GlobalProvider>
  );
};

export default Dashboard;
