import React, { useState } from 'react';
import Model from './Model';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { set } from 'mongoose';

function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // Search box state
  const [searchResults, setSearchResults] = useState([]); // Matching search results
  const [showSearchBox, setShowSearchBox] = useState(false); // Control display of resultOfSearchBox
  const [searchUrl, setSearchUrl] = useState('');
// Function to handle click on the share recipe button
const handleShareRecipeClick = () => {
  const token = localStorage.getItem('token');  // Check if token is present

  if (!token) {
  
    alert("Please first signin");
    navigate('/signin');
  } else {
    // If signed in, proceed to share recipe functionality
    navigate('/recipedashboard');  // Redirect to the actual share recipe page
  }
};


// Handle the search input changes
const handleSearchChange = async (e) => {
  const query = e.target.value;
  setSearchQuery(query);

  if (query.length > 0) {
    // Fetch recipes matching the query (name or ingredients)
    try {
      const response = await axios.get(`http://localhost:5000/api/recipes/search?q=${query}`); // Adjust API as needed
      setSearchResults(response.data);
      console.log()
      setShowSearchBox(true); // Show the result box
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]); // Reset results if error occurs
    }
  } else {
    setShowSearchBox(false); // Hide the result box if query is empty
  }
};

// Handle click on search result suggestion
const handleResultClick = (suggestion, url) => {
  setSearchQuery( suggestion); // Set the clicked suggestion in the search box
  setSearchUrl(url);
  setShowSearchBox(false); // Hide the suggestion box after clicking
};

// Handle the actual search action
const handleSearch = () => {
  if (searchQuery.length > 0) {
    navigate(`/recipes/${searchUrl}`); // Navigate to the search results page with the query
  }
};



  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const token = localStorage.getItem('token');
 
  return (
    <>
   
    <nav className="w-[100vw] fixed md:h-24 h-fit mx-auto text-white  top-0 left-0 right-0 p-4  flex items-center flex-col justify-center bg-green-700 bg-opacity-20 shadow backdrop-filter backdrop-blur-lg z-50">
      
      <div className="w-full flex justify-between items-center ">

        
          <Link className="text-xl w-max h-max  font-[Poppins] cursor-pointer flex items-center" to="/">
          <img
            className="w-44 md:w-40 inline"
            src="/logo.png"
            alt="tailwind"
          />
         
          </Link>
      
          <div className="items-center md:flex hidden p-2 mt-3 w-fit bg-white text-black rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500">
            <div className="flex p-2 w-72 space-x-4 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-900 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                className="text-gray-900 outline-none"
                type="text"
                placeholder="type Recipe or ingredient"
                value={searchQuery}
                onChange={handleSearchChange} // Handle input changes
              />
            </div>

            <div
              onClick={handleSearch}
              className="bg-green-400 py-2 px-2 text-white font-semibold rounded-full hover:shadow-lg transition duration-3000 cursor-pointer"
            >
              <span>Search</span>
            </div>
          </div>



   {/* Search results box */}
   {showSearchBox && (
            <div className="resultOfSearchBox fixed w-80 bg-white h-96 md:left-[32%] text-black left-10 md:top-28 top-36 rounded-2xl p-4 overflow-auto">
              {searchResults.length > 0 ? (
                searchResults.map((result, index) => (
                  <div
                    key={index}
                    className="cursor-pointer p-2 text-gray-900 hover:bg-gray-200"
                    onClick={() => handleResultClick(result.recipe_name, result._id)
                      
                    } // Handle click on result
                  >
                    {result.recipe_name} {/* Display the matching recipe name */}
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500">No recipes found</div>
              )}
            </div>
          )}

        
        <span className='block md:hidden text-xl' onClick={toggleMenu}>
      <i className={isMenuOpen ?   "ri-close-large-line ": "ri-menu-line "}></i>
    </span>


       <span className='min-w-fit hidden md:block'>



       <ul className={'text-xl flex items-center gap-9 justify-between'} >

        <li className= 'p-3 hover:bg-green-400 hover:p-3 hover:rounded-xl'><Link to="/recipedashboard/homepage" >Recipes</Link> </li>
      <li onClick={handleShareRecipeClick} className= 'p-3 hover:bg-green-400 hover:p-3 cursor-pointer hover:rounded-xl'>Share Recipes </li>
      <li  className= 'p-3 hover:bg-green-400 hover:p-3 hover:rounded-xl'>  <Link to="/signin" >Sign in</Link>   </li>
       </ul>

       </span>
      
      
       

        </div>



      


        
        <div className={isMenuOpen?'w-11/12 flex pt-4 transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1)':'  hidden pt-4 transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1)'}>
          
        <ul className='text-xl flex flex-col items-left gap-3 justify-between' >

        <li className= 'p-3 hover:bg-green-400 hover:p-3 hover:rounded-xl'><Link to="/recipedashboard/homepage" >Recipes</Link> </li>
        
        <li onClick={handleShareRecipeClick} className= 'p-3 hover:bg-green-400 hover:p-3 cursor-pointer hover:rounded-xl'>Share Recipes </li>
    
      <li  className= 'p-3 hover:bg-green-400 hover:p-3 hover:rounded-xl'>  <Link to="/signin" >Sign in</Link>   </li>

</ul>


        </div>

        <div class=" items-center md:hidden flex  p-2 mt-3 w-fit bg-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500">
        <div className="flex p-2 w-72 space-x-4 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-900 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                className="text-gray-900 outline-none"
                type="text"
                placeholder="Recipe name or ingredient..."
                value={searchQuery}
                onChange={handleSearchChange} // Handle input changes
              />
            </div>

            <div
              onClick={handleSearch}
              className="bg-green-400 py-2 px-2 text-white font-semibold rounded-full hover:shadow-lg transition duration-3000 cursor-pointer"
            >
              <span>Search</span>
            </div>

    </div>
        

    </nav>
    

    


    </>
  );
}

export default Navbar;