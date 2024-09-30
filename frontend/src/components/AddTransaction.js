import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const AddTransaction = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);
  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: +amount
    };

    try {
      const username = localStorage.getItem('username');
      // Replace 'your-backend-url' with the actual backend URL
      const response = await fetch(`http://localhost:5000/auth/addtransactions?username=${username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTransaction),
      });

      const data = await response.json();

      if (response.ok) {
        // Assuming the GlobalContext is used to update your frontend
        addTransaction(data);
        window.location.reload(); 
      } else {
        console.error('Failed to add transaction:', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Category</label>
          <input
            list="categories"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter or select a category"
          />
          <datalist id="categories">
            <option value="Groceries" />
            <option value="Rent" />
            <option value="Entertainment" />
            <option value="Salary" />
          </datalist>
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
}
