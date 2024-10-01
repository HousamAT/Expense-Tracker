import React, { useEffect, useState } from 'react';

const Transaction = ({ text, amount }) => (
  <li className={amount < 0 ? 'minus' : 'plus'}>
    {text} <span>{amount < 0 ? '-' : '+'}${Math.abs(amount).toFixed(2)}</span>
  </li>
);

const TransactionsOverview = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true); // Set loading state

      const username = localStorage.getItem('username');
      if (!username) {
        console.error('No username found in localStorage');
        setError('Username not found'); // Set error message
        return;
      }

      try {
        console.log('I am getting called');
        const response = await fetch(`http://localhost:5000/auth/transactions?username=${username}`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch transactions');
        }

        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setError(error.message); // Set error message from the exception
      } finally {
        setIsLoading(false); // Always clear loading state
      }
    };

    fetchTransactions();
  }, []);

  const calculateTotal = () => {
    if (!transactions.length) return 0; // Handle empty transactions array
    return transactions.reduce((acc, transaction) => acc + transaction.amount, 0).toFixed(2);
  };

  const calculateIncome = () => transactions.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0).toFixed(2);

  const calculateExpense = () => transactions.filter(t => t.amount < 0).reduce((acc, t) => acc + t.amount * -1, 0).toFixed(2); // Corrected calculation

  const renderContent = () => {
    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>Error: {error}</p>;
    }

    return (
      <>
        <Balance total={calculateTotal()} />
        <IncomeExpenses income={calculateIncome()} expense={calculateExpense()} />
        <TransactionList transactions={transactions} />
      </>
    );
  };

  return (
    <>
      {renderContent()}
    </>
  );
};

export default TransactionsOverview;

// Separate Balance component (optional)
const Balance = ({ total }) => (
  <>
    <h4>Your Balance</h4>
    <h1>${total}</h1>
  </>
);

// Separate IncomeExpenses component (optional)
const IncomeExpenses = ({ income, expense }) => (
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

// Separate TransactionList component (optional)
const TransactionList = ({ transactions }) => (
  <>
    <h3>History</h3>
    <ul className="list">
      {transactions.map(transaction => (
        <Transaction key={transaction.id} text={transaction.text} amount={transaction.amount} />
      ))}
    </ul>
  </>
);
