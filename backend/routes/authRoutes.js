const express = require("express");
const { body, validationResult } = require("express-validator");
const { signup, login } = require("../controllers/authController");

const router = express.Router();

router.post(
  "/signup",
  [
    body("username").isLength({ min: 3 }).withMessage("Username must be at least 3 characters long"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  ],
  async (req, res) => {
    console.log("Signup Request Body:", req.body); // Debugging line
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    signup(req, res);
  }
);

router.post(
  "/login",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    login(req, res);
  }
);

module.exports = router;
