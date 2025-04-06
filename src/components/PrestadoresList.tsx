'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Prestador } from '@/types';

interface PrestadoresListProps {
  prestadores: Prestador[];
}

export default function PrestadoresList({ prestadores }: PrestadoresListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoria, setSelectedCategoria] = useState('');
  const [selectedCidade, setSelectedCidade] = useState('');
  const [selectedEstado, setSelectedEstado] = useState('');

  // Get unique categories, cities, and states
  const categorias = useMemo(() => 
    Array.from(new Set(prestadores.map(p => p.categoria))).sort(),
    [prestadores]
  );
  
  const cidades = useMemo(() => 
    Array.from(new Set(prestadores.map(p => p.cidade))).sort(),
    [prestadores]
  );
  
  const estados = useMemo(() => 
    Array.from(new Set(prestadores.map(p => p.estado))).sort(),
    [prestadores]
  );

  // Filter providers based on search term, category, city, and state
  const filteredPrestadores = prestadores.filter(prestador => {
    const matchesSearch = prestador.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prestador.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategoria = !selectedCategoria || prestador.categoria === selectedCategoria;
    const matchesCidade = !selectedCidade || prestador.cidade === selectedCidade;
    const matchesEstado = !selectedEstado || prestador.estado === selectedEstado;
    return matchesSearch && matchesCategoria && matchesCidade && matchesEstado;
  });

  // Generate WhatsApp link with pre-filled message
  const getWhatsAppLink = (prestador: Prestador) => {
    const message = `Olá ${prestador.nome}! Vi seu contato na plataforma de prestadores de serviços. Gostaria de saber mais sobre seus serviços de ${prestador.categoria.toLowerCase()}.`;
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = prestador.telefone.replace(/\D/g, '');
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  };

  return (
    <div>
      {/* Search and filter controls */}
      <div className="mb-8 space-y-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Buscar por nome ou descrição..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
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
          
          <div>
            <select
              value={selectedEstado}
              onChange={(e) => {
                setSelectedEstado(e.target.value);
                setSelectedCidade(''); // Reset city when state changes
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Todos os estados</option>
              {estados.map(estado => (
                <option key={estado} value={estado}>
                  {estado}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <select
              value={selectedCidade}
              onChange={(e) => setSelectedCidade(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              disabled={!selectedEstado}
            >
              <option value="">Todas as cidades</option>
              {cidades
                .filter(cidade => !selectedEstado || prestadores.some(p => p.cidade === cidade && p.estado === selectedEstado))
                .map(cidade => (
                  <option key={cidade} value={cidade}>
                    {cidade}
                  </option>
                ))}
            </select>
          </div>
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
            <div className="flex items-center space-x-2 mb-4">
              <p className="text-sm text-primary-600">
                {prestador.categoria}
              </p>
              <span className="text-gray-400">•</span>
              <p className="text-sm text-gray-600">
                {prestador.cidade}, {prestador.estado}
              </p>
            </div>
            <p className="text-gray-600 mb-4">
              {prestador.descricao}
            </p>
            {prestador.recomendadoPor && (
              <div className="bg-blue-50 border border-blue-100 rounded-md p-3 mb-4">
                <p className="text-sm text-blue-700">
                  <span className="font-medium">Recomendado por:</span> {prestador.recomendadoPor}
                </p>
              </div>
            )}
            <div className="space-y-2">
              <p className="text-sm text-gray-500">
                <strong>Telefone:</strong> {prestador.telefone}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Email:</strong> {prestador.email}
              </p>
              <div className="flex space-x-2 mt-4">
                <a
                  href={getWhatsAppLink(prestador)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-500 text-white text-center px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                >
                  Contatar via WhatsApp
                </a>
                {prestador.website && (
                  <a
                    href={prestador.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-primary-600 text-white text-center px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
                  >
                    Visitar Website
                  </a>
                )}
              </div>
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