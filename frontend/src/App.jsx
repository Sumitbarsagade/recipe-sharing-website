import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./Pages/Home.jsx"
import './App.css'
import Navbar from './Components/Navbar.jsx'
import Footer from './Components/Footer.jsx'
import SignIn from './Pages/SignIn.jsx'
import SignUp from './Pages/SignUp.jsx'
import AddRecipe from './Pages/AddRecipe.jsx'
import RecipeDetail from './Pages/RecipeDetail.jsx'
import ViewRecipe from './Pages/ViewRecipe.jsx'
import RecipeHomePage from './Pages/RecipeHomePage.jsx'
import UserRecipeDashboard from './Pages/UserRecipeDashboard.jsx'
import EditRecipe from './Pages/EditRecipe.jsx'
import MainDashboard from './Components/MainDashboard.jsx'
import RecipeDashboardRecipeDetail from './Components/RecipeDashboardRecipeDetail.jsx'
import RecipesHomePageByType from './Pages/RecipesHomePageByType.jsx'
import ForgetPasswordModel from './Components/ForgetPasswordModel.jsx'


function App() {

return(

  <>

  <BrowserRouter>
  
  <Navbar/>
  <main className='max-w-lvw min-h-fit relative bg-[#74A04B] md:pt-0 pt-10 top-0 overflow-hidden z-10'>

  <Routes>

  <Route path="/" element={<Home />} /> 
  <Route path="/signin" element={<SignIn />} />
  <Route path="/signup" element={<SignUp />} />
  <Route path="/recipes/:id" element={<RecipeDetail />} />
  <Route path="/forget-reset-password" element={<ForgetPasswordModel />} />
  <Route path="/reset-password/:token" element={<ForgetPasswordModel />} /> {/* Route with token */}
  <Route path="/recipedashboard" element={<UserRecipeDashboard />}>


            <Route index element={<MainDashboard />} />  
            <Route path="recipes/:id" element={<RecipeDashboardRecipeDetail />} />  
            <Route path="homepage/" element={<RecipeHomePage />} /> 
            <Route path="homepage/:type" element={<RecipesHomePageByType />} /> 
            <Route path="viewrecipes" element={<ViewRecipe />} />
            <Route path="addrecipes" element={<AddRecipe />} />
            <Route path="editrecipe/:id" element={<EditRecipe />} />

  </Route>


  </Routes>
  <Footer />
   </main>
  
   
  </BrowserRouter>
  
  
  
  
  
  </>



)
  
}

export default App
