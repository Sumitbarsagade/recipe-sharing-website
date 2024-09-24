import React from 'react'
import LoadingSkeleton from './loadingSkeleton'
export default function RecipeBoxXL({recipe, loading, recipeLength}) {

  if(recipeLength==0){
    return (
      <LoadingSkeleton/>
    )
  }

  if(loading){
    return (
      <LoadingSkeleton/>
    )
  }

  return (

  
    <>

     <div  className="box  min-w-72 w-72 h-72 flex flex-col rounded-xl relative hover:scale-105 shadow-orange-50 shadow-lg mt-5 text-white bg-green-600">
                <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-64 object-cover rounded-xl " />
                <div className="cuisine absolute -top-2 right-0 rounded-2xl w-fit px-2 bg-gradient-to-r from-blue-500 to-purple-500 ">{recipe.cuisineType}</div>
                <div className="details flex p-2">
                  <h2>{recipe.title}</h2>
                </div>
              </div> 
    
 

    </>

  )
}
