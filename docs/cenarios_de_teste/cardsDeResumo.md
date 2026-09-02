### CT-031 — Validar atualização do card Cadastradas após novo cadastro

**Status:** Sucesso
**Prioridade:** Alta  
**Severidade:** Alta

**Objetivo:**  
Validar se o card **Cadastradas** é atualizado após a criação de uma nova atividade.

**Pré-condição:**

- Usuário autenticado.
- Tela principal carregada.
- Quantidade atual de atividades cadastradas conhecida.

**Passos:**

1. Registrar o valor atual do card **Cadastradas**.
2. Cadastrar uma nova atividade utilizando dados válidos.
3. Concluir o cadastro.
4. Não recarregar a página.
5. Verificar novamente o valor apresentado no card **Cadastradas**.

**Resultado esperado:**  
O valor do card **Cadastradas** deve aumentar em 1 após o cadastro da nova atividade.

**Resultado obtido:**  
O valor apresentado no card **Cadastradas** é atualizado corretamente após o cadastro de uma nova atividade.

**Evidências**
https://jam.dev/c/1b0d1eef-338c-4467-9f3f-73f9c12feda5

---

### CT-032 — Validar card Resolvidas para atividade com status Resolvida

**Status:** Falha
**Prioridade:** Alta  
**Severidade:** Alta

**Objetivo:**  
Validar se uma atividade com status **Resolvida** é contabilizada corretamente no card **Resolvidas**.

**Pré-condição:**

- Usuário autenticado.
- Existência de uma atividade com status Não Iniciada ou Em Andamento.
- Valor atual do card Resolvidas conhecido.

**Passos:**

1. Registrar o valor apresentado no card **Resolvidas**.
2. Localizar uma atividade pendente.
3. Alterar o status para **Resolvida**.
4. Não recarregar a página.
5. Verificar novamente o card **Resolvidas**.

**Resultado esperado:**  
O total apresentado no card **Resolvidas** deve aumentar em 1.

**Resultado obtido:**  
O valor do card **Resolvidas** é atualizado somente após o recarregamento da página. Sem o refresh, o indicador permanece com o valor anterior.

**Evidências**
https://jam.dev/c/db39aae4-d626-4dd4-a2e3-2e37c39c587c

---

### CT-033 — Validar que atividades Rejeitadas são contabilizadas como Resolvidas

**Status:** Bloqueado
**Prioridade:** Alta  
**Severidade:** Alta

**Objetivo:**  
Validar a regra de negócio que determina que atividades com status **Rejeitada** também são contabilizadas no card **Resolvidas**.

**Pré-condição:**

- Usuário autenticado.
- Existência de uma atividade pendente.
- Valor atual do card Resolvidas conhecido.

**Passos:**

1. Registrar o valor atual do card **Resolvidas**.
2. Localizar uma atividade com status Não Iniciada ou Em Andamento.
3. Alterar o status para **Rejeitada**.
4. Informar um motivo válido para a rejeição.
5. Confirmar.
6. Não recarregar a página.
7. Verificar novamente o card **Resolvidas**.

**Resultado esperado:**  
O total do card **Resolvidas** deve aumentar em 1, pois o indicador considera atividades **Resolvidas + Rejeitadas**.

**Resultado obtido:**  
Não foi possível executar o cenário, pois o sistema não permite alterar o status da atividade para **Rejeitada**. O impedimento já foi registrado no CT-023.

---

### CT-034 — Validar que atividade Não Iniciada é contabilizada como Pendente

**Status:** Sucesso
**Prioridade:** Alta  
**Severidade:** Alta

**Objetivo:**  
Validar se uma atividade com status **Não Iniciada** é contabilizada no card **Pendentes**.

**Pré-condição:**

- Usuário autenticado.
- Valor atual do card Pendentes conhecido.

**Passos:**

1. Registrar o valor atual do card **Pendentes**.
2. Cadastrar uma nova atividade com status **Não Iniciada**.
3. Concluir o cadastro.
4. Não recarregar a página.
5. Verificar novamente o card **Pendentes**.

**Resultado esperado:**  
O total do card **Pendentes** deve aumentar em 1.

**Resultado obtido:**  
O card **Pendentes** é atualizado corretamente após o cadastro de uma atividade com status **Não Iniciada**.

**Evidências**
https://jam.dev/c/1ccf26e7-89c8-4bec-811a-27960a2cfc3f

---

### CT-035 — Validar que atividade Em Andamento é contabilizada como Pendente

**Status:** Sucesso
**Prioridade:** Alta  
**Severidade:** Alta

