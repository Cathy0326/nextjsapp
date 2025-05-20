// src/app/login/page.tsx
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';
import { useState, FormEvent } from 'react';

export default function LoginPage() {
  const { user, loading, login, register } = useAuth();
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  useEffect(() => {
    if (!loading && user) {
      router.push('/');
    }
  }, [user, loading, router]);
  
  // If already logged in or still checking auth state, show loading
  if (loading || user) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  // Form validation
  const validateForm = () => {
    if (!email || !password || (!isLogin && !fullName)) {
      setError('All fields are required');
      return false;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    // Password validation (at least 6 characters)
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsLoading(true);
    
    if (!validateForm()) {
      setIsLoading(false);
      return;
    }
    
    try {
      if (isLogin) {
        await login(email, password);
        setSuccessMessage('Login successful! Redirecting...');
      } else {
        await register(email, password, fullName);
        setSuccessMessage('Registration successful! Redirecting...');
      }
      // Redirect to homepage after successful login/registration
      setTimeout(() => {
      router.push('/');
      },1000); // Short delay to show success message 
    } catch (error: any) {
      // Handle Firebase auth errors
      let errorMessage = 'An error occurred during authentication';
      
      // User-friendly error messages
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered. Would you like to log in instead?';
        // Optionally auto-switch to login mode
        setIsLogin(true);
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please provide a valid email address.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Your password is too weak. Please use at least 6 characters.';
      } else if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = 'Invalid email or password. Please try again.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center py-4">
        <Link href="/" className="text-blue-500 hover:text-blue-700">
          Home
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-center mt-10 mb-6">Welcome to NextJs Auth App</h1>
      
      <div className="max-w-md w-full mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? 'Log In' : 'Create an Account'}
        </h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="John Doe"
              />
            </div>
          )}
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your@email.com"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="********"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full sm:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Processing...' : isLogin ? 'Log In' : 'Register'}
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="w-full sm:w-auto text-blue-500 hover:text-blue-700 text-sm"
            >
              {isLogin ? 'Need an account? Register' : 'Already have an account? Log in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}