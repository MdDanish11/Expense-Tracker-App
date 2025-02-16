const Expense = require("../models/Expense");

// Add Expense
exports.addExpense = async (req, res) => {
  const { title, amount, category, date } = req.body;
  try {
    const expense = new Expense({
      userId: req.userId,
      title,
      amount,
      category,
      date,
    });
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Expenses
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.userId });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Edit Expense
exports.editExpense = async (req, res) => {
  const { id } = req.params;
  const { title, amount, category, date } = req.body;
  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { title, amount, category, date },
      { new: true }
    );
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Expense
exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await Expense.findOneAndDelete({ _id: id, userId: req.userId });
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json({ message: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};