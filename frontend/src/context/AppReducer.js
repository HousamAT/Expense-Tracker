// Reducer function to manage transactions state
export default (state, action) => {
  // Switch statement to handle different action types
  switch(action.type) {
    // Action to delete a transaction
    case 'DELETE_TRANSACTION':
      return {
        ...state, // Spread the current state
        transactions: state.transactions.filter(transaction => transaction.id !== action.payload) // Filter out the transaction to be deleted
      };
    
    // Action to add a new transaction
    case 'ADD_TRANSACTION':
      return {
        ...state, // Spread the current state
        transactions: [action.payload, ...state.transactions] // Add the new transaction at the beginning of the array
      };

    // Default case to return the current state if no action matches
    default:
      return state;
  }
};
