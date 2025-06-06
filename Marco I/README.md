# Marco I (05/06/2025)
## Documento de visão e escopo do projeto

# 📄 Documento de Visão e Escopo do Projeto  
**Quadra Livre Crateús**  
**Versão:** 1.0
**Data:** 05/06/2025  

---

## 1. Objetivo do Projeto  
Desenvolver uma **plataforma web gratuita** para que cidadãos possam **visualizar e reservar quadras esportivas públicas ou comunitárias**, de forma prática, transparente e organizada, promovendo o uso consciente dos espaços públicos.

---

## 2. Escopo do Projeto

### 2.1 Requisitos Funcionais

1. **Cadastro Simples de Usuários**  
   - Registro com nome e e-mail ou telefone.  

2. **Visualização de Quadras e Horários Disponíveis**  
   - Interface com **mapa ou lista** de quadras cadastradas.  
   - Filtros por:
     - Modalidade esportiva (vôlei, futsal, beach tênis, etc.)  
     - Localização  
     - Disponibilidade por data e horário

3. **Sistema de Reserva Gratuita (Web)**  
   - Seleção de quadra e horário com **confirmação instantânea**  
   - **Sem custo para o usuário final**  

4. **Gestão de Reservas pelo Usuário**  
   - Painel com:
     - Reservas futuras  
     - Histórico de uso  
     - Botão de **cancelamento até X horas antes** da reserva

5. **Painel de Administração para Gestores**  
   - Cadastro e edição de quadras e horários  
   - **Bloqueio de horários** para manutenção ou eventos  
   - Gestão de denúncias e relatórios de uso

6. **Avaliações e Denúncias**  
   - Avaliação da quadra após o uso (ex: limpeza, iluminação)  
   - Denúncia de mau uso ou ausência do usuário

7. **Confirmação por E-mail ou SMS**  
   - Envio automático com:
     - Dados da quadra  
     - Horário da reserva  
     - Regras de uso e link para cancelamento
---

## 3. Requisitos Não Funcionais
- Plataforma **100% web responsiva** (desktop e mobile)  
- Acesso gratuito e público  
- Segurança dos dados dos usuários  
- Disponibilidade e estabilidade para múltiplas reservas simultâneas  
- Backup automático de dados

---

## 4. Público-Alvo
- Cidadãos que utilizam quadras públicas ou comunitárias  
- Gestores de espaços esportivos mantidos por prefeituras, associações de bairro, escolas públicas, etc.  
- Organizações sociais e clubes recreativos

---

## 5. Critérios de Sucesso
- Plataforma acessível via navegador em qualquer dispositivo  
- Avaliação média dos usuários ≥ 4 (de 1 a 5)  
- Redução de conflitos ou uso desorganizado das quadras
---

## 6. Cronograma Estimado

| Etapa                               | Duração     |
|------------------------------------|-------------|
| Levantamento e validação de requisitos | 1 semana    |
| Design da interface (UX/UI)        | 2 semanas   |
| Desenvolvimento da plataforma web  | 4 semanas   |
| Testes e validações com usuários   | 2 semanas   |
| Lançamento da versão piloto        | 1 semana    |

---

## Levantamento de requisitos funcionais e não funcionais

## ✅ Requisitos Funcionais

### Cadastro e Login
- O sistema deve permitir o cadastro de usuários com nome e e-mail.

### Visualização de Quadras
- O sistema deve exibir uma lista ou mapa de quadras cadastradas.
- O sistema deve permitir filtragem por tipo de esporte, localização e horários disponíveis.

### Reservas
- O sistema deve permitir a seleção e reserva de quadras disponíveis com confirmação imediata.
- O sistema deve limitar o número de reservas por usuário (ex.: até 2 horas por dia).
- O sistema deve evitar reservas simultâneas para o mesmo horário por um mesmo usuário.

