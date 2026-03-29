
export enum AppState {
  SPLASH = 'SPLASH',
  INTRO = 'INTRO',
  LOGIN = 'LOGIN',
  HOME = 'HOME',
  JORNADA = 'JORNADA',
  QUESTOES = 'QUESTOES',
  QUIZ = 'QUIZ',
  ESTUDO = 'ESTUDO',
  PERFIL = 'PERFIL',
  FORUM = 'FORUM',
  CONFIGURACOES = 'CONFIGURACOES'
}

export interface UserStats {
  level: number;
  fasesCompletas: number;
  sistemasIniciados: number;
  progressoGeral: number;
}

export interface AnatomySystem {
  id: string;
  nome: string;
  descricao: string;
  progresso: number;
  icon: string;
  locked?: boolean;
}

export interface Question {
  id: number;
  sistemaId: string; 
  subcategoria?: 'superiores' | 'inferiores' | 'tronco'; 
  especialidade?: 'osteologia' | 'artrologia' | 'miologia'; // Novo campo para o segundo nível de abas
  texto: string;
  opcoes: string[];
  correta: number;
  explicacao: string;
}
