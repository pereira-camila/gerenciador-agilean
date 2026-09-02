### CT-017— Validar estrutura da tabela de atividades

**Status:** Sucesso
**Prioridade:** Média  
**Severidade:** Média

**Objetivo:**  
Validar se a tabela de atividades apresenta todas as colunas especificadas no requisito.

**Pré-condição:**

- Usuário autenticado.
- Tela principal do Gerenciador de Atividades carregada.

**Passos:**

1. Acessar a tela principal.
2. Localizar a tabela de atividades.
3. Verificar os cabeçalhos apresentados na tabela.
4. Comparar as colunas exibidas com as especificadas no requisito.

**Resultado esperado:**  
A tabela deve apresentar as seguintes colunas:

- `#`
- Atividade
- Responsável
- Prazo
- Prioridade
- Status
- Ações

**Resultado obtido:**  
A tabela apresenta corretamente todas as colunas especificadas no resultado esperado.

**Evidências**
![[Pasted image 20260830153218.png]]

---

### CT-018 — Alterar status de “Não Iniciada” para “Em Andamento”

**Status:** Falha
**Prioridade:** Alta  
**Severidade:** Alta

**Objetivo:**  
Validar a alteração do status de uma atividade diretamente pela tabela.

**Pré-condição:**

- Usuário autenticado.
- Existência de uma atividade com status **Não Iniciada**.

**Passos:**

1. Localizar na tabela uma atividade com status **Não Iniciada**.
2. Abrir o seletor de status da atividade.
3. Selecionar **Em Andamento**.
4. Observar o status apresentado na tabela.

**Resultado esperado:**  
O status da atividade deve ser alterado para **Em Andamento** diretamente na tabela.

**Resultado obtido:**  
Após alterar o status da atividade para **Em Andamento**, a alteração não é refletida imediatamente na tabela. É necessário recarregar a página para que o novo status seja exibido.

**Evidências**
https://jam.dev/c/0b7a940a-9d44-49aa-b554-14dbf168ec45

---

### CT-019 — Alterar status de uma atividade para “Resolvida”

**Status:** Falha
**Prioridade:** Alta  
**Severidade:** Alta

**Objetivo:**  
Validar a alteração do status de uma atividade para **Resolvida** diretamente pela tabela.

**Pré-condição:**

- Usuário autenticado.
- Existência de uma atividade com status diferente de **Resolvida**.

**Passos:**

1. Localizar uma atividade na tabela.
2. Abrir o seletor de status.
3. Selecionar **Resolvida**.
4. Observar o status da atividade após a alteração.

**Resultado esperado:**  
A atividade deve passar para o status **Resolvida**, e o novo status deve ser apresentado corretamente na tabela.

**Resultado obtido:**  
Após alterar o status da atividade para **Resolvida**, a alteração não é refletida imediatamente na tabela. É necessário recarregar a página para que o novo status seja exibido.

**Observação:**  
Comportamento relacionado ao mesmo defeito identificado no CT-021.

**Evidências**
https://jam.dev/c/0a4e167e-c76a-44b2-a0bc-967ecb496b6c

---

### CT-020 — Selecionar o status “Rejeitada”

**Status:** Falha
**Prioridade:** Alta  
**Severidade:** **Crítica**

**Objetivo:**  
Validar a solicitação do motivo ao alterar uma atividade para o status **Rejeitada**.

**Pré-condição:**

- Usuário autenticado.
- Existência de uma atividade com status diferente de **Rejeitada**.

**Passos:**

1. Localizar uma atividade na tabela.
2. Abrir o seletor de status.
3. Selecionar **Rejeitada**.
4. Observar o comportamento da aplicação.

**Resultado esperado:**  
O sistema deve exibir um modal ou formulário solicitando o **motivo da rejeição** antes de efetivar a alteração do status.

**Resultado obtido:**  
O sistema exibe o modal solicitando o motivo da rejeição. Entretanto, após informar um motivo válido e confirmar a operação, nenhuma requisição é realizada e a alteração do status para **Rejeitada** não é efetivada.

**Evidências**
https://jam.dev/c/77e3c1cc-e2f9-4ef8-bd6c-d5e2faaf55f1

---

### CT-021 — Validar obrigatoriedade do motivo da rejeição

