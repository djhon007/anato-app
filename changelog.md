# Changelog
Todas as alterações notáveis neste projeto serão documentadas neste arquivo.

O formato baseia-se em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

---

## [2.2.3] - 2026-05-25
### Added
- **Carrossel de Avatares:** Sistema dinâmico com 10 opções de avatares no Perfil, com salvamento em tempo real no banco de dados.
- **Sistema de Combos:** Lógica de multiplicador de XP para acertos consecutivos (streaks) durante as sessões de estudo.
- **Suporte a Múltiplas Plataformas (Web/Mobile):** Configuração de rotas de Single Page Application (SPA) com regra de reescrita (`rewrites`) para deploy nativo no Firebase Hosting.

### Changed
- **Otimização de Banco de Dados:** Substituição de leituras estáticas (`getDoc`) por escuta em tempo real (`onSnapshot`), reduzindo o consumo e refletindo mudanças instantaneamente.
- **Microlearning:** Redução do tamanho dos quizzes para blocos fixos de 10 questões aleatórias, visando diminuir a fadiga cognitiva.
- **Gestão de Sessão:** Refatoração do fluxo de autenticação com `onAuthStateChanged` para evitar travamentos durante o recarregamento de página.

### Fixed
- Correção do erro de tela branca (*Minified React error #300*) ao recarregar rotas dinâmicas no navegador.
- Ajuste de espaçamento da barra de navegação inferior (*Safe Area*) para telas infinitas (iOS) e contorno de sobreposição de texto em dispositivos Android.
- Resolução de incompatibilidade do motor Hermes com propriedades privadas do Firebase através de downgrade estabilizado para a versão `10.7.1`.

---

## [2.0.0] - 2026-05-17
### Added
- **Gamificação (Nível 1):** Introdução de barra de progresso, acúmulo de XP e exibição de Nível de Usuário.
- **Sistema de Conquistas:** Criação de badges dinâmicas (*Iniciante, Estudioso, Explorador, Mestre*) baseadas no número de fases completadas e regiões iniciadas.
- **Edição de Perfil:** Modal interativo para atualização de Nome de Exibição, Curso (ex: Enfermagem, Medicina) e Período/Semestre (1º ao 12º, Professor, Monitor).
- **Trilhas de Aprendizado:** Mapeamento visual de sistemas e regiões anatômicas (ex: Osteologia) com rastreio de progresso individual.

### Changed
- **Estilização Global:** Migração e padronização da interface gráfica utilizando `NativeWind` (Tailwind CSS para React Native).
- **Lógica das questões:** Separação de questões por região (Superior, Inferior e Tronco) e tópico (Osteologia, Artrologia, Miologia).

---

## [1.0.0] - Lançamento Inicial (MVP)
### Added
- **Autenticação:** Sistema de Login e Cadastro de usuários integrado ao Firebase Auth.
- **Navegação Base:** Estrutura de roteamento baseada em abas (Tabs) utilizando `expo-router` (Home, Quiz, Perfil).
- **Motor de Quiz (Flashcards):** Lógica base para leitura de banco de questões do Firestore, validação de respostas certas/erradas e cálculo de pontuação final.
- **Banco de Dados:** Estruturação inicial do Cloud Firestore para armazenar dados de usuários e a primeira injeção (Seed) de perguntas de anatomia.
