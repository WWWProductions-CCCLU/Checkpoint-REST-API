// server.js

// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Configure environment variables
dotenv.config({ path: "./config/.env" });

// Initialize the Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Define routes here...

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// STEP 6 : GET

// server.js (Add this route)

const User = require("./models/User");

// GET: Return all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// STEP 7 : POST

// server.js (Add this route)

// POST: Add a new user to the database
app.post("/users", async (req, res) => {
  const user = new User({
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// STEP 8 : PUT

// server.js (Add this route)

// PUT: Edit a user by ID
app.put("/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// STEP 9 : DELETE

// server.js (Add this route)

// DELETE: Remove a user by ID
app.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndRemove(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
