import { useRouter } from 'expo-router';
import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { ArrowLeft, CheckCircle, Trophy, XCircle } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';

// Importações dos caminhos corretos apontando para a pasta src
import { auth, db } from '../../src/config/firebase';
import { subSistemas, trilhaRegioes } from '../../src/config/SistemasConfig';

// Interface oficial V2.0
interface Questao {
  pergunta: string;
  opcoes: string[];
  resposta_correta: number;
  explicacao: string;
  regiao: string;
  sistema: string;
  xp_recompensa: number;
}

// --- FUNÇÃO HELPER: EMBARALHAR ALTERNATIVAS (NOVOS) ---
// Esta função recebe a questão "suja" do banco e embaralha as alternativas
// cuidando para não quebrar a "resposta_correta".
function embaralharAlternativasDaQuestao(questao: Questao): Questao {
  // Cria um array de objetos que mantém o texto original e o índice original
  const indexedOptions = questao.opcoes.map((opt, index) => ({
    text: opt,
    originalIndex: index,
  }));

  // Sorteia a ordem desse array de objetos
  const shuffledIndexedOptions = indexedOptions.sort(() => Math.random() - 0.5);

  // Encontra qual é a NOVA posição onde parou o índice original da resposta correta
  const newCorrectIndex = shuffledIndexedOptions.findIndex(
    (opt) => opt.originalIndex === questao.resposta_correta
  );

  // Mapeia para criar o array final apenas com os textos das opções embaralhadas
  const newOptions = shuffledIndexedOptions.map((opt) => opt.text);

  return {
    ...questao,
    opcoes: newOptions,
    resposta_correta: newCorrectIndex,
  };
}

