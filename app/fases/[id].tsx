import { useLocalSearchParams } from 'expo-router';
import QuizScreen from '../../src/screens/QuizScreen'; // Garanta que este caminho está certo

export default function FaseSistema() {
  const { id } = useLocalSearchParams();
  return <QuizScreen sistemaId={id as string} />;
}