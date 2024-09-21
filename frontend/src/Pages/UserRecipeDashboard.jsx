import React from 'react'
import Sidebar from '../Components/Sidebar'
import ViewRecipe from './ViewRecipe'
import { Outlet, Link } from 'react-router-dom';
import MainDashboard from '../Components/MainDashboard'


export default function UserRecipeDashboard() {
  return (
    <div className='w-100vw min-h-[100vh] flex relative  pt-20  mx-auto'>

    <Sidebar/>
    <Outlet />

    </div>
  )
}
