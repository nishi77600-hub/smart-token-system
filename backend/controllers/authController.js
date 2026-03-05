const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    res.json({
        message: "User registered successfully",
        user: { name, email }
    });
};

exports.login = async (req, res) => {
    const { email } = req.body;

    const token = jwt.sign(
        { email: email },
        "SECRETKEY",
        { expiresIn: "1d" }
    );

    res.json({
        message: "Login successful",
        token: token
    });
};