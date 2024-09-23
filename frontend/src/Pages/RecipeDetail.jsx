import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import { useParams,useNavigate } from 'react-router-dom';

import RecipeDetailButtons from '../Components/RecipeDetailButtons';
import RecipeDetailContainer from '../Components/RecipeDetailContainer';






export default function RecipeDetail() {
  const { id } = useParams(); // Get the current recipe ID from the URL
  const navigate = useNavigate(); // For navigating to next/previous recipes
  const [recipe, setRecipe] = useState(null);
  const [allRecipes, setAllRecipes] = useState([]); // To store all recipes
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current recipe index

  // Fetch all recipes when component mounts
  useEffect(() => {
    const fetchAllRecipes = async () => {
      try {
        const response = await axiosInstance.get(`/api/recipes`);
        setAllRecipes(response.data); // Set all recipes in state

        // Find the index of the current recipe by ID
        const currentRecipeIndex = response.data.findIndex((recipe) => recipe._id === id);
        setCurrentIndex(currentRecipeIndex);
      } catch (error) {
        console.error('Error fetching all recipes:', error);
      }
    };

    fetchAllRecipes();
  }, [id]);

  // Fetch the current recipe by ID
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axiosInstance.get(`/api/recipes/${id}`);
        setRecipe(response.data); // Set the current recipe in state
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, [id]);

  // Handle navigation to the previous recipe
  const handlePrevious = () => {
    if (currentIndex > 0) {
      const previousRecipeId = allRecipes[currentIndex - 1]._id; // Get the previous recipe ID
      navigate(`/recipes/${previousRecipeId}`); // Navigate to the previous recipe
    }
  };

  // Handle navigation to the next recipe (random recipe)
  const handleNext = () => {
    if (currentIndex < allRecipes.length - 1) {
      const nextRecipeId = allRecipes[currentIndex + 1]._id; // Get the next recipe ID
      navigate(`/recipes/${nextRecipeId}`); // Navigate to the next recipe
    } else {
      // Optionally handle the case where there are no more recipes (e.g., loop back to the first one)
      const randomIndex = Math.floor(Math.random() * allRecipes.length); // Randomly pick a recipe
      const randomRecipeId = allRecipes[randomIndex]._id;
      navigate(`/recipes/${randomRecipeId}`);
    }
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen relative mt-20 p-8 bg-green-100 ">
     
      <div className="max-w-6xl relative mx-auto bg-white rounded-lg shadow-xl shadow-slate-600 overflow-hidden">
        <RecipeDetailContainer recipe={recipe}  />
        
        <RecipeDetailButtons handleNext={handleNext} handlePrevious={handlePrevious} />
        
      </div>
     
    </div>
  );
};
