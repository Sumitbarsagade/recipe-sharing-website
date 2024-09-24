import React from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export default function RecipeDetailButtons({handlePrevious,handleNext}) {
  return (
    <div className="flex justify-between p-6 bg-gray-100">
          <button
            onClick={handlePrevious}
            className="flex items-center p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
          >
             <i className="ri-arrow-left-double-line text-2xl"></i>
          </button>
          <button
            onClick={handleNext}
            className="flex items-center p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
          >
          <i className="ri-arrow-right-double-line text-2xl"></i>
          </button>
        </div>
  )
}
