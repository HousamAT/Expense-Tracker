import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const AddTransaction = () => {
  const [category, setCategory] = useState(null);
  const [amount, setAmount] = useState(0);
  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text: category ? category.label : '', 
      amount: +amount, 
    };

    try {
      const username = localStorage.getItem('username');
      const response = await fetch(`http://localhost:5000/auth/addtransactions?username=${username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTransaction),
      });

      const data = await response.json();

      if (response.ok) {
        addTransaction(data);
        window.location.reload();
      } else {
        console.error('Failed to add transaction:', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
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

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSelect = (selectedCategory) => {
    setCategory(selectedCategory);
    setDropdownOpen(false); // Close dropdown after selection
  };

  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="category">Category</label>
          <div className="custom-dropdown">
            <div
              className="dropdown-header"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {category ? (
                <>
                  {category.icon} {category.label}
                </>
              ) : (
                'Select Category'
              )}
            </div>
            {dropdownOpen && (
              <div className="dropdown-list">
                {categories.map((cat) => (
                  <div
                    key={cat.value}
                    className="dropdown-item"
                    onClick={() => handleSelect(cat)}
                  >
                    {cat.icon} {cat.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="form-control">
          <label htmlFor="amount">
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
          />
        </div>

        <button className="btn">Add transaction</button>
      </form>
    </>
  );
};

