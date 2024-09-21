import React from 'react'

export default function Recipebox({image, title, description}) {
  return (
    <div className='w-full h-fit p-8 text-white flex-wrap md:flex-nowrap flex md:flex-row flex-col  md:gap-8 gap-4'>
         
         <img className="md:w-2/4 w-98 h-98 rounded-3xl shadow-lg object-fit bg-contain shadow-yellow-50" src={image} alt="" />
         
         <div className="recipe-discription h-fit md:mt-5 mt-3">
            <h1 className='md:text-6xl text-5xl mt-5 text-white'>{title}</h1>
            <h3 className='md:text-4xl text-2xl text-gray-300'>{description}</h3>
         </div>
         
    </div>
  )
}
