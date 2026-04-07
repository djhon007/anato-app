import { useRouter } from 'expo-router';
import { BookOpen, ChevronLeft, Clock, Mic, Play, PlayCircle, Search, Video } from 'lucide-react-native';
import React, { useState } from 'react';
import { Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function EstudoScreen() {
  const router = useRouter();
  const [currentView, setCurrentView] = useState<'main' | 'videos'>('main');

  const videoContent: Record<string, any[]> = {
    '1ª temporada': [ 
      { id: 1, title: 'Introdução à Anatomia [01/02]', dur: '12:45', url: 'https://youtube.com' },
      { id: 2, title: 'Planos e Eixos Anatômicos', dur: '15:20', url: 'https://youtube.com' },
      { id: 3, title: 'Termos de Posição e Direção', dur: '10:15', url: 'https://youtube.com' },
    ],
    '2ª temporada': [
      { id: 4, title: 'Osteologia Básica', dur: '18:30', url: 'https://youtube.com' },
      { id: 5, title: 'Divisões do Esqueleto', dur: '14:50', url: 'https://youtube.com' },
    ]
  };

  const handleOpenLink = (url: string) => {
    Linking.openURL(url).catch((err) => console.error("Falha ao abrir link:", err));
  };

  if (currentView === 'videos') {
    return (
      <View className="flex-1 bg-gray-50">
        <View className="px-6 pt-16 pb-4 bg-white shadow-sm flex-row items-center gap-4 z-10">
          <TouchableOpacity onPress={() => setCurrentView('main')} className="p-2 bg-gray-100 rounded-full">
            <ChevronLeft size={24} color="#1f2937" />
          </TouchableOpacity>
          <View>
            <Text className="text-xl font-bold text-gray-800">Videoaulas</Text>
            <Text className="text-xs text-gray-500">Módulos complementares</Text>
          </View>
        </View>

        <ScrollView className="flex-1 px-6 pt-6" contentContainerStyle={{ paddingBottom: 40 }}>
          {Object.entries(videoContent).map(([season, vids], idx) => (
            <View key={idx} className="mb-8">
              <Text className="text-sm font-black uppercase tracking-widest text-gray-400 mb-4 px-1">{season}</Text>
              <View className="space-y-3">
                {vids.map((v) => (
                  <TouchableOpacity 
                    key={v.id} 
                    onPress={() => handleOpenLink(v.url)}
                    className="flex-row items-center p-3 bg-white rounded-2xl border border-gray-100 shadow-sm mb-3"
                  >
                    <View className="relative w-24 h-16 bg-gray-200 rounded-xl items-center justify-center overflow-hidden">
                       <PlayCircle size={24} color="white" className="z-10" />
                       <View className="absolute inset-0 bg-black/20" />
                    </View>
                    <View className="flex-1 ml-3">
                      <Text className="font-bold text-sm text-gray-800 mb-1 leading-tight">{v.title}</Text>
                      <View className="flex-row items-center gap-1">
                        <Clock size={10} color="#9ca3af" />
                        <Text className="text-[10px] font-bold text-gray-400">{v.dur}</Text>
                      </View>
                    </View>
                    <View className="p-2 bg-red-50 rounded-full">
                      <Play size={12} color="#991b1b" fill="#991b1b" />
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-6 pt-16 pb-6 bg-white shadow-sm flex-row justify-between items-center z-10">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2 bg-gray-100 rounded-full">
            <ChevronLeft size={24} color="#1f2937" />
          </TouchableOpacity>
          <View>
            <Text className="text-xl font-bold text-gray-800">Estudo</Text>
            <Text className="text-xs text-gray-500">Materiais complementares</Text>
          </View>
        </View>
        <TouchableOpacity className="p-2 bg-gray-50 rounded-full">
          <Search size={20} color="#1f2937" />
        </TouchableOpacity>
      </View>

      <View className="p-6">
        <View className="mb-8">
          <Text className="font-bold text-lg mb-4 text-gray-800">Categorias</Text>
          {[
            { id: 'video', title: 'Videoaulas', sub: 'Aulas gravadas', icon: <Video size={24} color="#991b1b" /> },
            { id: 'podcast', title: 'Podcasts', sub: 'Áudios de revisão', icon: <Mic size={24} color="#9ca3af" /> },
            { id: 'books', title: 'Apostilas', sub: 'PDFs para leitura', icon: <BookOpen size={24} color="#9ca3af" /> },
          ].map((m) => (
            <TouchableOpacity 
              key={m.id}
              onPress={() => m.id === 'video' ? setCurrentView('videos') : null}
              className={`flex-row items-center p-4 mb-3 rounded-3xl border border-gray-100 shadow-sm ${m.id === 'video' ? 'bg-white' : 'bg-gray-50 opacity-60'}`}
            >
               <View className={`w-12 h-12 rounded-2xl items-center justify-center mr-4 ${m.id === 'video' ? 'bg-red-50' : 'bg-gray-200'}`}>
                 {m.icon}
               </View>
               <View className="flex-1">
                 <Text className="font-bold text-gray-800">{m.title}</Text>
                 <Text className="text-[11px] text-gray-400">{m.sub}</Text>
               </View>
               <View className="p-2 text-gray-300">
                 <ChevronLeft size={18} color="#d1d5db" style={{ transform: [{ rotate: '180deg' }] }} />
               </View>
            </TouchableOpacity>
          ))}
        </View>

        <View className="bg-red-800 p-6 rounded-[32px] shadow-xl relative overflow-hidden">
          <View className="relative z-10">
            <Text className="font-bold text-lg mb-1 text-white">Dica de hoje</Text>
            <Text className="text-white/80 text-xs leading-relaxed">
              Faça flashcards para facilitar o aprendizado das estruturas anatômicas. 
            </Text>
          </View>
          <View className="absolute -right-4 -bottom-4 opacity-10">
            <BookOpen size={100} color="white" />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}