export interface Prestador {
  id: string;
  nome: string;
  categoria: string;
  descricao: string;
  telefone: string;
  email: string;
  website?: string;
}

export interface Engenheiro {
  id: string;
  nome: string;
  especialidade: string;
}

export interface DadosApp {
  prestadores: Prestador[];
  engenheiros: Engenheiro[];
}

export interface User {
  id: string;
  nome: string;
  accessHash: string;
} 