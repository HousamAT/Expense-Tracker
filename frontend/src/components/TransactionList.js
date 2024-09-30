import React, { useEffect, useState } from 'react';
import { Transaction } from './Transaction';

export const TransactionList = () => {
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
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();  // Call the function when the component loads
  }, []);

  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {transactions.map(transaction => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
      </ul>
    </>
  );
};

