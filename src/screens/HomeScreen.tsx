import { useRouter } from 'expo-router';
import { Activity, BookOpen, ChevronRight, ClipboardCheck, GraduationCap, Map as MapIcon, Trophy } from 'lucide-react-native';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { auth } from '../config/firebase';

export default function HomeScreen() {
  const router = useRouter();
  const user = auth.currentUser;
  // Pega a parte antes do "@" do e-mail para usar como nome (ex: teste@ufpe.br vira "teste")
  const userName = user?.email ? user.email.split('@')[0] : 'Estudante';
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
              <Text className="text-xs font-medium text-gray-500">Logado no Firebase</Text>
            </View>
          </View>
          <View className="bg-red-800 px-4 py-1.5 rounded-full flex-row items-center shadow-md">
            <Text className="text-white text-xs font-bold">Level 1</Text>
          </View>
        </View>

        <View className="flex-row gap-4 mt-6">
          <View className="flex-1 p-3 rounded-2xl flex-row items-center gap-3 border bg-red-50 border-red-100">
            <View className="p-2 rounded-lg shadow-sm bg-white">
              <Trophy size={18} color="#991b1b" />
            </View>
            <View>
              <Text className="text-[10px] font-bold uppercase tracking-wider text-red-800">Troféus</Text>
              <Text className="text-sm font-bold text-gray-800">1 Fase completa</Text>
            </View>
          </View>
          <View className="flex-1 p-3 rounded-2xl flex-row items-center gap-3 border bg-red-50 border-red-100">
            <View className="p-2 rounded-lg shadow-sm bg-white">
              <Activity size={18} color="#991b1b" />
            </View>
            <View>
              <Text className="text-[10px] font-bold uppercase tracking-wider text-red-800">Sistemas</Text>
              <Text className="text-sm font-bold text-gray-800">2 Iniciados</Text>
            </View>
          </View>
        </View>
      </View>

      <View className="p-6 space-y-6">
        {/* Cartão de Progresso */}
        <View className="p-5 rounded-3xl shadow-sm border bg-white border-gray-100 mb-6">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="font-bold text-gray-800">Seu progresso</Text>
            <View className="bg-red-50 px-2 py-0.5 rounded-full">
              <Text className="text-xs font-bold text-red-800">7%</Text>
            </View>
          </View>
          <View className="w-full h-3 rounded-full overflow-hidden bg-gray-100">
            <View className="h-full bg-red-800 rounded-full w-[7%]" />
          </View>
          <Text className="text-[11px] mt-3 font-medium text-gray-500">
            Continue estudando para manter sua frequência!
          </Text>
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
            onPress={() => router.push('/(tabs)/jornada')} // Redirecionando para Jornada provisoriamente
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

          {/* Cartão: ESTUDO (AQUI ESTÁ O SEU LINK!) */}
          <TouchableOpacity 
            activeOpacity={0.7}
            onPress={() => router.push('/estudo')}
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