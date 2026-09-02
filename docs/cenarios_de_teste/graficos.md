### CT-039 — Validar percentual de atividades Cadastradas

**Status:** Sucesso
**Prioridade:** Média  
**Severidade:** Média

**Objetivo:**  
Validar o percentual apresentado para **Cadastradas** no gráfico.

**Pré-condição:**

- Usuário autenticado.
- Existência de pelo menos uma atividade cadastrada.
- Gráfico visível na tela.

**Passos:**

1. Verificar o total de atividades cadastradas.
2. Localizar a barra **Cadastradas** no gráfico.
3. Verificar o percentual apresentado.

**Resultado esperado:**  
A barra **Cadastradas** deve representar **100%**, pois corresponde ao total de atividades existentes.

**Resultado obtido:**  
A barra **Cadastradas** representa corretamente **100%**, correspondendo ao total de atividades existentes.

**Evidências**
![[Pasted image 20260830214727.png]]

---

### CT-040 — Validar cálculo percentual de Resolvidas no gráfico

**Status:** Bloqueado
**Prioridade:** Alta  
**Severidade:** Alta

**Objetivo:**  
Validar se o percentual de **Resolvidas** é calculado considerando atividades Resolvidas e Rejeitadas.

**Pré-condição:**

- Usuário autenticado.
- Existência de atividades em diferentes status.
- Quantidades conhecidas por status.

**Passos:**

1. Identificar o número total de atividades cadastradas.
2. Identificar a quantidade de atividades com status **Resolvida**.
3. Identificar a quantidade de atividades com status **Rejeitada**.
4. Calcular manualmente o percentual esperado.
5. Comparar o resultado com o percentual apresentado no gráfico.

**Resultado esperado:**  
Foi possível validar o cálculo considerando as atividades com status **Resolvida**. Para a massa utilizada, foram identificadas 2 atividades resolvidas em um total de 3 atividades:

`2 / 3 × 100 = 66,67% ≈ 67%`

O sistema apresenta corretamente **67%**.

Entretanto, não foi possível validar integralmente a regra que considera **Resolvidas + Rejeitadas**, pois o defeito identificado no CT-023 impede a alteração de atividades para o status **Rejeitada**.

**Evidências**
![[Pasted image 20260830215143.png]]

---

### CT-041 — Validar cálculo percentual de Pendentes no gráfico

**Status:** Sucesso
**Prioridade:** Alta  
**Severidade:** Alta

**Objetivo:**  
Validar se o percentual de **Pendentes** é calculado considerando atividades Não Iniciadas e Em Andamento.

**Pré-condição:**

- Usuário autenticado.
- Existência de atividades em diferentes status.
- Quantidades conhecidas por status.

**Passos:**

1. Identificar o número total de atividades.
2. Identificar quantas estão com status **Não Iniciada**.
3. Identificar quantas estão com status **Em Andamento**.
4. Calcular manualmente o percentual esperado.
5. Comparar o resultado com o percentual apresentado no gráfico.

**Resultado esperado:**  
O percentual exibido para as atividades **Pendentes** é de **60%**, correspondendo corretamente à soma das atividades com status **Não Iniciada** e **Em Andamento**.

`(1 + 2) / 5 × 100 = 60%`

**Evidências**
![[Pasted image 20260830215906.png]]

---

### CT-042 — Validar atualização automática do gráfico

**Status:** Falha
**Prioridade:** Alta  
**Severidade:** Alta

**Objetivo:**  
Validar se os percentuais do gráfico são recalculados automaticamente após uma alteração nos dados.

**Pré-condição:**

- Usuário autenticado.
- Existência de atividades em diferentes status.
- Gráfico visível na tela.

**Passos:**

1. Registrar os percentuais atuais apresentados no gráfico.
2. Registrar o total de atividades por status.
3. Alterar uma atividade de **Não Iniciada** para **Resolvida**.
4. Não atualizar manualmente a página.
5. Observar os percentuais apresentados no gráfico.
6. Calcular manualmente os novos percentuais.
7. Comparar os valores calculados com os apresentados pela aplicação.

**Resultado esperado:**  
O gráfico deve ser atualizado automaticamente, sem necessidade de recarregar a página.

O percentual de **Resolvidas** deve aumentar e o percentual de **Pendentes** deve diminuir proporcionalmente, de acordo com o número total de atividades.

**Resultado obtido:**  
Após alterar o status de uma atividade para **Resolvida**, os percentuais apresentados no gráfico não são atualizados automaticamente. É necessário recarregar a página para que o gráfico reflita os novos valores.

**Evidências**
https://www.loom.com/share/7964a4346a3c45f69ca33d3ea40841cd