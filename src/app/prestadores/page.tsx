'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import React from 'react';
import dados from '@/data/prestadores.json';
import PrestadoresList from '@/components/PrestadoresList';

export default function PrestadoresPage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  }, [router]);

  return null;
} 