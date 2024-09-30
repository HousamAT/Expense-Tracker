// import React from 'react';
// import {TransactionList} from '../TransactionList';
// import{AddTransaction} from '../AddTransaction';
// import { GlobalProvider } from '../../context/GlobalState';
// import IncomeExpenses from '../IncomeExpenses';
// import { Balance } from '../Balance';
// import './Dashboard.css'; 

// export const Dashboard = () => {
//   return (
//     <GlobalProvider>
//     <div className="container">
//      <Balance/>
//      <IncomeExpenses/>
//      <TransactionList/>
//      <AddTransaction/>
//     </div>
//     </GlobalProvider>
//   );
// };

// export default Dashboard; 

import React from 'react';
import { AddTransaction } from '../AddTransaction';
import { GlobalProvider } from '../../context/GlobalState';  // You can still keep this if needed for other parts of your app
import TransactionsOverview from '../TransactionsOverview';  // Import your new Combined.js
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
