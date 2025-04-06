'use client';

import React from 'react';
import dados from '@/data/prestadores.json';
import PrestadoresList from '@/components/PrestadoresList';
import AuthCheck from '@/components/AuthCheck';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    hash: string;
  };
}

export default function AcessoPage({ params }: PageProps) {
  return (
    <AuthCheck accessHash={params.hash}>
      <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Lista de Prestadores de Serviços
            </h1>
            <p className="text-xl text-gray-600">
              Encontre os melhores profissionais para o seu projeto
            </p>
          </div>
          
          <PrestadoresList 
            prestadores={dados.prestadores}
          />
        </div>
      </main>
    </AuthCheck>
  );
} 