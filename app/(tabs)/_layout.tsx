import { Tabs } from 'expo-router';
import { Book, Home, MessageSquare, Settings, User } from 'lucide-react-native';
import { Platform, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { THEME } from '../../src/constants';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions(); // Pega a largura da tela
  // 1. Mapeamento exato de onde o usuário está
  const isWeb = Platform.OS === 'web';
  const isDesktopWeb = isWeb && width > 768; // Telas grandes (PC)
  const isMobileWeb = isWeb && width <= 768; // Telas pequenas (Celulares no navegador)
  const isAndroidNative = Platform.OS === 'android';
  const isIOSNative = Platform.OS === 'ios';

  // 2. Valores base (padrão)
  let tabHeight = 65;
  let tabPadBottom = 10;
  let tabPadTop = 10;
  let labelPadBottom = 5;

  // 3. Regras específicas para cada um dos 5 cenários
  if (isDesktopWeb) {
    // Web no PC: Comportamento normal, tela limpa.
    tabHeight = 65;
    tabPadBottom = 10;
    labelPadBottom = 5;
  } else if (isMobileWeb) {
    // Web no Android e Web no iPhone: Precisam da almofada gigante para o navegador!
    tabHeight = 95;
    tabPadBottom = 30;
    labelPadBottom = 5;
  } else if (isAndroidNative) {
    // Android Expo Go (App Nativo): Foge um pouco da barra física, sem exageros.
    tabHeight = 90;
    tabPadBottom = 10;
    labelPadBottom = 5;
  } else if (isIOSNative) {
    // iPhone Expo Go (App Nativo): Usa o "insets" matemático da Apple para fugir da linha inferior.
    tabHeight = 65 + insets.bottom;
    tabPadBottom = insets.bottom;
    labelPadBottom = 0;
  }

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
          // Aplicamos as variáveis calculadas acima
          height: tabHeight,
          paddingBottom: tabPadBottom,
          paddingTop: tabPadTop,
        },
        tabBarLabelStyle: {
          paddingBottom: labelPadBottom,
          fontSize: 11,
          fontWeight: '600',
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