**Status:** Sucesso
**Prioridade:** Alta  
**Severidade:** Alta

**Objetivo:**  
Tentar confirmar a rejeição de uma atividade sem informar o motivo.

**Pré-condição:**

- Usuário autenticado.
- Existência de uma atividade válida.
- Status **Rejeitada** selecionado.
- Modal/formulário de motivo da rejeição aberto.

**Passos:**

1. Selecionar **Rejeitada** como novo status da atividade.
2. Manter o campo de motivo da rejeição vazio.
3. Tentar confirmar a alteração.

**Resultado esperado:**  
O sistema deve impedir a confirmação da rejeição enquanto o motivo não for informado.

**Resultado obtido:**  
O sistema não permite salvar sem que o motivo seja inserido, exibindo um alerta de validação.

**Evidências**
https://jam.dev/c/68039a8b-a7de-4970-ad89-2d6d69d4c5ae

---

### CT-022 — Validar atualização dos cards após alteração de status

**Status:** Falha
**Prioridade:** Alta  
**Severidade:** Alta

**Objetivo:**  
Validar se os indicadores do cabeçalho são atualizados imediatamente após a alteração do status de uma atividade.

**Pré-condição:**

- Usuário autenticado.
- Existência de pelo menos uma atividade com status **Não Iniciada** ou **Em Andamento**.
- Totais atuais dos cards conhecidos antes da execução.

**Passos:**

1. Registrar os valores apresentados nos cards antes da alteração.
2. Localizar uma atividade pendente.
3. Alterar seu status para **Resolvida**.
4. Não atualizar/recarregar a página.
5. Observar os valores apresentados nos cards.
6. Comparar os valores antes e depois da alteração.

**Resultado esperado:**  
Os cards devem ser atualizados imediatamente, sem necessidade de recarregar a página.

Considerando a alteração utilizada neste teste:

- O total de **Cadastradas** deve permanecer igual.
- O total de **Resolvidas** deve aumentar.
- O total de **Pendentes** deve diminuir.

**Resultado obtido:**  
Após a alteração do status, os valores dos cards não são atualizados imediatamente. É necessário recarregar a página para que o card **Resolvidas** aumente e o card **Pendentes** diminua conforme esperado.

**Evidências**
https://jam.dev/c/114c8087-65e4-4b6c-8e99-63e73eafb0e6

---

### CT-023 — Validar atualização do gráfico após alteração de status

**Status:** Falha
**Prioridade:** Alta  
**Severidade:** Alta

**Objetivo:**  
Validar se o gráfico é atualizado automaticamente após a alteração do status de uma atividade.

**Pré-condição:**

- Usuário autenticado.
- Existência de atividades cadastradas.
- Gráfico exibido na tela.
- Existência de uma atividade com status **Não Iniciada** ou **Em Andamento**.

**Passos:**

1. Observar os percentuais apresentados no gráfico antes da alteração.
2. Localizar uma atividade pendente na tabela.
3. Alterar seu status para **Resolvida**.
4. Não atualizar/recarregar a página.
5. Observar novamente o gráfico.
6. Comparar os percentuais antes e depois da alteração.

**Resultado esperado:**  
O gráfico deve ser atualizado automaticamente, sem necessidade de recarregar a página, refletindo a nova distribuição das atividades.

O percentual de **Resolvidas** deve considerar atividades com status **Resolvida + Rejeitada**, enquanto **Pendentes** deve considerar **Não Iniciada + Em Andamento**, conforme as regras definidas no requisito.

**Resultado obtido:**  
Ao cadastrar novas atividades, o gráfico é atualizado automaticamente. Entretanto, quando o status de uma atividade existente é alterado, o gráfico não reflete a mudança imediatamente, sendo necessário recarregar a página.

O percentual de **Pendentes** considera corretamente as atividades com status **Não Iniciada + Em Andamento**.

Não foi possível validar integralmente o percentual de **Resolvidas**, considerando **Resolvida + Rejeitada**, pois o defeito identificado no CT-023 impede a alteração de atividades para o status **Rejeitada**.

**Evidências**
https://jam.dev/c/114c8087-65e4-4b6c-8e99-63e73eafb0e6  
https://jam.dev/c/917811db-0177-48ce-8cd3-46ae58e3e2d2