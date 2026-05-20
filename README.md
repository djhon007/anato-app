# 🦴 AnatoApp - HCI 2025.2 (UFPE)

O **AnatoApp** é uma plataforma interativa de aprendizado de anatomia humana, desenvolvida como projeto prático para a disciplina de **Interação Humano-Computador (HCI)** no Centro de Informática da UFPE. O foco do projeto é a gamificação do ensino de sistemas anatômicos para estudantes da área da saúde.

---

## 🛠️ Tecnologias Utilizadas

- **Framework:** React Native com [Expo](https://expo.dev/) (SDK 51+)
- **Navegação:** Expo Router (File-based routing)
- **Estilização:** Tailwind CSS através do [NativeWind](https://www.nativewind.dev/)
- **Backend:** [Firebase](https://firebase.google.com/) (Authentication & Firestore)
- **Ícones:** Lucide React Native

---

## 🚀 Como Rodar o Projeto

### 1. Pré-requisitos
Antes de começar, você precisa ter instalado na sua máquina:
- [Node.js](https://nodejs.org/) (v18+)
- App **Expo Go** no seu celular (disponível na [App Store](https://apps.apple.com/br/app/expo-go/id982107779) ou [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent))

### 2. Instalação
Clone o repositório e instale as dependências:

```bash
git clone https://github.com/djhon007/anato-app.git
```
```
cd AnatoApp
```
```
npm install
```

3. Configuração do Firebase (.env)
Este projeto utiliza variáveis de ambiente para a conexão com o Firebase. O arquivo .env está no .gitignore por segurança.
Peça as chaves de acesso ao administrador do projeto e crie um arquivo chamado .env na raiz do projeto com o seguinte formato:

Snippet de código
```
EXPO_PUBLIC_FIREBASE_API_KEY=xxx
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=xxx
EXPO_PUBLIC_FIREBASE_PROJECT_ID=xxx
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=xxx
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxx
EXPO_PUBLIC_FIREBASE_APP_ID=xxx
```


4. Execução
Inicie o servidor do Expo:

```Bash
npx expo start
```
Leia o QR Code com a câmera do celular (iOS) ou com o app Expo Go (Android).
