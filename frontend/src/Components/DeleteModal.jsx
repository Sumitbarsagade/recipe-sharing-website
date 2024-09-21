import React, { useState } from 'react';

export default function DeleteModal({ recipe, onDelete, onClose }) {
  const [deleteText, setDeleteText] = useState('');

  const handleDelete = () => {
    if (deleteText === 'delete') {
      onDelete(recipe._id);  // Call the delete function with the recipe ID
      onClose();  // Close the modal
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Delete Recipe: {recipe.recipe_name}?</h2>
        <img src={recipe.imageUrl} alt={recipe.recipe_name} className="w-full h-48 object-cover mb-4" />
        <p>Type "delete" to confirm:</p>
        <input
          type="text"
          value={deleteText}
          onChange={(e) => setDeleteText(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 p-2 bg-gray-300 text-black rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={deleteText !== 'delete'}
            className="p-2 bg-red-600 text-white rounded-md"
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
}
