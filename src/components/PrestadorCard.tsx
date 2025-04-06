'use client';

import React from 'react';
import { Prestador } from '@/types';
import { motion } from 'framer-motion';

interface PrestadorCardProps {
  prestador: Prestador;
}

export default function PrestadorCard({ prestador }: PrestadorCardProps) {
  const whatsappUrl = `https://wa.me/${prestador.whatsapp}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{prestador.nome}</h3>
      <div className="space-y-2">
        <p className="text-gray-600">
          <span className="font-medium">Serviço:</span>{' '}
          {prestador.tipoServico.charAt(0).toUpperCase() + prestador.tipoServico.slice(1)}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Recomendado por:</span> {prestador.recomendadoPor}
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
        >
          Contatar via WhatsApp
        </a>
      </div>
    </motion.div>
  );
} 