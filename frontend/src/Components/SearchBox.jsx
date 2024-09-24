import React from 'react'

export default function SearchBox({searchResults, handleResultClick, searchBoxRef}) {
  return (
    <div ref={searchBoxRef} className="resultOfSearchBox fixed  w-80 md:left-4 left-10 bg-white h-96  text-black md:top-20 top-72 md:mt-0 mt-2   rounded-2xl p-4  scroll-hidden ">
  <div className='w-full h-full overflow-y-auto scroll-hidden'> 
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
            </div>
  )
}
