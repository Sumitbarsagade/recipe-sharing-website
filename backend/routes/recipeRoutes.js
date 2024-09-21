const express = require('express');
const {
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipes,
  getRecipeById,
  getRecipesBySearch
} = require('../controllers/recipeController');

const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const upload  = require('../middleware/multer')






// Public Route - Get all recipes
router.get('/', getRecipes);  // Fetch all recipes (public)

router.get('/search', getRecipesBySearch);  // Search for recipes by name or ingredients

// Public or Protected Route - Get a specific recipe by ID (e.g., for view/edit)
router.get('/:id', getRecipeById);  // Fetch recipe by ID (public)

// Protected Route with Image Upload - Create a new recipe (only authenticated users)
router.post('/', protect, upload.single('image'), createRecipe);  // Create recipe with image upload

// Protected Routes - Update and Delete recipes
router.put('/:id', protect, upload.single('image'), updateRecipe);  // Update a recipe (protected)
router.delete('/:id', protect, deleteRecipe);  // Delete a recipe (protected)

module.exports = router;
