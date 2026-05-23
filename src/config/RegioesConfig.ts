import { Footprints, Hand, User } from 'lucide-react-native';

export const trilhaRegioes = [
  // A meta é a quantidade de ACERTOS necessários para fechar a fase. OBS DAR UM JEITO DE CALCULAR AUTOMAITICAMENTE COM BASE NO NÚMERO DE QUESTÕES DE CADA FASE NO BD
  { id: 'superior', nome: 'Superior', desc: 'Estudo dos membros superiores', icon: Hand, meta: 37 },
  { id: 'inferior', nome: 'Inferior', desc: 'Estudo dos membros inferiores', icon: Footprints, meta: 56 },
  { id: 'tronco', nome: 'Tronco', desc: 'Estudo do tronco', icon: User, meta: 42 },
];