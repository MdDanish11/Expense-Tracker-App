import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./pages/Dashboard";
import ExpenseOverview from "./pages/ExpenseOverview";
import AddExpense from "./pages/AddExpense"; // ✅ Import AddExpense page
import AddIncome from "./pages/AddIncome"; // ✅ Import AddIncome page
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/expenses" element={<ExpenseOverview />} />
            <Route path="/add-expense" element={<AddExpense />} /> {/* ✅ Add route */}
            <Route path="/add-income" element={<AddIncome />} /> {/* ✅ Add route */}
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
