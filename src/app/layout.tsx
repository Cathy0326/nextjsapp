// src/app/layout.tsx
import { AuthProvider } from '../context/AuthContext';
import Header from '../components/Header';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NextJs Authentication App',
  description: 'A simple authentication app with Next.js and Firebase',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Header />
          <main>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}