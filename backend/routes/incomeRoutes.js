const express = require("express");
const router = express.Router();
const {
  addIncome,
  lockIncome,
  getIncome,
} = require("../controllers/incomeController");
const authMiddleware = require("../middleware/authMiddleware");

// Protected Routes
router.post("/", authMiddleware, addIncome);
router.put("/:id/lock", authMiddleware, lockIncome);
router.get("/", authMiddleware, getIncome);

module.exports = router;