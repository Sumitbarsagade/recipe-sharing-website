const mongoose = require('mongoose');

const recipeInfoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  recipe_name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    maxlength: 500,
  },
  ingredients: {
    type: [String],  // An array of strings for ingredients
    required: true,
  },
  procedureSteps: {
    type: [String],  // An array of strings for procedure steps
    required: true,
  },
  recipeType: {
    type: String,
    required: true,
    enum: ['appetizer','snack','breakfast', 'main course', 'dessert', 'beverage', 'other'],
  },
  cuisineType: {
    type: String,
    required: true,
    enum: ['Italian', 'Mexican', 'Chinese', 'American', 'French', 'Indian', 'other'],
  },
  servingSize: {
    type: Number,
    required: true,
    
  },
  imagePublicId: {
    type: String,  // Cloudinary image public id
    required: true,
  },
  imageUrl: {
    type: String,  // Cloudinary image URL
    required: true,
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, {
  timestamps: true  // Automatically adds createdAt and updatedAt fields
});

const RecipeInfo = mongoose.model('RecipeInfo', recipeInfoSchema);

module.exports = RecipeInfo;

