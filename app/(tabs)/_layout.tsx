import { Tabs } from 'expo-router';
import { Book, Home, MessageSquare, Settings, User } from 'lucide-react-native';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { THEME } from '../../src/constants';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === 'web';
  const isAndroid = Platform.OS === 'android';
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
          
          // Android Nativo: 70px. Web: 85px (para compensar a barra). iOS: dinâmico.
          height: isAndroid ? 70 : (isWeb ? 85 : 65 + insets.bottom),
          
          // Android Nativo: 10px. Web: 20px de margem interna. iOS: dinâmico.
          paddingBottom: isAndroid ? 10 : (isWeb ? 20 : insets.bottom),
          
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          paddingBottom: isAndroid ? 5 : 0,
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