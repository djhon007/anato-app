import { MessageCircle, Pin, Plus, Search, Send, X } from 'lucide-react-native';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { THEME } from '../constants';

const MOCK_TOPICS = [
  { id: '1', type: 'Dúvida', title: 'Como diferenciar as vértebras cervicais das torácicas?', author: 'João Guilherme', role: 'Aluno', replies: 3, time: '2h atrás', pinned: true, tag: 'Osteologia' },
  { id: '2', type: 'Discussão', title: 'Melhores técnicas para memorizar a origem e inserção dos músculos', author: 'Prof. Silva', role: 'Monitor', replies: 12, time: '5h atrás', pinned: false, tag: 'Miologia' },
  { id: '3', type: 'Material', title: 'Resumo completo sobre as articulações sinoviais', author: 'Ana Costa', role: 'Aluna', replies: 0, time: '1d atrás', pinned: false, tag: 'Artrologia' },
];

export default function ForumScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');

  const handleSubmit = () => {
    // Aqui no futuro enviaremos para uma base de dados
    setIsCreateModalOpen(false);
    setNewTitle('');
    setNewBody('');
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Cabeçalho Fixo */}
      <View className="px-6 pt-16 pb-6 bg-white shadow-sm border-b border-gray-100">
        <Text className="text-2xl font-bold text-gray-800">Fórum</Text>
        <Text className="text-xs font-medium text-gray-500 mb-4">Comunidade e dúvidas</Text>
        
        {/* Barra de Pesquisa NATIVA */}
        <View className="flex-row items-center bg-gray-100 p-3 rounded-2xl">
          <Search size={20} color="#9ca3af" />
          <TextInput 
            value={searchTerm}
            onChangeText={setSearchTerm}
            placeholder="Pesquisar tópicos, dúvidas..."
            placeholderTextColor="#9ca3af"
            className="flex-1 ml-3 text-sm text-gray-800"
          />
        </View>
      </View>

      {/* Lista de Tópicos */}
      <ScrollView className="flex-1 p-6" contentContainerStyle={{ paddingBottom: 100 }}>
        {MOCK_TOPICS.map((topic) => (
          <TouchableOpacity 
            key={topic.id}
            activeOpacity={0.7}
            className={`p-4 rounded-3xl border mb-4 ${topic.pinned ? 'bg-red-50 border-red-100' : 'bg-white border-gray-100'}`}
          >
            <View className="flex-row items-center gap-2 mb-2">
              <View className={`px-2 py-1 rounded-md ${topic.pinned ? 'bg-red-800' : 'bg-gray-100'}`}>
                <Text className={`text-[10px] font-black uppercase ${topic.pinned ? 'text-white' : 'text-gray-500'}`}>
                  {topic.type}
                </Text>
              </View>
              {topic.pinned && <Pin size={12} color="#991b1b" />}
              <Text className="text-[10px] font-bold text-gray-400 ml-auto">{topic.time}</Text>
            </View>

            <Text className="font-bold text-sm text-gray-800 mb-3">{topic.title}</Text>

            <View className="flex-row items-center justify-between mt-2 pt-3 border-t border-gray-100/50">
              <View className="flex-row items-center gap-2">
                <View className="w-6 h-6 bg-gray-200 rounded-full items-center justify-center">
                  <Text className="text-[10px] font-bold text-gray-600">{topic.author.charAt(0)}</Text>
                </View>
                <View>
                  <Text className="text-xs font-bold text-gray-700">{topic.author}</Text>
                  <Text className="text-[10px] text-gray-400">{topic.role}</Text>
                </View>
              </View>
              <View className="flex-row items-center gap-1">
                <MessageCircle size={14} color="#9ca3af" />
                <Text className="text-xs font-bold text-gray-500">{topic.replies}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Botão Flutuante Nativo */}
      <TouchableOpacity 
        onPress={() => setIsCreateModalOpen(true)}
        className="absolute bottom-6 right-6 w-14 h-14 rounded-full items-center justify-center shadow-lg active:scale-95"
        style={{ backgroundColor: THEME.primary }}
      >
        <Plus size={24} color="white" />
      </TouchableOpacity>

      {/* Modal Nativo de Criar Tópico */}
      <Modal visible={isCreateModalOpen} animationType="slide" transparent={true}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-[32px] p-6 h-[80%]">
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-xl font-bold text-gray-800">Nova Dúvida</Text>
              <TouchableOpacity onPress={() => setIsCreateModalOpen(false)} className="p-2 bg-gray-100 rounded-full">
                <X size={20} color="#1f2937" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text className="text-sm font-bold text-gray-700 mb-2">Título da dúvida</Text>
              <TextInput 
                value={newTitle}
                onChangeText={setNewTitle}
                placeholder="Ex: Qual a diferença entre..."
                placeholderTextColor="#9ca3af"
                className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-gray-800 mb-6"
              />

              <Text className="text-sm font-bold text-gray-700 mb-2">Descrição detalhada</Text>
              <TextInput 
                value={newBody}
                onChangeText={setNewBody}
                placeholder="Escreva a sua dúvida com o máximo de detalhes..."
                placeholderTextColor="#9ca3af"
                multiline
                numberOfLines={6}
                textAlignVertical="top"
                className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-gray-800 min-h-[120px] mb-6"
              />

              <TouchableOpacity 
                onPress={handleSubmit}
                disabled={!newTitle || !newBody}
                className={`w-full py-4 rounded-2xl items-center flex-row justify-center gap-3 ${!newTitle || !newBody ? 'bg-gray-300' : 'bg-red-800'}`}
              >
                <Send size={20} color="white" />
                <Text className="text-white font-bold text-lg">Publicar Dúvida</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}