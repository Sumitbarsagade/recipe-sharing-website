import React from 'react'
import { Link } from 'react-router-dom'
export default function Endbutton() {
  return (
    <div className="endbutton w-full bg-gray-200 flex items-center justify-center bottom h-fit p-5">
<button className="p-5 text-2xl text-white rounded-md bg-gradient-to-r hover:scale-105 from-indigo-500 via-purple-500 to-pink-500">
       <Link  to="/recipedashboard/addrecipes">Add New Recipe</Link>   
        </button>
</div>
  )
}
