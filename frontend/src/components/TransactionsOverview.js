import React, { useEffect, useState } from 'react';


const TransactionsOverview = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true); // Set loading state

      const username = localStorage.getItem('username');
      if (!username) {
        console.error('No username found in localStorage');
        setError('Username not found'); 
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
        setError(error.message); 
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

  const calculateExpense = () => transactions.filter(t => t.amount < 0).reduce((acc, t) => acc + t.amount * -1, 0).toFixed(2); 

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

// Separate Balance component 
const Balance = ({ total }) => (
  <>
    <h4>Your Balance</h4>
    <h1>${total}</h1>
  </>
);

// Separate IncomeExpenses component
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


// Define categories with FontAwesome icons
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

// Map text to corresponding icon based on categories
const getIconForTransaction = (text) => {
  const category = categories.find((cat) => cat.value === text);
  return category ? category.icon : <i className="fas fa-question"></i>; // Default icon if no match
};



const TransactionList = ({ transactions }) => {
  const handleDeleteTransaction = async (transactionId) => {
    const username = localStorage.getItem('username'); // Replace with the actual username from your app's state

    try {
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

      const data = await response.json();
      window.location.reload();
      console.log(data.message); // Successfully deleted message

      // Update the local state to remove the deleted transaction from the UI
      // Example: setTransactions(prev => prev.filter(transaction => transaction.id !== transactionId));

    } catch (error) {
      console.error('Error deleting transaction:', error.message);
      // Optionally, display error message to the user
    }
  };

  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {transactions.map(transaction => (
          <Transaction 
            key={transaction.id} 
            text={transaction.text} 
            amount={transaction.amount} 
            onDelete={() => handleDeleteTransaction(transaction.id)} // Pass delete function
          />
        ))}
      </ul>
    </>
  );
};


// Transaction component
const Transaction = ({ text, amount, onDelete }) => {
  return (
    <li className={amount < 0 ? 'minus' : 'plus'}>
      {getIconForTransaction(text)} {/* Get the icon based on the transaction text */}
      {text} <span>{amount < 0 ? '-' : '+'}${Math.abs(amount)}</span>

      {/* Icons for edit and delete (visible on hover) */}
      <div className="transaction-options">
        <i className="fas fa-edit"></i> {/* Edit Icon */}
        <i 
          className="fas fa-trash-alt" 
          onClick={onDelete} // Call the delete function on click
          style={{ cursor: 'pointer' }} // Change cursor to pointer for better UX
        ></i> {/* Delete Icon */}
      </div>
    </li>
  );
};
