import { addDoc, collection } from 'firebase/firestore';
import { db } from '../config/firebase';
import { listaDeQuestoes } from '../data/questoesSeeder';

export const executarSeeder = async () => {
  try {
    for (const questao of listaDeQuestoes) {
      await addDoc(collection(db, "questoes"), questao);
    }
    console.log("Banco populado com sucesso!");
  } catch (e) {
    console.error("Erro no seeder:", e);
  }
};

//NAO MEXER PARA NAO DUPLICAR BANCO DE DADOS, APENAS RODAR UMA VEZ PARA POPULAR O FIREBASE COM AS QUESTOES INICIAIS