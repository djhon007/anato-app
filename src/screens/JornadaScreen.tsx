import { useRouter } from 'expo-router';
import { Lock } from 'lucide-react-native';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ANATOMY_SYSTEMS, SYSTEM_ICONS, THEME } from '../constants';

export default function JornadaScreen() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Cabeçalho */}
      <View className="px-6 pt-16 pb-6 bg-white shadow-sm border-b border-gray-100 z-10">
        <View className="flex-row items-center gap-4">
          <View>
            <Text className="text-2xl font-bold text-gray-800">Jornada</Text>
            <Text className="text-xs font-medium text-gray-500">O seu caminho de aprendizagem</Text>
          </View>
        </View>
      </View>

      {/* Linha do Tempo */}
      <View className="p-6 relative">
        {/* Linha vertical de fundo */}
        <View className="absolute left-14 top-10 bottom-10 w-1 bg-gray-100 rounded-full" />
        
        {ANATOMY_SYSTEMS.map((system) => (
          <View key={system.id} className="flex-row mb-8 relative">
            {/* Ícone Redondo */}
            <View 
              className="w-16 h-16 rounded-full items-center justify-center border-4 border-white shadow-sm z-10"
              style={{ backgroundColor: system.locked ? '#9ca3af' : THEME.primary }}
            >
              {system.locked ? <Lock size={24} color="white" /> : SYSTEM_ICONS[system.icon]}
            </View>

            {/* Cartão de Progresso */}
            <TouchableOpacity 
              activeOpacity={0.7}
              disabled={system.locked}
              onPress={() => router.push(`/system/${system.id}` as any)}
              className={`flex-1 ml-4 p-4 rounded-3xl border ${
                system.locked ? 'bg-gray-50 border-gray-100 opacity-70' : 'bg-white border-gray-200 shadow-sm'
              }`}
            >
              <View className="flex-row justify-between items-center mb-1">
                <Text className={`font-bold ${system.locked ? 'text-gray-400' : 'text-gray-800'}`}>
                  {system.nome}
                </Text>
                <Text className="text-[10px] font-bold text-gray-400">
                  {system.locked ? 'Bloqueado' : `${system.progresso}%`}
                </Text>
              </View>
              <Text className="text-xs mb-3 text-gray-500">
                {system.locked ? 'Complete os sistemas anteriores para desbloquear' : system.descricao}
              </Text>
              
              {/* Barra de Progresso */}
              <View className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <View 
                  className="h-full rounded-full" 
                  style={{ 
                    width: `${system.progresso}%`, 
                    backgroundColor: system.locked ? '#d1d5db' : THEME.primary 
                  }} 
                />
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}