import React, { useState, useEffect, useRef } from 'react'
import Model from './Model'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../axiosInstance'
import SearchBox from './SearchBox'
import { set } from 'mongoose'
import { FiSearch,  FiMenu,  } from 'react-icons/fi';

function Navbar() {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('') // Search box state
  const [searchResults, setSearchResults] = useState([]) // Matching search results
  const [showSearchBox, setShowSearchBox] = useState(false) // Control display of resultOfSearchBox
  const [searchUrl, setSearchUrl] = useState('')
  const searchBoxRef = useRef(null) // Create a ref for the search box

  // Click outside event listener
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the clicked element is outside the search box
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target)
      ) {
        setShowSearchBox(false)
      }
    }

    // Add the event listener to handle clicks outside
    document.addEventListener('mousedown', handleClickOutside)

    // Cleanup event listener when component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [searchBoxRef])

  // Function to handle click on the share recipe button
  const handleShareRecipeClick = () => {
    const token = localStorage.getItem('token') // Check if token is present

    if (!token) {
      alert('Please first signin')
      navigate('/signin')
    } else {
      // If signed in, proceed to share recipe functionality
      navigate('/recipedashboard') // Redirect to the actual share recipe page
    }
  }

  // Handle the search input changes
  const handleSearchChange = async (e) => {
    const query = e.target.value
    setSearchQuery(query)

    if (query.length > 0) {
      // Fetch recipes matching the query (name or ingredients)
      try {
        const response = await axiosInstance.get(
          `/api/recipes/search?q=${query}`,
        ) // Adjust API as needed
        setSearchResults(response.data)
        console.log()
        setShowSearchBox(true) // Show the result box
      } catch (error) {
        console.error('Error fetching search results:', error)
        setSearchResults([]) // Reset results if error occurs
      }
    } else {
      setShowSearchBox(false) // Hide the result box if query is empty
    }
  }

  // Handle click on search result suggestion
  const handleResultClick = (suggestion, url) => {
    setSearchQuery(suggestion) // Set the clicked suggestion in the search box
    setSearchUrl(url)
    setShowSearchBox(false) // Hide the suggestion box after clicking
  }

  // Handle the actual search action
  const handleSearch = () => {
    if (searchQuery.length > 0) {
      navigate(`/recipes/${searchUrl}`) // Navigate to the search results page with the query
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const token = localStorage.getItem('token')

  return (
    <>
      

      <nav className="w-lvw fixed bg-green-700 bg-opacity-20 shadow backdrop-filter backdrop-blur-lg  text-white p-4 z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-4">
          <img src="/newLogo3.png" alt="" srcset="" className='w-10 '  />
          <span className="font-semibold text-xl hidden md:inline">RecipeWorld</span>
        </Link>

        {/* Centered Search Bar */}
        <div className="items-center md:flex hidden p-2 mt-3  md:w-fit sm:w-64 bg-white text-black rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500">
            <div className="flex p-2 w-72 space-x-4 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-900 opacity-30"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                className="text-gray-900 outline-none"
                type="text"
                placeholder="Type Recipe / Ingredient"
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
            <SearchBox
              searchResults={searchResults}
              handleResultClick={handleResultClick}
              searchBoxRef={searchBoxRef}
            />
          )}


        {/* Navigation Links */}
        <div className="hidden md:flex items-center text-xl space-x-4">
          <Link to="/recipedashboard/homepage" className=" hover:bg-green-400  rounded-xl p-1">Recipes</Link>
          <Link to="/recipedashboard" className="hover:bg-green-400  rounded-xl p-1">Share Recipes</Link>
          <Link to="/signin" className="hover:bg-green-400 rounded-xl  p-1">SignIn</Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex">
          <FiSearch className="w-8 pr-2 h-6 cursor-pointer " onClick={() => setIsOpen(!isOpen)} />
          <FiMenu className="w-8 pr-2 h-6 cursor-pointer" onClick={() => setIsOpen(!isOpen)} />
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mt-4 md:hidden">
          <div className="relative mb-4">
            
          <Link to="/recipedashboard/homepage" className="block py-2 hover:bg-green-400  rounded-xl p-1">Recipes</Link>
          <Link to="/recipedashboard" className="block py-2 hover:bg-green-400  rounded-xl p-1">Share Recipes</Link>
          <Link to="/signin" className="block py-2 hover:bg-green-400  rounded-xl p-1">SignIn</Link>


          <div className="items-center mx-auto flex p-2 mt-3  w-96 bg-white text-black rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500">


            <div className="flex p-2 w-72 space-x-4 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-900 opacity-30"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                className="text-gray-900 outline-none"
                type="text"
                placeholder="Type Recipe / Ingredient"
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
            <SearchBox
              searchResults={searchResults}
              handleResultClick={handleResultClick}
              searchBoxRef={searchBoxRef}
            />
          )}

            
            
          </div>
         
        </div>
      )}
    </nav>


    </>
  )
}

export default Navbar
