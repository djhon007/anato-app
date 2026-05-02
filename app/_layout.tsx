import { Stack } from 'expo-router';
import '../global.css';

export default function RootLayout() {
  return (
    // Deixando o Stack vazio, ele mapeia TODOS os arquivos da pasta app/ automaticamente!
    <Stack screenOptions={{ headerShown: false }} />
  );
}