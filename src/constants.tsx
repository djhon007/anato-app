
import {
  Activity,
  Bone,
  Brain,
  Droplet,
  Eye,
  Heart,
  ShieldCheck
} from 'lucide-react-native';
import React from 'react';
import { AnatomySystem, Question } from './types';

export const THEME = {
  primary: '#8b2d30',
  primaryLight: '#fdecec',
  accent: '#e63946',
  text: '#1f2937',
  textSecondary: '#6b7280',
};

export const ANATOMY_SYSTEMS: AnatomySystem[] = [
  { id: 'osseo', nome: 'Sistema Locomotor', descricao: 'Estruturas relacionadas ao movimento', progresso: 75, icon: 'bone', locked: false },
  { id: 'nervoso', nome: 'Sistema Nervoso', descricao: 'Cérebro, nervos e sentidos', progresso: 0, icon: 'brain', locked: true },
  { id: 'cardiovascular', nome: 'Sistema Cardiovascular', descricao: 'Coração e circulação', progresso: 0, icon: 'heart', locked: true },
];

export const SYSTEM_ICONS: Record<string, React.ReactNode> = {
  bone: <Bone size={24} />,
  activity: <Activity size={24} />,
  brain: <Brain size={24} />,
  heart: <Heart size={24} />,
  droplet: <Droplet size={24} />,
  eye: <Eye size={24} />,
  shield: <ShieldCheck size={24} />,
};

export const MOCK_QUESTIONS: Question[] = [
  // MEMBROS SUPERIORES - OSTEOLOGIA
  {
    id: 1,
    sistemaId: 'osseo',
    subcategoria: 'superiores',
    especialidade: 'osteologia',
    texto: "Qual osso do antebraço localiza-se lateralmente na posição anatômica?",
    opcoes: ["Ulna", "Rádio", "Úmero", "Escápula"],
    correta: 1,
    explicacao: "Na posição anatômica, o rádio situa-se lateralmente (do lado do polegar) em relação à ulna."
  },
  // MEMBROS SUPERIORES - ARTROLOGIA
  {
    id: 10,
    sistemaId: 'osseo',
    subcategoria: 'superiores',
    especialidade: 'artrologia',
    texto: "A articulação do ombro (glenoumeral) é classificada como:",
    opcoes: ["Gínglimo", "Trocoide", "Esferoide", "Sela"],
    correta: 2,
    explicacao: "A articulação glenoumeral é uma articulação sinovial esferoide, permitindo grande amplitude de movimento."
  },
  // MEMBROS SUPERIORES - MIOLOGIA
  {
    id: 11,
    sistemaId: 'osseo',
    subcategoria: 'superiores',
    especialidade: 'miologia',
    texto: "Qual músculo é o principal flexor do antebraço?",
    opcoes: ["Tríceps braquial", "Braquial", "Bíceps braquial", "Coracobraquial"],
    correta: 1,
    explicacao: "Embora o bíceps seja famoso, o músculo braquial é o flexor mais potente do antebraço."
  },
  
  // MEMBROS INFERIORES - OSTEOLOGIA
  {
    id: 3,
    sistemaId: 'osseo',
    subcategoria: 'inferiores',
    especialidade: 'osteologia',
    texto: "Qual é o maior osso do corpo humano?",
    opcoes: ["Fêmur", "Tíbia", "Fíbula", "Patela"],
    correta: 0,
    explicacao: "O fêmur é o osso da coxa, sendo o mais longo e resistente do esqueleto humano."
  },
  // MEMBROS INFERIORES - ARTROLOGIA
  {
    id: 12,
    sistemaId: 'osseo',
    subcategoria: 'inferiores',
    especialidade: 'artrologia',
    texto: "Os meniscos são estruturas encontradas em qual articulação?",
    opcoes: ["Quadril", "Tornozelo", "Joelho", "Sínfise Púbica"],
    correta: 2,
    explicacao: "Os meniscos são fibrocartilagens em forma de C encontradas no joelho para amortecimento e estabilidade."
  },

  // TRONCO - MIOLOGIA
  {
    id: 5,
    sistemaId: 'osseo',
    subcategoria: 'tronco',
    especialidade: 'miologia',
    texto: "Qual é o principal músculo responsável pela respiração?",
    opcoes: ["Intercostais externos", "Abdominais", "Diafragma", "Serrátil anterior"],
    correta: 2,
    explicacao: "O diafragma é o músculo motor primário da respiração, separando a cavidade torácica da abdominal."
  },
  // TRONCO - OSTEOLOGIA
  {
    id: 6,
    sistemaId: 'osseo',
    subcategoria: 'tronco',
    especialidade: 'osteologia',
    texto: "Quantas vértebras compõem a região cervical da coluna vertebral?",
    opcoes: ["5 vértebras", "7 vértebras", "12 vértebras", "4 vértebras"],
    correta: 1,
    explicacao: "A região cervical é composta por 7 vértebras (C1 a C7)."
  },

  // OUTROS SISTEMAS
  {
    id: 100,
    sistemaId: 'nervoso',
    texto: "Qual célula é a unidade funcional básica do sistema nervoso?",
    opcoes: ["Néfron", "Alvéolo", "Neurônio", "Miócito"],
    correta: 2,
    explicacao: "Os neurônios são as células responsáveis pela transmissão de impulsos nervosos."
  }
];
