
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
  id?: string; // O Firestore usa IDs de texto, não números
  regiao: string; // Ex: 'superior', 'inferior', 'tronco'
  sistema: string; // Ex: 'osteologia', 'artrologia', 'miologia'
  pergunta: string;
  opcoes: string[];
  resposta_correta: number;
  explicacao: string;
  dificuldade: number;
  xp_recompensa: number;
}
