import { useRouter } from 'expo-router';
import { ArrowLeft, Save } from 'lucide-react-native';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { cadastrarQuestao } from '../services/questoesService';

export default function CadastrarQuestaoScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Estados do formulário
  const [pergunta, setPergunta] = useState('');
  const [opcoes, setOpcoes] = useState(['', '', '', '']); // Array com 4 textos vazios
  const [respostaCorreta, setRespostaCorreta] = useState(0); // Índice 0 a 3
  const [sistema, setSistema] = useState('');
  const [dificuldade, setDificuldade] = useState('1'); // Texto para facilitar a digitação
  const [xp, setXp] = useState('10'); // Texto para facilitar a digitação
  const [explicacao, setExplicacao] = useState('');

  // Função para atualizar uma alternativa específica do array
  const atualizarOpcao = (texto: string, index: number) => {
    const novasOpcoes = [...opcoes];
    novasOpcoes[index] = texto;
    setOpcoes(novasOpcoes);
  };

  const handleSalvar = async () => {
    // Validação básica
    if (!pergunta || !sistema || opcoes.some(opt => opt === '') || !explicacao) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos e as 4 alternativas.');
      return;
    }

    setLoading(true);
    
    // Monta o objeto no formato exato que a nossa interface exige
    const sucesso = await cadastrarQuestao({
      pergunta,
      opcoes,
      resposta_correta: respostaCorreta,
      sistema,
      dificuldade: Number(dificuldade),
      xp_recompensa: Number(xp),
      explicacao
    });

    setLoading(false);

    if (sucesso) {
      Alert.alert('Sucesso!', 'Questão cadastrada no banco de dados!');
      // Limpa o formulário para a próxima questão
      setPergunta('');
      setOpcoes(['', '', '', '']);
      setRespostaCorreta(0);
      setExplicacao('');
      // Mantemos sistema, dificuldade e XP iguais para facilitar o cadastro em lote
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
        <View className="w-8" /> {/* Espaçador para centralizar o título */}
      </View>

      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        
        {/* Tópico e Configurações */}
        <View className="flex-row gap-4 mb-6">
          <View className="flex-1">
            <Text className="text-xs font-bold text-gray-500 mb-1 uppercase">Sistema / Tópico</Text>
            <TextInput value={sistema} onChangeText={setSistema} placeholder="Ex: Ósseo" className="bg-white border border-gray-200 rounded-xl p-3 text-gray-800" />
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
            placeholder="Digite a pergunta da questão..." 
            multiline 
            numberOfLines={3}
            className="bg-white border border-gray-200 rounded-xl p-4 text-gray-800 text-base" 
            style={{ textAlignVertical: 'top' }}
          />
        </View>

        {/* Alternativas */}
        <View className="mb-6 space-y-3">
          <Text className="text-xs font-bold text-gray-500 mb-1 uppercase">Alternativas (Marque a correta)</Text>
          {opcoes.map((opcao, index) => (
            <View key={index} className="flex-row items-center gap-3">
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
          <Text className="text-xs font-bold text-gray-500 mb-1 uppercase">Explicação da Resposta</Text>
          <TextInput 
            value={explicacao} 
            onChangeText={setExplicacao} 
            placeholder="Por que essa é a resposta certa?" 
            multiline 
            numberOfLines={2}
            className="bg-white border border-gray-200 rounded-xl p-4 text-gray-800" 
            style={{ textAlignVertical: 'top' }}
          />
        </View>

        {/* Botão Salvar */}
        <TouchableOpacity 
          onPress={handleSalvar} 
          disabled={loading}
          className="bg-red-800 p-4 rounded-2xl flex-row items-center justify-center gap-2 shadow-sm"
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