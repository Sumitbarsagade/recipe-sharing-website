import React from 'react'

export default function ChefDescription({image, name, tag}) {
  return (
    <div className="box text-center">

        <div className="image w-64 rounded-3xl"><img className='rounded-3xl w-full' src={image} alt="chef" /></div>
        
        <div className="description text-white">
          <h1 className="text-4xl">{name}</h1>
          <h2 className='text-2xl'>{tag}</h2>
        </div>
        

    </div>
  )
}
