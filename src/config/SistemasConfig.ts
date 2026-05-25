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

// Adicione no final do seu SistemasConfig.ts
export const avataresDisponiveis = [
    // --- Femininos / Neutros ---
    'https://api.dicebear.com/8.x/notionists/png?seed=Mia&backgroundColor=f9a8d4',     // Fundo Rosa
    'https://api.dicebear.com/8.x/notionists/png?seed=Sophia&backgroundColor=d8b4fe',  // Fundo Lilás
    'https://api.dicebear.com/8.x/notionists/png?seed=Chloe&backgroundColor=5eead4',   // Fundo Verde Água
    'https://api.dicebear.com/8.x/notionists/png?seed=Jasmine&backgroundColor=fdba74', // Fundo Laranja
    'https://api.dicebear.com/8.x/notionists/png?seed=Zoe&backgroundColor=fda4af',     // Fundo Coral
    'https://api.dicebear.com/8.x/notionists/png?seed=Jul1a12s&backgroundColor=f9a8d4',     // Fundo Rosa

    //neutros

    'https://api.dicebear.com/8.x/notionists/png?seed=Skyler&backgroundColor=d8b4fe',  // Fundo Lilás
    'https://api.dicebear.com/8.x/notionists/png?seed=River&backgroundColor=5eead4',   // Fundo Verde Água
    'https://api.dicebear.com/8.x/notionists/png?seed=Phoenix&backgroundColor=fdba74', // Fundo Laranja
    'https://api.dicebear.com/8.x/notionists/png?seed=Quinn&backgroundColor=fda4af',     // Fundo Coral
    'https://api.dicebear.com/8.x/notionists/png?seed=Riley67&backgroundColor=cbd5e1',     // Fundo Cinza Azulado
    'https://api.dicebear.com/8.x/notionists/png?seed=Charlie22&backgroundColor=f9a8d4',     // Fundo Rosa
    
    // --- Masculinos / Neutros ---
    'https://api.dicebear.com/8.x/notionists/png?seed=Milo&backgroundColor=fca5a5',    // Fundo Vermelho
    'https://api.dicebear.com/8.x/notionists/png?seed=Felix&backgroundColor=93c5fd',   // Fundo Azul
    'https://api.dicebear.com/8.x/notionists/png?seed=Leochiu&backgroundColor=86efac',     // Fundo Verde
    'https://api.dicebear.com/8.x/notionists/png?seed=Lucas&backgroundColor=fde047',   // Fundo Amarelo
    'https://api.dicebear.com/8.x/notionists/png?seed=Alex&backgroundColor=cbd5e1',     // Fundo Cinza Azulado
    'https://api.dicebear.com/8.x/notionists/png?seed=Joao&backgroundColor=fca5a5',     // Fundo Vermelho
  ];

// Define o avatar índice 5 (Milo vermelho) como o padrão para novos usuários
export const avatarPadrao = avataresDisponiveis[5];