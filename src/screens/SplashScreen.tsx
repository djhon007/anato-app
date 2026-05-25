import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Text, View, Image } from 'react-native'; // <-- Adicionado o Image
import { THEME } from '../constants';

export default function SplashScreen() {
  const router = useRouter();

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
        {/* Aqui entra a sua imagem PNG */}
        <Image 
        source={require('../../assets/images/png_anatocast.png')} 
        style={{ width: 80, height: 80 }} 
        resizeMode="contain"
        />
      </View>
      
      {/* Ajustado para Anatocast */}
      <Text className="text-white text-4xl font-bold tracking-widest mt-4">ANATO</Text>
      <Text className="text-white text-5xl font-light tracking-widest -mt-2">CAST</Text>
    </View>
  );
}