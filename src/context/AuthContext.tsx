// src/context/AuthContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  updateProfile,
  User 
} from 'firebase/auth';
import { auth } from '../firebase/config';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  register: (email: string, password: string, fullName: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  loading: true,
  register: async () => {},
  login: async () => {},
  logout: async () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const register = async (email: string, password: string, fullName: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Update the user profile with the full name
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: fullName
        });
        // Refresh the user object
        setUser({ ...userCredential.user });
      }
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};