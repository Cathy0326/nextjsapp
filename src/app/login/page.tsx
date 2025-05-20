// src/app/login/page.tsx
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '../../components/LoginForm';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!loading && user) {
      router.push('/');
    }
  }, [user, loading, router]);
  
  // If already logged in or still checking auth state, show loading
  if (loading || user) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }
  
  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center py-4">
        <Link href="/" className="text-blue-500 hover:text-blue-700">
          Home
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-center mt-10 mb-6">Welcome to NextJs Auth App</h1>
      <LoginForm />
    </div>
  );
}