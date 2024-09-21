import React, { useEffect, useState } from 'react';
import DeleteModal from '../Components/DeleteModal';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Endbutton from '../Components/Endbutton';
export default function ViewRecipe() {
  const [user, setUser] = useState(null);
  const [message,setMessage] = useState();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState(null);  // For the modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);


  const handleDelete = async (recipeId) => {
    const token = localStorage.getItem('token');  // Get the token from localStorage
    try {
      // Make API call to delete recipe
      await axios.delete(`http://localhost:5000/api/recipes/${recipeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Remove the recipe from the list after deleting
      setRecipes((prevRecipes) => prevRecipes.filter((r) => r._id !== recipeId));
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  const openDeleteModal = (recipe) => {
    setSelectedRecipe(recipe);  // Set the selected recipe
    setShowDeleteModal(true);   // Show the modal
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);  // Hide the modal
    setSelectedRecipe(null);    // Clear the selected recipe
  };

  useEffect(() => {
    // Fetch user and recipe data
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from localStorage
       
        // Fetch user data (assumed endpoint: /api/user/profile)
        const userResponse = await axios.get('http://localhost:5000/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
       console.log(userResponse)
        setUser(userResponse.data); // Set user data

        // Fetch user's recipes (assumed endpoint: /api/user/recipes)
        const recipeResponse = await axios.get('http://localhost:5000/api/user/recipes', {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log(recipeResponse.status)
        if(recipeResponse.status==401){
               setMessage("Oop's signin Required")
        }
        else{
          setMessage("No Recipe Found")
        }
        setRecipes(recipeResponse.data); // Set recipes data
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data or recipes:', error);

        setLoading(false);
      }
    };

    fetchData();
  }, []);

 

  return (
  <div className="  flex-grow h-lvh overflow-y-scroll no-scrollbar pb-2 relative    bg-green-100 p-4 sm:p-6 lg:p-8">
      <div className=" ml-10  w-[98%]  bg-white rounded-xl shadow-md overflow-hidden p-4  relative  flex flex-col items-center justify-between">

          <div className="welcomeBox flex items-center justify-between w-full h-52 mt-2 p-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg">
            <h1 className='text-6xl text-white'>Welcome,
              {user?<h1> {user.name}!</h1>:<h1> User</h1>}
            </h1>

            <img src="dish.png" alt=""  className='h-44' />
          </div>

          <div className="page-title text-5xl w-full h-fit text-start">
          <h1>Your Recipes</h1>
          </div>
        
        
        <div className="w-full text-center p-5 text-lg">
          {recipes.length > 0 ? (
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {recipes.map((recipe) => (
             <div key={recipe._id} className="relative bg-white border flex flex-col justify-between border-gray-300 rounded-md overflow-hidden shadow-md">
               <div className="relative group">
                 <img
                   src={recipe.imageUrl}
                   alt={recipe.recipe_name}
                   className="w-full h-48 object-cover"
                 />
               </div>
               <div className="p-4">
                 <h3 className="text-lg font-semibold mb-2">{recipe.recipe_name}</h3>
                 <p className="text-gray-600">{recipe.description}</p>
               </div>
               <div className="buttons bg-gray-800 text-white flex w-full h-10">
                 <button className="view w-1/3 h-full text-white border-r-white"><Link to={`/recipedashboard/recipes/${recipe._id}`} >View</Link></button>
                 <button className="edit w-1/3 h-full text-white border-r-white"><Link to={`/recipedashboard/editrecipe/${recipe._id}`} >Edit</Link></button>
                 <button className="delete w-1/3 h-full text-white" onClick={() => openDeleteModal(recipe)}>Delete</button>
               </div>
             </div>
           ))}
     
           {/* Render the delete modal if showDeleteModal is true */}
           {showDeleteModal && (
             <DeleteModal
               recipe={selectedRecipe}
               onDelete={handleDelete}
               onClose={closeDeleteModal}
             />
           )}
         </div>
          ) : (
            <p>{message}</p>
          )}


        </div>


        
        
      </div>
     
        <Endbutton/>


    </div>
  );
}
