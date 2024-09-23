import React from 'react'

export default function SearchBox({searchResults, handleResultClick, searchBoxRef}) {
  return (
    <div ref={searchBoxRef} className="resultOfSearchBox fixed  w-96 bg-white h-96  text-black   md:left-[35%] left-[16%]  md:top-28 top-64 rounded-2xl p-4 overflow-y-scroll scroll-hidden ">
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
  )
}
