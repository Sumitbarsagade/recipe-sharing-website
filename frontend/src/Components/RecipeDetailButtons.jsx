import React from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export default function RecipeDetailButtons({handlePrevious,handleNext}) {
  return (
    <div className="flex justify-between p-6 bg-gray-100">
          <button
            onClick={handlePrevious}
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
          >
            <FaArrowLeft className="mr-2" /> Previous Recipe
          </button>
          <button
            onClick={handleNext}
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
          >
            Next Recipe <FaArrowRight className="ml-2" />
          </button>
        </div>
  )
}
