import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import '../global.css';

// 1. Dizemos ao sistema (Android/iOS) para NÃO esconder a imagem da splash screen ainda
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  
  useEffect(() => {
    // 2. Quando esta função correr, significa que o App já está 100% pronto na memória.
    // Agora sim, podemos esconder a splash screen suavemente.
    async function esconderSplashScreen() {
      try {
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn("Erro ao esconder a splash screen:", e);
      }
    }

    esconderSplashScreen();
  }, []);

  return (
    // Deixando o Stack vazio, ele mapeia TODOS os arquivos da pasta app/ automaticamente!
    <Stack screenOptions={{ headerShown: false }} />
  );
}