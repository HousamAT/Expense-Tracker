import React, { useState } from 'react'; // Import React and useState hook
import './TransactionEditPopup.css'; 

const TransactionEditPopup = ({ transaction, onClose, onUpdate }) => {
  // State to manage the amount and text from the transaction
  const [amount, setAmount] = useState(transaction.amount);
  const [text, setText] = useState(transaction.text);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Create an updated transaction object
    const updatedTransaction = {
      id: transaction.id,
      amount: parseFloat(amount), // Parse the amount as a float
      text,
    };

    // Call the onUpdate function to update the transaction
    onUpdate(updatedTransaction);
    onClose(); // Close the popup after updating
  };

  // Define available categories for the transaction
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

  return (
    <div className="popup"> {/* Main container for the popup */}
      <div className="popup-content"> {/* Container for popup content */}
        <h2>Edit Transaction</h2>
        <form onSubmit={handleSubmit}> {/* Form for editing transaction */}
          <label>
            Amount: 
            <input
              type="number"
              value={amount} // Bind amount state to input value
              onChange={(e) => setAmount(e.target.value)} // Update state on change
              required // Make the field required
            />
          </label>
          <label>
            Category: {/* Label for category selection */}
            <select value={text} onChange={(e) => setText(e.target.value)} required> {/* Bind text state to select value */}
              {/* Map over categories to create options */}
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">Update</button> {/* Submit button for the form */}
          <button type="button" onClick={onClose}>Cancel</button> {/* Cancel button to close popup */}
        </form>
      </div>
    </div>
  );
};

export default TransactionEditPopup; // Export the component for use in other files
