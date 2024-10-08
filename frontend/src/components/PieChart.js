import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2'; // Import Pie chart from react-chartjs-2
import 'chart.js/auto'; // Import Chart.js for automatic registration of components

const PieChart = () => {
  const [transactions, setTransactions] = useState([]); // State to hold transactions
  const username = localStorage.getItem('username'); // Retrieve username from localStorage

  useEffect(() => {
    // Fetch transactions for the provided username
    fetch(`http://localhost:5000/auth/transactions?username=${username}`)
      .then((response) => response.json()) // Parse JSON response
      .then((data) => setTransactions(data)) // Update state with fetched data
      .catch((error) => console.error('Error fetching transactions:', error)); // Handle errors
  }, [username]); // Dependency array includes username to avoid infinite loop

  // Function to group transactions by category and sum their amounts
  const groupByCategory = (transactions) => {
    const categoryTotals = {}; // Object to hold category totals

    transactions.forEach((transaction) => {
      const { text: category, amount } = transaction; // Destructure category and amount

      // Ignore positive amount transactions (income)
      if (amount > 0) return; // Skip income transactions

      // If category already exists, add the amount; otherwise, initialize it
      if (categoryTotals[category]) {
        categoryTotals[category] += amount; // Accumulate expenses
      } else {
        categoryTotals[category] = amount; // Initialize category total
      }
    });

    return categoryTotals; // Return the category totals
  };

  // Group transactions by category
  const categoryData = groupByCategory(transactions);

  // Extract the categories and total amounts for chart data
  const categories = Object.keys(categoryData); // Get category names
  const amounts = Object.values(categoryData); // Get total amounts for each category

  // Define colors for the chart
  const backgroundColors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
    '#FF9F40', '#66FF99', '#FF6666', '#C9CBCF', '#FFB6C1',
    '#8A2BE2', '#20B2AA', '#FFD700', '#DC143C',
  ];

  // Prepare data for the Pie chart
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

  // Options for the Pie chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom', // Position of the legend
      },
    },
  };

  return (
    <div>
      <h2>Expense Breakdown</h2>
      {transactions.length > 0 ? ( // Check if there are transactions to display
        <Pie data={data} options={options} /> // Render Pie chart
      ) : (
        <p>No transactions found for this user.</p> // Message when no transactions exist
      )}
    </div>
  );
};

export default PieChart; // Export the PieChart component
