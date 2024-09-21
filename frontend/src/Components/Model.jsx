import React from 'react'

export default function Model({isOpen,onClose}) {
  return (
    <div className={`fixed inset-0 flex items-center justify-center ${isOpen ? 'visible' : 'hidden'}`}>
            <div className="bg-white p-4 rounded-lg shadow-md">
                {/* Your sign-up form or relevant content */}
                <h2>Sign Up</h2>
                {/* Add your form fields and buttons here */}
                <button onClick={onClose}>Close</button>
            </div>
        </div>

  )
}
