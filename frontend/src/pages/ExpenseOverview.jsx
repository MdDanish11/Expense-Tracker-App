import React, { useEffect, useState } from "react";
import axios from "axios";

const ExpenseOverview = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/expenses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExpenses(response.data);
      } catch (error) {
        console.error("Failed to fetch expenses:", error);
        alert("Failed to fetch expenses. Please try again.");
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div>
      <h1>Expense Overview</h1>
      <ul>
        {expenses.map((expense) => (
          <li key={expense._id}>
            {expense.title} - ${expense.amount} ({expense.category})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseOverview;