// src/app/page.tsx
"use client";

import { useAuth } from '../context/AuthContext';
import AuthCheck from '../components/AuthCheck';
import Link from 'next/link';

export default function HomePage() {
  const { user } = useAuth();
  
  return (
    <div className="container mx-auto px-4 py-10">
      {user ? (
        <AuthCheck>
          <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-center mb-6">Hey, {user.displayName}!</h1>
            <p className="text-center text-xl mb-8">You're successfully logged in.</p>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h2 className="text-lg font-semibold mb-2">Your Account Info:</h2>
              <p><span className="font-medium">Email:</span> {user.email}</p>
              <p><span className="font-medium">Account created:</span> {user.metadata.creationTime}</p>
            </div>
          </div>
        </AuthCheck>
      ) : (
        <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
          <h1 className="text-3xl font-bold mb-6">Welcome to NextJs Auth App</h1>
          <p className="text-lg mb-8">Please login or register to continue.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/login" 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </Link>
            <Link 
              href="/login" 
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}