import React, { useEffect, useState } from "react";
import axios from "axios";
import ExpenseChart from "../components/ExpenseChart";
import ExpenseBarChart from "../components/ExpenseBarChart";

const Dashboard = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    values: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/monthly-summary", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { income, expenses } = response.data;

        setChartData({
          labels: ["Income", "Expenses"],
          values: [income, expenses],
        });
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <ExpenseChart data={chartData} />
      <ExpenseBarChart data={chartData} />
    </div>
  );
};

export default Dashboard;
