import { useRouter } from 'expo-router'; // <- Import novo
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';
import { THEME } from '../constants';

export default function SplashScreen() {
  const router = useRouter(); // <- Puxando a ferramenta de navegação

  useEffect(() => {
    // Espera 3 segundos (3000ms) e depois substitui a tela pela Home
    const timer = setTimeout(() => {
      router.replace('/intro' as any);
    }, 3000);

    return () => clearTimeout(timer); // Limpeza de segurança
  }, []);

  return (
    <View 
      className="flex-1 w-full flex-col items-center justify-center"
      style={{ backgroundColor: THEME.primary }}
    >
      <View className="relative w-32 h-32 mb-4 bg-white rounded-full flex items-center justify-center overflow-hidden">
        <Svg width="80" height="80" viewBox="0 0 100 100" fill="none">
          <Path d="M50 10C35 10 25 25 25 45C25 55 28 65 35 75V85H65V75C72 65 75 55 75 45C75 25 65 10 50 10Z" stroke={THEME.primary} strokeWidth="6"/>
          <Rect x="55" y="35" width="10" height="15" rx="2" fill={THEME.primary} />
          <Path d="M35 85H65L50 95L35 85Z" fill={THEME.primary} />
        </Svg>
      </View>
      <Text className="text-white text-4xl font-bold tracking-widest mt-4">ANATO</Text>
      <Text className="text-white text-5xl font-light tracking-widest -mt-2">APP</Text>
    </View>
  );
}