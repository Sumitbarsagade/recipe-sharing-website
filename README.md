Recipe World 🌍🍴

Recipe World is a full-stack web application where users can view, create, edit, and delete recipes. Users can also upload recipe images, which are stored in Cloudinary, and all recipe data is managed through MongoDB. This website supports complete CRUD operations and is deployed on Netlify.

Live Website: [https:recipeworld.site](https://recipeworld.site/)


🖥️ Overview
Recipe World allows users to:

View all available recipes.
Create new recipes with detailed information, including ingredients, preparation steps, and images.
Edit existing recipes.
Delete recipes they no longer need.
Screenshots:
Homepage
![Screenshot 2024-09-27 111939](https://github.com/user-attachments/assets/a281985b-79db-4648-b074-769e98843ca7)
Recipe Details Page
![Screenshot 2024-09-27 112004](https://github.com/user-attachments/assets/56b0ddc9-98d2-443a-9bc1-ca381136c05c)


Recipe Creation Form
![Screenshot 2024-09-27 112107](https://github.com/user-attachments/assets/dac16d32-9457-4e02-a0a8-ad9e64e3a9b8)


User Dashboard
![Screenshot 2024-09-27 112052](https://github.com/user-attachments/assets/25caabc5-362d-43b7-b441-2dddc89125a3)

User Signin page
![Screenshot 2024-09-27 112127](https://github.com/user-attachments/assets/dc46563c-1e25-48fe-8a9c-9a9185b0695d)

Search Result
![Screenshot 2024-09-27 112153](https://github.com/user-attachments/assets/ccf10168-13f2-4e45-ad44-8011ce07f4c2)

🚀 Features
CRUD Operations: Users can create, read, update, and delete recipes.
Image Uploading: Users can upload recipe images to Cloudinary.
MongoDB Database: Recipes and user information are stored in MongoDB.
Responsive Design: The website is responsive and works on all device sizes.


🛠️ Tech Stack
Frontend: React.js, Tailwind CSS
Backend: Node.js, Express.js
Database: MongoDB
Image Hosting: Cloudinary
Deployment: Netlify (Frontend), Render.com (Backend)


Project Setup
1. Clone the repository
bash
Copy code
git clone https://github.com/Sumitbarsagade/recipe-sharing-website.git
2. Install dependencies
bash
Copy code
cd recipe-sharing-website
npm install
3. Environment Variables
Create a .env file in the root of your project and add the following keys:

bash

```# MongoDB Connection String
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/recipeAppDB?retryWrites=true&w=majority

# Cloudinary Configurations
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# JWT Secret for Authentication
JWT_SECRET=your_jwt_secret
```


🌩️ Cloudinary Setup
To allow users to upload images to Cloudinary, follow these steps:

Cloudinary Configuration in Backend (db.js):
```javascript

import { v2 as cloudinary } from 'cloudinary';

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});```

export default cloudinary;
```

Image Upload Route (recipeController.js):

```javascript
exports.createRecipe = async (req, res) => {
  const { title, description, ingredients, procedureSteps, recipeType, cuisineType, image } = req.body;

  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(image, {
      upload_preset: 'recipe_images',
    });

    // Save the recipe with Cloudinary URL
    const newRecipe = new Recipe({
      title,
      description,
      ingredients,
      procedureSteps,
      recipeType,
      cuisineType,
      imageUrl: result.secure_url,  // Store Cloudinary URL
      userId: req.user._id,
    });

    await newRecipe.save();
    res.status(201).json({ message: 'Recipe created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating recipe', error });
  }
};
```

🗄️ MongoDB Setup
Create a free MongoDB cluster using MongoDB Atlas.
Connect to your cluster and get the connection URI.
Replace <username>, <password>, and <dbname> in the .env file with your own credentials and database name.
Example:
```
MONGO_URI=mongodb+srv://myUser:myPassword@cluster0.mongodb.net/recipeAppDB?retryWrites=true&w=majority
```
Mongoose Recipe Model (Recipe.js):
```javascript
const mongoose = require('mongoose');
const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: [String],
  procedureSteps: [String],
  recipeType: { type: String, required: true },
  cuisineType: { type: String, required: true },
  imageUrl: { type: String },  // Cloudinary URL
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Recipe', recipeSchema);
```

📦 Deploying the Project
Frontend Deployment (Netlify)
Go to Netlify, create an account, and deploy your site by linking it to your GitHub repository.
Add your environment variables in the Netlify dashboard for secure access.
Backend Deployment (Render)
Go to Render, and create a new web service.
Link it to your GitHub repository for the backend and set the environment variables.
