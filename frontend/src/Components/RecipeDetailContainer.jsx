import React from 'react'

export default function RecipeDetailContainer({recipe}) {
    return (
      <div className="contain w-full h-full">
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-80 object-cover"
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{recipe.title}</h1>
            <h2 className="text-xl text-gray-600 mb-4">{recipe.recipeName}</h2>
            <p className="text-gray-600 mb-4">{recipe.description}</p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Serving Size</h3>
                <p className="text-gray-600">{recipe.servingSize}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Recipe Type</h3>
                <p className="text-gray-600">{recipe.recipeType}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Cuisine Type</h3>
                <p className="text-gray-600">{recipe.cuisineType}</p>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Ingredients</h3>
              <ul className="list-disc list-inside text-gray-600">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Procedure</h3>
              <ol className="list-decimal list-inside text-gray-600">
                {recipe.procedureSteps.map((step, index) => (
                  <li key={index} className="mb-2">{step}</li>
                ))}
              </ol>
            </div>
          </div>
  
          </div>
    )
  }