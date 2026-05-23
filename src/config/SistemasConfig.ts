import { Activity, Bone, Dumbbell, Footprints, Hand, User } from 'lucide-react-native';

export const trilhaRegioes = [
  { id: 'superior', nome: 'Superior', desc: 'Estudo dos membros superiores', icon: Hand, meta: 36 },
  { id: 'inferior', nome: 'Inferior', desc: 'Estudo dos membros inferiores', icon: Footprints, meta: 54 },
  { id: 'tronco', nome: 'Tronco', desc: 'Estudo do tronco', icon: User, meta: 42 },
];

export const subSistemas = [
  { id: 'osteologia', nome: 'Osteologia', desc: 'Estudo dos ossos', icon: Bone, meta: 12 },
  { id: 'artrologia', nome: 'Artrologia', desc: 'Estudo das articulações', icon: Activity, meta: 18 },
  { id: 'miologia', nome: 'Miologia', desc: 'Estudo dos músculos', icon: Dumbbell, meta: 14 }
];