const User = require('../models/User');
const Recipe = require("../models/RecipeInfo")
const bcrypt = require('bcryptjs');


// Register a new user
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  const lowercaseUsername = username.toLowerCase();

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username:lowercaseUsername, email, password: hashedPassword });
    await user.save();
    console.log("successful")

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all users (for testing)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
    
  }
};


// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    // Assuming the user is attached to the request via the protect middleware
    const user = req.user;
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ name: user.username, email: user.email });
  } catch (error) {
    
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get user recipes
exports.getUserRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ userid: req.user._id });  // Assuming Recipe model exists
    res.json(recipes);
  } catch (error) {
   
    res.status(500).json({ message: 'Server error', error });
  }
};
