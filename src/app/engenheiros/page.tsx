'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Engenheiro } from '@/types';
import dados from '@/data/prestadores.json';
import { motion } from 'framer-motion';

export default function EngenheirosPage() {
  const router = useRouter();
  const engenheiros = dados.engenheiros;

  useEffect(() => {
    router.push('/');
  }, [router]);

  const copiarLink = (id: string) => {
    const url = `${window.location.origin}/engenheiro/${id}`;
    navigator.clipboard.writeText(url);
    // You could add a toast notification here
  };

  return null;
} 