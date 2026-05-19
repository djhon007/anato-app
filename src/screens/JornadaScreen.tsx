import { useRouter } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { Lock } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';

// Importações do Firebase e da nossa Configuração Central
import { auth, db } from '../config/firebase';
import { trilhaSistemas } from '../config/SistemasConfig';

export default function JornadaScreen() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarDados = async () => {
      if (!auth.currentUser) return;
      const docRef = doc(db, 'usuarios', auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setUserData(docSnap.data());
      setLoading(false);
    };
    carregarDados();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#991b1b" />
      </View>
    );
  }

  const concluidos = userData?.sistemas_concluidos || [];
  const progresso = userData?.progresso_sistemas || {};

  return (
    <ScrollView className="flex-1 bg-gray-50 pt-12 px-6">
      <Text className="text-3xl font-black text-gray-800 mb-8">Sua Jornada</Text>

      <View className="pb-10">
        {trilhaSistemas.map((sistema, index) => {
          
          // --- LÓGICA DE BLOQUEIO E PROGRESSO PROPORCIONAL ---
          const isConcluido = concluidos.includes(sistema.id);
          const isLiberado = index === 0 || concluidos.includes(trilhaSistemas[index - 1].id);
          
          // Pega os acertos deste sistema e calcula a porcentagem usando a META oficial
          const acertos = progresso[sistema.id] || 0;
          let porcentagem = isConcluido ? 100 : Math.round((acertos / sistema.meta) * 100) || 0;
          
          // Trava de segurança para não passar de 100% visualmente
          if (porcentagem > 100) porcentagem = 100;

          const Icon = sistema.icon;

          return (
            <View key={sistema.id} className="mb-6 flex-row">
              {/* Linha conectora entre as fases */}
              {index !== trilhaSistemas.length - 1 && (
                <View className="absolute left-6 top-14 bottom-[-30px] w-0.5 bg-gray-200 z-0" />
              )}

              {/* Ícone Lateral (Cadeado ou Ícone do Sistema) */}
              <View className={`w-12 h-12 rounded-full items-center justify-center border-4 z-10 
                ${isConcluido ? 'bg-red-800 border-red-100' : isLiberado ? 'bg-white border-red-800' : 'bg-gray-100 border-gray-200'}`}
              >
                {isLiberado ? (
                  <Icon size={20} color={isConcluido ? 'white' : '#991b1b'} />
                ) : (
                  <Lock size={20} color="#9ca3af" />
                )}
              </View>

              {/* Card da Fase */}
              <TouchableOpacity
                disabled={!isLiberado}
                onPress={() => router.push(`/fases/${sistema.id}` as any)}
                className={`flex-1 ml-4 p-5 rounded-3xl border shadow-sm
                  ${isLiberado ? 'bg-white border-gray-100' : 'bg-gray-50 border-gray-200 opacity-70'}`}
              >
                <View className="flex-row justify-between items-center mb-2">
                  <Text className={`font-bold text-lg ${isLiberado ? 'text-gray-800' : 'text-gray-400'}`}>
                    {sistema.nome}
                  </Text>
                  {isLiberado && (
                    <Text className="text-xs font-black text-gray-800">{porcentagem}%</Text>
                  )}
                </View>
                
                <Text className={`text-xs mb-4 ${isLiberado ? 'text-gray-500' : 'text-gray-400'}`}>
                  {isLiberado ? sistema.desc : 'Complete o sistema anterior para desbloquear'}
                </Text>

                {/* Barra de Progresso Interna da Fase */}
                {isLiberado && (
                  <View className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <View 
                      className={`h-full rounded-full ${isConcluido ? 'bg-green-500' : 'bg-red-800'}`}
                      style={{ width: `${porcentagem}%` }} 
                    />
                  </View>
                )}
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}