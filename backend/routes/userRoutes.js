const express = require('express');
const { registerUser, getUsers, getUserProfile,getUserRecipes } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.get('/', getUsers); // Optional: List users for testing
// Route to get user profile
router.get('/profile', protect, getUserProfile);

// Route to get user recipes
router.get('/recipes', protect, getUserRecipes);

module.exports = router;
