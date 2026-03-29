import { useLocalSearchParams, useRouter } from 'expo-router';
import { Activity, Bone, CheckCircle2, ChevronLeft, Play, Share2, XCircle, Zap } from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ANATOMY_SYSTEMS, MOCK_QUESTIONS, THEME } from '../../src/constants';

type SubCategory = 'superiores' | 'inferiores' | 'tronco';
type Especialidade = 'osteologia' | 'artrologia' | 'miologia';

export default function SystemRoute() {
  const { id } = useLocalSearchParams(); // Captura o ID da URL (ex: 'osseo', 'nervoso')
  const router = useRouter();
  const sistemaId = id as string;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [view, setView] = useState<'map' | 'quiz'>('map');
  const [activeSubTab, setActiveSubTab] = useState<SubCategory>('superiores');
  const [activeEspecialidade, setActiveEspecialidade] = useState<Especialidade>('osteologia');

  const handleRegionTabChange = (tab: SubCategory) => {
    setActiveSubTab(tab);
    resetQuizState();
  };

  const handleEspecialidadeTabChange = (tab: Especialidade) => {
    setActiveEspecialidade(tab);
    resetQuizState();
  };

  const resetQuizState = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  const filteredQuestions = useMemo(() => {
    if (!MOCK_QUESTIONS) return [];
    return MOCK_QUESTIONS.filter(q => {
      const matchSystem = q.sistemaId === sistemaId;
      if (sistemaId === 'osseo' || sistemaId === 'locomotor') {
        return matchSystem && 
               q.subcategoria === activeSubTab && 
               q.especialidade === activeEspecialidade;
      }
      return matchSystem;
    });
  }, [sistemaId, activeSubTab, activeEspecialidade]);

  const systemName = useMemo(() => {
    return ANATOMY_SYSTEMS.find(s => s.id === sistemaId)?.nome || 'Sistema';
  }, [sistemaId]);

  const question = filteredQuestions[currentQuestionIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setView('map');
      resetQuizState();
    }
  };

  const regionTabs = [
    { id: 'superiores' as SubCategory, label: 'Superiores', icon: <Bone size={14} color="#6b7280" /> },
    { id: 'inferiores' as SubCategory, label: 'Inferiores', icon: <Activity size={14} color="#6b7280" /> },
    { id: 'tronco' as SubCategory, label: 'Tronco', icon: <Zap size={14} color="#6b7280" /> },
  ];

  const especialidadeTabs = [
    { id: 'osteologia' as Especialidade, label: 'Osteologia' },
    { id: 'artrologia' as Especialidade, label: 'Artrologia' },
    { id: 'miologia' as Especialidade, label: 'Miologia' },
  ];

  if (view === 'map') {
    return (
      <View className="flex-1 bg-gray-50">
        <View className="px-6 pt-12 pb-6 bg-white shadow-sm rounded-b-3xl z-10">
          <View className="flex-row items-center justify-between mb-6">
            <View className="flex-row items-center gap-4">
              <TouchableOpacity onPress={() => router.back()} className="p-2 bg-gray-100 rounded-full">
                <ChevronLeft size={24} color="#1f2937" />
              </TouchableOpacity>
              <View>
                <Text className="text-xl font-bold text-gray-800">{systemName}</Text>
                <Text className="text-xs text-gray-400">Módulos regionais e temáticos</Text>
              </View>
            </View>
            <TouchableOpacity className="p-2">
              <Share2 size={24} color="#991b1b" />
            </TouchableOpacity>
          </View>

          {(sistemaId === 'osseo' || sistemaId === 'locomotor') && (
            <View className="space-y-4">
              <View className="flex-row p-1 bg-gray-100 rounded-2xl">
                {regionTabs.map((tab) => (
                  <TouchableOpacity
                    key={tab.id}
                    onPress={() => handleRegionTabChange(tab.id)}
                    className={`flex-1 flex-row items-center justify-center gap-2 py-3 rounded-xl ${
                      activeSubTab === tab.id ? 'bg-red-800 shadow-sm' : 'bg-transparent'
                    }`}
                  >
                    {tab.icon}
                    <Text className={`text-[10px] font-bold ${activeSubTab === tab.id ? 'text-white' : 'text-gray-500'}`}>
                      {tab.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="py-1 flex-row">
                {especialidadeTabs.map((tab) => (
                  <TouchableOpacity
                    key={tab.id}
                    onPress={() => handleEspecialidadeTabChange(tab.id)}
                    className={`px-4 py-2 mr-2 rounded-full border ${
                      activeEspecialidade === tab.id
                        ? 'bg-red-50 border-red-800'
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    <Text className={`text-[10px] font-black uppercase tracking-widest ${
                      activeEspecialidade === tab.id ? 'text-red-800' : 'text-gray-400'
                    }`}>
                      {tab.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>

        <View className="flex-1 items-center justify-center p-8 relative">
          <View className="absolute w-1 h-full left-1/2 -ml-[2px] bg-gray-200 -z-10" />

          <View className="items-center w-full gap-8">
            <View className="relative items-center justify-center">
              <TouchableOpacity 
                activeOpacity={0.8}
                onPress={() => setView('quiz')}
                className="w-28 h-28 rounded-full items-center justify-center border-4 border-red-800 bg-white shadow-lg z-10"
              >
                <Play size={40} color="#991b1b" className="mb-1 ml-1" />
                <Text className="text-[10px] text-red-800 font-black uppercase tracking-widest">Iniciar</Text>
              </TouchableOpacity>
            </View>
            
            <View className="px-6 py-4 rounded-3xl border bg-white border-gray-100 items-center justify-center max-w-[220px]">
              <Text className="text-xs font-bold text-gray-500 text-center leading-5">
                Estudar <Text className="text-red-800">{activeEspecialidade}</Text> de {'\n'}
                <Text className="text-red-800 uppercase">{activeSubTab === 'superiores' ? 'Membros Superiores' : activeSubTab === 'inferiores' ? 'Membros Inferiores' : 'Tronco'}</Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  // QUIZ VIEW
  return (
    <View className="flex-1 bg-white">
      <View className="px-6 pt-12 pb-4 flex-row items-center justify-between bg-white shadow-sm z-10">
        <TouchableOpacity onPress={() => setView('map')} className="p-2 bg-gray-100 rounded-full">
          <ChevronLeft size={24} color="#1f2937" />
        </TouchableOpacity>
        <View className="items-center">
          <Text className="text-[10px] uppercase font-bold tracking-widest text-gray-400">
            {activeSubTab} • {activeEspecialidade}
          </Text>
          <Text className="text-sm font-bold text-gray-800">{systemName}</Text>
        </View>
        <Text className="text-xs font-bold text-gray-400">
          {filteredQuestions.length > 0 ? `${currentQuestionIndex + 1} / ${filteredQuestions.length}` : '0 / 0'}
        </Text>
      </View>

      {!question ? (
        <View className="flex-1 items-center justify-center p-8">
          <Activity size={48} color="#d1d5db" className="mb-4" />
          <Text className="font-bold text-lg text-gray-800 text-center">Módulo em desenvolvimento</Text>
          <Text className="text-sm text-gray-500 mt-2 text-center">Ainda não temos questões para {activeEspecialidade} desta região. Tente outra combinação!</Text>
          <TouchableOpacity onPress={() => setView('map')} className="mt-6 px-8 py-3 bg-red-800 rounded-2xl">
            <Text className="text-white font-bold">Voltar ao Mapa</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView className="flex-1 px-6 pt-8" contentContainerStyle={{ paddingBottom: 40 }}>
          <Text className="text-xl font-bold mb-8 text-gray-800 leading-relaxed">
            {question.texto}
          </Text>

          <View className="space-y-4">
            {question.opcoes.map((opcao, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === question.correta;
              
              let btnClass = "w-full p-5 rounded-2xl border flex-row items-center gap-4 mb-3 ";
              let iconBoxClass = "w-10 h-10 rounded-xl items-center justify-center shadow-sm ";
              let textClass = "flex-1 text-sm font-semibold ";
              
              if (!isAnswered) {
                btnClass += "bg-white border-gray-200";
                iconBoxClass += "bg-gray-100";
                textClass += "text-gray-600";
              } else {
                if (isSelected) {
                  if (isCorrect) {
                    btnClass += "bg-green-50 border-green-500";
                    iconBoxClass += "bg-green-500";
                    textClass += "text-green-900";
                  } else {
                    btnClass += "bg-red-50 border-red-500";
                    iconBoxClass += "bg-red-500";
                    textClass += "text-red-900";
                  }
                } else if (isCorrect) {
                  btnClass += "bg-green-50 border-green-500";
                  iconBoxClass += "bg-green-500";
                  textClass += "text-green-900";
                } else {
                  btnClass += "bg-white border-gray-100 opacity-50";
                  iconBoxClass += "bg-gray-50";
                  textClass += "text-gray-400";
                }
              }

              return (
                <TouchableOpacity 
                  key={idx} 
                  activeOpacity={0.7}
                  disabled={isAnswered}
                  onPress={() => handleSelectOption(idx)} 
                  className={btnClass}
                >
                  <View className={iconBoxClass}>
                    {isAnswered && isCorrect ? <CheckCircle2 size={18} color="white" /> : 
                     isAnswered && isSelected && !isCorrect ? <XCircle size={18} color="white" /> : 
                     <Text className={`font-bold ${isAnswered ? 'text-white' : 'text-gray-500'}`}>{String.fromCharCode(65 + idx)}</Text>}
                  </View>
                  <Text className={textClass}>
                    {opcao}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {isAnswered && (
            <View className="mt-8 mb-8">
              <View className={`p-6 rounded-3xl border ${selectedOption === question.correta ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <View className="flex-row items-center gap-2 mb-3">
                  <Activity size={18} color={selectedOption === question.correta ? '#16a34a' : '#dc2626'} />
                  <Text className={`font-bold text-sm ${selectedOption === question.correta ? 'text-green-800' : 'text-red-800'}`}>
                    {selectedOption === question.correta ? 'Resposta Correta!' : 'Resposta Incorreta'}
                  </Text>
                </View>
                <Text className="text-xs text-gray-700 leading-relaxed font-medium">
                  <Text className="font-bold">Explicação: </Text>{question.explicacao}
                </Text>
              </View>
              
              <TouchableOpacity 
                onPress={handleNext}
                className="w-full mt-6 py-4 rounded-2xl items-center shadow-md"
                style={{ backgroundColor: THEME.primary }}
              >
                <Text className="text-white font-black text-lg">
                  {currentQuestionIndex === filteredQuestions.length - 1 ? 'Finalizar Módulo' : 'Próxima Questão'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
}