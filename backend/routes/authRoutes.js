const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", authController.register);

router.post("/login", authController.login);

router.get("/profile", authMiddleware, (req, res) => {
    res.send("Protected profile route");
});

module.exports = router;