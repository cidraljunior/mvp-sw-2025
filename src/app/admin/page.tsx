'use client';

import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import dados from '@/data/prestadores.json';
import { motion } from 'framer-motion';

interface User {
  id: string;
  nome: string;
  accessHash: string;
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({
    nome: '',
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [authorizedUsers, setAuthorizedUsers] = useState<string[]>([]);

  // Check if admin is authenticated
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    if (!isLoggedIn) {
      window.location.href = '/admin/login';
      return;
    }
    
    // Load users from localStorage
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
    
    // Load authorized users from localStorage
    const authorizedIds = localStorage.getItem('authorizedUsers');
    if (authorizedIds) {
      setAuthorizedUsers(JSON.parse(authorizedIds));
    }
  }, []);

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newUserData: User = {
      id: uuidv4(),
      nome: newUser.nome,
      accessHash: uuidv4() // Generate a unique hash for access
    };
    
    const updatedUsers = [...users, newUserData];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setNewUser({ nome: '' });
  };

  const copiarLink = (accessHash: string) => {
    const url = `${window.location.origin}/acesso/${accessHash}`;
    navigator.clipboard.writeText(url);
    setCopiedId(accessHash);
    
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    window.location.href = '/admin/login';
  };

  const toggleAuthorization = (id: string) => {
    let newAuthorizedList: string[];
    
    if (authorizedUsers.includes(id)) {
      newAuthorizedList = authorizedUsers.filter(authId => authId !== id);
    } else {
      newAuthorizedList = [...authorizedUsers, id];
    }
    
    setAuthorizedUsers(newAuthorizedList);
    localStorage.setItem('authorizedUsers', JSON.stringify(newAuthorizedList));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Painel de Administração
            </h1>
            <p className="text-xl text-gray-600">
              Gerencie usuários e gere links únicos de acesso à plataforma
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
          >
            Sair
          </button>
        </div>

        {/* Form to add new user */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Adicionar Novo Usuário</h2>
          <form onSubmit={handleAddUser} className="space-y-4">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                Nome do Usuário
              </label>
              <input
                type="text"
                id="nome"
                value={newUser.nome}
                onChange={(e) => setNewUser({...newUser, nome: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
            >
              Adicionar Usuário
            </button>
          </form>
        </div>

        {/* List of users */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Usuários Cadastrados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {user.nome}
                </h3>
                <div className="space-y-2">
                  <a
                    href={`/acesso/${user.accessHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
                  >
                    Visualizar Página
                  </a>
                  <button
                    onClick={() => copiarLink(user.accessHash)}
                    className="block w-full text-center bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    {copiedId === user.accessHash ? 'Link Copiado!' : 'Copiar Link'}
                  </button>
                  <button
                    onClick={() => toggleAuthorization(user.id)}
                    className={`block w-full text-center px-4 py-2 rounded-md transition-colors ${
                      authorizedUsers.includes(user.id)
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                  >
                    {authorizedUsers.includes(user.id)
                      ? 'Acesso Autorizado'
                      : 'Acesso Negado'}
                  </button>
                  <div className="text-xs text-gray-500 mt-2 break-all">
                    {`${window.location.origin}/acesso/${user.accessHash}`}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 