import { useRouter } from 'expo-router';
import { Activity, Award, BookOpen, Edit2, Star, Trophy, X, Zap } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { trilhaSistemas } from '../config/SistemasConfig';
// Importações do Firebase
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

export default function PerfilScreen() {
  const router = useRouter();

  // Estados para guardar os dados do banco
  const [userData, setUserData] = useState<any>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  // Estados para o Modal de Edição
  const [modalVisible, setModalVisible] = useState(false);
  const [formNome, setFormNome] = useState('');
  const [formCurso, setFormCurso] = useState('');
  const [formPeriodo, setFormPeriodo] = useState('');
  const [saving, setSaving] = useState(false);

  // Assim que a tela abre, ele busca os dados no Firebase
  useEffect(() => {
    carregarPerfil();
  }, []);

  // --- MATEMÁTICA PARA A TELA DE PERFIL ---
  const concluidos = userData?.sistemas_concluidos || [];
  const progresso = userData?.progresso_sistemas || {};

  let iniciadosCount = 0;

  trilhaSistemas.forEach((sistema) => {
    const acertosDesteSistema = progresso[sistema.id] || 0;
    // Se tem acertos mas não está concluído, conta como iniciado!
    if (acertosDesteSistema > 0 && !concluidos.includes(sistema.id)) {
      iniciadosCount++;
    }
  });

  const carregarPerfil = async () => {
    if (!auth.currentUser) return;
    try {
      const docRef = doc(db, 'usuarios', auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserData(data);
        // Preenche o formulário com os dados atuais
        setFormNome(data.nome || '');
        setFormCurso(data.curso || '');
        setFormPeriodo(data.periodo || '');
      }
    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
    } finally {
      setLoadingProfile(false);
    }
  };

  const salvarEdicao = async () => {
    if (!auth.currentUser) return;
    setSaving(true);
    try {
      const docRef = doc(db, 'usuarios', auth.currentUser.uid);
      // O updateDoc atualiza apenas os campos que mandarmos, sem apagar o resto (como xp, nivel)
      await updateDoc(docRef, {
        nome: formNome,
        curso: formCurso,
        periodo: formPeriodo
      });
      
      // Atualiza a tela imediatamente sem precisar recarregar
      setUserData({ ...userData, nome: formNome, curso: formCurso, periodo: formPeriodo });
      setModalVisible(false);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o perfil.');
    } finally {
      setSaving(false);
    }
  };

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
          <TouchableOpacity onPress={() => setModalVisible(true)} className="p-2 bg-white/20 rounded-full flex-row items-center gap-2 px-3">
            <Edit2 size={16} color="white" />
            <Text className="text-white text-xs font-bold">Editar</Text>
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
          {loadingProfile ? (
             <ActivityIndicator color="#991b1b" className="mb-2" />
          ) : (
            <>
              <Text className="text-2xl font-bold text-gray-800 capitalize">{userData?.nome || 'Estudante'}</Text>
              
              {userData?.curso ? (
                <Text className="text-sm font-medium text-red-800 mt-1 mb-3">
                  {userData.curso} {userData.periodo ? `• ${userData.periodo}` : ''}
                </Text>
              ) : (
                <Text className="text-sm font-medium text-gray-400 mt-1 mb-3">Nenhum curso informado</Text>
              )}

              <View className="px-3 py-1 bg-gray-100 rounded-full">
                <Text className="text-xs font-bold text-gray-500">
                  Nível {userData?.nivel || 1} • {userData?.xp || 0} XP
                </Text>
              </View>
            </>
          )}
        </View>

        {/* Stats */}
        <View className="flex-row justify-between gap-4 mb-8">
          <View className="flex-1 bg-white border border-gray-100 p-4 rounded-3xl items-center shadow-sm">
            <Trophy size={24} color="#991b1b" className="mb-2" />
            <Text className="text-xl font-black text-gray-800">{userData?.sistemas_concluidos?.length || 0}</Text>
            <Text className="text-[10px] text-gray-400 font-bold uppercase mt-1">Fases Completas</Text>
          </View>
          <View className="flex-1 bg-white border border-gray-100 p-4 rounded-3xl items-center shadow-sm">
            <Activity size={24} color="#991b1b" className="mb-2" />
            <Text className="text-xl font-black text-gray-800">{iniciadosCount}</Text>
            <Text className="text-[10px] text-gray-400 font-bold uppercase mt-1">Sistemas Iniciados</Text>
          </View>
        </View>

        {/* Achievements */}
        <View className="mb-6">
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

        {/* BOTÃO PROVISÓRIO DE ADMIN */}
        <TouchableOpacity 
          onPress={() => router.push('/cadastrar-questao' as any)}
          className="bg-gray-900 p-4 rounded-2xl flex-row justify-center items-center shadow-md mb-10 border border-gray-800"
        >
          <Text className="text-white font-bold text-center">🛠️ Cadastrar Questões (Admin)</Text>
        </TouchableOpacity>
      </View>

      {/* MODAL DE EDIÇÃO DE PERFIL */}
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-3xl p-6">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-xl font-bold text-gray-800">Editar Perfil</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)} className="p-2 bg-gray-100 rounded-full">
                <X size={20} color="#374151" />
              </TouchableOpacity>
            </View>

            <View className="space-y-4 mb-8">
              <View>
                <Text className="text-xs font-bold text-gray-500 mb-1 uppercase">Nome de Exibição</Text>
                <TextInput value={formNome} onChangeText={setFormNome} placeholder="Seu nome" className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-800" />
              </View>
              <View>
                <Text className="text-xs font-bold text-gray-500 mb-1 uppercase">Curso</Text>
                <TextInput value={formCurso} onChangeText={setFormCurso} placeholder="Ex: Enfermagem, Medicina..." className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-800" />
              </View>
              <View>
                <Text className="text-xs font-bold text-gray-500 mb-1 uppercase">Período / Semestre</Text>
                <TextInput value={formPeriodo} onChangeText={setFormPeriodo} placeholder="Ex: 3º Período" className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-800" />
              </View>
            </View>

            <TouchableOpacity 
              onPress={salvarEdicao} 
              disabled={saving}
              className="bg-red-800 p-4 rounded-2xl items-center flex-row justify-center shadow-sm"
            >
              {saving ? <ActivityIndicator color="white" /> : <Text className="text-white font-bold text-lg">Salvar Alterações</Text>}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </ScrollView>
  );
}