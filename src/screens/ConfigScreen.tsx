import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { Bell, ChevronRight, HelpCircle, Moon, Shield, User, Volume2 } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { auth } from '../config/firebase';
export default function ConfigScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [sounds, setSounds] = useState(true);

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/login'); // Joga o usuário de volta para a tela de login
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  const sections = [
    {
      title: 'CONTA',
      items: [
        { id: 'perfil', label: 'Editar perfil', icon: <User size={20} color="#9ca3af" />, type: 'link' },
        { id: 'notificacoes', label: 'Notificações', icon: <Bell size={20} color="#9ca3af" />, type: 'toggle', state: notifications, action: setNotifications },
      ]
    },
    {
      title: 'PREFERÊNCIAS',
      items: [
        { id: 'dark', label: 'Tema escuro', icon: <Moon size={20} color="#9ca3af" />, type: 'toggle', state: darkMode, action: setDarkMode },
        { id: 'som', label: 'Sons', icon: <Volume2 size={20} color="#9ca3af" />, type: 'toggle', state: sounds, action: setSounds },
      ]
    },
    {
      title: 'SUPORTE',
      items: [
        { id: 'ajuda', label: 'Ajuda', icon: <HelpCircle size={20} color="#9ca3af" />, type: 'link' },
        { id: 'privacidade', label: 'Privacidade', icon: <Shield size={20} color="#9ca3af" />, type: 'link' },
      ]
    }
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="px-6 pt-16 pb-6 bg-white shadow-sm border-b border-gray-100">
        <Text className="text-2xl font-bold text-gray-800">Ajustes</Text>
        <Text className="text-xs font-medium text-gray-500">Configure a sua experiência</Text>
      </View>

      <View className="p-6">
        {sections.map((section, idx) => (
          <View key={idx} className="mb-8">
            <Text className="text-[10px] font-black tracking-widest text-gray-400 mb-3 px-2">
              {section.title}
            </Text>
            <View className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
              {section.items.map((item, itemIdx) => (
                <View key={item.id}>
                  <TouchableOpacity 
                    activeOpacity={item.type === 'toggle' ? 1 : 0.7}
                    className="flex-row items-center justify-between p-4 bg-white"
                  >
                    <View className="flex-row items-center gap-3">
                      {item.icon}
                      <Text className="text-sm font-bold text-gray-700">{item.label}</Text>
                    </View>
                    
                    {item.type === 'toggle' ? (
                      <Switch
                        value={item.state}
                        onValueChange={(val) => item.action && item.action(val)}
                        trackColor={{ false: '#e5e7eb', true: '#991b1b' }}
                        thumbColor={'#ffffff'}
                      />
                    ) : (
                      <ChevronRight size={18} color="#d1d5db" />
                    )}
                  </TouchableOpacity>
                  {itemIdx < section.items.length - 1 && (
                    <View className="h-[1px] bg-gray-50 ml-12" />
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}

        <View className="items-center py-6 gap-4">
           <Text className="text-[10px] font-bold uppercase tracking-widest text-gray-400">AnatoApp v2.2.1</Text>
           <TouchableOpacity onPress={handleLogout} className="active:scale-95">
             <Text className="text-sm font-black text-red-600">Sair da conta</Text>
           </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}