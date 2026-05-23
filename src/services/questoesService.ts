import { addDoc, collection } from 'firebase/firestore';
import { db } from '../config/firebase';

// Esta interface garante que toda questão tenha exatamente este formato
export interface Questao {
  pergunta: string;
  opcoes: string[];
  resposta_correta: number;
  regiao: string;
  sistema: string;
  dificuldade: number;
  xp_recompensa: number;
  explicacao: string;
}

// Nossa função backend para salvar no banco
export const cadastrarQuestao = async (novaQuestao: Questao) => {
  try {
    // "addDoc" cria um documento novo com um ID aleatório na coleção "questoes"
    const docRef = await addDoc(collection(db, "questoes"), novaQuestao);
    console.log("Sucesso! Questão salva com ID: ", docRef.id);
    return true;
  } catch (error) {
    console.error("Erro ao salvar a questão: ", error);
    return false;
  }
};