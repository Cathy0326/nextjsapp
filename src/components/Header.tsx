// src/components/Header.tsx
"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-xl font-bold text-blue-600">
            NextJs Auth App
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/" className="text-gray-700 hover:text-blue-500">
              Home
            </Link>
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            ) : (
              <Link href="/login" className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">
                Login
              </Link>
            )}
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <Link href="/" className="block py-2 text-gray-700 hover:text-blue-500">
              Home
            </Link>
            {user ? (
              <button
                onClick={handleLogout}
                className="block w-full text-left py-2 text-red-500 hover:text-red-700"
              >
                Logout
              </button>
            ) : (
              <Link href="/login" className="block py-2 text-blue-500 hover:text-blue-700">
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}