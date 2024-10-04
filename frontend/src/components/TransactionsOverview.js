import React, { useEffect, useState } from 'react';
import TransactionEditPopup from './TransactionEditPopup';

// export const API_URL = import.meta.env.MODE === 'development' 
//   ? 'http://127.0.0.1:5000/auth' 
//   : '/auth';

export const API_URL = '/auth';

const TransactionsOverview = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch transactions on component mount
  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      const username = localStorage.getItem('username');

      if (!username) {
        console.error('No username found in localStorage');
        setError('Username not found');
        return;
      }

      try {
        const response = await fetch(`${API_URL}/transactions?username=${username}`, {
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
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // Calculate total, income, and expense
  const calculateTotal = () => {
    return transactions.reduce((acc, transaction) => acc + transaction.amount, 0).toFixed(2);
  };

  const calculateIncome = () => {
    return transactions.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0).toFixed(2);
  };

  const calculateExpense = () => {
    return transactions.filter(t => t.amount < 0).reduce((acc, t) => acc + t.amount * -1, 0).toFixed(2);
  };

  // Update a transaction
  const handleUpdateTransaction = async (updatedTransaction) => {
    const username = localStorage.getItem('username');

    try {
      const response = await fetch(`${API_URL}/updatetransaction?username=${username}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTransaction),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update transaction');
      }

      const data = await response.json();
      setTransactions(prev => prev.map(transaction =>
        transaction.id === updatedTransaction.id ? updatedTransaction : transaction
      ));
      console.log(data.message);
      window.location.reload();

    } catch (error) {
      console.error('Error updating transaction:', error.message);
    }
  };

  // Render loading state, error, or transaction overview
  const renderContent = () => {
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
      <>
        <Balance total={calculateTotal()} />
        <IncomeExpenses income={calculateIncome()} expense={calculateExpense()} />
        <TransactionList transactions={transactions} onUpdate={handleUpdateTransaction} />
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

// Balance component to display the total balance
const Balance = ({ total }) => (
  <>
    <h4>Your Balance</h4>
    <h1>${total}</h1>
  </>
);

// Income and expenses component
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

// Transaction categories and icons
const categories = [
  { value: 'Groceries', label: 'Groceries', icon: <i className="fas fa-shopping-basket"></i> },
  { value: 'Takeaway', label: 'Takeaway', icon: <i className="fas fa-utensils"></i> },
  { value: 'Clothing', label: 'Clothing', icon: <i className="fas fa-tshirt"></i> },
  { value: 'Books', label: 'Books', icon: <i className="fas fa-book"></i> },
  { value: 'Rent', label: 'Rent', icon: <i className="fas fa-home"></i> },
  { value: 'Car', label: 'Car', icon: <i className="fas fa-car"></i> },
  { value: 'Dining Out', label: 'Dining Out', icon: <i className="fas fa-utensils"></i> },
  { value: 'Travel', label: 'Travel', icon: <i className="fas fa-plane"></i> },
  { value: 'Healthcare', label: 'Healthcare', icon: <i className="fas fa-hospital"></i> },
  { value: 'Education', label: 'Education', icon: <i className="fas fa-university"></i> },
  { value: 'Utilities', label: 'Utilities', icon: <i className="fas fa-lightbulb"></i> },
  { value: 'Salary', label: 'Salary', icon: <i className="fas fa-money-bill-wave"></i> },
  { value: 'Savings', label: 'Savings', icon: <i className="fas fa-piggy-bank"></i> },
  { value: 'Business', label: 'Business', icon: <i className="fas fa-briefcase"></i> },
];

// Function to get the appropriate icon for a transaction
const getIconForTransaction = (text) => {
  const category = categories.find((cat) => cat.value === text);
  return category ? category.icon : <i className="fas fa-question"></i>;
};

// List of transactions
const TransactionList = ({ transactions, onUpdate }) => {
  const handleDeleteTransaction = async (transactionId) => {
    const username = localStorage.getItem('username');

    try {
      const response = await fetch(`${API_URL}/deletetransaction?username=${username}&id=${transactionId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete transaction');
      }

      const data = await response.json();
      window.location.reload();

    } catch (error) {
      console.error('Error deleting transaction:', error.message);
    }
  };

  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {transactions.map(transaction => (
          <Transaction
            key={transaction.id}
            transaction={transaction}
            onDelete={() => handleDeleteTransaction(transaction.id)}
            onUpdate={onUpdate}
          />
        ))}
      </ul>
    </>
  );
};

// Individual transaction component
const Transaction = ({ transaction, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = (updatedTransaction) => {
    onUpdate(updatedTransaction);
    setIsEditing(false);
  };

  return (
    <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
      {getIconForTransaction(transaction.text)}
      {transaction.text} <span>{transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount)}</span>

      <div className="transaction-options">
        <i className="fas fa-edit" onClick={() => setIsEditing(true)}></i> {/* Edit Icon */}
        <i className="fas fa-trash-alt" onClick={onDelete}></i> {/* Delete Icon */}
      </div>

      {isEditing && (
        <TransactionEditPopup
          transaction={transaction}
          onClose={() => setIsEditing(false)}
          onUpdate={handleUpdate}
        />
      )}
    </li>
  );
};
