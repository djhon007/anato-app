import { useRouter } from 'expo-router';
import { AlertCircle, Brain, Calendar, Play, RefreshCcw, Target } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

export default function QuestoesScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [sistemasLiberados, setSistemasLiberados] = useState(1);

  useEffect(() => {
    const carregarSistemas = async () => {
      if (!auth.currentUser) return;
      try {
        const docRef = doc(db, 'usuarios', auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const concluidos = docSnap.data().sistemas_concluidos || [];
          setSistemasLiberados(concluidos.length + 1);
        }
      } catch (error) {
        console.error("Erro ao carregar sistemas:", error);
      } finally {
        setLoading(false);
      }
    };
    carregarSistemas();
  }, []);

  const iniciarSimulado = () => {
    Alert.alert(
      "Preparado?", 
      `Vamos sortear 10 questões misturadas dos ${sistemasLiberados} sistemas que você já tem acesso.`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Começar", onPress: () => router.push('/quiz/simulado' as any) }
      ]
    );
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#991b1b" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-50 pt-16 px-6">
      <View className="mb-8">
        <Text className="text-3xl font-bold text-gray-800">Treino Livre</Text>
        <Text className="text-sm font-medium text-gray-500 mt-1">Pratique e ganhe XP extra para subir de nível</Text>
      </View>

      <TouchableOpacity 
        activeOpacity={0.9} 
        onPress={iniciarSimulado}
        className="bg-red-800 rounded-3xl p-6 mb-8 shadow-md relative overflow-hidden"
      >
        <View className="absolute -right-6 -top-6 opacity-10">
          <Target size={120} color="white" />
        </View>

        <View className="flex-row items-center gap-3 mb-4 z-10">
          <View className="w-10 h-10 bg-white/20 rounded-xl items-center justify-center">
            <RefreshCcw size={24} color="white" />
          </View>
          <Text className="text-2xl font-black text-white">Simulado Rápido</Text>
        </View>
        
        <Text className="text-white/80 font-medium mb-6 z-10">
          Uma bateria de 10 questões aleatórias abordando os sistemas que você já desbloqueou. Perfeito para revisar!
        </Text>

        <View className="flex-row items-center justify-between z-10">
          <View className="flex-row items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-full">
            <Brain size={14} color="white" />
            <Text className="text-white text-xs font-bold">{sistemasLiberados} Sistemas inclusos</Text>
          </View>
          
          <View className="bg-white px-5 py-2.5 rounded-full flex-row items-center gap-2">
            <Play size={16} color="#991b1b" fill="#991b1b" />
            <Text className="text-red-800 font-bold text-sm">Jogar Agora</Text>
          </View>
        </View>
      </TouchableOpacity>

      <Text className="font-bold text-lg text-gray-800 mb-4 px-1">Modos Especiais</Text>
      
      <View className="flex-row justify-between gap-4 mb-10">
        <View className="flex-1 bg-white border border-gray-200 rounded-3xl p-5 shadow-sm opacity-60">
          <View className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center mb-3">
            <AlertCircle size={20} color="#6b7280" />
          </View>
          <Text className="font-bold text-gray-800 mb-1">Hospital de Erros</Text>
          <Text className="text-[11px] text-gray-500 mb-4">Revise as questões que você errou recentemente.</Text>
          <View className="bg-gray-100 self-start px-2 py-1 rounded-md">
            <Text className="text-[10px] font-bold text-gray-400 uppercase">Em breve</Text>
          </View>
        </View>

        <View className="flex-1 bg-white border border-gray-200 rounded-3xl p-5 shadow-sm opacity-60">
          <View className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center mb-3">
            <Calendar size={20} color="#6b7280" />
          </View>
          <Text className="font-bold text-gray-800 mb-1">Desafio Diário</Text>
          <Text className="text-[11px] text-gray-500 mb-4">Uma pergunta casca-grossa valendo o dobro de XP.</Text>
          <View className="bg-gray-100 self-start px-2 py-1 rounded-md">
            <Text className="text-[10px] font-bold text-gray-400 uppercase">Em breve</Text>
          </View>
        </View>
      </View>
      
    </ScrollView>
  );
}