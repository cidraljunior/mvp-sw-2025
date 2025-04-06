'use client';

import React, { useEffect, useState } from 'react';
import dados from '@/data/prestadores.json';

interface AuthCheckProps {
  accessHash: string;
  children: React.ReactNode;
}

export default function AuthCheck({ accessHash, children }: AuthCheckProps) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load users from localStorage
    const savedUsers = localStorage.getItem('users');
    const users = savedUsers ? JSON.parse(savedUsers) : [];
    
    // Find user by access hash
    const user = users.find((u: any) => u.accessHash === accessHash);
    
    if (!user) {
      // User not found, redirect to home
      window.location.href = '/';
      return;
    }
    
    // Check if user is authorized
    const authorizedIds = localStorage.getItem('authorizedUsers');
    const authorizedList = authorizedIds ? JSON.parse(authorizedIds) : [];
    
    if (authorizedList.includes(user.id) || localStorage.getItem('adminLoggedIn') === 'true') {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
    
    setIsLoading(false);
  }, [accessHash]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Acesso Restrito
          </h2>
          <p className="text-gray-600 mb-6">
            Esta página é exclusiva para usuários que adquiriram acesso à lista de prestadores de serviços.
          </p>
          <a
            href="/"
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors"
          >
            Voltar para a Página Inicial
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
} 