import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
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