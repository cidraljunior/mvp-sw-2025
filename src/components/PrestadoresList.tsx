'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Prestador } from '@/types';

interface PrestadoresListProps {
  prestadores: Prestador[];
}

export default function PrestadoresList({ prestadores }: PrestadoresListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoria, setSelectedCategoria] = useState('');

  // Get unique categories
  const categorias = Array.from(new Set(prestadores.map(p => p.categoria)));

  // Filter providers based on search term and category
  const filteredPrestadores = prestadores.filter(prestador => {
    const matchesSearch = prestador.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prestador.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategoria = !selectedCategoria || prestador.categoria === selectedCategoria;
    return matchesSearch && matchesCategoria;
  });

  return (
    <div>
      {/* Search and filter controls */}
      <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Buscar por nome ou descrição..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div className="w-full md:w-64">
          <select
            value={selectedCategoria}
            onChange={(e) => setSelectedCategoria(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Todas as categorias</option>
            {categorias.map(categoria => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid of providers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrestadores.map((prestador, index) => (
          <motion.div
            key={prestador.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {prestador.nome}
            </h3>
            <p className="text-sm text-primary-600 mb-4">
              {prestador.categoria}
            </p>
            <p className="text-gray-600 mb-4">
              {prestador.descricao}
            </p>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">
                <strong>Telefone:</strong> {prestador.telefone}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Email:</strong> {prestador.email}
              </p>
              {prestador.website && (
                <a
                  href={prestador.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  Visitar Website
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* No results message */}
      {filteredPrestadores.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">
            Nenhum prestador de serviço encontrado com os filtros selecionados.
          </p>
        </div>
      )}
    </div>
  );
} 