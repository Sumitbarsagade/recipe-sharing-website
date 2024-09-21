import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Dashboard from '../Components/Dashboard'

export default function AddRecipe() {
  const navigate = useNavigate();
  const [previewSource,setPreviewSource] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();
  const [formData, setFormData] = useState({
    title: '',
    recipeName: '',
    description: '',
    servingSize: '',
    recipeType: '',
    cuisineType: '',
    ingredients: [''],
    procedureSteps: [''],
    image: null, // Image file to upload
  });


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
     setLoading(true);

    const token = localStorage.getItem('token');

    try {
      

      const data = new FormData(); 

      data.append('title', formData.title);
      data.append('recipe_name', formData.recipeName);
      data.append('description', formData.description);
      data.append('servingSize', formData.servingSize);
      data.append('recipeType', formData.recipeType);
      data.append('cuisineType', formData.cuisineType);
       // Append ingredients and procedureSteps directly as arrays (no need for JSON.stringify)
    formData.ingredients.forEach((ingredient, index) => {
      data.append(`ingredients[${index}]`, ingredient);
    });
  
    formData.procedureSteps.forEach((step, index) => {
      data.append(`procedureSteps[${index}]`, step);
    });
      if (previewSource) {
        data.append('image', previewSource); // Append image file
      }

  
      // Post the recipe data to your backend API
      const response = await axios.post('http://localhost:5000/api/recipes', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      
      console.log('Recipe saved:', response.data);
      setMessage(response.data.message);
      setLoading(false);
      alert("Recipe saved successfully");
      navigate("/recipedashboard/viewrecipes");
    } catch (error) {
      console.log(error)
      console.error('Error saving recipe:', error);
      setMessage(error.message);
      alert('Error saving recipe');
      setLoading(false);
    }
  };


  

  return (
             
    <Dashboard formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} loading={loading} setLoading={setLoading} message={message} setMessage={setMessage} 
      
     previewSource={previewSource} setPreviewSource={setPreviewSource}
    
    />
      
  )
}
