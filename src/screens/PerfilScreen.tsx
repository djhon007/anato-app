import { Activity, Award, BookOpen, MoreVertical, Star, Trophy, Zap } from 'lucide-react-native';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function PerfilScreen() {
  const achievements = [
    { title: 'Iniciante', desc: 'Completou a primeira fase', icon: <Zap size={20} color="#ef4444" />, done: true },
    { title: 'Estudioso', desc: 'Completou 2/128 fases', icon: <BookOpen size={20} color="#9ca3af" />, done: false },
    { title: 'Explorador', desc: 'Iniciou 2/7 sistemas', icon: <Activity size={20} color="#9ca3af" />, done: false },
    { title: 'Mestre', desc: 'Completou 1/7 sistemas', icon: <Award size={20} color="#9ca3af" />, done: false },
  ];

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Upper header section */}
      <View className="relative h-64 items-center pt-16">
        <View className="absolute top-0 w-full h-40 bg-red-800 rounded-b-[40px]" />
        
        <View className="w-full px-6 flex-row justify-between items-center z-10 mb-2">
          <Text className="text-xl font-bold text-white">Perfil</Text>
          <TouchableOpacity className="p-2 bg-white/20 rounded-full">
            <MoreVertical size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Avatar */}
        <View className="relative z-10 mt-2">
          <View className="w-28 h-28 rounded-full border-4 border-white overflow-hidden bg-white shadow-lg">
            <Image source={{ uri: 'https://picsum.photos/seed/ana/200/200' }} className="w-full h-full" />
          </View>
          <View className="absolute bottom-0 right-0 w-8 h-8 bg-yellow-400 rounded-full border-2 border-white items-center justify-center">
            <Star size={14} color="white" fill="white" />
          </View>
        </View>
      </View>

      <View className="px-6 -mt-2">
        <View className="items-center mb-8">
          <Text className="text-2xl font-bold text-gray-800">Ana Vitória</Text>
          <Text className="text-sm font-medium text-red-800 mt-1 mb-3">Enfermagem • 3º Período</Text>
          <View className="px-3 py-1 bg-gray-100 rounded-full">
            <Text className="text-xs font-bold text-gray-500">Nível 4 • Iniciante</Text>
          </View>
        </View>

        {/* Stats */}
        <View className="flex-row justify-between gap-4 mb-8">
          <View className="flex-1 bg-white border border-gray-100 p-4 rounded-3xl items-center shadow-sm">
            <Trophy size={24} color="#991b1b" className="mb-2" />
            <Text className="text-xl font-black text-gray-800">12</Text>
            <Text className="text-[10px] text-gray-400 font-bold uppercase mt-1">Fases Completas</Text>
          </View>
          <View className="flex-1 bg-white border border-gray-100 p-4 rounded-3xl items-center shadow-sm">
            <Activity size={24} color="#991b1b" className="mb-2" />
            <Text className="text-xl font-black text-gray-800">2</Text>
            <Text className="text-[10px] text-gray-400 font-bold uppercase mt-1">Sistemas Iniciados</Text>
          </View>
        </View>

        {/* Achievements */}
        <View className="mb-10">
          <Text className="font-bold text-lg mb-4 px-1 text-gray-800">Conquistas</Text>
          <View className="flex-row flex-wrap justify-between">
            {achievements.map((ach, idx) => (
              <View key={idx} className="w-[48%] mb-4 flex-col items-center text-center">
                <View className={`w-16 h-16 rounded-full items-center justify-center mb-3 shadow-sm border-2 border-white ${
                  ach.done ? 'bg-red-50' : 'bg-gray-50'
                }`}>
                  {ach.icon}
                </View>
                <Text className={`text-sm font-bold text-center ${ach.done ? 'text-gray-800' : 'text-gray-400'}`}>{ach.title}</Text>
                <Text className={`text-[10px] font-medium mt-1 text-center ${ach.done ? 'text-red-800' : 'text-gray-400'}`}>{ach.desc}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}