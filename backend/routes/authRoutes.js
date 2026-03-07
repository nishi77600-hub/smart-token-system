const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

// test route
router.get("/test", (req, res) => {
    res.send("Auth route working");
});

// register
router.post("/register", authController.register);

// login
//router.post("/login", authController.login);

// protected route
router.get("/profile", authMiddleware, (req, res) => {
    res.send("Protected profile route");
});

module.exports = router;