import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import { Link, useNavigate } from 'react-router-dom';
import RecipeBoxXL from '../Components/RecipeBoxXL';
export default function RecipeHomePage() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [recipeTypes, setRecipeTypes] = useState([]); // Holds the recipe types for categorization
  const [loading, setLoading] = useState(true);
  const [visibleRecipes, setVisibleRecipes] = useState({}); // Track visible recipes for each type
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [showMoreRecipes, setShowMoreRecipes] = useState({}); // Track which type has more recipes visible

  // Fetch recipes from the backend
  useEffect(() => {
    
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/api/recipes'); // Adjust your API endpoint
        const fetchedRecipes = response.data;

        // Group recipes by type (e.g., Breakfast, Lunch, Dinner)
        const types = [...new Set(fetchedRecipes.map(recipe => recipe.recipeType))];
        setRecipeTypes(types);
        console.log(recipeTypes);
        // Initialize the visible recipes with 3 recipes per type
        const initialVisibleRecipes = {};
        types.forEach(type => {
          initialVisibleRecipes[type] = fetchedRecipes
            .filter(recipe => recipe.recipeType === type)
            .slice(0, 8);
        });
        setVisibleRecipes(initialVisibleRecipes);
       console.log("recipes"+ recipes)
        // Store the recipes for infinite scroll (randomized)
        setRandomRecipes(fetchedRecipes.sort(() => 0.5 - Math.random())); // Randomize the recipes

        setLoading(false);
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
      <div className="w-[98%] h-lvh rounded-xl md:ml-2 overflow-scroll no-scrollbar">

     

        {recipeTypes.map((type) => (
          <div key={type} className="box w-full rounded-xl  md:px-12 py-2 h-auto mb-8">
            {/* Recipe Type Header with View More Button */}
            <div className="head w-full  text-xl     flex justify-between ">
              <h3 className="text-green-800 capitalize">{type}</h3>
              <button onClick={() => handleViewMore(type)} className="text-green-800 hover:underline">view more</button>
            </div>

            {/* Recipe Cards */}
            <div className="searchbox w-full h-auto flex  items-center gap-5 justify-between overflow-hidden  md:flex-row md:flex-wrap flex-col ">
            {visibleRecipes[type]?.map((recipe) => (
                <Link  to={`/recipes/${recipe._id}`} key={recipe._id}>
                  <RecipeBoxXL recipe={recipe} loading={loading} />
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Infinite Scroll Section */}
        <div className="infinite-scroll w-full ">
          <h2 className="text-xl  md:px-10 py-2 text-green-800 capitalize ">more recipes</h2>
          <div className="searchbox w-full h-auto flex  md:px-10 px-12 gap-5 items-center justify-between  md:flex-wrap md:flex-row flex-col">
            {randomRecipes.map((recipe) => (
              <Link  to={`/recipes/${recipe._id}`}>
              <RecipeBoxXL key={recipeTypes._id} loading={loading} recipe={recipe}/>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
