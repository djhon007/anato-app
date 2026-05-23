import { useRouter } from 'expo-router';
import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { ArrowLeft, CheckCircle, Trophy, XCircle } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../config/firebase';
import { trilhaRegioes } from '../config/SistemasConfig'; // CORREÇÃO: Importar a nova trilha

interface Questao {
  pergunta: string;
  opcoes: string[];
  resposta_correta: number;
  explicacao: string;
  regiao: string; // Adicionado
  sistema: string;
  xp_recompensa: number;
}

export default function QuizScreen({ sistemaId }: { sistemaId?: string }) {
  const router = useRouter();
  
  // Estados do Jogo
  const [questoes, setQuestoes] = useState<Questao[]>([]);
  const [loading, setLoading] = useState(true);
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState<number | null>(null);
  const [mostrandoFeedback, setMostrandoFeedback] = useState(false);
  const [acertos, setAcertos] = useState(0);
  const [xpGanho, setXpGanho] = useState(0);
  const [quizFinalizado, setQuizFinalizado] = useState(false); 

  useEffect(() => {
    carregarQuestoes();
  }, []);

  const carregarQuestoes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "questoes"));
      let questoesBaixadas: Questao[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Questao;
        
        // V2 Lógica: Se vier da SubJornada, o sistemaId será algo como "superior_osteologia"
        if (sistemaId) {
          // Precisamos separar "superior" e "osteologia"
          const [regiaoReq, sistemaReq] = sistemaId.split('_');
          
          if (
            data.regiao?.toLowerCase() === regiaoReq?.toLowerCase() && 
            data.sistema?.toLowerCase() === sistemaReq?.toLowerCase()
          ) {
            questoesBaixadas.push(data);
          }
        } else {
          // Modo Simulado: Puxa todas
          questoesBaixadas.push(data);
        }
      });

      // Embaralha as questões
      const embaralhadas = questoesBaixadas.sort(() => Math.random() - 0.5);
      
      // Se for simulado, limita a 10 questões. Se for jornada, pode mostrar todas.
      setQuestoes(!sistemaId ? embaralhadas.slice(0, 10) : embaralhadas);
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
      setXpGanho(xpGanho + (questao.xp_recompensa || 10)); 
    }
  };

  const finalizarQuiz = async () => {
    setQuizFinalizado(true); 
    if (!auth.currentUser) return;

    try {
      const userRef = doc(db, 'usuarios', auth.currentUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        const novoXp = (userData.xp || 0) + xpGanho;
        const novoNivel = Math.floor(novoXp / 100) + 1;

        let dadosParaAtualizar: any = { xp: novoXp, nivel: novoNivel };

        // --- LÓGICA DE PROGRESSO PROPORCIONAL V2 ---
        if (sistemaId) {
          // 1. Guarda o progresso da chave composta (ex: "superior_osteologia")
          const progressoSistemas = userData.progresso_sistemas || {};
          const acertosAnteriores = progressoSistemas[sistemaId] || 0;
          progressoSistemas[sistemaId] = acertosAnteriores + acertos;
          
          dadosParaAtualizar.progresso_sistemas = progressoSistemas;

          // 2. Verifica se platinou a macro região inteira (ex: "superior")
          const [regiaoAtual] = sistemaId.split('_'); // Pega só o "superior"
          const regiaoConfig = trilhaRegioes?.find(r => r.id === regiaoAtual);
          
          if (regiaoConfig) {
            // Conta os acertos totais dessa região
            const totalAcertosRegiao = Object.keys(progressoSistemas)
              .filter(key => key.startsWith(`${regiaoAtual}_`))
              .reduce((acc, key) => acc + progressoSistemas[key], 0);

            const concluidos = userData.regioes_concluidas || userData.sistemas_concluidos || [];

            // Se o total de acertos bater a meta da região (ex: 37)
            if (totalAcertosRegiao >= regiaoConfig.meta && !concluidos.includes(regiaoAtual)) {
               dadosParaAtualizar.regioes_concluidas = [...concluidos, regiaoAtual];
            }
          }
        }

        await updateDoc(userRef, dadosParaAtualizar);
      }
    } catch (error) {
      console.error("Erro ao salvar progresso:", error);
    }
  };

  const proximaPergunta = () => {
    if (perguntaAtual < questoes.length - 1) {
      setPerguntaAtual(perguntaAtual + 1);
      setOpcaoSelecionada(null);
      setMostrandoFeedback(false);
    } else {
      finalizarQuiz();
    }
  };

  // --- TELAS DE CARREGAMENTO E ERRO ---
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#991b1b" />
        <Text className="mt-4 text-gray-500 font-medium">Preparando questões...</Text>
      </View>
    );
  }

  if (questoes.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50 px-6 text-center">
        <Text className="text-xl font-bold text-gray-800 mb-2">Ops!</Text>
        <Text className="text-gray-500 text-center">Nenhuma questão encontrada para este módulo.</Text>
        <TouchableOpacity onPress={() => router.back()} className="mt-6 bg-red-800 px-6 py-3 rounded-xl">
          <Text className="text-white font-bold">Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // --- TELA DE VITÓRIA ---
  if (quizFinalizado) {
    return (
      <View className="flex-1 bg-gray-50 justify-center items-center px-6">
        <View className="w-24 h-24 bg-red-100 rounded-full items-center justify-center mb-6">
          <Trophy size={48} color="#991b1b" />
        </View>
        <Text className="text-3xl font-black text-gray-800 mb-2">Módulo Concluído!</Text>
        <Text className="text-gray-500 text-center mb-8">
          Você revisou {questoes.length} questões.
        </Text>

        <View className="flex-row gap-4 mb-8 w-full">
          <View className="bg-white p-4 rounded-3xl items-center border border-gray-100 shadow-sm flex-1">
            <Text className="text-4xl font-black text-green-500">{acertos}</Text>
            <Text className="text-[10px] text-gray-400 font-bold uppercase mt-1">Acertos</Text>
          </View>
          <View className="bg-white p-4 rounded-3xl items-center border border-gray-100 shadow-sm flex-1">
            <Text className="text-4xl font-black text-yellow-500">+{xpGanho}</Text>
            <Text className="text-[10px] text-gray-400 font-bold uppercase mt-1">XP Ganho</Text>
          </View>
        </View>

        <TouchableOpacity 
          onPress={() => router.replace('/(tabs)/home')} 
          className="bg-red-800 w-full p-4 rounded-2xl items-center shadow-md"
        >
          <Text className="text-white font-bold text-lg">Voltar ao Menu</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // --- TELA NORMAL DO JOGO ---
  const questao = questoes[perguntaAtual];
  const acertou = opcaoSelecionada === questao.resposta_correta;

  return (
    <View className="flex-1 bg-gray-50">
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
      <View className="mb-8">
        <View className="flex-row justify-between items-center mb-3">
          <View className="bg-red-50 px-3 py-1 rounded-md">
            <Text className="text-red-800 font-bold text-xs uppercase">{questao.sistema}</Text>
          </View>
        </View>
        <Text className="text-xl font-bold text-gray-800 leading-snug">
          {questao.pergunta}
        </Text>
      </View>

        <View className="space-y-3 mb-8">
          {questao.opcoes.map((opcao, index) => {
            const isSelecionada = opcaoSelecionada === index;
            const isCorreta = questao.resposta_correta === index;
            
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

        {mostrandoFeedback && (
          <View className={`p-5 rounded-2xl mb-8 ${acertou ? 'bg-green-100' : 'bg-red-100'}`}>
            <Text className={`font-bold text-lg mb-2 ${acertou ? 'text-green-800' : 'text-red-800'}`}>
              {acertou ? '🎯 Resposta Correta!' : '❌ Resposta Incorreta'}
            </Text>
            <Text className="text-gray-700 leading-relaxed">{questao.explicacao}</Text>
          </View>
        )}
      </ScrollView>

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