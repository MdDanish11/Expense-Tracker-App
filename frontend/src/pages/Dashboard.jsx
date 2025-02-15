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
        const response = await axios.get("/api/monthly-summary");
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
    </div>
  );
};

export default Dashboard;