# Marco I (05/06/2025)
## Documento de visão e escopo do projeto
## Levantamento de requisitos funcionais e não funcionais
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
## Apresentação oral do planejamento
