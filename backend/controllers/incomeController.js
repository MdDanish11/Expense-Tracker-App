const Income = require("../models/Income");

// Add Income
exports.addIncome = async (req, res) => {
  const { month, year, amount } = req.body;
  try {
    const income = new Income({
      userId: req.userId,
      month,
      year,
      amount,
    });
    await income.save();
    res.status(201).json(income);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lock Income
exports.lockIncome = async (req, res) => {
  const { id } = req.params;
  try {
    const income = await Income.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { isLocked: true },
      { new: true }
    );
    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }
    res.json(income);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Income
exports.getIncome = async (req, res) => {
  try {
    const income = await Income.find({ userId: req.userId });
    res.json(income);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};