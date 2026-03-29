import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ANATOMY_SYSTEMS, SYSTEM_ICONS } from '../constants';

export default function HomeScreen() {
  const router = useRouter();
  return (
    <ScrollView className="flex-1 bg-gray-50 p-6">
      <View className="mt-8 mb-6">
        <Text className="text-3xl font-bold text-gray-800">Sistemas</Text>
        <Text className="text-base text-gray-500 mt-1">Escolha um sistema para estudar</Text>
      </View>

      {/* Percorrendo a lista de sistemas do seu constants.tsx */}
      {ANATOMY_SYSTEMS.map((sistema) => (
        <TouchableOpacity 
          key={sistema.id}
          activeOpacity={0.7}
          disabled={sistema.locked}
          onPress={() => router.push(`/system/${sistema.id}` as any)}
          className={`flex-row items-center p-4 mb-4 rounded-2xl border ${
            sistema.locked ? 'bg-gray-100 border-gray-200 opacity-60' : 'bg-white border-gray-100 shadow-sm'
          }`}
        >
          {/* Ícone do Sistema */}
          <View className="w-14 h-14 rounded-full bg-red-50 items-center justify-center mr-4">
            {SYSTEM_ICONS[sistema.icon]}
          </View>

          {/* Textos */}
          <View className="flex-1">
            <Text className="text-lg font-bold text-gray-800 mb-1">
              {sistema.nome}
            </Text>
            <Text className="text-sm text-gray-500">
              {sistema.descricao}
            </Text>
          </View>

          {/* Badge de Progresso (opcional, só visual por enquanto) */}
          {!sistema.locked && (
            <View className="bg-green-100 px-3 py-1 rounded-full">
              <Text className="text-green-800 text-xs font-bold">{sistema.progresso}%</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}