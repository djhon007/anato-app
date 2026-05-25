import { useRouter } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Activity, Award, BookOpen, Edit2, Star, Trophy, X, Zap } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Importações de Configuração
import { auth, db } from '../config/firebase';
import { avataresDisponiveis, avatarPadrao, trilhaRegioes } from '../config/SistemasConfig';

export default function PerfilScreen() {
  const router = useRouter();

  // Estados de Autenticação
  const [usuarioAutenticado, setUsuarioAutenticado] = useState<any>(null);
  const [verificandoAuth, setVerificandoAuth] = useState(true);

  // Estados para guardar os dados do banco
  const [userData, setUserData] = useState<any>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  // Estados para o Modal de Edição
  const [modalVisible, setModalVisible] = useState(false);
  const [formNome, setFormNome] = useState('');
  const [formCurso, setFormCurso] = useState('');
  const [formPeriodo, setFormPeriodo] = useState('');
  const [formAvatar, setFormAvatar] = useState(avatarPadrao);
  const [saving, setSaving] = useState(false);

  // 1. O Olheiro do Firebase (Autenticação)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuarioAutenticado(user);
      setVerificandoAuth(false);
    });
    return () => unsubscribe();
  }, []);

  // 2. O Redirecionamento Correto
  useEffect(() => {
    if (!verificandoAuth && !usuarioAutenticado) {
      router.replace('/');
    }
  }, [usuarioAutenticado, verificandoAuth]);

  // 3. O Gatilho para carregar os dados (CORRIGIDO: Agora a função é chamada!)
  useEffect(() => {
    if (usuarioAutenticado) {
      carregarPerfil();
    }
  }, [usuarioAutenticado]);

  const carregarPerfil = async () => {
    try {
      const docRef = doc(db, 'usuarios', usuarioAutenticado.uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserData(data);
        
        // Preenche o formulário com os dados atuais
        setFormNome(data.nome || '');
        setFormCurso(data.curso || '');
        setFormPeriodo(data.periodo || '');
        setFormAvatar(data.avatar || avatarPadrao);
      }
    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
    } finally {
      setLoadingProfile(false);
    }
  };

  const salvarEdicao = async () => {
    setSaving(true);
    try {
      const docRef = doc(db, 'usuarios', usuarioAutenticado.uid);
      await updateDoc(docRef, {
        nome: formNome,
        curso: formCurso,
        periodo: formPeriodo,
        avatar: formAvatar
      });
      
      // Atualiza o estado local para refletir na tela imediatamente
      setUserData({ 
        ...userData, 
        nome: formNome, 
        curso: formCurso, 
        periodo: formPeriodo, 
        avatar: formAvatar 
      });
      setModalVisible(false);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o perfil.');
    } finally {
      setSaving(false);
    }
  };

  // --- MATEMÁTICA PARA A TELA DE PERFIL ---
  const concluidos = userData?.regioes_concluidas || userData?.sistemas_concluidos || [];
  const progresso = userData?.progresso_sistemas || {};

  let iniciadosCount = 0;

  trilhaRegioes?.forEach((regiao) => {
    const acertosDaRegiao = Object.keys(progresso)
      .filter(key => key.startsWith(`${regiao.id}_`))
      .reduce((acc, key) => acc + progresso[key], 0);

    if (acertosDaRegiao > 0 && !concluidos.includes(regiao.id)) {
      iniciadosCount++;
    }
  });

  const achievements = [
    { title: 'Iniciante', desc: 'Completou a primeira fase', icon: <Zap size={20} color="#ef4444" />, done: concluidos.length >= 1 },
    { title: 'Estudioso', desc: `Completou 2/${trilhaRegioes?.length || 3} fases`, icon: <BookOpen size={20} color="#9ca3af" />, done: concluidos.length >= 2 },
    { title: 'Explorador', desc: 'Iniciou 2 regiões', icon: <Activity size={20} color="#9ca3af" />, done: iniciadosCount >= 2 },
    { title: 'Mestre', desc: 'Completou tudo', icon: <Award size={20} color="#9ca3af" />, done: concluidos.length >= (trilhaRegioes?.length || 3) },
  ];

  const opcoesPeriodo = ['1º período', '2º período', '3º período', '4º período', '5º período', '6º período', '7º período', '8º período', '9º período', '10º período', '11º período', '12º período', 'Professor', 'Monitor', 'Outro'];

  const userName = userData?.nome || 'Estudante';

  // Tela de Carregamento Inicial (Protege a renderização)
  if (verificandoAuth || !usuarioAutenticado) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#991b1b" />
        <Text className="text-gray-500 mt-4">Conectando ao servidor...</Text>
      </View>
    );
  }

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
            <Image source={{ uri: userData?.avatar || avatarPadrao }} className="w-full h-full" />
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
              <Text className="text-2xl font-bold text-gray-800 capitalize">{userName}</Text>
              
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
            <Text className="text-xl font-black text-gray-800">{concluidos.length}</Text>
            <Text className="text-[10px] text-gray-400 font-bold uppercase mt-1">Fases Completas</Text>
          </View>
          <View className="flex-1 bg-white border border-gray-100 p-4 rounded-3xl items-center shadow-sm">
            <Activity size={24} color="#991b1b" className="mb-2" />
            <Text className="text-xl font-black text-gray-800">{iniciadosCount}</Text>
            <Text className="text-[10px] text-gray-400 font-bold uppercase mt-1">Regiões Iniciadas</Text>
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
              
              {/* CARROSSEL DE AVATARES (CORRIGIDO: Agora aparece apenas uma vez) */}
              <View>
                <Text className="text-xs font-bold text-gray-500 mb-2 uppercase">Escolha seu Avatar</Text>
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false} 
                  contentContainerStyle={{ paddingRight: 24, paddingVertical: 4 }} 
                >
                  {avataresDisponiveis.map((avatarUrl, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => setFormAvatar(avatarUrl)}
                      className={`mr-3 rounded-full border-4 ${
                        formAvatar === avatarUrl ? 'border-red-800' : 'border-transparent'
                      }`}
                    >
                      <Image 
                        source={{ uri: avatarUrl }} 
                        style={{ width: 60, height: 60, borderRadius: 30 }} 
                      />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* CAMPOS DE TEXTO */}
              <View>
                <Text className="text-xs font-bold text-gray-500 mb-1 uppercase">Nome de Exibição</Text>
                <TextInput value={formNome} onChangeText={setFormNome} placeholder="O seu nome" className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-800" />
              </View>
              <View>
                <Text className="text-xs font-bold text-gray-500 mb-1 uppercase">Curso</Text>
                <TextInput value={formCurso} onChangeText={setFormCurso} placeholder="Ex: Enfermagem, Medicina..." className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-800" />
              </View>
              
              {/* LIMITADOR DE PERÍODO COM BOTÕES */}
              <View>
                <Text className="text-xs font-bold text-gray-500 mb-2 uppercase">Período / Semestre</Text>
                <View className="flex-row flex-wrap gap-2">
                  {opcoesPeriodo.map((p) => (
                    <TouchableOpacity
                      key={p}
                      onPress={() => setFormPeriodo(p)}
                      className={`px-4 py-2 rounded-xl border-2 ${
                        formPeriodo === p ? 'bg-red-800 border-red-800' : 'bg-white border-gray-200'
                      }`}
                    >
                      <Text className={`font-bold ${formPeriodo === p ? 'text-white' : 'text-gray-600'}`}>
                        {p}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
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