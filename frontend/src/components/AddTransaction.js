import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState'; // Import GlobalContext for state management

// Define the AddTransaction component
export const AddTransaction = () => {
  // State variables to manage form inputs and transaction type
  const [category, setCategory] = useState(null); // Selected category
  const [amount, setAmount] = useState(0); // Amount for the transaction
  const [transactionType, setTransactionType] = useState('expense'); // State to determine if it's an expense or income
  const { addTransaction } = useContext(GlobalContext); // Access addTransaction function from context

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Create a new transaction object
    const newTransaction = {
      id: Math.floor(Math.random() * 100000000), // Generate a random ID for the transaction
      text: category ? category.label : '', // Set text to category label if selected
      amount: transactionType === 'expense' ? -Math.abs(amount) : Math.abs(amount), // Set amount based on transaction type
    };

    try {
      const username = localStorage.getItem('username'); // Retrieve username from localStorage
      // Send a POST request to add the new transaction
      const response = await fetch(`http://localhost:5000/auth/addtransactions?username=${username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Specify the content type
        },
        body: JSON.stringify(newTransaction), // Convert newTransaction to JSON
      });

      const data = await response.json(); // Parse response data

      if (response.ok) {
        addTransaction(data); // Add transaction to global state
        window.location.reload(); // Reload the page to see updates
      } else {
        console.error('Failed to add transaction:', data.error); // Log error if transaction fails
      }
    } catch (error) {
      console.error('Error:', error); // Log any other errors
    }
  };

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

  const [dropdownOpen, setDropdownOpen] = useState(false); // State to manage dropdown visibility

  // Handle category selection from the dropdown
  const handleSelect = (selectedCategory) => {
    setCategory(selectedCategory); // Update selected category
    setDropdownOpen(false); // Close the dropdown
  };

  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
        {/* Category selection */}
        <div className="form-control">
          <label htmlFor="category">Category</label>
          <div className="custom-dropdown">
            <div
              className="dropdown-header"
              onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle dropdown visibility
            >
              {category ? (
                <>
                  {category.icon} {category.label} {/* Display selected category */}
                </>
              ) : (
                'Select Category' // Placeholder if no category is selected
              )}
            </div>
            {dropdownOpen && (
              <div className="dropdown-list">
                {categories.map((cat) => (
                  <div
                    key={cat.value}
                    className="dropdown-item"
                    onClick={() => handleSelect(cat)} // Handle category selection
                  >
                    {cat.icon} {cat.label} {/* Display category with icon */}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Amount input */}
        <div className="form-control">
          <label htmlFor="amount">
            <strong>Amount</strong> <br />
            <span>Add a Transaction Amount Below</span>
          </label>
          <input
            type="number"
            value={amount} // Bind input value to amount state
            onChange={(e) => setAmount(e.target.value)} // Update amount state on input change
            placeholder="Enter amount..."
          />
        </div>

        {/* Transaction type selection */}
        <div className="form-control">
          <label>Transaction Type:</label><br />
          <input
            type="radio"
            id="expense"
            name="transactionType"
            value="expense"
            checked={transactionType === 'expense'} // Check if expense is selected
            onChange={() => setTransactionType('expense')} // Update transaction type
          />
          <label htmlFor="expense">Expense</label><br />
          <input
            type="radio"
            id="income"
            name="transactionType"
            value="income"
            checked={transactionType === 'income'} // Check if income is selected
            onChange={() => setTransactionType('income')} // Update transaction type
          />
          <label htmlFor="income">Income</label>
        </div>

        <button className="btn">Add transaction</button> {/* Submit button */}
      </form>
    </>
  );
};