import React from 'react';
import {TransactionList} from '../TransactionList';
import{AddTransaction} from '../AddTransaction';
import { GlobalProvider } from '../../context/GlobalState';
import IncomeExpenses from '../IncomeExpenses';
import { Balance } from '../Balance';
import './Dashboard.css'; 

export const Dashboard = () => {
  return (
    <GlobalProvider>
    <div className="container">
     <Balance/>
     <IncomeExpenses/>
     <TransactionList/>
     <AddTransaction/>
    </div>
    </GlobalProvider>
  );
};

export default Dashboard; 