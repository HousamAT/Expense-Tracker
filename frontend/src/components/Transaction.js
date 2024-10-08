import React, { useContext } from 'react'; // Import React and useContext hook
import { GlobalContext } from '../context/GlobalState'; // Import GlobalContext for state management

export const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext); // Extract deleteTransaction function from context

  // Determine the sign based on the transaction amount
  const sign = transaction.amount < 0 ? '-' : '+'; 

  return (
    <li className={transaction.amount < 0 ? 'minus' : 'plus'}> {/* Apply class based on transaction amount */}
      {transaction.text} {/* Display transaction text */}
      <span>
        {sign}${Math.abs(transaction.amount)} {/* Display amount with sign */}
      </span>
      <button 
        onClick={() => deleteTransaction(transaction.id)} // Call deleteTransaction on button click
        className="delete-btn" 
      >
        x {/* Button text for deleting the transaction */}
      </button>
    </li>
  );
};
