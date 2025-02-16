const express = require("express");
const router = express.Router();
const {
  addExpense,
  getExpenses,
  editExpense,
  deleteExpense,
} = require("../controllers/expenseController");
const authMiddleware = require("../middleware/authMiddleware");

// Protected Routes
router.post("/", authMiddleware, addExpense);
router.get("/", authMiddleware, getExpenses);
router.put("/:id", authMiddleware, editExpense);
router.delete("/:id", authMiddleware, deleteExpense);

module.exports = router;