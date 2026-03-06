const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  tokenNumber: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["waiting", "in process", "completed"],
    default: "waiting"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Token", tokenSchema);