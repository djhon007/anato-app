import { useRouter } from 'expo-router';
import { Activity, Bone, Brain, Dumbbell, Heart, Lock } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';

// Importações do Firebase
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

export default function JornadaScreen() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Busca os dados do usuário para saber o progresso dele
  useEffect(() => {
    const carregarProgresso = async () => {
      if (!auth.currentUser) return;
      try {
        const docRef = doc(db, 'usuarios', auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      } catch (error) {
        console.error("Erro ao carregar progresso:", error);
      } finally {
        setLoading(false);
      }
    };
    carregarProgresso();
  }, []);

  // Definição da ordem oficial das Fases/Sistemas do jogo
  const trilhaSistemas = [
    { id: 'osteologia', nome: 'Osteologia', desc: 'Estudo dos ossos e esqueleto', icon: Bone },
    { id: 'artrologia', nome: 'Artrologia', desc: 'Estudo das articulações', icon: Activity },
    { id: 'miologia', nome: 'Miologia', desc: 'Estudo dos músculos e movimentos', icon: Dumbbell },
    { id: 'nervoso', nome: 'Sistema Nervoso', desc: 'Controle e processamento de informações', icon: Brain },
    { id: 'cardiovascular', nome: 'Sistema Cardiovascular', desc: 'Coração e circulação sanguínea', icon: Heart },
  ];

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#991b1b" />
      </View>
    );
  }

  // Pegamos a lista de sistemas que o aluno já terminou (se não existir, usamos um array vazio [])
  const sistemasConcluidos = userData?.sistemas_concluidos || [];
  
  // Pegamos o progresso percentual (vamos assumir que no futuro salvaremos isso no banco como userData.progresso_locomotor)
  // Por enquanto, se ele não concluiu, é 0%. Se concluiu, é 100%.
  const getProgresso = (id: string) => {
    return sistemasConcluidos.includes(id) ? 100 : (userData?.[`progresso_${id}`] || 0);
  };

  return (
    <ScrollView className="flex-1 bg-gray-50 pt-16 px-6">
      <View className="mb-8">
        <Text className="text-3xl font-bold text-gray-800">Sua Jornada</Text>
        <Text className="text-sm font-medium text-gray-500 mt-1">Complete os sistemas na ordem para avançar</Text>
      </View>

      <View className="space-y-6 pb-20 relative">
        {/* Linha vertical que conecta as bolinhas (estética de trilha) */}
        <View className="absolute left-6 top-10 bottom-10 w-0.5 bg-gray-200 z-0" />

        {trilhaSistemas.map((sistema, index) => {
          // Lógica do bloqueio: O primeiro sistema (index 0) está sempre desbloqueado.
          // Os outros só desbloqueiam se o sistema ANTERIOR estiver na lista de concluídos.
          const isBloqueado = index > 0 && !sistemasConcluidos.includes(trilhaSistemas[index - 1].id);
          const progresso = getProgresso(sistema.id);
          const Icone = sistema.icon;

          return (
            <View key={sistema.id} className="flex-row items-center gap-4 z-10 mb-6">
              {/* Bolinha do Ícone */}
              <View className={`w-12 h-12 rounded-full items-center justify-center border-4 border-gray-50 shadow-sm ${
                isBloqueado ? 'bg-gray-300' : 'bg-red-800'
              }`}>
                {isBloqueado ? <Lock size={20} color="white" /> : <Icone size={20} color="white" />}
              </View>

              {/* Cartão do Sistema */}
              <TouchableOpacity 
                activeOpacity={0.8}
                disabled={isBloqueado}
                onPress={() => router.push(`/fases/${sistema.id}` as any)} // Rota futura para a tela do jogo
                className={`flex-1 p-4 rounded-2xl border bg-white ${
                  isBloqueado ? 'border-gray-100 opacity-70' : 'border-gray-200 shadow-sm'
                }`}
              >
                <View className="flex-row justify-between items-end mb-2">
                  <View className="flex-1">
                    <Text className={`font-bold text-lg ${isBloqueado ? 'text-gray-400' : 'text-gray-800'}`}>
                      {sistema.nome}
                    </Text>
                    <Text className="text-xs text-gray-400 mt-0.5">
                      {isBloqueado ? 'Complete o sistema anterior para desbloquear' : sistema.desc}
                    </Text>
                  </View>
                  {!isBloqueado && (
                    <Text className="text-xs font-bold text-gray-500 ml-2">{progresso}%</Text>
                  )}
                </View>

                {/* Barra de Progresso Interna */}
                <View className="w-full h-2 rounded-full overflow-hidden bg-gray-100 mt-1">
                  {!isBloqueado && (
                    <View 
                      className="h-full bg-red-800 rounded-full" 
                      style={{ width: `${progresso}%` }} 
                    />
                  )}
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}