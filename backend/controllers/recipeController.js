const Recipe = require('../models/RecipeInfo');
const cloudinary = require('cloudinary').v2;

// Create a new recipe
exports.createRecipe = async (req, res) => {
  const { title, recipe_name, description,servingSize, ingredients, procedureSteps, recipeType, cuisineType,image } = req.body;
  const file = req.body.image;
  let imagePublicId;

  try {
    // Ensure that the user is attached to the request by the protect middleware
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized, no user found' });
    }


    let imageUrl = '';

    //Upload image to Cloudinary if a file exists
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    const result = await cloudinary.uploader.upload(file, {
       
        upload_preset: 'sumitbarsagade',  // Optional: Create a folder in Cloudinary
      });
      imageUrl = result.secure_url;  // Get the Cloudinary URL
    
    imagePublicId = result.public_id;
   

    optimizedImageUrl = cloudinary.url(result.public_id, {
      fetch_format: 'auto',
      quality: 'auto',
    });



    // Create a new recipe with the image URL from Cloudinary
    const newRecipe = new Recipe({
      title,
      recipe_name,
      description,
      servingSize,
      ingredients,  // No need for JSON.parse since it's already an array
      procedureSteps,  // No need for JSON.parse since it's already an array
      recipeType,
      cuisineType,
      imageUrl: optimizedImageUrl,  // Store the Cloudinary image URL in the photo field
      userid: req.user._id,  // Attach the authenticated user to the recipe
      imagePublicId: imagePublicId
    });


    await newRecipe.save();
    res.status(201).json({ message: 'Recipe created successfully' });
  } catch (error) {
   console.log(error)
    res.status(500).json({ message: 'Error creating recipe', error });
  }
};


// Update an existing recipe by ID
exports.updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { title, recipe_name, description, ingredients, procedureSteps, servingSize, recipeType, cuisineType, image , ImageChange} = req.body; // Extract fields
  let imageUrl = ''; // Variable for storing Cloudinary image URL
  const file = req.body.image;  // Assuming the image is in req.body (or you can use req.file if using multer)
   
   
  try {
    // Find the recipe by ID
    let recipe = await Recipe.findById(id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
   if(ImageChange==true){
    
    if (file) {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
      
      // Delete the previous image from Cloudinary if it exists
      if (recipe.imagePublicId) {
        await cloudinary.api.delete_resources([recipe.imagePublicId], {
          type: 'upload',
          resource_type: 'image',
        });
      }
      

      // Upload the new image to Cloudinary
      const result = await cloudinary.uploader.upload(file, {
        upload_preset: 'sumitbarsagade',  // Optional: Create a folder in Cloudinary
      });
   

      // console.log(result)
      // Get the optimized image URL
      const optimizedImageUrl = cloudinary.url(result.public_id, {
        fetch_format: 'auto',
        quality: 'auto',
      });

      imageUrl = optimizedImageUrl;  // Set the Cloudinary URL
      recipe.imageUrl = imageUrl;    // Update the recipe with the new image URL
      recipe.imagePublicId = result.public_id;  // Save the public ID to delete the image later
    }
   }
    // If a new image is uploaded, upload it to Cloudinary
    

    // Update the recipe fields with new values or retain existing ones
    recipe.title = title || recipe.title;
    recipe.recipe_name = recipe_name || recipe.recipe_name;
    recipe.description = description || recipe.description;
    recipe.ingredients = ingredients || recipe.ingredients;
    recipe.servingSize = servingSize || recipe.servingSize; // Correct way to update servingSize
    recipe.procedureSteps = procedureSteps || recipe.procedureSteps;
    recipe.recipeType = recipeType || recipe.recipeType;
    recipe.cuisineType = cuisineType || recipe.cuisineType;

    // Save the updated recipe
    await recipe.save();
    
    res.status(200).json({ message: 'Recipe updated successfully', recipe });
  } catch (error) {
    console.log(error);
    console.error('Error updating recipe:', error);
    res.status(500).json({ message: 'Error updating recipe', error });
  }
};

// Get all recipes
exports.getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get recipe by ID
exports.getRecipeById = async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete recipe by ID
exports.deleteRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await Recipe.findById(id);

    // Check if the recipe exists
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // If the recipe has an image in Cloudinary, delete it
    if (recipe.imagePublicId) {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      // Delete the image from Cloudinary
      await cloudinary.api.delete_resources([recipe.imagePublicId], {
        type: 'upload',
        resource_type: 'image',
      });
    }

    // Use deleteOne() or findByIdAndDelete() to delete the recipe
    await Recipe.findByIdAndDelete(id);

    res.status(200).json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getRecipesBySearch= async (req, res) => {
  const query = req.query.q;

  try {
    const recipes = await Recipe.find({
      $or: [
        {recipe_name: { $regex: query, $options: 'i' } }, // Case-insensitive match for name
        { ingredients: { $regex: query, $options: 'i' } } // Case-insensitive match for ingredients
      ]
    });

    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
