import React, { useState } from 'react';
import axios from 'axios';
import { FaUpload, FaTrash, FaPlus } from 'react-icons/fa';
import { MdRestaurantMenu } from 'react-icons/md';
import { GiCookingPot } from 'react-icons/gi';


const Dashboard = ({formData, setFormData, handleSubmit, loading, setLoading, message,previewSource, setPreviewSource,setIsImageChange}) => {
  
    
      const handleIngredientChange = (index, value) => {
        const newIngredients = [...formData.ingredients];
        newIngredients[index] = value; // Update specific ingredient by index
        setFormData({ ...formData, ingredients: newIngredients });
      };
    
      const addIngredient = () => {
        setFormData({ ...formData, ingredients: [...formData.ingredients, ''] });
      };
    
      const removeIngredient = (index) => {
        const newIngredients = formData.ingredients.filter((_, i) => i !== index);
        setFormData({ ...formData, ingredients: newIngredients });
      };
    
      // Handle Procedure Steps Change
      const handleProcedureChange = (index, value) => {
        const newSteps = [...formData.procedureSteps];
        newSteps[index] = value; // Update specific step by index
        setFormData({ ...formData, procedureSteps: newSteps });
      };
    
      const addProcedureStep = () => {
        setFormData({ ...formData, procedureSteps: [...formData.procedureSteps, ''] });
      };
    
      const removeProcedureStep = (index) => {
        const newSteps = formData.procedureSteps.filter((_, i) => i !== index);
        setFormData({ ...formData, procedureSteps: newSteps });
      };
    
    
    
      // Handle input change for fields
      const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      // Handle image upload
      const handleImageChange = async(e) => {
        const file = e.target.files[0];
        setPreviewSource(file);
        previewFile(file);
        setIsImageChange(true);
       
  
      };

     const  previewFile= (file)=>{
       const reader = new FileReader();
       reader.readAsDataURL(file);
       reader.onloadend = ()=>{
        setPreviewSource(reader.result);
       }
     }
    
    

    
      
      

  return (
    <div className="min-h-screen flex-grow max-h-lvh overflow-scroll no-scrollbar  bg-green-100 p-4 sm:p-6 lg:p-8">
      <div className=" ml-10  w-[98%]  bg-white rounded-xl shadow-md overflow-hidden">
        <form onSubmit={handleSubmit}  className="p-6 sm:p-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <MdRestaurantMenu className="mr-2" /> Recipe Dashboard
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                maxLength={100}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="recipeName" className="block text-sm font-medium text-gray-700 mb-1">
                Recipe Name
              </label>
              <input
                type="text"
                id="recipeName"
                name="recipeName"
                value={formData.recipeName}
                onChange={handleInputChange}
                maxLength={100}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
                value={formData.description}
                onChange={handleInputChange}
              maxLength={500}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="servingSize" className="block text-sm font-medium text-gray-700 mb-1">
                Serving Size
              </label>
              <select
                id="servingSize"
                name="servingSize"
                value={formData.servingSize}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select serving size</option>
                <option value="1">1 person</option>
                <option value="2">2 people</option>
                <option value="4">4 people</option>
                <option value="6">6 people</option>
                <option value="8">8 people</option>
              </select>
            </div>

            <div>
              <label htmlFor="recipeType" className="block text-sm font-medium text-gray-700 mb-1">
                Recipe Type
              </label>
              <select
                id="recipeType"
                name="recipeType"
                value={formData.recipeType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select recipe type</option>
                <option value="snack">Snack</option>
                <option value="breakfast">Breakfast</option>
                <option value="appetizer">Appetizer</option>
                <option value="main course">Main Course</option>
                <option value="dessert">Dessert</option>
                <option value="beverage">Beverage</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
      <label className="block text-sm font-medium text-gray-700 mb-1">Cuisine Type</label>
      <div className="flex flex-wrap gap-4">
        {['Italian', 'Mexican', 'Chinese', 'American', 'French', 'Indian'].map((cuisine) => (
          <label key={cuisine} className="inline-flex items-center">
            <input
              type="radio"
              name="cuisineType"  // Ensure the name matches the form field key
              value={cuisine}      // Set the value to the cuisine type
              onChange={handleInputChange}
              checked={formData.cuisineType === cuisine}  // Check the selected value
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span className="ml-2">{cuisine}</span>
          </label>
        ))}
      </div>
    </div>

         {/* Ingredients Section */}
         <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Ingredients</label>
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => handleIngredientChange(index, e.target.value)}
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter ingredient"
                />
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="ml-2 p-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addIngredient}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <FaPlus className="inline-block mr-1" /> Add Ingredient
            </button>
          </div>

          {/* Procedure Steps Section */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Procedure Steps</label>
            {formData.procedureSteps.map((step, index) => (
              <div key={index} className="flex items-start mb-2">
                <span className="mr-2 mt-2">{index + 1}.</span>
                <textarea
                  value={step}
                  onChange={(e) => handleProcedureChange(index, e.target.value)}
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter procedure step"
                  rows={2}
                ></textarea>
                <button
                  type="button"
                  onClick={() => removeProcedureStep(index)}
                  className="ml-2 p-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addProcedureStep}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <FaPlus className="inline-block mr-1" /> Add Step
            </button>
          </div>


          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Recipe Image</label>
            <div
              className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
             
            >
            <div className="preview">

              {previewSource && (
            <img src={previewSource} alt="previewImg"    className="w-40 mr-2" />
             
              )}
            </div>
           
              <div className="space-y-1 text-center">
                
                  <GiCookingPot className="mx-auto h-12 w-12 text-gray-400" />
          
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="image"
                      value={formData.image}
                      className="sr-only"
                      type="file"
              accept="image/*"
               onChange={handleImageChange}

                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="w-full h-20 flex gap-2 items-center justify-center  px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >

            {
              loading && (
<svg width="20" height="20" fill="currentColor" className="mr-2 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
        <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
        </path>
    </svg>
              )
            } 
           {loading? <p>Saving recipe</p>:<p>Save recipe</p>}
            
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
       
      
     
      