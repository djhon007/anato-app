import { useRouter } from 'expo-router';
import { ArrowLeft, Save } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { cadastrarQuestao } from '../services/questoesService';

export default function CadastrarQuestaoScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Estados do formulário
  const [pergunta, setPergunta] = useState('');
  const [opcoes, setOpcoes] = useState(['', '', '', '']); 
  const [respostaCorreta, setRespostaCorreta] = useState(0); 
  const [sistema, setSistema] = useState('');
  const [dificuldade, setDificuldade] = useState('1'); 
  const [xp, setXp] = useState('10'); 
  const [explicacao, setExplicacao] = useState('');

  const atualizarOpcao = (texto: string, index: number) => {
    const novasOpcoes = [...opcoes];
    novasOpcoes[index] = texto;
    setOpcoes(novasOpcoes);
  };

  const handleSalvar = async () => {
    if (!pergunta || !sistema || opcoes.some(opt => opt === '') || !explicacao) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);
    const sucesso = await cadastrarQuestao({
      pergunta,
      opcoes,
      resposta_correta: respostaCorreta,
      sistema: sistema.toLowerCase(), // Boa prática: salva sempre em minúsculo para a Jornada reconhecer
      dificuldade: Number(dificuldade),
      xp_recompensa: Number(xp),
      explicacao
    });
    setLoading(false);

    if (sucesso) {
      Alert.alert('Sucesso!', 'Questão cadastrada!');
      setPergunta('');
      setOpcoes(['', '', '', '']);
      setRespostaCorreta(0);
      setExplicacao('');
    } else {
      Alert.alert('Erro', 'Não foi possível salvar a questão.');
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1 bg-gray-50">
      {/* Cabeçalho */}
      <View className="bg-white pt-16 pb-4 px-6 flex-row items-center justify-between border-b border-gray-100 shadow-sm z-10">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <ArrowLeft size={24} color="#374151" />
        </TouchableOpacity>
        <Text className="font-bold text-lg text-gray-800">Nova Questão</Text>
        <View className="w-8" />
      </View>

      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        
        {/* Tópico e Configurações */}
        <View className="flex-row gap-4 mb-6">
          <View className="flex-1">
            <Text className="text-xs font-bold text-gray-500 mb-1 uppercase">Sistema / Tópico</Text>
            <TextInput value={sistema} onChangeText={setSistema} placeholder="Ex: osteologia" className="bg-white border border-gray-200 rounded-xl p-3 text-gray-800" />
          </View>
          <View className="w-20">
            <Text className="text-xs font-bold text-gray-500 mb-1 uppercase">Nível</Text>
            <TextInput value={dificuldade} onChangeText={setDificuldade} keyboardType="numeric" className="bg-white border border-gray-200 rounded-xl p-3 text-gray-800 text-center" />
          </View>
          <View className="w-20">
            <Text className="text-xs font-bold text-gray-500 mb-1 uppercase">XP</Text>
            <TextInput value={xp} onChangeText={setXp} keyboardType="numeric" className="bg-white border border-gray-200 rounded-xl p-3 text-gray-800 text-center" />
          </View>
        </View>

        {/* Pergunta */}
        <View className="mb-6">
          <Text className="text-xs font-bold text-gray-500 mb-1 uppercase">Pergunta</Text>
          <TextInput 
            value={pergunta} 
            onChangeText={setPergunta} 
            placeholder="Digite a pergunta..." 
            multiline 
            className="bg-white border border-gray-200 rounded-xl p-4 text-gray-800 text-base" 
            style={{ textAlignVertical: 'top' }}
          />
        </View>

        {/* Alternativas */}
        <View className="mb-6 space-y-3">
          <Text className="text-xs font-bold text-gray-500 mb-1 uppercase">Alternativas</Text>
          {opcoes.map((opcao, index) => (
            <View key={index} className="flex-row items-center gap-3 mb-2">
              <TouchableOpacity 
                onPress={() => setRespostaCorreta(index)}
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${respostaCorreta === index ? 'border-red-800 bg-red-800' : 'border-gray-300 bg-white'}`}
              >
                {respostaCorreta === index && <Text className="text-white font-bold text-xs">✓</Text>}
              </TouchableOpacity>
              <TextInput 
                value={opcao} 
                onChangeText={(text) => atualizarOpcao(text, index)} 
                placeholder={`Alternativa ${index + 1}`} 
                className={`flex-1 bg-white border rounded-xl p-3 text-gray-800 ${respostaCorreta === index ? 'border-red-800' : 'border-gray-200'}`} 
              />
            </View>
          ))}
        </View>

        {/* Explicação */}
        <View className="mb-8">
          <Text className="text-xs font-bold text-gray-500 mb-1 uppercase">Explicação</Text>
          <TextInput 
            value={explicacao} 
            onChangeText={setExplicacao} 
            placeholder="Justificativa..." 
            multiline 
            className="bg-white border border-gray-200 rounded-xl p-4 text-gray-800" 
            style={{ textAlignVertical: 'top' }}
          />
        </View>

        {/* Botão Salvar Principal */}
        <TouchableOpacity 
          onPress={handleSalvar} 
          disabled={loading}
          className="bg-red-800 p-4 rounded-2xl flex-row items-center justify-center gap-2 shadow-sm mb-10"
        >
          {loading ? <ActivityIndicator color="white" /> : (
            <>
              <Save size={20} color="white" />
              <Text className="text-white font-bold text-lg">Salvar Questão</Text>
            </>
          )}
        </TouchableOpacity>
        
      </ScrollView>
    </KeyboardAvoidingView>
  );
}