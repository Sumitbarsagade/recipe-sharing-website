import React from 'react'
import LoadingSkeleton from './loadingSkeleton'
export default function RecipeBoxXL({recipe, loading}) {

  return (

  
    <>

    {loading? <LoadingSkeleton /> :   <div  className="box md:w-full min-w-72 max-w-96 h-full flex flex-col rounded-xl relative hover:scale-105 shadow-orange-50 shadow-lg mt-5 text-white bg-green-600">
                <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-64 object-cover rounded-xl " />
                <div className="cuisine absolute -top-2 right-0 rounded-2xl w-fit px-2 bg-gradient-to-r from-blue-500 to-purple-500 ">{recipe.cuisineType}</div>
                <div className="details flex p-2">
                  <h2>{recipe.title}</h2>
                </div>
              </div> }
    
 

    </>

  )
}
