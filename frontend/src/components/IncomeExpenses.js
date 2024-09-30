// import React, { useContext } from 'react';

// export const IncomeExpenses = () => {
  

//   return (
//     <div className="inc-exp-container">
//         <div>
//           <h4>Income</h4>
//   <p className="money plus">100</p>
//         </div>
//         <div>
//           <h4>Expense</h4>
//   <p className="money minus">100</p>
//         </div>
//     </div>
//   )
// }

// export default IncomeExpenses;

import React, { useState, useEffect } from 'react';

export const IncomeExpenses = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const username = localStorage.getItem('username');
      try {
        const response = await fetch(`http://localhost:5000/auth/transactions?username=${username}`, {
          method: 'GET',
          credentials: 'include',
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch transactions');
        }

        const data = await response.json();
        setTransactions(data);  // Store the fetched transactions
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  // Calculate total income and expenses
  const amounts = transactions.map(transaction => transaction.amount);

  const income = amounts
    .filter(amount => amount > 0)
    .reduce((acc, amount) => (acc += amount), 0)
    .toFixed(2);

  const expense = amounts
    .filter(amount => amount < 0)
    .reduce((acc, amount) => (acc += amount), 0)
    .toFixed(2) * -1;

  return (
    <div className="inc-exp-container">
      <div>
        <h4>Income</h4>
        <p className="money plus">${income}</p>
      </div>
      <div>
        <h4>Expense</h4>
        <p className="money minus">${expense}</p>
      </div>
    </div>
  );
};

export default IncomeExpenses;
