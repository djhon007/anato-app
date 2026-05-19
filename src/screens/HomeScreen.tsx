import { useRouter } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { Activity, BookOpen, ChevronRight, ClipboardCheck, GraduationCap, Map as MapIcon, Trophy } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { trilhaSistemas } from '../config/SistemasConfig';

// Importações do Firebase consolidadas
import { auth, db } from '../config/firebase';

export default function HomeScreen() {
  const router = useRouter();
  const user = auth.currentUser;
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const carregarDados = async () => {
      if (!auth.currentUser) return;
      const docRef = doc(db, 'usuarios', auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setUserData(docSnap.data());
    };
    carregarDados();
  }, []);

  const concluidos = userData?.sistemas_concluidos || [];
  const progresso = userData?.progresso_sistemas || {};

  let iniciadosCount = 0;
  let porcentagemTotal = 0;
  const pesoPorSistema = 100 / trilhaSistemas.length;

  trilhaSistemas.forEach((sistema) => {
    const acertosDesteSistema = progresso[sistema.id] || 0;

    if (acertosDesteSistema > 0 && !concluidos.includes(sistema.id)) {
      iniciadosCount++;
    }

    let progressoFracionado = (acertosDesteSistema / sistema.meta) * pesoPorSistema;

    if (progressoFracionado > pesoPorSistema) {
      progressoFracionado = pesoPorSistema;
    }

    porcentagemTotal += progressoFracionado;
  });

  const progressoPercentual = Math.round(porcentagemTotal) || 0;
  const sistemasConcluidosCount = concluidos.length;
  
  // Tenta pegar o nome que está no banco. Se não tiver, usa o e-mail antes do @. Se não tiver, usa 'Estudante'
  const userName = userData?.nome || (user?.email ? user.email.split('@')[0] : 'Estudante');

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Cabeçalho do Perfil */}
      <View className="p-6 bg-white rounded-b-3xl shadow-sm pt-16 z-10">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <View className="w-14 h-14 rounded-full overflow-hidden border-2 border-red-800 p-0.5">
              <Image source={{ uri: "https://picsum.photos/seed/ana/100/100" }} className="w-full h-full rounded-full" />
            </View>
            <View>
              <Text className="font-bold text-lg text-gray-800 capitalize">{userName}</Text>
              <Text className="text-xs font-medium text-gray-500">Nível {userData?.nivel || 1}</Text>
            </View>
          </View>
          <View className="bg-red-800 px-4 py-1.5 rounded-full flex-row items-center shadow-md">
            <Text className="text-white text-xs font-bold">{userData?.xp || 0} XP</Text>
          </View>
        </View>

        <View className="flex-row gap-4 mt-6">
          <View className="flex-1 p-3 rounded-2xl flex-row items-center gap-3 border bg-red-50 border-red-100">
            <View className="p-2 rounded-lg shadow-sm bg-white">
              <Trophy size={18} color="#991b1b" />
            </View>
            <View>
              <Text className="text-[10px] font-bold uppercase tracking-wider text-red-800">Conquistas</Text>
              <Text className="text-sm font-bold text-gray-800">{sistemasConcluidosCount} Fases</Text>
            </View>
          </View>
          <View className="flex-1 p-3 rounded-2xl flex-row items-center gap-3 border bg-red-50 border-red-100">
            <View className="p-2 rounded-lg shadow-sm bg-white">
              <Activity size={18} color="#991b1b" />
            </View>
            <View>
              <Text className="text-[10px] font-bold uppercase tracking-wider text-red-800">Sistemas</Text>
              <Text className="text-sm font-bold text-gray-800">{iniciadosCount} Iniciados</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Container Principal abaixo do Cabeçalho */}
      <View className="p-6">
        {/* Cartão de Progresso Geral */}
        <View className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 mb-8">
          <View className="flex-row justify-between items-end mb-3">
            <View>
              <Text className="text-gray-500 font-medium text-sm">Progresso Geral</Text>
              <Text className="text-xs text-gray-400 mt-0.5">{sistemasConcluidosCount} de {trilhaSistemas.length} Fases Completas</Text>
            </View>
            <Text className="text-xl font-black text-gray-800">{progressoPercentual}%</Text>
          </View>
          
          <View className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <View 
              className="h-full bg-red-800 rounded-full" 
              style={{ width: `${progressoPercentual}%` }} 
            />
          </View>
        </View>

        {/* Opções de Menu */}
        <View className="mb-6">
          <Text className="font-bold px-1 text-gray-800 mb-3">O que deseja fazer?</Text>
          
          {/* Cartão: JORNADA */}
          <TouchableOpacity 
            activeOpacity={0.7}
            onPress={() => router.push('/(tabs)/jornada')}
            className="w-full p-4 rounded-3xl flex-row items-center gap-4 shadow-sm border bg-white border-gray-100 mb-3"
          >
            <View className="w-16 h-16 rounded-2xl flex items-center justify-center bg-red-50">
               <MapIcon size={32} color="#991b1b" />
            </View>
            <View className="flex-1">
              <Text className="font-bold text-lg text-gray-800">Jornada</Text>
              <Text className="text-sm text-gray-500">Trilha gamificada</Text>
            </View>
            <ChevronRight color="#d1d5db" />
          </TouchableOpacity>

          {/* Cartão: QUESTÕES */}
          <TouchableOpacity 
            activeOpacity={0.7}
            onPress={() => router.push('/questoes' as any)}
            className="w-full p-4 rounded-3xl flex-row items-center gap-4 shadow-sm border bg-white border-gray-100 mb-3"
          >
            <View className="w-16 h-16 rounded-2xl flex items-center justify-center bg-red-50">
               <ClipboardCheck size={32} color="#991b1b" />
            </View>
            <View className="flex-1">
              <Text className="font-bold text-lg text-gray-800">Questões</Text>
              <Text className="text-sm text-gray-500">Pratique com simulados</Text>
            </View>
            <ChevronRight color="#d1d5db" />
          </TouchableOpacity>

          {/* Cartão: ESTUDO */}
          <TouchableOpacity 
            activeOpacity={0.7}
            onPress={() => router.push('/estudo' as any)}
            className="w-full p-4 rounded-3xl flex-row items-center gap-4 shadow-sm border bg-white border-gray-100 mb-3"
          >
            <View className="w-16 h-16 rounded-2xl flex items-center justify-center bg-red-50">
               <BookOpen size={32} color="#991b1b" />
            </View>
            <View className="flex-1">
              <Text className="font-bold text-lg text-gray-800">Estudo</Text>
              <Text className="text-sm text-gray-500">Materiais online</Text>
            </View>
            <ChevronRight color="#d1d5db" />
          </TouchableOpacity>
        </View>

        {/* Caixa de Dica */}
        <View className="bg-red-800 p-4 rounded-3xl shadow-lg relative overflow-hidden mb-8">
          <View className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <View className="relative z-10 flex-row gap-3 items-start">
             <View className="bg-white/20 p-2 rounded-xl">
               <GraduationCap size={20} color="white" />
             </View>
             <View className="flex-1">
               <Text className="text-white font-bold text-sm">Dica:</Text>
               <Text className="text-white/90 text-xs leading-relaxed mt-1">
                 Complete fases na jornada para desbloquear novos conteúdos e conquistas!
               </Text>
             </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}