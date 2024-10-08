import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import {useParams, Link, useNavigate } from 'react-router-dom';
import RecipeBoxXL from '../Components/RecipeBoxXL';

export default function RecipesHomePageByType() {
    const { type } = useParams(); // Get the current recipe ID from the URL
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState([]);
   
  
    // Fetch recipes from the backend
    useEffect(() => {
      
      const fetchRecipes = async () => {
        try {
          const response = await axiosInstance.get('/api/recipes'); // Adjust your API endpoint
          const fetchedRecipes = response.data;
          const typed_Recies = fetchedRecipes.filter(recipe => recipe.recipeType === type)
          setRecipes(typed_Recies)
           
        } catch (error) {
          console.error('Error fetching recipes:', error);
          setLoading(false);
        }
      };
      
  
      fetchRecipes();
    }, []);
  
    // Handle "View More" button click for a specific type
    const handleViewMore = (type) => {
      navigate(`/recipedashboard/homepage/${type}`)
    };
  
    // Infinite scroll to load random recipes
    const handleScroll = (e) => {
      if (
        e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight &&
        randomRecipes.length > 0
      ) {
        // Load more random recipes (infinite scroll)
        setRandomRecipes((prevState) => [
          ...prevState,
          ...randomRecipes.slice(prevState.length, prevState.length + 3),
        ]);
      }
    };
  
 
    return (
      <div className="min-h-screen flex-grow max-h-lvh overflow-scroll no-scrollbar flex bg-green-200  pt-5 md:pr-2 pr-1 md:pl-32 pl-14 sm:p-2 lg:p-8" onScroll={handleScroll}>
        <div className="w-[98%] h-lvh rounded-xl overflow-scroll no-scrollbar">
  
       
          <div className="container w-full h-fit text-4xl text-green-800 p-10">
            <h1 className='capitalize'>{type}</h1>
          </div>
             
              {/* Recipe Cards */}
              <div className="searchbox w-full h-auto flex  md:px-10 px-12 gap-5 items-center justify-between  md:flex-wrap md:flex-row flex-col ">
              {recipes.map((recipe) => (
                  <Link  to={`/recipes/${recipe._id}`} key={recipe._id}>
                    <RecipeBoxXL recipe={recipe} />
                  </Link>
                ))}
              </div>
            
        
  
          {/* Infinite Scroll Section */}
          
         
        </div>
      </div>
    );
  }
  