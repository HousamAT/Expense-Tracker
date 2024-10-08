import React, { useEffect, useState } from 'react'; // Import React and hooks
import TransactionEditPopup from './TransactionEditPopup'; // Import the popup for editing transactions

const TransactionsOverview = () => {
  // State to manage transactions, loading state, and error messages
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch transactions from the server on component mount
  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true); // Start loading
      const username = localStorage.getItem('username'); // Retrieve username from local storage

      if (!username) {
        console.error('No username found in localStorage');
        setError('Username not found'); // Set error if username is missing
        return;
      }

      try {
        // Fetch transactions using the username
        const response = await fetch(`http://localhost:5000/auth/transactions?username=${username}`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch transactions'); // Handle fetch errors
        }

        const data = await response.json(); // Parse JSON response
        setTransactions(data); // Update state with fetched transactions
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setError(error.message); // Set error message in state
      } finally {
        setIsLoading(false); // End loading
      }
    };

    fetchTransactions(); // Call the fetch function
  }, []);

  // Calculate total balance from transactions
  const calculateTotal = () => {
    return transactions.reduce((acc, transaction) => acc + transaction.amount, 0).toFixed(2);
  };

  // Calculate total income from transactions
  const calculateIncome = () => {
    return transactions.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0).toFixed(2);
  };

  // Calculate total expenses from transactions
  const calculateExpense = () => {
    return transactions.filter(t => t.amount < 0).reduce((acc, t) => acc + t.amount * -1, 0).toFixed(2);
  };

  // Handle updating a transaction
  const handleUpdateTransaction = async (updatedTransaction) => {
    const username = localStorage.getItem('username');

    try {
      // Send PUT request to update the transaction
      const response = await fetch(`http://localhost:5000/auth/updatetransaction?username=${username}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTransaction), // Send updated transaction data
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update transaction');
      }

      const data = await response.json();
      // Update transactions in state based on updated transaction ID
      setTransactions(prev => prev.map(transaction => 
        transaction.id === updatedTransaction.id ? updatedTransaction : transaction
      ));
      console.log(data.message); // Log success message
      window.location.reload(); // Refresh the page

    } catch (error) {
      console.error('Error updating transaction:', error.message);
      // Optionally, display error message to the user
    }
  };

  // Render loading state, error, or transaction overview
  const renderContent = () => {
    if (isLoading) return <p>Loading...</p>; // Show loading message
    if (error) return <p>Error: {error}</p>; // Show error message

    // Render the balance, income/expenses, and transaction list
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
      {renderContent()} {/* Render the appropriate content */}
    </>
  );
};

export default TransactionsOverview; // Export the component for use in other files

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
  return category ? category.icon : <i className="fas fa-question"></i>; // Default icon if category not found
};

// List of transactions
const TransactionList = ({ transactions, onUpdate }) => {
  // Handle deletion of a transaction
  const handleDeleteTransaction = async (transactionId) => {
    const username = localStorage.getItem('username');

    try {
      // Send DELETE request to remove the transaction
      const response = await fetch(`http://localhost:5000/auth/deletetransaction?username=${username}&id=${transactionId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete transaction');
      }

      const data = await response.json(); // Parse response
      window.location.reload(); // Refresh page to update transaction list

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
            onUpdate={onUpdate} // Pass onUpdate function to child
          />
        ))}
      </ul>
    </>
  );
};

// Individual transaction component
const Transaction = ({ transaction, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false); // State to manage editing mode

  // Handle update for the transaction
  const handleUpdate = (updatedTransaction) => {
    onUpdate(updatedTransaction); // Call the onUpdate prop function
    setIsEditing(false); // Exit editing mode
  };

  return (
    <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
      {getIconForTransaction(transaction.text)} {/* Display transaction icon */}
      {transaction.text} <span>{transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount)}</span>

      <div className="transaction-options">
        <i className="fas fa-edit" onClick={() => setIsEditing(true)}></i> {/* Edit Icon */}
        <i className="fas fa-trash-alt" onClick={onDelete}></i> {/* Delete Icon */}
      </div>

      {isEditing && (
        <TransactionEditPopup
          transaction={transaction}
          onClose={() => setIsEditing(false)} // Close popup
          onUpdate={handleUpdate} // Pass handleUpdate function
        />
      )}
    </li>
  );
};
