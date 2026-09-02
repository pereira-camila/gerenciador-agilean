### CT-024 — Abrir edição de uma atividade

**Status:** Falha
**Prioridade:** Alta  
**Severidade:** Média

**Objetivo:**  
Validar a abertura do modal de edição e o carregamento dos dados atuais da atividade.

**Pré-condição:**

- Usuário autenticado.
- Existência de pelo menos uma atividade cadastrada.

**Passos:**

1. Localizar uma atividade na tabela.
2. Acessar a opção **Editar** na coluna **Ações**.
3. Observar a abertura do modal de edição.
4. Comparar os dados apresentados no modal com os dados da atividade selecionada.

**Resultado esperado:**  
O sistema deve abrir o modal de edição com os dados atuais da atividade previamente preenchidos nos respectivos campos.

**Resultado obtido:**  
Durante o acesso à opção **Editar**, foram identificados os seguintes comportamentos inesperados no menu de ações:

- O menu é aberto para baixo e ultrapassa o limite inferior do container da tabela, fazendo com que parte das opções fique cortada ou oculta.
- Ao abrir o menu de ações de uma atividade e, em seguida, abrir o menu de outra atividade, o menu anteriormente aberto não é fechado.

**Evidências**
https://jam.dev/c/2f34fcb4-14b2-402d-b358-f02fef8c5279
![[Pasted image 20260830103553.png]]

---

### CT-025 — Validar opções de status disponíveis na edição

**Status:** Sucesso
**Prioridade:** Média  
**Severidade:** Média

**Objetivo:**  
Validar os status disponíveis ao editar uma atividade existente.

**Pré-condição:**

- Usuário autenticado.
- Existência de uma atividade cadastrada.
- Modal de edição aberto.

**Passos:**

1. Abrir a edição de uma atividade.
2. Localizar o campo **Status**.
3. Abrir o seletor de status.
4. Verificar todas as opções apresentadas.

**Resultado esperado:**  
O campo Status deve apresentar as quatro opções:

- **Não Iniciada**
- **Em Andamento**
- **Resolvida**
- **Rejeitada**

**Resultado obtido:**  
O campo **Status** apresenta as quatro opções esperadas: **Não Iniciada, Em Andamento, Resolvida e Rejeitada**.

**Evidências**
![[Pasted image 20260830110430.png]]

---

### CT-026 — Editar os dados de uma atividade

**Status:** Falha
**Prioridade:** Alta  
**Severidade:** Alta

**Objetivo:**  
Validar a alteração dos dados de uma atividade já cadastrada.

**Pré-condição:**

- Usuário autenticado.
- Existência de uma atividade cadastrada.

**Passos:**

1. Localizar uma atividade na tabela.
2. Acessar a opção **Editar**.
3. Alterar os dados da atividade.
4. Salvar as alterações.
5. Localizar novamente a atividade na tabela.
6. Comparar os dados apresentados com os novos valores informados.

**Resultado esperado:**  
As alterações devem ser salvas com sucesso e os novos dados devem ser apresentados corretamente na tabela.

**Resultado obtido:**  
As alterações são salvas corretamente e os novos dados são apresentados na tabela. Entretanto, ao acessar a opção **Editar**, o modal é aberto com o campo **Prazo** vazio, em vez de apresentar o prazo atualmente cadastrado para a atividade.

**Evidências**
https://jam.dev/c/58e1c009-c555-4b92-9b48-548eaec3b1df

---

### CT-027 — Duplicar uma atividade

**Status:** Falha
**Prioridade:** Alta  
**Severidade:** Alta

**Objetivo:**  
Validar a funcionalidade de duplicação de uma atividade existente.

**Pré-condição:**

- Usuário autenticado.
- Existência de uma atividade cadastrada com dados conhecidos.

**Passos:**

1. Localizar uma atividade na tabela.
2. Registrar os dados da atividade original.
3. Acessar a opção **Duplicar** na coluna Ações.
4. Executar a duplicação.
5. Verificar a tabela após a operação.
6. Localizar a nova atividade criada.
7. Comparar seus dados com os da atividade original.

**Resultado esperado:**  
Uma nova atividade deve ser criada contendo os mesmos dados da atividade original, conforme a regra de duplicação.

