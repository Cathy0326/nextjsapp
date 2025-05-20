// src/components/AuthCheck.tsx
"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Show loading state
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  // Only render children if user is authenticated
  return user ? <>{children}</> : null;
}