### Painel do Usuário
- O sistema deve disponibilizar um painel com as reservas ativas e histórico do usuário.
- O sistema deve permitir o cancelamento de reservas com antecedência mínima definida (ex.: até 2 horas antes do horário agendado).

### Administração
- O sistema deve permitir que gestores cadastrem, editem e removam quadras.
- O sistema deve permitir o bloqueio de horários para manutenção ou eventos.
- O sistema deve gerar relatórios de uso e registros de denúncias.

### Avaliação e Denúncias
- O sistema deve permitir que o usuário avalie a quadra após o uso (ex.: limpeza, iluminação).
- O sistema deve permitir denúncias de mau uso ou ausência do usuário.

### Notificações
- O sistema deve enviar confirmação de reserva por e-mail ou SMS.
- O sistema deve enviar as informações da reserva: data, horário, local e regras de uso.

---

## 🔒 Requisitos Não Funcionais

### Acessibilidade e Usabilidade
- O sistema deve ser responsivo e acessível em navegadores web (desktop e mobile).
- A interface deve ser amigável para usuários de diferentes faixas etárias e níveis de conhecimento digital.

### Desempenho
- O sistema deve responder a ações do usuário (ex: reserva) em no máximo 2 segundos.
- O sistema deve suportar múltiplas reservas simultâneas sem perda de desempenho.

### Segurança e Privacidade
- Os dados dos usuários devem ser protegidos com criptografia e boas práticas de segurança.
- O sistema deve realizar backups regulares para evitar perda de dados.

### Manutenibilidade e Escalabilidade
- O sistema deve ser desenvolvido com tecnologias que permitam expansão para novas regiões e quadras.
- As regras de uso e limites devem ser facilmente atualizáveis sem grandes alterações no código.

## MER inicial

![Diagrama Entidade_Relacionamento](../der.png)

## Casos de Uso

### 1. Realizar Reserva de Quadra
- **Ator Principal:** Usuário
- **Descrição:** O usuário seleciona uma quadra, escolhe um horário disponível e confirma a reserva.
- **Pré-condições:** Usuário cadastrado e autenticado.
- **Pós-condições:** Reserva registrada e horário bloqueado para outros usuários.
- **Regras de negócio:** Limite de 2h/dia por usuário.

---

### 2. Visualizar Quadras e Horários Disponíveis
- **Ator Principal:** Usuário
- **Descrição:** O usuário pode ver uma lista ou mapa das quadras disponíveis, com filtros por tipo de esporte, localização e horários livres.
- **Pré-condições:** Nenhuma (acesso aberto).
- **Pós-condições:** Nenhuma — apenas exibição de dados.

---

### 3. Cancelar Reserva
- **Ator Principal:** Usuário
- **Descrição:** O usuário acessa seu painel, visualiza reservas futuras e pode cancelar qualquer uma dentro do prazo permitido.
- **Pré-condições:** Reserva ativa e dentro do prazo de cancelamento (ex.: até 2h antes).
- **Pós-condições:** Reserva removida e horário liberado para outros usuários.

---

### 4. Cadastrar/Editar Quadra
- **Ator Principal:** Gestor
- **Descrição:** O gestor cadastra uma nova quadra ou edita as informações de uma já existente (nome, tipo de esporte, localização, horários de funcionamento).
- **Pré-condições:** Gestor autenticado.
- **Pós-condições:** Quadra adicionada ou atualizada no sistema.

---

### 5. Avaliar Quadra
- **Ator Principal:** Usuário
- **Descrição:** Após o uso da quadra, o usuário pode avaliar sua condição (limpeza, iluminação, etc.) por meio de nota e comentário.
- **Pré-condições:** Usuário com reserva concluída na quadra.
- **Pós-condições:** Avaliação armazenada e disponível para visualização futura.

## Protótipos de alta fidelidade
- https://www.figma.com/design/8w4EF5jgqIDRw3Qmz6Drxp/QuadraLivre-Crateus-teste?node-id=0-1&t=pGHiFwSUplS0N3tK-0
## Apresentação oral do planejamento
