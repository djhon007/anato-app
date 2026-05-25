import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { THEME } from '../constants';

export default function IntroScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white p-8 items-center justify-between pt-24">
      <View className="items-center mt-8">
        <Text className="text-5xl font-black tracking-widest" style={{ color: THEME.primary }}>ANATO</Text>
        <Text className="text-5xl font-light tracking-widest -mt-2" style={{ color: THEME.primary }}>APP</Text>
      </View>

      <ScrollView className="w-full max-h-[50%] mt-8 px-2" showsVerticalScrollIndicator={false}>
        <View className="space-y-4 mb-6">
          <Text className="text-xl font-bold text-gray-800 text-center">Sobre o Projeto</Text>
          <Text className="text-gray-600 leading-relaxed text-sm text-center">
            Bem-vindo ao AnatoApp! Esta plataforma foi desenhada para transformar o estudo da anatomia humana em uma experiência interativa, gamificada e eficiente para estudantes da área de saúde.
          </Text>
        </View>

        <View className="pt-4 border-t border-gray-100 space-y-3">
          <Text className="text-gray-400 text-[11px] leading-relaxed text-center">
            As interfaces deste projeto foram desenvolvidas pelos discentes da disciplina HCI – Interação Humano-Computador, orientada pelo docente Fábio Caparica, do curso de Design UFPE – CAA | 2025.2
          </Text>
        </View>

        <View className="pt-4 border-t border-gray-100 space-y-4">
          <Text className="text-gray-400 text-[11px] leading-relaxed text-center">
            Bem vindos à versão beta 2.2.0 do AnatoApp! Atualmente temos as abas de Home, Jornada e Perfil completamente funcionais. Em breve novas telas serão devidamente implementadas.
          </Text>
        </View>

      </ScrollView>

      <View className="w-full mb-8">
        <TouchableOpacity
          onPress={() => router.push('/login')} // Manda para o Login!
          className="w-full py-4 rounded-2xl items-center shadow-lg active:scale-95 transition-transform"
          style={{ backgroundColor: THEME.primary }}
        >
          <Text className="text-white font-bold text-lg">Começar a Estudar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}