**Objetivo:**  
Validar se atividades com status **Em Andamento** continuam sendo contabilizadas como pendentes.

**Pré-condição:**

- Usuário autenticado.
- Existência de uma atividade com status **Não Iniciada**.
- Valor atual do card Pendentes conhecido.

**Passos:**

1. Registrar o valor do card **Pendentes**.
2. Localizar uma atividade com status Não Iniciada.
3. Alterar o status para **Em Andamento**.
4. Não recarregar a página.
5. Verificar novamente o card Pendentes.

**Resultado esperado:**  
O total de **Pendentes deve permanecer inalterado**, pois tanto Não Iniciada quanto Em Andamento pertencem à classificação Pendentes.

**Resultado obtido:**  
Ao cadastrar uma nova atividade com status **Em Andamento**, o card **Pendentes** é atualizado corretamente. Ao alterar uma atividade de **Não Iniciada** para **Em Andamento**, a quantidade permanece inalterada, conforme esperado.

**Evidências**
https://jam.dev/c/1b0d1eef-338c-4467-9f3f-73f9c12feda5
https://jam.dev/c/a02832d7-be58-4bd8-ac4e-e038570d895e

---

### CT-036 — Validar classificação de atividade atrasada

**Status:** Sucesso
**Prioridade:** Alta  
**Severidade:** Alta

**Objetivo:**  
Validar se uma atividade pendente cujo prazo é anterior à data atual é contabilizada no card **Atrasadas**.

**Pré-condição:**

- Usuário autenticado.
- Possibilidade de cadastrar uma atividade com prazo anterior à data atual.
- Valor atual do card Atrasadas conhecido.

**Passos:**

1. Registrar o valor atual do card **Atrasadas**.
2. Cadastrar uma atividade com status **Não Iniciada**.
3. Informar um prazo anterior à data atual.
4. Salvar a atividade.
5. Não recarregar a página.
6. Verificar o card **Atrasadas**.

**Resultado esperado:**  
A atividade deve ser contabilizada como atrasada e o card **Atrasadas** deve aumentar em 1.

**Resultado obtido:**  
A atividade é contabilizada corretamente como atrasada, e a tabela também exibe a label **Atrasada** ao lado do prazo.

**Evidências**
https://www.loom.com/share/e226d6c5fb6f4291819bb3e538e4036d

---

### CT-037 — Validar remoção de atividade do card Atrasadas após resolução

**Status:** Falha
**Prioridade:** Alta  
**Severidade:** Alta

**Objetivo:**  
Validar se uma atividade atrasada deixa de ser contabilizada como atrasada quando seu status é alterado para **Resolvida**.

**Pré-condição:**

- Usuário autenticado.
- Existência de uma atividade com prazo anterior à data atual.
- Atividade com status Não Iniciada ou Em Andamento.
- Atividade atualmente contabilizada no card Atrasadas.

**Passos:**

1. Registrar o valor atual do card **Atrasadas**.
2. Localizar a atividade atrasada.
3. Alterar seu status para **Resolvida**.
4. Não recarregar a página.
5. Verificar novamente o card Atrasadas.

**Resultado esperado:**  
A atividade deve deixar de ser contabilizada como atrasada e o total do card **Atrasadas** deve diminuir em 1.

**Resultado obtido:**  
Após alterar o status da atividade para **Resolvida**, ela só deixa de ser contabilizada como atrasada depois que atualizamos a página, assim como o card **Atrasadas**. 

**Evidências**
https://www.loom.com/share/8d14ce4aed2d4465bb704ab87cb1d736

---

### CT-038 — Validar remoção de atividade do card Atrasadas após rejeição

**Status:** Bloqueado
**Prioridade:** Alta  
**Severidade:** Alta

**Objetivo:**  
Validar se uma atividade atrasada deixa de ser contabilizada como atrasada quando seu status é alterado para **Rejeitada**.

**Pré-condição:**

- Usuário autenticado.
- Existência de uma atividade atrasada com status Não Iniciada ou Em Andamento.

**Passos:**

1. Registrar o valor atual do card **Atrasadas**.
2. Localizar a atividade atrasada.
3. Alterar seu status para **Rejeitada**.
4. Informar o motivo da rejeição.
5. Confirmar a alteração.
6. Não recarregar a página.
7. Verificar novamente o card Atrasadas.

**Resultado esperado:**  
A atividade deve deixar de ser contabilizada como atrasada e o card **Atrasadas** deve diminuir em 1.

**Resultado obtido:**  
Não foi possível executar o cenário, pois o sistema não permite alterar o status da atividade para **Rejeitada**, conforme já registrado no CT-023.


