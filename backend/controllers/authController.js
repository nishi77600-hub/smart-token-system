const User = require("../models/user");

exports.register = async (req, res) => {
  try {

    const { name, email, password, role } = req.body;

    const newUser = new User({
      name,
      email,
      password,
      role
    });

    console.log("Saving user:", newUser);

    await newUser.save();

    res.json({
      message: "User registered successfully",
      user: {
        name: newUser.name,
        email: newUser.email
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};