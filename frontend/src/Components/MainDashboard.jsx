import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Endbutton from './Endbutton';
export default function MainDashboard() {
  // State to store user data
  const [user, setUser] = useState(null);
  const [signInMessage,setSignInMessage] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

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
       
        setRecipes(recipeResponse.data); // Set recipes data
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data or recipes:', error.status);
        if(error.status==401){
          setSignInMessage(true)
   }
   else{
     setMessage("No Recipe Found")
   }
        setLoading(false);
      }
    };

    fetchData();
  }, []);

 

  return (
  <div className="  flex-grow h-lvh overflow-y-scroll no-scrollbar pb-2  bg-green-100 p-4 sm:p-6 lg:p-8">
      <div className=" ml-10  w-[98%]  bg-white rounded-xl shadow-md overflow-hidden   flex flex-col items-center justify-between">

          <div className="welcomeBox flex items-center justify-between w-[98%] h-52 mt-2 p-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg">
            <h1 className='text-6xl text-white'>Welcome,
              {user?<h1> {user.name}!</h1>:<h1> User</h1>}
            </h1>

            <img src="dish.png" alt=""  className='h-44' />
          </div>

           
           <p>{signInMessage?   <img src="signinChef.jfif" alt=""  className='h-44' />:"" }</p> 
    
        <div className="w-full text-center p-5 text-lg">
        <h1 className="text-5xl w-full h-fit text-start">Your Recent Recipe</h1>
          {recipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
              
             
              {recipes.slice(-3).map((recipe) => (
                <div key={recipe._id} className="relative bg-white border border-gray-300 rounded-md overflow-hidden shadow-md">
                  <div className="relative group">
                    <img
                      src={recipe.imageUrl}
                      alt={recipe.recipe_name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center text-lg font-semibold cursor-pointer">
                        Click Me
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{recipe.recipe_name}</h3>
                    <p className="text-gray-600">{recipe.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No Recipe Found</p>
          )}


        </div>
        
        <Endbutton/>
      </div>
    </div>
  );
}
