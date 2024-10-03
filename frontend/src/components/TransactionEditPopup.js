import React, { useState } from 'react';
import './TransactionEditPopup.css';

const TransactionEditPopup = ({ transaction, onClose, onUpdate }) => {
  const [amount, setAmount] = useState(transaction.amount);
  const [text, setText] = useState(transaction.text);

  const handleSubmit = (e) => {
    e.preventDefault();
    

    const updatedTransaction = {
      id: transaction.id,
      amount: parseFloat(amount),
      text,
    };

    onUpdate(updatedTransaction);
    onClose(); 
  };

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
    <div className="popup">
      <div className="popup-content">
        <h2>Edit Transaction</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Amount:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </label>
          <label>
            Category:
            <select value={text} onChange={(e) => setText(e.target.value)} required>
              {/* Map over categories to create options */}
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">Update</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default TransactionEditPopup;
