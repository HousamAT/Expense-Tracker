// import React from 'react';
// import { AddTransaction } from '../AddTransaction';
// import { GlobalProvider } from '../../context/GlobalState'; 
// import TransactionsOverview from '../TransactionsOverview'; 
// import './Dashboard.css'; 

// export const Dashboard = () => {
//   return (
//     <GlobalProvider>
//       <div className="container">
//         <TransactionsOverview /> 
//         <AddTransaction /> 
//       </div>
//     </GlobalProvider>
//   );
// };

// export default Dashboard;


import React from 'react';
import { AddTransaction } from '../AddTransaction';
import { GlobalProvider } from '../../context/GlobalState'; 
import TransactionsOverview from '../TransactionsOverview'; 
import './Dashboard.css'; 

export const Dashboard = () => {
  return (
    <GlobalProvider>
      <div className="dashboard-container">
        <div className="overview-section">
          <TransactionsOverview /> 
        </div>
        <div className="transaction-section">
          <AddTransaction /> 
        </div>
      </div>
    </GlobalProvider>
  );
};

export default Dashboard;




