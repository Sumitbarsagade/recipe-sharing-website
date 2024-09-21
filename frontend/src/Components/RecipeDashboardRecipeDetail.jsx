import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';


import RecipeDetailContainer from '../Components/RecipeDetailContainer';


export default function RecipeDashboardRecipeDetail() {

  const { id } = useParams(); // Get the current recipe ID from the URL
  const navigate = useNavigate(); // For navigating to next/previous recipes
  const [recipe, setRecipe] = useState(null);





  // Fetch the current recipe by ID
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/recipes/${id}`);
        setRecipe(response.data); // Set the current recipe in state
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, [id]);



  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex-grow max-h-lvh overflow-scroll no-scrollbar mx-auto  bg-green-100 p-4 sm:p-6 lg:p-8">
      <div className=" ml-10  w-full flex justify-center    ">
        <div className="container w-8/12 bg-white rounded-xl shadow-md overflow-hidden">
        <RecipeDetailContainer recipe={recipe}  />
        </div>
       
        

        
      </div>
     
    </div>
  );
};
