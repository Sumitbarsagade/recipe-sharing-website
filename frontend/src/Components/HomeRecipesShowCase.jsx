import React, { useEffect, useState } from 'react';
import Recipebox from './recipebox';

import RecipeBoxXL from './RecipeBoxXL';
import axiosInstance from '../axiosInstance';




export default function HomeRecipesShowCase() {
  const [recipes, setRecipes] = useState([]); // State to store the fetched recipes
  const [hrloading, setHrLoading] = useState(true);
  const [recipeLength, setRecipeLength] = useState();

   
  // Function to get four random recipes
  const getRandomRecipes = (recipesArray) => {
    const shuffled = [...recipesArray].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4); // Return only the first 4 recipes
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        
        setHrLoading(true);
     
        const response = await axiosInstance.get("/api/recipes"); // Adjust your API endpoint
        
        const fetchedRecipes = response.data;
         
        // Select four random recipes from the fetched data
        const randomRecipes = getRandomRecipes(fetchedRecipes);
        setRecipes(randomRecipes); // Set the selected recipes in state
       
        setHrLoading(false);
     


      } catch (error) {
        setHrLoading(false);
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []); // Empty dependency array means this will run once when the component mounts

  return (
    <div className="w-11/12 mx-auto description flex md:flex-row  flex-wrap flex-col gap-10 items-center justify-evenly">
      {recipes.map((recipe, index) => (
        <RecipeBoxXL
          key={index} // Use a unique key for each component
           recipe={recipe} loading={hrloading} recipeLength={recipeLength}
        />
      ))}
    </div>
  );
}
