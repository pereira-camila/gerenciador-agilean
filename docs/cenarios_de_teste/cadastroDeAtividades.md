### CT-001 — Cadastrar atividade com dados válidos

**Status:** Sucesso
**Prioridade:** Alta  
**Severidade:** Alta

**Objetivo:**  
Validar o cadastro de uma nova atividade preenchendo todos os campos obrigatórios com dados válidos.

**Pré-condição:**

- Usuário autenticado na aplicação.
- Pelo menos um responsável previamente cadastrado.

**Passos:**

1. Acessar a aplicação.
2. Clicar no botão **“Cadastrar Atividade”**.
3. Selecionar o status **“Não Iniciada”**.
4. Selecionar a prioridade **“Média”**.
5. Preencher o campo **Atividade**.
6. Selecionar um responsável.
7. Informar uma data futura válida no campo **Prazo**.
8. Salvar o cadastro.

**Resultado esperado:**  
A atividade deve ser cadastrada com sucesso e exibida na tabela com os dados informados.

**Resultado obtido:**  
A atividade é cadastrada com sucesso e exibida na tabela com os dados informados.

**Evidências**
https://jam.dev/c/3cd4e3f8-d40e-4651-b98c-fd34c011dc5f
![[Pasted image 20260829102252.png]]


---

### CT-002 — Validar campos obrigatórios no cadastro de atividade

**Status atual:** Sucesso 
**Prioridade:** Alta  
**Severidade:** Alta

**Objetivo:**  
Tentar cadastrar uma atividade sem preencher os campos obrigatórios.

**Pré-condição:**

- Usuário autenticado na aplicação.

**Passos:**

1. Clicar no botão **“Cadastrar Atividade”**.
2. Manter os campos obrigatórios sem preenchimento.
3. Tentar salvar a atividade.

**Resultado esperado:**  
O sistema deve impedir o salvamento e exibir mensagens de validação para os campos obrigatórios.

**Resultado obtido:**  
O sistema impede o cadastro da atividade e apresenta mensagens informando a obrigatoriedade dos campos, conforme esperado.

**Observação:**  
Foi identificada uma inconsistência visual no posicionamento da mensagem de validação do campo **Atividade**, que não está alinhada ao respectivo campo como as demais mensagens.

**Evidências**
https://jam.dev/c/05668f2d-bc67-49ae-a147-f5ce0a769955
![[Pasted image 20260829104535.png]]

---

### CT-003 — Validar limite máximo do campo Atividade

**Status:** Sucesso
**Prioridade:** Média  
**Severidade:** Média

**Objetivo:**  
Tentar preencher o campo **Atividade** com mais de 50 caracteres.

**Pré-condição:**

- Usuário autenticado.
- Modal de cadastro de atividade aberto.

**Passos:**

1. Localizar o campo **Atividade**.
2. Inserir um texto contendo mais de 50 caracteres.
3. Observar o comportamento do campo e do contador.

**Resultado esperado:**  
O sistema deve respeitar o limite máximo de 50 caracteres, impedindo a entrada de caracteres excedentes ou apresentando a validação correspondente.

**Resultado obtido:**  O sistema não permite a entrada de caracteres excedentes ao atingir o limite de 50 caracteres.

**Evidências**
https://jam.dev/c/74f5bca4-b4f7-499f-aa20-80f531472c3a

---
### CT-004 — Validar opções disponíveis no campo Status

**Status:** Sucesso
**Prioridade:** Alta  
**Severidade:** Média

**Objetivo:**  
Validar as opções de status disponíveis durante o cadastro de uma nova atividade.

**Pré-condição:**

- Usuário autenticado.
- Modal de cadastro de atividade aberto.

**Passos:**

1. Localizar o campo **Status**.
2. Abrir o dropdown.
3. Verificar as opções apresentadas.

**Resultado esperado:**  
Devem ser apresentadas somente as opções:

- **Não Iniciada**
- **Em Andamento**

**Resultado obtido:**  
As únicas opções apresentadas são **Não Iniciada** e **Em Andamento**, conforme esperado.

**Evidências**
![[Pasted image 20260829111835.png]]

---

### CT-005 — Validar opções disponíveis no campo Prioridade

**Status:** Sucesso
**Prioridade:** Média  
**Severidade:** Média

**Objetivo:**  
Validar as opções disponíveis no campo **Prioridade** durante o cadastro.

**Pré-condição:**

- Usuário autenticado.
- Modal de cadastro de atividade aberto.

**Passos:**

1. Localizar o campo **Prioridade**.
2. Abrir o dropdown.
3. Verificar as opções apresentadas.

**Resultado esperado:**  
Devem ser apresentadas as opções:

- **Baixa**
- **Média**
- **Alta**

**Resultado obtido:**  
As opções apresentadas são **Baixa**, **Média** e **Alta**.

Não encontrei erro de digitação ou concordância aqui.

**Evidências**
![[Pasted image 20260829112625.png]]

---

### CT-006 — Validar lista de responsáveis no cadastro da atividade

**Status:** Sucesso
**Prioridade:** Alta  
**Severidade:** Alta

**Objetivo:**  
Validar se os responsáveis previamente cadastrados são apresentados no campo **Responsável**.

**Pré-condição:**

- Usuário autenticado.
- Existência de pelo menos um responsável cadastrado.

**Passos:**

1. Abrir o cadastro de atividade.
2. Localizar o campo **Responsável**.
3. Abrir o dropdown.
4. Verificar os responsáveis apresentados.
5. Selecionar um dos responsáveis.

**Resultado esperado:**  
O campo deve apresentar a lista de responsáveis cadastrados e permitir a seleção de um deles.

**Resultado obtido:**  
O campo **Responsável** apresenta corretamente a lista de responsáveis cadastrados e permite a seleção de um deles.

**Evidências**
https://jam.dev/c/bfa4abaf-1c53-416b-a663-418a2a171022
![[Pasted image 20260829114537.png]]