**Resultado obtido:**  
A atividade é duplicada, porém o campo **Responsável** fica vazio na nova atividade. Conforme a regra de duplicação, a atividade duplicada deveria manter os mesmos dados da atividade original, exceto pelo status, que deve ser definido como **Não Iniciada**.

**Evidências**
https://jam.dev/c/322209ef-3b5c-4e92-9d37-21c636ca8d52
https://jam.dev/c/2b431212-a08c-426e-b9b1-834a7662c82a

---

### CT-028 — Validar status da atividade duplicada

**Status:** Sucesso
**Prioridade:** Alta  
**Severidade:** Média

**Objetivo:**  
Validar se uma atividade duplicada é criada com o status **Não Iniciada**, independentemente do status da atividade original.

**Pré-condição:**

- Usuário autenticado.
- Existência de uma atividade com status diferente de **Não Iniciada**.

**Passos:**

1. Localizar uma atividade com status **Em Andamento**, **Resolvida** ou **Rejeitada**.
2. Registrar o status atual da atividade.
3. Acessar a opção **Duplicar**.
4. Executar a duplicação.
5. Localizar a nova atividade criada.
6. Verificar o status da atividade duplicada.

**Resultado esperado:**  
A nova atividade deve ser criada com status **Não Iniciada**, mesmo que a atividade original possua outro status.

**Resultado obtido:**  
A nova atividade é criada corretamente com o status **Não Iniciada**.

**Evidências**
https://jam.dev/c/2b431212-a08c-426e-b9b1-834a7662c82a

---

### CT-029 — Excluir uma atividade

**Status:** Sucesso
**Prioridade:** Alta  
**Severidade:** Alta

**Objetivo:**  
Validar a exclusão de uma atividade cadastrada.

**Pré-condição:**

- Usuário autenticado.
- Existência de pelo menos uma atividade cadastrada.

**Passos:**

1. Localizar uma atividade na tabela.
2. Registrar os dados que permitam identificá-la.
3. Acessar a opção **Excluir** na coluna Ações.
4. Executar a exclusão.
5. Verificar a tabela após a operação.
6. Procurar pela atividade excluída.

**Resultado esperado:**  
A atividade deve ser removida imediatamente da lista e não deve mais ser apresentada na tabela.

**Resultado obtido:**  
A atividade é removida imediatamente da lista e não é mais apresentada na tabela.

**Evidências**
https://jam.dev/c/0116e1a6-a5d3-45c1-a8d1-43348a4b7b58

---

### CT-030 — Validar atualização dos indicadores após excluir uma atividade

**Status:** Sucesso
**Prioridade:** Alta  
**Severidade:** Alta

**Objetivo:**  
Validar se os indicadores da aplicação refletem corretamente a exclusão de uma atividade.

**Pré-condição:**

- Usuário autenticado.
- Existência de atividades cadastradas.
- Existência de uma atividade específica para exclusão.
- Valores atuais dos indicadores conhecidos antes da operação.

**Passos:**

1. Registrar o total apresentado no card **Cadastradas**.
2. Registrar os demais indicadores relacionados ao status da atividade que será excluída.
3. Registrar os percentuais apresentados no gráfico.
4. Localizar a atividade que será utilizada no teste.
5. Excluir a atividade.
6. Não recarregar a página.
7. Verificar novamente os cards.
8. Verificar novamente o gráfico.

**Resultado esperado:**  
Após a exclusão, os indicadores devem refletir a quantidade atual de atividades.

Considerando o exemplo de uma atividade **Não Iniciada**:

- O total de **Cadastradas** deve diminuir em 1.
- O total de **Pendentes** deve diminuir em 1.
- Os percentuais do gráfico devem ser recalculados com base no novo total de atividades.

Caso a atividade excluída pertença a outra classificação, os indicadores correspondentes devem ser recalculados de acordo com as regras definidas no requisito.

**Resultado obtido:**  
Após a exclusão da atividade, os cards e o gráfico são atualizados corretamente, refletindo os novos totais conforme as regras definidas no resultado esperado.

**Evidências**
https://jam.dev/c/600a0747-0bb1-4d2a-b5e7-9a7053d2aebb