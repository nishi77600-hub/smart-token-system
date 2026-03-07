const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({

  tokenNumber:{
    type:Number,
    required:true
  },

  service:{
    type:String,
    enum:["ATM","Dispensary","Accounts"]
  },

  email:{
    type:String
  },

  status:{
    type:String,
    default:"waiting"
  },

  createdAt:{
    type:Date,
    default:Date.now
  }

});

module.exports = mongoose.model("Token",tokenSchema);