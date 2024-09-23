import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import { useParams, useNavigate } from 'react-router-dom';
import Dashboard from '../Components/Dashboard';

export default function EditRecipe() {

  const { id } = useParams();  // Get recipe ID from URL
  const navigate = useNavigate();  // To navigate after updating
  const [previewSource, setPreviewSource] = useState(null);
  const [isImageChange, setIsImageChange] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    recipeName: '',
    description: '',
    servingSize: '',
    recipeType: '',
    cuisineType: '',
    ingredients: [''],
    procedureSteps: [''],
    image: null,  // Image file to upload
  
  });

  // Fetch the recipe data by ID and populate the form
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axiosInstance.get(`/api/recipes/${id}`);
        const recipe = response.data;
       setPreviewSource(recipe.imageUrl)
        // Populate form with the fetched recipe data
        setFormData({
          title: recipe.title,
          recipeName: recipe.recipe_name,
          description: recipe.description,
          servingSize: recipe.servingSize,
          recipeType: recipe.recipeType,
          cuisineType: recipe.cuisineType,
          ingredients: recipe.ingredients,
          procedureSteps: recipe.procedureSteps,
          image: null,  // Image will be updated only if changed
  
        });
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, [id]);

  // Handle form submission for updating the recipe
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('token');
    const data = new FormData();
  
    data.append('title', formData.title);
    data.append('recipe_name', formData.recipeName);
    data.append('description', formData.description);
    data.append('servingSize', formData.servingSize);
    data.append('recipeType', formData.recipeType);
    data.append('cuisineType', formData.cuisineType);
    data.append('ImageChange', isImageChange);
   
    console.log(isImageChange);
   // Append ingredients and procedureSteps directly as arrays (no need for JSON.stringify)
    formData.ingredients.forEach((ingredient, index) => {
    data.append(`ingredients[${index}]`, ingredient);
  });

  formData.procedureSteps.forEach((step, index) => {
    data.append(`procedureSteps[${index}]`, step);
  });
  
    // Append the image file
    if (previewSource) {
  
      data.append('image', previewSource); // Append image file
    }
  
    try {
      const response = await axiosInstance.put(`http://localhost:5000/api/recipes/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(true);
      alert('Recipe updated successfully!');
      navigate("/recipedashboard/viewrecipes");
      setIsImageChange(false);
      console.log(isImageChange);
    } catch (error) {
      console.error('Error updating recipe:', error);
      setLoading(false);
    }
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  

  if (!formData.title) {
    return <div>Loading...</div>;  // Show loading if data isn't fetched yet
  }

  return (
    <Dashboard
      formData={formData}
      setFormData={setFormData}
      handleSubmit={handleSubmit}
      loading={loading}
      setLoading={setLoading}
      message={message}
      setMessage={setMessage}
      previewSource={previewSource}
      setPreviewSource={setPreviewSource}
      handleInputChange={handleInputChange}  // Pass input change handler
      setIsImageChange={setIsImageChange}
    />
  );
}
