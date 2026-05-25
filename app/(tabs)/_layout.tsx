import { Tabs } from 'expo-router';
import { Book, Home, MessageSquare, Settings, User } from 'lucide-react-native';
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
          borderTopWidth: 1,
          borderTopColor: '#f3f4f6',
          // Se o celular tem a barra (insets.bottom > 0), soma o tamanho dela + 10px. Se não, usa 20px padrão.
          paddingBottom: insets.bottom ? insets.bottom + 10 : 20, 
          
          // Aumenta a altura total do menu para compensar o empurrão para cima
          height: insets.bottom ? 60 + insets.bottom : 70,
          paddingTop: 8,
          backgroundColor: '#ffffff'
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