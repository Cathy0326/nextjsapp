// src/app/page.tsx
"use client";

import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);
  
  // If still loading or not logged in, show loading
  if (loading || !user) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }
  
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Hey, {user.displayName}!</h1>
        <p className="text-center text-xl mb-8">You're successfully logged in.</p>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h2 className="text-lg font-semibold mb-2">Your Account Info:</h2>
          <p><span className="font-medium">Email:</span> {user.email}</p>
          <p><span className="font-medium">Account created:</span> {user.metadata.creationTime}</p>
        </div>
      </div>
    </div>
  );
}