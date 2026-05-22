import { Activity, Bone, Brain, Dumbbell, Heart } from 'lucide-react-native';

export const trilhaSistemas = [
  // A meta é a quantidade de ACERTOS necessários para fechar a fase. OBS DAR UM JEITO DE CALCULAR AUTOMAITICAMENTE COM BASE NO NÚMERO DE QUESTÕES DE CADA FASE NO BD
  { id: 'osteologia', nome: 'Osteologia', desc: 'Estudo dos ossos e esqueleto', icon: Bone, meta: 45 },
  { id: 'artrologia', nome: 'Artrologia', desc: 'Estudo das articulações', icon: Activity, meta: 47 },
  { id: 'miologia', nome: 'Miologia', desc: 'Estudo dos músculos e movimentos', icon: Dumbbell, meta: 34 },
  { id: 'inervação', nome: 'Sistema Nervoso', desc: 'Controle e processamento de informações', icon: Brain, meta: 30 },
  { id: 'vascularização', nome: 'Sistema Cardiovascular', desc: 'Coração e circulação sanguínea', icon: Heart, meta: 14 },
];