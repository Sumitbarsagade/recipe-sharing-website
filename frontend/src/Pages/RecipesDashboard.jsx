import React from 'react'
import Sidebar from '../Components/Sidebar'
import MainDashboard from '../Components/MainDashboard'
export default function RecipesDashboard() {
  return (
    <div className='w-[100vw] min-h-[120vh] gap-2 relative bg-gradient-to-r from-green-700 to-white  flex md:items-center items-end   overflow-y-scroll '>
      
      <Sidebar/>

     <MainDashboard/>

   </div>
  )
}
