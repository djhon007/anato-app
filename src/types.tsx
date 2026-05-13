
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
  id?: number; // Opcional porque o Firestore gera o ID automático
  sistema: string; // Mudou de sistemaId para sistema
  subcategoria?: 'superiores' | 'inferiores' | 'tronco'; 
  especialidade?: 'osteologia' | 'artrologia' | 'miologia';
  pergunta: string; // Mudou de texto para pergunta
  opcoes: string[];
  resposta_correta: number; // Mudou de correta para resposta_correta
  explicacao: string;
  dificuldade?: number; // Adicione este se quiser usar no seeder
  xp_recompensa?: number; // Adicione este se quiser usar no seeder
}
