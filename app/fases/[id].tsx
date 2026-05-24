import { useLocalSearchParams } from 'expo-router';
import QuizScreen from '../../src/screens/QuizScreen'; // Garanta que este caminho está certo

export default function FaseSistema() {
  // Pega o [id] do nome do arquivo na URL
  const { id } = useLocalSearchParams<{ id: string }>();
  
  // Passa o id como sistemaId para o componente QuizScreen
  return <QuizScreen sistemaId={id} />;
}