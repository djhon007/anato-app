import { useLocalSearchParams, useRouter } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { ArrowLeft } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';

// Importações com os caminhos corretos apontando para a pasta src
import { auth, db } from '../../src/config/firebase';
import { subSistemas, trilhaRegioes } from '../../src/config/SistemasConfig';

export default function SubJornadaScreen() {
  const router = useRouter();
  // Captura qual região foi clicada (ex: "superior", "inferior", "tronco")
  const { id } = useLocalSearchParams<{ id: string }>(); 
  
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Busca as informações da região clicada no seu arquivo de configuração
  const regiaoAtual = trilhaRegioes?.find(r => r.id === id);

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

  if (loading || !regiaoAtual) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#991b1b" />
      </View>
    );
  }

  const progresso = userData?.progresso_sistemas || {};

  return (
    <ScrollView className="flex-1 bg-gray-50 pt-16 px-6">
      {/* Cabeçalho */}
      <View className="flex-row items-center mb-8 gap-4">
        <TouchableOpacity onPress={() => router.back()} className="p-3 bg-white rounded-full shadow-sm border border-gray-100">
          <ArrowLeft size={20} color="#374151" />
        </TouchableOpacity>
        <View>
          <Text className="text-sm font-bold text-red-800 uppercase tracking-widest">Módulos de Estudo</Text>
          <Text className="text-3xl font-black text-gray-800">{regiaoAtual.nome}</Text>
        </View>
      </View>

      {/* Lista de SubSistemas (Osteologia, Artrologia, Miologia) */}
      <View className="pb-10">
        {subSistemas.map((sistema, index) => {
          
          // A chave composta no banco de dados Ex: "superior_osteologia"
          const chaveProgresso = `${id}_${sistema.id}`;
          
          // Puxa a meta exata do dicionário (usamos 'as any' ou record para o TS não reclamar da chave dinâmica)
          const metaExata = (sistema.metas as any)[id] || 1; 

          // Pega os acertos desta chave e calcula a porcentagem com a meta isolada
          const acertos = progresso[chaveProgresso] || 0;
          let porcentagem = Math.round((acertos / metaExata) * 100) || 0;
          
          // Se passou de 100%, trava no 100 e considera concluído
          const isConcluido = porcentagem >= 100;
          if (porcentagem > 100) porcentagem = 100;

          const Icon = sistema.icon;

          return (
            <View key={sistema.id} className="mb-6 flex-row">
              {/* Linha conectora entre as fases */}
              {index !== subSistemas.length - 1 && (
                <View className="absolute left-6 top-14 bottom-[-30px] w-0.5 bg-gray-200 z-0" />
              )}

              {/* Ícone Lateral */}
              <View className={`w-12 h-12 rounded-full items-center justify-center border-4 z-10 
                ${isConcluido ? 'bg-red-800 border-red-100' : 'bg-white border-red-800'}`}
              >
                <Icon size={20} color={isConcluido ? 'white' : '#991b1b'} />
              </View>

              {/* Card da Fase */}
              <TouchableOpacity
                onPress={() => router.push(`/fases/${chaveProgresso}` as any)}
                className="flex-1 ml-4 p-5 rounded-3xl border shadow-sm bg-white border-gray-100"
              >
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="font-bold text-lg text-gray-800">
                    {sistema.nome}
                  </Text>
                  <Text className="text-xs font-black text-gray-800">{porcentagem}%</Text>
                </View>
                
                <Text className="text-xs mb-4 text-gray-500">
                  {sistema.desc}
                </Text>

                {/* Barra de Progresso Interna da Fase */}
                <View className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <View 
                    className={`h-full rounded-full ${isConcluido ? 'bg-green-500' : 'bg-red-800'}`}
                    style={{ width: `${porcentagem}%` }} 
                  />
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}