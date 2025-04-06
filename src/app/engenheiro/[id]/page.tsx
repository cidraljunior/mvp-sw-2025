'use client';

import React from 'react';
import dados from '@/data/prestadores.json';
import PrestadoresList from '@/components/PrestadoresList';
import AuthCheck from '@/components/AuthCheck';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    id: string;
  };
}

export default function EngenheiroPage({ params }: PageProps) {
  const engenheiro = dados.engenheiros.find((e) => e.id === params.id);

  if (!engenheiro) {
    notFound();
  }

  return (
    <AuthCheck engenheiroId={params.id}>
      <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Prestadores Recomendados por {engenheiro.nome}
            </h1>
            <p className="text-xl text-gray-600">
              Especialidade: {engenheiro.especialidade}
            </p>
          </div>
          
          <PrestadoresList 
            prestadores={dados.prestadores} 
            engenheiroId={params.id} 
          />
        </div>
      </main>
    </AuthCheck>
  );
} 