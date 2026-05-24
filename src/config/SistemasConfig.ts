import { Activity, Bone, Dumbbell, Footprints, Hand, User } from 'lucide-react-native';

export const trilhaRegioes = [
  // A meta da região DEVE ser a soma exata das metas dos seus 3 subsistemas
  { id: 'superior', nome: 'Superior', desc: 'Estudo dos membros superiores', icon: Hand, meta: 37 },
  { id: 'inferior', nome: 'Inferior', desc: 'Estudo dos membros inferiores', icon: Footprints, meta: 56 },
  { id: 'tronco', nome: 'Tronco', desc: 'Estudo do tronco', icon: User, meta: 42 },
];

export const subSistemas = [
  { 
    id: 'osteologia', 
    nome: 'Osteologia', 
    desc: 'Estudo dos ossos', 
    icon: Bone, 
    metas: { superior: 10, inferior: 20, tronco: 15 } // Coloque o número real de questões aqui
  },
  { 
    id: 'artrologia', 
    nome: 'Artrologia', 
    desc: 'Estudo das articulações', 
    icon: Activity, 
    metas: { superior: 18, inferior: 16, tronco: 12 } // Coloque o número real de questões aqui
  },
  { 
    id: 'miologia', 
    nome: 'Miologia', 
    desc: 'Estudo dos músculos', 
    icon: Dumbbell, 
    metas: { superior: 9, inferior: 20, tronco: 15 } // Coloque o número real de questões aqui
  }
];