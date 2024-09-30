// import React, {useContext} from 'react'
// import { GlobalContext } from '../context/GlobalState';
// export const Balance = () => {
//   const { transactions } = useContext(GlobalContext);
//   const amounts = transactions.map(transaction => transaction.amount);

//   const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
//     return (
//         <>
//         <h4>Your Balance</h4>
//     <h1>${total}</h1>
//         </>
//     )
// }

import React, { useState, useEffect } from 'react';

export const Balance = () => {
  const [transactions, setTransactions] = useState([]);

  // Fetch transactions from the backend API
  useEffect(() => {
    const fetchTransactions = async () => {
      const username = localStorage.getItem('username');  // Retrieve username from localStorage
      
      if (!username) {
        console.error('No username found in localStorage');
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/auth/transactions?username=${username}`, {
          method: 'GET',
          credentials: 'include',  // Send cookies with the request
        });

        if (!response.ok) {
          throw new Error('Failed to fetch transactions');
        }

        const data = await response.json();
        setTransactions(data);  // Store fetched transactions
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();  // Call the function when the component loads
  }, []);

  // Calculate the total balance
  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts
    .reduce((acc, item) => (acc += item), 0)  // Sum all amounts (income and expenses)
    .toFixed(2);

  return (
    <>
      <h4>Your Balance</h4>
      <h1>${total}</h1> {/* Display the total balance */}
    </>
  );
}

export default Balance;

