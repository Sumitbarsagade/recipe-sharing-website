import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { FiMail, FiLock, FiKey } from 'react-icons/fi';
import axiosInstance from '../axiosInstance';

export default function ForgetPasswordModel({ closeDeleteForgotPasswordToggleModal }) {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // Controls the step of the process: 1 -> Email, 2 -> OTP, 3 -> New Password

  // Handle sending OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/api/auth/request-otp', { email });
      setMessage(response.data.message);
      setError('');
      setStep(2); // Move to OTP input step
    } catch (error) {
      setMessage('');
      setError('Error sending OTP');
    }
  };

  // Handle OTP validation
  const handleValidateOtp = async (e) => {
    e.preventDefault();
    try {
      // Here you should validate the OTP via the backend
      const response = await axiosInstance.post('/api/auth/validate-otp', { email, otp });
      setMessage(response.data.message);
      setError('');
      setStep(3); // Move to password reset step
    } catch (error) {
      setMessage('');
      setError('Invalid OTP');
    }
  };

  // Handle password reset
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/api/auth/reset-password', { email, otp, newPassword: password });
      setMessage(response.data.message);
      setError('');
      closeDeleteForgotPasswordToggleModal(); // Close modal on successful password reset
    } catch (error) {
      setMessage('');
      setError('Error resetting password');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-96 max-w-md relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500 "></div>
        
        <button
          onClick={closeDeleteForgotPasswordToggleModal}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          aria-label="Close"
        >
          <IoMdClose size={24} />
        </button>

        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Forgot Password
        </h2>

        {/* Step 1: Email Input */}
        {step === 1 && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div className="relative">
              <FiMail className="absolute top-3 left-3 text-gray-400" size={20} />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-md hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
            >
              Send OTP
            </button>
          </form>
        )}

        {/* Step 2: OTP Input */}
        {step === 2 && (
          <form onSubmit={handleValidateOtp} className="space-y-4">
            <div className="relative">
              <FiKey className="absolute top-3 left-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 rounded-md hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              Validate OTP
            </button>
          </form>
        )}

        {/* Step 3: New Password Input */}
        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="relative">
              <FiLock className="absolute top-3 left-3 text-gray-400" size={20} />
              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 rounded-md hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              Confirm New Password
            </button>
          </form>
        )}

        {/* Messages */}
        {message && (
          <p className="mt-4 text-center text-green-500 bg-green-100 p-2 rounded animate-fade-in">
            {message}
          </p>
        )}
        {error && (
          <p className="mt-4 text-center text-red-500 bg-red-100 p-2 rounded animate-fade-in">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