export default function QuizScreen({ sistemaId }: { sistemaId?: string }) {
  const router = useRouter();
  //const { sistemaId } = useLocalSearchParams<{ sistemaId?: string }>();
  
  // Estados do Jogo
  const [questoes, setQuestoes] = useState<Questao[]>([]);
  const [loading, setLoading] = useState(true);
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState<number | null>(null);
  const [mostrandoFeedback, setMostrandoFeedback] = useState(false);
  const [acertos, setAcertos] = useState(0);
  const [xpGanho, setXpGanho] = useState(0);
  const [quizFinalizado, setQuizFinalizado] = useState(false); 
  // --- ESTADO DO COMBO ---
  const [sequenciaAcertos, setSequenciaAcertos] = useState(0);

  // --- ESTADO NOVO: CONTROLE DE META (NOVO) ---
  const [faltamParaMeta, setFaltamParaMeta] = useState(0);
  const [metaTotalDoModulo, setMetaTotalDoModulo] = useState(0);

  useEffect(() => {
    carregarQuestoes();
  }, [sistemaId]);

  const carregarQuestoes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "questoes"));
      let questoesBaixadas: Questao[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Questao;
        
        // Filtro V2 Lógica
        if (sistemaId) {
          const [regiaoReq, sistemaReq] = sistemaId.split('_');
          
          if (
            data.regiao?.toLowerCase() === regiaoReq?.toLowerCase() && 
            data.sistema?.toLowerCase() === sistemaReq?.toLowerCase()
          ) {
            // --- IMPLEMENTAÇÃO EMBARALHAR (NOVO) ---
            // Antes de jogar a questão na lista, embaralhamos as alternativas dela
            questoesBaixadas.push(embaralharAlternativasDaQuestao(data));
          }
        } else {
          // Modo Simulado: Puxa todas e embaralha as alternativas de cada uma
          questoesBaixadas.push(embaralharAlternativasDaQuestao(data));
        }
      });

      // Embaralha as questões (ordem das perguntas)
      const embaralhadas = questoesBaixadas.sort(() => Math.random() - 0.5);
      
      // --- REGRA MICROLEARNING: SEMPRE 10 (ATUALIZADO) ---
      // Pega sempre um bloco máximo de 10 questões aleatórias por partida
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
      // 1. Aumenta o combo
      const novaSequencia = sequenciaAcertos + 1;
      setSequenciaAcertos(novaSequencia);
      setAcertos(acertos + 1);
      
      // 2. Calcula o XP: Base (10) + Bônus do Combo (ex: 5 de XP extra para cada acerto seguido a partir do 2º)
      const xpBase = questao.xp_recompensa || 10;
      const xpBonus = novaSequencia > 1 ? (novaSequencia - 1) * 5 : 0; 
      
      setXpGanho(xpGanho + xpBase + xpBonus); 
    } else {
      // Quebrou o combo!
      setSequenciaAcertos(0);
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

        if (sistemaId) {
          const [regiaoReq, sistemaReq] = sistemaId.split('_');

          // 1. Guarda o progresso da chave composta
          const progressoSistemas = userData.progresso_sistemas || {};
          const acertosAnteriores = progressoSistemas[sistemaId] || 0;
          const novoTotalAcertos = acertosAnteriores + acertos;
          progressoSistemas[sistemaId] = novoTotalAcertos;
          
          dadosParaAtualizar.progresso_sistemas = progressoSistemas;

          // 2. Calcula a Macro Região
          const regiaoConfig = trilhaRegioes?.find(r => r.id === regiaoReq);
          
          if (regiaoConfig) {
            const totalAcertosRegiao = Object.keys(progressoSistemas)
              .filter(key => key.startsWith(`${regiaoReq}_`))
              .reduce((acc, key) => acc + progressoSistemas[key], 0);

            const concluidos = userData.regioes_concluidas || userData.sistemas_concluidos || [];

            if (totalAcertosRegiao >= regiaoConfig.meta && !concluidos.includes(regiaoReq)) {
               dadosParaAtualizar.regioes_concluidas = [...concluidos, regiaoReq];
            }
          }

          // --- MATEMÁTICA DO AVISO DINÂMICO (NOVO) ---
          // A meta do sistema específico que estamos jogando (ex: metas.superior: 12)
          const subSistemaConfig = subSistemas.find(s => s.id === sistemaReq);
          const metaDoModulo = (subSistemaConfig?.metas as any)[regiaoReq] || 1000;
          
          setMetaTotalDoModulo(metaDoModulo);
          
          const restantes = metaDoModulo - novoTotalAcertos;
          setFaltamParaMeta(restantes > 0 ? restantes : 0);
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

  // early returns (loading / vazio)
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

  // --- TELA DE VITÓRIA (ATUALIZADA COM O AVISO DINÂMICO) ---
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

        {/* --- EXIBIÇÃO DO AVISO DINÂMICO (NOVO) --- */}
        {sistemaId && faltamParaMeta > 0 && (
          <View className="bg-amber-50 border border-amber-200 p-5 rounded-2xl mb-8 w-full">
            <Text className="text-amber-800 font-bold text-center">🔥 Mais esforço necessário! 🔥</Text>
            <Text className="text-amber-700 text-center mt-1 text-sm">
                Você já tem um total de {metaTotalDoModulo - faltamParaMeta} acertos acumulados de {metaTotalDoModulo}. Faltam apenas {faltamParaMeta} para platinar este módulo!
            </Text>
          </View>
        )}

        {sistemaId && faltamParaMeta <= 0 && (
            <View className="bg-green-50 border border-green-200 p-5 rounded-2xl mb-8 w-full flex-row items-center justify-center gap-3">
              <CheckCircle size={24} color="#15803d" />
              <Text className="text-green-800 font-bold text-center">Módulo Concluído! Você atingiu a meta total!🏆</Text>
            </View>
        )}

        <TouchableOpacity 
          onPress={() => router.replace('/(tabs)/home')} 
          className="bg-red-800 w-full p-4 rounded-2xl items-center shadow-md"
        >
          <Text className="text-white font-bold text-lg">Voltar ao Menu</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // --- TELA NORMAL DO JOGO (Se ainda não acabou) ---
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
        <View className="flex-row justify-between items-center mb-3">
          <View className="bg-red-50 px-3 py-1 rounded-md">
            <Text className="text-red-800 font-bold text-xs uppercase">{questao.sistema}</Text>
          </View>
          
          {/* --- AVISO VISUAL DO COMBO --- */}
          {sequenciaAcertos > 1 && (
            <View className="bg-orange-100 px-3 py-1 rounded-md flex-row items-center border border-orange-300">
              <Text className="text-orange-800 font-black text-xs uppercase">🔥 Combo {sequenciaAcertos}x</Text>
            </View>
          )}
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

        {/* Caixa de Explicação */}
        {mostrandoFeedback && (
          <View className={`p-5 rounded-2xl mb-8 ${acertou ? 'bg-green-100' : 'bg-red-100'}`}>
            <Text className={`font-bold text-lg mb-2 ${acertou ? 'text-green-800' : 'text-red-800'}`}>
              {acertou ? '🎯 Resposta Correta!' : '❌ Resposta Incorreta'}
            </Text>
            <Text className="text-gray-700 leading-relaxed">{questao.explicacao}</Text>
          </View>
        )}
      </ScrollView>

      {/* Rodapé fixo */}
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
              {perguntaAtual < questoes.length - 1 ? 'Próxima Questão' : 'Finalizar Módulo'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}