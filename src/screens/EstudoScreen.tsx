import { useRouter } from 'expo-router';
import { BookOpen, ChevronLeft, Clock, Mic, Play, PlayCircle, Search, Video } from 'lucide-react-native';
import React, { useState } from 'react';
import { Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function EstudoScreen() {
  const router = useRouter();
  const [currentView, setCurrentView] = useState<'main' | 'videos'>('main');

  const videoContent: Record<string, any[]> = {
    '1ª temporada - Introdução à Anatomia': [
      { id: 1, title: 'Introdução à Anatomia [01/02]', dur: '16:58', url: 'https://youtu.be/G9W3XsaYL7M?si=MUYoRskJiRXwZypv' },
      { id: 2, title: 'Introdução à Anatomia [02/02]', dur: '22:29', url: 'https://youtu.be/SzUlkkG0pBE?si=Ev8pPzT8pQG5xJMK' },
      { id: 3, title: 'Generalidades dos Ossos', dur: '18:34', url: 'https://youtu.be/0oNC4QcP6rc?si=ZAHPKUbADcG1iedY' },
      { id: 4, title: 'Nomenclatura dos Ossos [Esqueleto Axial] (1)', dur: '18:57', url: 'https://youtu.be/01pjWGIa3Xk?si=8TT8ASIAtYQr2xjC' },
      { id: 5, title: 'Nomenclatura dos Ossos [Esqueleto Axial] (2)', dur: '28:11', url: 'https://youtu.be/gJqak1X0dGs?si=_gfXgd5gNN5ihNRP' },
      { id: 6, title: 'Generalidade das Articulações', dur: '25:43', url: 'https://youtu.be/FEINjQfcVfA?si=uJDp_g0FDStQKsTr' },
      { id: 7, title: 'Articulações Sinoviais', dur: '28:02', url: 'https://youtu.be/flyFoF4YwFc?si=BRFO5bsVc5y5BLwE' },
      { id: 8, title: 'Generalidades dos Músculos [01/02]', dur: '24:18', url: 'https://youtu.be/htvcAjgQ78M?si=aWPLqZk7b5OBNhXv' },
      { id: 9, title: 'Generalidades dos Músculos [02/02]', dur: '23:53', url: 'https://youtu.be/F0j3BJR1r8c?si=LLr5KrS4Ta5dGTiZ' },
    ],
    '2ª temporada - Membros Superiores': [
      { id: 10, title: 'Osteologia da Clavícula', dur: '11:13', url: 'https://youtu.be/OncazDKP6Lw?si=7J50Wq1VEQJpM9WQ' },
      { id: 11, title: 'Osteologia da Escápula', dur: '14:11', url: 'https://youtu.be/Je91jEQyeco?si=JNIhj-XgJcJfnaHa' },
      { id: 12, title: 'Osteologia do Úmero', dur: '14:40', url: 'https://youtu.be/H1J3mPsgS5E?si=rM59_7dexQECmrYd' },
      { id: 13, title: 'Osteologia do Rádio', dur: '12:50', url: 'https://youtu.be/upqADN1kdhI?si=CFKEKwBhNBg0C95i' },
      { id: 14, title: 'Osteologia da Ulna', dur: '14:05', url: 'https://youtu.be/cyOu2B7cwbk?si=onGUeOYt8Nk4OpSg' },
      { id: 15, title: 'Osteologia do Carpo, Metacarpo e Falanges', dur: '17:06', url: 'https://youtu.be/6TTO5zUSArM?si=n09-R0gnqdmT3MfW' },
      { id: 16, title: 'Articulação Esternoclavicular', dur: '17:25', url: 'https://youtu.be/lK8jdgiK4sE?si=DJg7xmQwQIrlSmSF' },
      { id: 17, title: 'Articulação Acromioclavicular', dur: '13:12', url: 'https://youtu.be/ODAQKlbwxBU?si=a78nvpZAwBJygVAb' },
      { id: 18, title: 'Articulação do Ombro', dur: '28:07', url: 'https://youtu.be/ykMi1NjvCYQ?si=br9y0gKVgrLhq7vZ' },
      { id: 19, title: 'Articulação do Cotovelo', dur: '19:58', url: 'https://youtu.be/nr5F9_oVUO8?si=xVBLdMKqOj-IjhmW' },
      { id: 20, title: 'Articulação Rádioulnar Proximal', dur: '17:36', url: 'https://youtu.be/ymcpmnfRzPU?si=4fr-zTZ1_h_FMUim' },
      { id: 21, title: 'Articulação Rádioulnar Média', dur: '08:58', url: 'https://youtu.be/bYj7so7NzPk?si=Z7xNya0wEDXWCiaf' },
      { id: 22, title: 'Articulação Rádioulnar Distal', dur: '16:32', url: 'https://youtu.be/OXf4Tbh71ks?si=GkHnpOKHrJUI9qSD' },
      { id: 23, title: 'Articulação do Punho (Radiocarpal)', dur: '24:32', url: 'https://youtu.be/vVdYXxAN7UM?si=fXNw0r1y2NR_78Wu' },
      { id: 24, title: 'Articulação Intercárpica - Mediocárpica', dur: '11:14', url: 'https://youtu.be/mJvqgWJ2B6o?si=PYLq-it9Hcp79O5h' },
      { id: 25, title: 'Articulação Carpometacarpal', dur: '14:40', url: 'https://youtu.be/Trz_0Ho_1vU?si=i1lDWTGT509VIHCJ' },
      { id: 26, title: 'Articulação Trapeziometacarpal', dur: '16:43', url: 'https://youtu.be/cBjafl1_VAc?si=dp1JE-CafKEaQ70-' },
      { id: 27, title: 'Articulação Metacarpofalangeana', dur: '18:59', url: 'https://youtu.be/mUg4lwIwoac?si=tqybX8ecZ8qRS-XZ' },
      { id: 28, title: 'Articulação Interfalangeana', dur: '12:00', url: 'https://youtu.be/BE8mt4q_Tcw?si=gIbYlVV0LAvniy3p' },
      { id: 29, title: 'Músculos Toracoapendiculares / Região Peitoral', dur: '31:45', url: 'https://youtu.be/YbAxja72K7Y?si=VWPq0MeazSunY2GC' },
      { id: 30, title: 'Músculos que Conectam os MMSS à Coluna', dur: '33:40', url: 'https://youtu.be/-lu4RyP7s20?si=aq-3nnhAvrLVER6r' },
      { id: 31, title: 'Músculos do Ombro', dur: '29:45', url: 'https://youtu.be/RDedAvxLqo4?si=DU3pNy53LabFguVJ' },
      { id: 32, title: 'Músculos do Braço', dur: '35:28', url: 'https://youtu.be/Vx6VUasPDLM?si=OFJ082dJOjjNXglG' },
      { id: 33, title: 'Músculos do Antebraço - Anterior Superficial', dur: '28:46', url: 'https://youtu.be/444MRPvWs7g?si=sen3SWMT_frDb7UV' },
      { id: 34, title: 'Músculos do Antebraço - Anterior Profunda', dur: '17:36', url: 'https://youtu.be/zlFLFjrXo6E?si=9s89Fc1VAX363F4F' },
      { id: 35, title: 'Músculos do Antebraço - Posterior Superficial', dur: '25:21', url: 'https://youtu.be/owzlOHnNGZk?si=cIxZbwksYNPvwfOd' },
      { id: 36, title: 'Músculos do Antebraço - Posterior Profunda', dur: '19:52', url: 'https://youtu.be/0ZIqPyuRNyY?si=98TYWgR0Q6EQCp9L' },
      { id: 37, title: 'Músculos da Mão', dur: '42:39', url: 'https://youtu.be/dS6eBX8CKpQ?si=enp4SujoYYi0eslp' },
      { id: 38, title: 'Plexo Braquial', dur: '18:21', url: 'https://youtu.be/WYOJnOJzAfg?si=HpLoEqYlfXct9Wba' },
      { id: 39, title: 'Nervos Motores do Plexo Braquial', dur: '42:50', url: 'https://youtu.be/v5GlNwPUADQ?si=Zkr7LyofPzNYIIyB' },
      { id: 40, title: 'Irrigação Arterial dos MMSS', dur: '21:38', url: 'https://youtu.be/rp2Ilg53FQE?si=tQcBLwLK_IZDC3xX' },
      { id: 41, title: 'Drenagem Venosa dos MMSS', dur: '16:43', url: 'https://youtu.be/Lzi7nwdxkEo?si=fD658ZcxJfupGbab' },
    ],
    '3ª temporada - Membros inferiores': [
      { id: 42, title: 'Osteologia do Quadril', dur: '--:--', url: 'https://youtu.be/INAKgzwSEvE?si=3FD0w5eP4K_HMWns' },
      { id: 43, title: 'Osteologia do Fêmur e Patela', dur: '--:--', url: 'https://youtu.be/Kzi3Y7sSaKY?si=DRkilRjn-d45gr-O' },
      { id: 44, title: 'Osteologia da Tíbia e Fíbula', dur: '--:--', url: 'https://youtu.be/6pETz3vQR8k?si=mija_GYJ9131Q3dy' },
      { id: 45, title: 'Osteologia do Tarso, Metatarso e Falanges', dur: '--:--', url: 'https://youtu.be/fzwDJGyK9rk?si=LtJRspuNL73Jj0G_' },
      { id: 46, title: 'Articulação Sacroilíaca', dur: '--:--', url: 'https://youtu.be/bs4wB6i8GCw?si=otg2VD7pEOGf7sud' },
      { id: 47, title: 'Articulação Sínfise Púbica', dur: '--:--', url: 'https://youtu.be/wV19F5ejrAQ?si=XqWBKUuGu0fEki_S' },
      { id: 48, title: 'Articulação do Quadril', dur: '--:--', url: 'https://youtu.be/SBf5mm2ThpM?si=srfbn1MAJLldhZxO' },
      { id: 49, title: 'Articulação Patelo-Femoral', dur: '--:--', url: 'https://youtu.be/63xxmKfvlTg?si=vvVMTLvWVy69m6Jk' },
      { id: 50, title: 'Complexo Articular do Joelho - Tíbio-femoral', dur: '--:--', url: 'https://youtu.be/1Lik885qtRE?si=Ki0yEZo67gm94DYc' },
      { id: 51, title: 'Articulação Tibiofibular Proximal', dur: '--:--', url: 'https://youtu.be/ay4K1fp6z0w?si=zCRgjX-f-SIBuGPA' },
      { id: 52, title: 'Articulação Tibiofibular Média', dur: '--:--', url: 'https://youtu.be/wwbog8GtBY0?si=FZJDmrAl9-PdVEvL' },
      { id: 53, title: 'Articulação Tibiofibular Distal', dur: '--:--', url: 'https://youtu.be/5J_x8UDzhqo?si=4Qd4qrgmySlCGGRw' },
      { id: 54, title: 'Articulação do Tornozelo (Talocrural)', dur: '--:--', url: 'https://youtu.be/vGwymBumL3s?si=uH_a9aE0YU5_n-uV' },
      { id: 55, title: 'Articulação Subtalar', dur: '--:--', url: 'https://youtu.be/F8OIeWaPvXk?si=Vy2Bv96Rekjl1Puf' },
      { id: 56, title: 'Articulações do Pé (Geral)', dur: '--:--', url: 'https://youtu.be/nhrRXatjpTE?si=nBrKNy1Ly1iv8SoD' },
      { id: 57, title: 'Músculos do Quadril', dur: '--:--', url: 'https://youtu.be/UQgO3Z1WBhg?si=P1fBuKUwH3nh6bns' },
      { id: 58, title: 'Músculos da Coxa - Região Ântero-lateral', dur: '--:--', url: 'https://youtu.be/iayzYbbRshA?si=bEjwBYW1aZBTqJIc' },
      { id: 59, title: 'Músculos da Coxa - Região Posterior', dur: '--:--', url: 'https://youtu.be/uitq0nikfJ8?si=xU_NKQIsLdUxy3Q8' },
      { id: 60, title: 'Músculos da Coxa - Região Medial', dur: '--:--', url: 'https://youtu.be/Rgo31ryZOJo?si=8wy7NhE2XNYEsmmg' },
      { id: 61, title: 'Músculos da Perna - Região Ântero-lateral', dur: '--:--', url: 'https://youtu.be/0Aq9P2vpYSo?si=yZ8832f2N8VHRGtf' },
      { id: 62, title: 'Músculos da Perna - Região Posterior', dur: '--:--', url: 'https://youtu.be/wx2huik519M?si=tM8_svT1fUp7Nj90' },
      { id: 63, title: 'Músculos do Pé', dur: '--:--', url: 'https://youtu.be/2354XE9RyHM?si=wPmUGE7oe5GTljE-' },
      { id: 64, title: 'Inervação Motora dos MMII', dur: '--:--', url: 'https://youtu.be/M95hgpVIjFM?si=Cj8n62JQJ0_GDFjd' },
      { id: 65, title: 'Irrigação Arterial dos MMII', dur: '--:--', url: 'https://youtu.be/M95hgpVIjFM?si=Cj8n62JQJ0_GDFjd' },
      { id: 66, title: 'Drenagem Venosa dos MMII', dur: '--:--', url: 'https://youtu.be/cUdcJyvxTa0?si=8e6d3J8-pkqti2k6' },
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
