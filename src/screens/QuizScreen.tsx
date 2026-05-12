import { useRouter } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { db } from '../config/firebase';
import { Questao } from '../services/questoesService';

export default function QuizScreen() {
  const router = useRouter();
  
  // Estados do Jogo
  const [questoes, setQuestoes] = useState<Questao[]>([]);
  const [loading, setLoading] = useState(true);
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState<number | null>(null);
  const [mostrandoFeedback, setMostrandoFeedback] = useState(false);
  const [acertos, setAcertos] = useState(0);
  const [xpGanho, setXpGanho] = useState(0);

  useEffect(() => {
    carregarQuestoes();
  }, []);

  const carregarQuestoes = async () => {
    try {
      // 1. Busca TODAS as questões da coleção
      const querySnapshot = await getDocs(collection(db, "questoes"));
      let questoesBaixadas: Questao[] = [];
      
      querySnapshot.forEach((doc) => {
        questoesBaixadas.push(doc.data() as Questao);
      });

      // 2. Embaralha as questões (Fisher-Yates Shuffle rápido)
      const embaralhadas = questoesBaixadas.sort(() => Math.random() - 0.5);
      
      // 3. Pega apenas as 10 primeiras para o simulado
      setQuestoes(embaralhadas.slice(0, 10));
    } catch (error) {
      console.error("Erro ao carregar questões:", error);
    } finally {
      setLoading(false);
    }
  };

  const confirmarResposta = () => {
    if (opcaoSelecionada === null) return;
    
    setMostrandoFeedback(true);
    
    const questao = questoes[perguntaAtual];
    if (opcaoSelecionada === questao.resposta_correta) {
      setAcertos(acertos + 1);
      setXpGanho(xpGanho + questao.xp_recompensa);
    }
  };

  const proximaPergunta = () => {
    if (perguntaAtual < questoes.length - 1) {
      setPerguntaAtual(perguntaAtual + 1);
      setOpcaoSelecionada(null);
      setMostrandoFeedback(false);
    } else {
      // FIM DO QUIZ
      alert(`Fim do Simulado!\nVocê acertou ${acertos} de ${questoes.length} e ganhou ${xpGanho} XP!`);
      router.back();
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#991b1b" />
        <Text className="mt-4 text-gray-500 font-medium">Preparando o simulado...</Text>
      </View>
    );
  }

  if (questoes.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50 px-6 text-center">
        <Text className="text-xl font-bold text-gray-800 mb-2">Ops!</Text>
        <Text className="text-gray-500 text-center">Não encontramos questões no banco de dados. Volte e cadastre algumas primeiro!</Text>
        <TouchableOpacity onPress={() => router.back()} className="mt-6 bg-red-800 px-6 py-3 rounded-xl">
          <Text className="text-white font-bold">Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const questao = questoes[perguntaAtual];
  const acertou = opcaoSelecionada === questao.resposta_correta;

  return (
    <View className="flex-1 bg-gray-50">
      {/* Cabeçalho de Progresso */}
      <View className="bg-white pt-16 pb-4 px-6 border-b border-gray-100 flex-row items-center justify-between shadow-sm z-10">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <ArrowLeft size={24} color="#374151" />
        </TouchableOpacity>
        <View className="flex-1 mx-4 h-2 bg-gray-100 rounded-full overflow-hidden">
          <View 
            className="h-full bg-red-800 rounded-full" 
            style={{ width: `${((perguntaAtual + 1) / questoes.length) * 100}%` }} 
          />
        </View>
        <Text className="font-bold text-gray-400 text-sm">{perguntaAtual + 1}/{questoes.length}</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        {/* Pergunta */}
        <View className="mb-8">
          <View className="bg-red-50 self-start px-3 py-1 rounded-md mb-3">
            <Text className="text-red-800 font-bold text-xs uppercase">{questao.sistema}</Text>
          </View>
          <Text className="text-xl font-bold text-gray-800 leading-snug">
            {questao.pergunta}
          </Text>
        </View>

        {/* Alternativas */}
        <View className="space-y-3 mb-8">
          {questao.opcoes.map((opcao, index) => {
            const isSelecionada = opcaoSelecionada === index;
            const isCorreta = questao.resposta_correta === index;
            
            // Lógica de cores do feedback
            let borderClass = "border-gray-200";
            let bgClass = "bg-white";
            let textClass = "text-gray-700";

            if (mostrandoFeedback) {
              if (isCorreta) {
                borderClass = "border-green-500";
                bgClass = "bg-green-50";
                textClass = "text-green-800 font-bold";
              } else if (isSelecionada && !isCorreta) {
                borderClass = "border-red-500";
                bgClass = "bg-red-50";
                textClass = "text-red-800";
              }
            } else if (isSelecionada) {
              borderClass = "border-gray-800";
              bgClass = "bg-gray-50";
              textClass = "text-gray-900 font-bold";
            }

            return (
              <TouchableOpacity
                key={index}
                disabled={mostrandoFeedback}
                onPress={() => setOpcaoSelecionada(index)}
                className={`p-4 rounded-2xl border-2 flex-row items-center justify-between ${borderClass} ${bgClass}`}
              >
                <Text className={`flex-1 text-base ${textClass}`}>{opcao}</Text>
                
                {mostrandoFeedback && isCorreta && <CheckCircle size={20} color="#22c55e" />}
                {mostrandoFeedback && isSelecionada && !isCorreta && <XCircle size={20} color="#ef4444" />}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Caixa de Explicação (Aparece apenas após responder) */}
        {mostrandoFeedback && (
          <View className={`p-5 rounded-2xl mb-8 ${acertou ? 'bg-green-100' : 'bg-red-100'}`}>
            <Text className={`font-bold text-lg mb-2 ${acertou ? 'text-green-800' : 'text-red-800'}`}>
              {acertou ? '🎯 Resposta Correta!' : '❌ Resposta Incorreta'}
            </Text>
            <Text className="text-gray-700 leading-relaxed">{questao.explicacao}</Text>
          </View>
        )}
      </ScrollView>

      {/* Rodapé fixo com o Botão de Ação */}
      <View className="bg-white p-6 border-t border-gray-100 pb-10">
        {!mostrandoFeedback ? (
          <TouchableOpacity
            disabled={opcaoSelecionada === null}
            onPress={confirmarResposta}
            className={`p-4 rounded-2xl items-center shadow-sm ${opcaoSelecionada !== null ? 'bg-gray-900' : 'bg-gray-200'}`}
          >
            <Text className={`font-bold text-lg ${opcaoSelecionada !== null ? 'text-white' : 'text-gray-400'}`}>
              Confirmar Resposta
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={proximaPergunta}
            className="p-4 rounded-2xl items-center shadow-sm bg-red-800"
          >
            <Text className="font-bold text-lg text-white">
              {perguntaAtual < questoes.length - 1 ? 'Próxima Questão' : 'Finalizar Simulado'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}