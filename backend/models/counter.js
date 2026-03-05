const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  counterNumber: Number,
  currentToken: Number,
  status: {
    type: String,
    enum: ["open", "closed"],
    default: "open"
  }
});

module.exports = mongoose.model("Counter", counterSchema);