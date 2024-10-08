import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer'; // Import the reducer for managing state

// Initial state for the global context
const initialState = {
  transactions: [], // Initialize with an empty transactions array
};

// Create a context with the initial state
export const GlobalContext = createContext(initialState);

// Provider component for the global context
export const GlobalProvider = ({ children }) => {
  // Use the useReducer hook to manage state and dispatch actions
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Action to delete a transaction by ID
  function deleteTransaction(id) {
    dispatch({
      type: 'DELETE_TRANSACTION', // Action type for deletion
      payload: id, // ID of the transaction to delete
    });
  }

  // Action to add a new transaction
  function addTransaction(transaction) {
    dispatch({
      type: 'ADD_TRANSACTION', // Action type for addition
      payload: transaction, // Transaction data to add
    });
  }

  // Provide state and actions to the context consumers
  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions, // Provide the current transactions from state
        deleteTransaction, // Provide the delete function
        addTransaction, // Provide the add function
      }}
    >
      {children} {/* Render children components */}
    </GlobalContext.Provider>
  );
};
