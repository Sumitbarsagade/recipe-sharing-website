Recipe World 🌍🍴

Recipe World is a full-stack web application where users can view, create, edit, and delete recipes. Users can also upload recipe images, which are stored in Cloudinary, and all recipe data is managed through MongoDB. This website supports complete CRUD operations and is deployed on Netlify.

🌟 Key Features
1. User Authentication
Sign Up / Sign In: Users can create an account or log in to an existing account.
JWT-based Authentication: The app uses JSON Web Tokens (JWT) for secure authentication and session management.
Forgot Password: Users can reset their passwords by receiving an OTP (One-Time Password) via email.
2. Recipe Management
Create New Recipes: Users can submit their own recipes with a title, description, ingredients, procedure steps, and an optional image.
Read Recipes: Anyone can view available recipes by browsing the homepage or searching by recipe name, ingredients, or type.
Edit Recipes: Logged-in users can update their submitted recipes.
Delete Recipes: Users can delete their own recipes if they are no longer needed.
3. Image Upload with Cloudinary
Users can upload images for their recipes. The images are stored in Cloudinary, a robust media management platform, which ensures fast loading and optimized image delivery.
Image Optimization: Images are resized and formatted automatically using Cloudinary’s transformation capabilities to improve performance.
4. Database Integration with MongoDB
Recipe details, user information, and all data are stored in a secure MongoDB database.
Each user can manage their own recipe collection, with access to view, edit, or delete their own contributions.
5. Fully Responsive UI
The app is designed with a mobile-first approach and ensures a smooth user experience across different devices, whether on desktop, tablet, or mobile.
6. Search Functionality
Users can search for recipes based on the recipe name or ingredients. Matching results are displayed dynamically as the user types, and if no match is found, an appropriate message is shown.
7. Infinite Scroll & Recipe Filtering
Recipes are displayed with infinite scrolling for smooth, uninterrupted browsing.
Recipes are categorized by type (e.g., breakfast, lunch, dinner) and cuisine, with a "View More" button to explore additional recipes in each category.
8. Hosting & Deployment
Frontend is deployed on Netlify: Recipe World
Backend is hosted on Render.com: It powers the REST API for all CRUD operations and user management.


🛠️ Technology Stack
Frontend: React.js, Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB (via MongoDB Atlas)

Image Hosting: Cloudinary (for image uploads)

Authentication: JWT (JSON Web Tokens)

API Communication: Axios (for making API requests)

Deployment:
Frontend: Netlify

Backend: Render.com


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

file structure:
```
recipe-sharing-website/
│
├── backend/                            # Backend folder (Node.js, Express)
│   ├── config/
│   │   └── db.js                       # MongoDB connection and configuration
│   ├── controllers/
│   │   └── authController.js           # Handles authentication (login, signup, password reset)
│   │   └── recipeController.js         # Handles recipe CRUD operations
│   ├── middleware/
│   │   └── authMiddleware.js           # Authentication middleware (JWT protection)
│   ├── models/
│   │   └── User.js                     # User Mongoose schema/model
│   │   └── Recipe.js                   # Recipe Mongoose schema/model
│   ├── routes/
│   │   └── authRoutes.js               # Authentication routes (login, signup, forgot password)
│   │   └── recipeRoutes.js             # Recipe routes (CRUD operations)
│   ├── uploads/                        # Folder for uploaded images (before they are uploaded to Cloudinary)
│   ├── .env                            # Environment variables (API keys, database URLs)
│   ├── server.js                       # Main server file (entry point for Express)
│   └── package.json                    # Backend dependencies and scripts
│
├── frontend/                           # Frontend folder (React.js)
│   ├── public/
│   │   └── index.html                  # Main HTML file
│   ├── src/
│   │   ├── assets/                     # Images, videos, fonts, etc.
│   │   │   └── logo.png
│   │   ├── components/
│   │   │   └── Navbar.js               # Navbar component
│   │   │   └── RecipeBox.js            # Recipe card component
│   │   │   └── LoadingSkeleton.js      # Skeleton loading animation component
│   │   ├── pages/
│   │   │   └── Home.js                 # Homepage of the app
│   │   │   └── SignUp.js               # Signup page
│   │   │   └── SignIn.js               # Login page
│   │   │   └── RecipeDetail.js         # Detailed recipe page
│   │   │   └── RecipeDashboard.js      # User dashboard for managing recipes
│   │   ├── utils/
│   │   │   └── axiosInstance.js        # Axios instance with baseURL configuration
│   │   ├── App.js                      # Main React component
│   │   ├── index.js                    # React DOM rendering and app entry point
│   │   └── package.json                # Frontend dependencies and scripts
│   ├── .env                            # Frontend environment variables
│   └── README.md                       # Project documentation
│
├── .gitignore                          # Files and folders to ignore in Git
├── package.json                        # Main package.json for the entire project (if applicable)
└── README.md                           # High-level project description (GitHub)
```
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
