import{React, useState   }  from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { FcRight } from "react-icons/fc";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { TiDocumentAdd } from "react-icons/ti";
import { LiaPagerSolid } from "react-icons/lia";
import { FcLeft } from "react-icons/fc";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import { FaArrowRightToBracket } from "react-icons/fa6";
export default function Sidebar() {
  const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(true);

    const toggleSidebar = () => {
      setCollapsed(!collapsed);
    };
  

    const handleLogOut =()=>{
      
      localStorage.removeItem('token');
      alert("you are successfully logout");
      navigate("/");
    }



  return (
   
    
      <div id='sidebar' className={collapsed?"sidebar absolute  flex flex-col z-20 scroll-hidden top-20  w-12  h-lvh border-r":"sidebar  flex flex-col absolute top-20    z-20 left-0 md:w-44 w-36 scroll-hidden  h-lvh border-r"}>
        <div className="flex w-full items-center justify-start h-fit border-b">
        
         
         
        
        </div>
        <div className="overflow-y-auto overflow-x-hidden bg-green-200 text-white flex-grow">
          <ul className="flex flex-col gap-2 py-4 space-y-1">
            <li className="px-5">
              <div className="flex flex-row justify-between min-w-12  items-center h-8">

                <div className={collapsed?"hidden":"text-sm font-light tracking-wide text-green-600"}>Menu</div>
               
                {collapsed? 
                        <i onClick={toggleSidebar} className="ri-sidebar-unfold-line text-2xl pt-2 text-green-600"></i>
                : <i onClick={toggleSidebar} className="ri-sidebar-fold-line text-2xl pt-2 text-green-600"></i>
                }
              </div>
            </li>

            <li>
              <NavLink to="/recipedashboard" activeClassName="active-link" className="relative  flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                <span className="inline-flex justify-center items-center ml-4">
                <MdOutlineDashboardCustomize className='w-6 h-6 text-green-600'/>
                </span>
                
                <span className={collapsed?"hidden":"ml-2 text-sm tracking-wide text-green-600 truncate"}>
                  
                  Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/recipedashboard/viewrecipes" activeClassName="active-link" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                <span className="inline-flex justify-center items-center ml-4">
                <LiaPagerSolid className='w-6 h-6 text-green-600' />
                </span>
                <span className={collapsed?"hidden":"ml-2 text-sm tracking-wide text-green-600 truncate"}>View Recipe</span>
         
              </NavLink>
            </li>
            <li>
              <NavLink to="/recipedashboard/addrecipes" activeClassName="active-link" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                <span className="inline-flex justify-center items-center ml-4">
                <TiDocumentAdd className='w-6 h-6 text-green-600' />
                </span>
                <span className={collapsed?"hidden":"ml-2 text-sm tracking-wide text-green-600 truncate"}>Add Recipes</span>
              </NavLink>
            </li>
            <li>
              
            </li>


            


            <li className="px-5">
              <div className="flex flex-row items-center h-8">
                <div className={collapsed?"hidden":"text-sm font-light tracking-wide text-green-600"}>Settings</div>
              </div>
            </li>



            <li>
              <a href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                <span className="inline-flex justify-center items-center ml-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                </span>
                <span className="ml-2 text-sm tracking-wide text-green-600 truncate">Profile</span>
              </a>
            </li>
            <li>
              <a href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                <span className="inline-flex justify-center items-center ml-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </span>
                <span className="ml-2 text-sm tracking-wide text-green-600 truncate">Settings</span>
              </a>
            </li>
            <li>
              <a href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                <span className="inline-flex justify-center items-center ml-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                </span>
                <span onClick={handleLogOut} className="ml-2 text-sm tracking-wide text-green-600 truncate">Logout</span>
              </a>
            </li>


          </ul>
        </div>
      </div>
  
  )
}
