import React, { useState } from "react";
import axios from "axios";

const AddIncome = () => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!month || !year || !amount) {
      alert("All fields are required");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/income",
        { month, year, amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Income added successfully!");
    } catch (error) {
      console.error("Failed to add income:", error);
      alert("Failed to add income. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <button type="submit">Add Income</button>
    </form>
  );
};

export default AddIncome;