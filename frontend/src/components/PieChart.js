import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // Import the Chart.js

export const API_URL = import.meta.env.MODE === 'development' 
  ? 'http://127.0.0.1:5000/auth' 
  : '/auth';

const PieChart = () => {
  const [transactions, setTransactions] = useState([]);
  const username = localStorage.getItem('username');

  useEffect(() => {
    // Fetch transactions for the provided username
    fetch(`${API_URL}/transactions?username=${username}`)
      .then((response) => response.json())
      .then((data) => setTransactions(data))
      .catch((error) => console.error('Error fetching transactions:', error));
  }, [username]);  // Dependency array includes username to avoid infinite loop

  // Function to group transactions by category and sum their amounts
  const groupByCategory = (transactions) => {
    const categoryTotals = {};

    transactions.forEach((transaction) => {
      const { text: category, amount } = transaction;

      // Ignore positive amount transactions (income)
      if (amount > 0) return; // Skip income transactions

      // If category already exists, add the amount; otherwise, initialize it
      if (categoryTotals[category]) {
        categoryTotals[category] += amount;
      } else {
        categoryTotals[category] = amount;
      }
    });

    return categoryTotals;
  };

  // Group transactions by category
  const categoryData = groupByCategory(transactions);

  // Extract the categories and total amounts
  const categories = Object.keys(categoryData);
  const amounts = Object.values(categoryData);

  // Define colors for the chart (ensure enough colors for all categories)
  const backgroundColors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
    '#FF9F40', '#66FF99', '#FF6666', '#C9CBCF', '#FFB6C1',
    '#8A2BE2', '#20B2AA', '#FFD700', '#DC143C',
  ];

  const data = {
    labels: categories,  // These are the grouped categories
    datasets: [
      {
        label: 'Expenses',
        data: amounts,  // These are the total amounts per category
        backgroundColor: backgroundColors.slice(0, categories.length),  // Assign colors
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <div>
      <h2>Expense Breakdown</h2>
      {transactions.length > 0 ? (
        <Pie data={data} options={options} />
      ) : (
        <p>No transactions found for this user.</p>
      )}
    </div>
  );
};

export default PieChart;
