import { Tabs } from 'expo-router';
import { Book, Home, MessageSquare, Settings, User } from 'lucide-react-native';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { THEME } from '../../src/constants';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: THEME.primary,
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#f3f4f6',
          
          // O Android fica com 70px fixos. O iOS soma os 65px + o tamanho do "risquinho" inferior.
          height: Platform.OS === 'android' ? 70 : 65 + insets.bottom,
          
          // No Android, um respiro fixo de 10px. No iOS, respeita a área segura.
          paddingBottom: Platform.OS === 'android' ? 10 : insets.bottom,
          
          // Dá um pequeno respiro no topo para os ícones não colarem na linha
          paddingTop: 10,
        },
        // Adicione esta propriedade para empurrar o texto um pouquinho para cima no Android
        tabBarLabelStyle: {
          paddingBottom: Platform.OS === 'android' ? 5 : 0,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="jornada"
        options={{
          title: 'Jornada',
          tabBarIcon: ({ color }) => <Book size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="forum"
        options={{
          title: 'Fórum',
          tabBarIcon: ({ color }) => <MessageSquare size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
        }}
      />
            <Tabs.Screen
        name="questoes"
        options={{
          title: 'Treino Livre',
          href: null,
        }}
      />
      <Tabs.Screen
        name="config"
        options={{
          title: 'Ajustes',
          tabBarIcon: ({ color }) => <Settings size={24} color={color} />,
        }}
      />
      
    </Tabs>
  );
}