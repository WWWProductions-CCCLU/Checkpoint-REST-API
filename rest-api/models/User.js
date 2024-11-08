// models/User.js

const mongoose = require("mongoose");

// Define the User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  email: { type: String, required: true, unique: true },
});

// Export the User model
const User = mongoose.model("User", userSchema);
module.exports = User;
