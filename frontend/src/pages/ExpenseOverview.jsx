import React, { useEffect, useState } from "react";
import axios from "axios";

const ExpenseOverview = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/expenses");
        setExpenses(response.data);
      } catch (error) {
        console.error("Failed to fetch expenses:", error);
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