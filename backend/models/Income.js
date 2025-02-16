const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  isLocked: {
    type: Boolean,
    default: false, // Ensuring default value
  },
});

const Income = mongoose.model("Income", incomeSchema);
module.exports = Income;
