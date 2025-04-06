'use client';

import React from 'react';
import { Prestador } from '@/types';

interface FiltrosPrestadoresProps {
  prestadores: Prestador[];
  onSearch: (termo: string) => void;
  onCategoriaChange: (categoria: string) => void;
  categoriaAtual: string;
}

export default function FiltrosPrestadores({
  prestadores,
  onSearch,
  onCategoriaChange,
  categoriaAtual,
}: FiltrosPrestadoresProps) {
  // Get unique categories from providers
  const categorias = ['todas', ...Array.from(new Set(prestadores.map((p) => p.tipoServico)))];

  return (
    <div className="mb-8 space-y-4">
      {/* Search input */}
      <div>
        <input
          type="text"
          placeholder="Buscar por nome ou serviço..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        {categorias.map((categoria) => (
          <button
            key={categoria}
            onClick={() => onCategoriaChange(categoria)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              categoriaAtual === categoria
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
} 