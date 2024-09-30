import React, { useEffect, useState } from 'react';

// Component to display the total balance
const Balance = ({ transactions }) => {
  const amounts = transactions.map(transaction => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  return (
    <>
      <h4>Your Balance</h4>
      <h1>${total}</h1>
    </>
  );
};

// Component to display income and expenses
const IncomeExpenses = ({ transactions }) => {
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

// Component to display the list of transactions
const TransactionList = ({ transactions }) => {
  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {transactions.map(transaction => (
          <li key={transaction.id} className={transaction.amount < 0 ? 'minus' : 'plus'}>
            {transaction.text} <span>{transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount)}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

// Main consolidated component that fetches transactions and passes them to child components
const TransactionsOverview = () => {
  console.log("I am getting callled transactions")
  const [transactions, setTransactions] = useState([]);

  // Fetch transactions from the backend API
  useEffect(() => {
    const fetchTransactions = async () => {
      const username = localStorage.getItem('username');
      if (!username) {
        console.error('No username found in localStorage');
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/auth/transactions?username=${username}`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch transactions');
        }

        const data = await response.json();
        setTransactions(data);  // Store fetched transactions in state
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();  // Fetch transactions when component mounts
  }, []);

  return (
    <>
      <Balance transactions={transactions} />  {/* Pass transactions to Balance */}
      <IncomeExpenses transactions={transactions} />  {/* Pass transactions to IncomeExpenses */}
      <TransactionList transactions={transactions} />  {/* Pass transactions to TransactionList */}
    </>
  );
};

export default TransactionsOverview;
