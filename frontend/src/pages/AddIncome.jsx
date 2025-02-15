import React, { useState } from "react";
import axios from "axios";

const AddIncome = () => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/income", { month, year, amount });
      alert("Income added successfully!");
    } catch (error) {
      console.error("Failed to add income:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      />
      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button type="submit">Add Income</button>
    </form>
  );
};

export default AddIncome;