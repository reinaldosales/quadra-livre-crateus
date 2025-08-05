## Problemática

Atualmente, muitas quadras esportivas públicas ou comunitárias enfrentam problemas recorrentes de falta de organização no uso, acessos desiguais e baixa comunicação entre usuários e administradores. A ausência de um sistema centralizado e digital dificulta o processo de reserva, levando a conflitos de horário, ocupações indevidas, e até o uso repetido por poucos usuários em detrimento da comunidade. Além disso, não há uma forma eficiente de controlar a disponibilidade, bloquear horários para manutenção, ou coletar feedback dos usuários sobre a qualidade das quadras e comportamentos inadequados.

Essa desorganização compromete a experiência dos frequentadores, gera desgastes entre usuários e gestores, e impede que o uso das quadras seja justo, transparente e otimizado.

## Objetivo do projeto

O objetivo final é democratizar e organizar o acesso a espaços esportivos, promovendo maior inclusão, transparência e cuidado com os recursos públicos ou coletivos.

## 8 REQUISITOS FUNCIONAIS
- Cadastro Simples de Usuários
  - Registro simplificado (apenas nome, email e senha)
- Visualização de Quadras e Horários Disponíveis
  - Lista das quadras filtradas por esporte (vôlei, beach tênis, etc.), localização e horário livre. Bem como, imagem das quadras.
- Sistema de Reserva Gratuita
  - Seleção de horário e quadra disponível, com confirmação instantânea.
  - Limite de reservas por usuário de 2h por dia e quadra para evitar abusos.
- Gestão de Reservas pelo Usuário
  - Painel do usuário com suas reservas ativas e histórico.
- Painel de Administração para Gestores
  - Cadastro e edição de quadras por responsáveis (prefeitura, associação, etc.).
  - Bloqueio de horários para manutenção ou eventos especiais.
- Avaliações e Denúncias
  - Usuários podem avaliar a condição da quadra (limpeza, iluminação).
  - Sistema de denúncia para reservas indevidas ou mau uso.
- Cancelamento Autônomo
  - Opção de cancelamento direto pelo usuário até 1 horas antes do horário.
- Confirmação por E-mail/SMS
  - Envio automático de comprovante de reserva com detalhes (local, horário, regras).

## 3 TELAS PROTOTIPADAS NO FIGMA (SIGNIN, SIGNUP, TELA PRINCIPAL)
-[Telas desenvolvidas](https://www.figma.com/file/OXTSbj3H4YIdDJvgfaNx1d?node-id=0:1&locale=en&type=design)
## DER COM PRINCIPAIS TABELAS CRIADAS
  
![Diagrama Entidade_Relacionamento](der.png)

## FLUXOGRAMA DO SISTEMA

![Fluxograma](fluxograma.png)

## CASOS DE USO

![Casos de uso](useCase.png)

# Guia de Execução do Projeto Quadra Livre Crateús

## Índice
1. [Pré-requisitos](#pré-requisitos)
2. [Clonando o Repositório](#clonando-o-repositório)
3. [Executando o Backend](#executando-o-backend)
4. [Executando o Frontend](#executando-o-frontend)
5. [Execução via Docker (Opcional)](#execução-via-docker-opcional)
6. [Links Úteis](#links-úteis)
7. [Dúvidas Frequentes](#dúvidas-frequentes)

---

## Pré-requisitos

Antes de começar, instale os seguintes softwares:

- [Git](https://git-scm.com/downloads) – Para clonar o projeto.
- [Node.js (v18+)](https://nodejs.org/en/download/) – Para rodar o frontend.
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) – Gerenciador de pacotes do Node.
- [Docker](https://www.docker.com/products/docker-desktop/) – (Opcional) Para rodar tudo em containers.
- [.NET SDK (v7+)](https://dotnet.microsoft.com/en-us/download) – Para rodar o backend (caso não use Docker).
- [Visual Studio Code](https://code.visualstudio.com/) – Recomendado para editar e visualizar o código. Pode optar também pelo Visual Studio 2022 ou Jetbrains Rider.

---

## Clonando o Repositório

Abra o terminal e execute:

```sh
git clone https://github.com/reinaldosales/quadra-livre-crateus.git
cd quadra-livre-crateus
```

---

## Executando o Backend

1. **Acesse a pasta do backend:**

   ```sh
   cd src/Backend/QLC
   ```

2. **Abra a solução no Visual Studio ou rode via terminal:**

   - **Via Visual Studio:**  
     Abra o arquivo `QLC.sln` e clique em "Run".
   - **Via terminal:**  
     ```sh
     dotnet restore
     dotnet build
     dotnet run
     ```
   - O backend deve iniciar na porta configurada (ex: `http://localhost:7012`).
   - Para acessar o scalar utilize `http://localhost:7012/scalar`

3. **Configuração do Banco de Dados:**  
   - O projeto usa SQLite.
   - O banco de dados é criado na raiz do projeto Backend com o nome `quadralivrecrateus.dat`.

---

## Executando o Frontend

1. **Acesse a pasta do frontend:**

   ```sh
   cd src/Frontend
   ```

2. **Instale as dependências:**

   ```sh
   npm install
   ```

3. **Execute o projeto:**

   ```sh
   npm run dev
   ```

   - O frontend estará disponível em `http://localhost:5173` (ou porta informada no terminal).

4. **Configuração de API:**  
   - Certifique-se de que o endereço da API no frontend está correto (ex: `http://localhost:7012/api`).
   - O projeto de frontend sempre aponta para a porta 7012, onde roda a api.

---

## Execução via Docker (Opcional)

1. **Backend:**  
   - Crie um Dockerfile na pasta do backend (se não existir).
   - Execute:
     ```sh
     docker build -t qlc-backend .
     docker run -p 5000:5000 qlc-backend
     ```

2. **Frontend:**  
   - Já existe um Dockerfile em `src/Frontend`.
   - Execute:
     ```sh
     cd src/Frontend
     docker build -t qlc-frontend .
     docker run -p 3000:3000 qlc-frontend
     ```
   - Acesse `http://localhost:3000`.

3. **Docker Compose:**  
   - Será atualizado para comportar docker compose posteriormente.

---

## Links Úteis

- [Documentação do .NET](https://learn.microsoft.com/pt-br/dotnet/)
- [Documentação do React](https://react.dev/)
- [Guia do Docker](https://docs.docker.com/get-started/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Figma das Telas](https://www.figma.com/file/OXTSbj3H4YIdDJvgfaNx1d?node-id=0:1&locale=en&type=design)

---

## Dúvidas Frequentes

- **Erro de porta ocupada:**  
  Altere a porta no arquivo de configuração ou encerre o processo que está usando a porta.

- **Problemas de dependências:**  
  Rode `npm install` novamente ou `dotnet restore` no backend.

- **Banco de dados não conecta:**  
  Verifique se o serviço está rodando e se a string de conexão está correta.

---

**Dica:** Sempre leia os arquivos README das pastas para instruções específicas