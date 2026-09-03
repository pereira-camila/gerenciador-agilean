### CT-007 — Abrir cadastro de responsável pelo botão “+”

**Status:** Sucesso
**Prioridade:** Média  
**Severidade:** Média

**Objetivo:**  
Validar o acesso ao formulário de cadastro de um novo responsável a partir do cadastro de atividade.

**Pré-condição:**

- Usuário autenticado.
- Modal de cadastro de atividade aberto.

**Passos:**

1. Localizar o campo **Responsável**.
2. Clicar no botão **“+”** ao lado do campo.
3. Observar o comportamento da aplicação.

**Resultado esperado:**  
O sistema deve exibir o formulário/modal de cadastro de responsável.

**Resultado obtido:**  
Ao clicar no botão **“+”**, o formulário de cadastro de responsável é exibido corretamente.

**Evidências**
https://jam.dev/c/e446b62f-0a2c-4bec-8468-e83077bfbbbe

---

### CT-008 — Cadastrar responsável com dados válidos

**Status:** Sucesso
**Prioridade:** Alta  
**Severidade:** Alta

**Objetivo:**  
Validar o cadastro de um novo responsável utilizando dados válidos.

**Pré-condição:**

- Usuário autenticado.
- Modal de cadastro de atividade aberto.
- Formulário de cadastro de responsável aberto.

**Passos:**

1. Preencher o campo **Nome**.
2. Preencher o campo **E-mail** com um endereço válido.
3. Preencher o campo **Telefone** no formato esperado.
4. Salvar o cadastro.

**Resultado esperado:**  
O responsável é cadastrado com sucesso utilizando dados válidos.

**Resultado obtido:**  
O responsável é cadastrado com sucesso utilizando dados válidos.

**Observações:**
- O sistema permite o cadastro de nome duplicado, o que pode acabar confundindo quem estiver selecionando um responsável posteriormente.
 - A modal abre com o cache do último responsável cadastrado quando cadastramos vários responsáveis consecutivamente.

**Evidências**
https://jam.dev/c/c92ecf68-2d0f-4649-b8e8-d5d338a1699e

---

### CT-009 — Validar seleção automática do responsável após cadastro

**Status:** Falha
**Prioridade:** Alta  
**Severidade:** Alta

**Objetivo:**  
Validar se um responsável recém-cadastrado é automaticamente selecionado no campo **Responsável** da atividade.

**Pré-condição:**

- Usuário autenticado.
- Modal de cadastro de atividade aberto.
- Formulário de responsável aberto.

**Passos:**

1. Cadastrar um novo responsável com dados válidos.
2. Salvar o responsável.
3. Retornar ao formulário de cadastro da atividade.
4. Observar o campo **Responsável**.

**Resultado esperado:**  
O responsável recém-cadastrado deve aparecer automaticamente selecionado no campo **Responsável** da atividade.

**Resultado obtido:**  
O responsável é cadastrado com sucesso, porém não é selecionado automaticamente no campo **Responsável** da atividade.

**Evidências**
https://jam.dev/c/d5a4846f-23f6-4a27-bb53-e3cfade3bba5

---

### CT-010 — Validar obrigatoriedade do campo Nome

**Status:** Sucesso
**Prioridade:** Alta  
**Severidade:** Média

**Objetivo:**  
Tentar cadastrar um responsável sem preencher o campo **Nome**.

**Pré-condição:**

- Formulário de cadastro de responsável aberto.

**Passos:**

1. Manter o campo **Nome** vazio.
2. Preencher o campo **E-mail** com valor válido.
3. Preencher o campo **Telefone** com valor válido.
4. Tentar salvar.

**Resultado esperado:**  
O sistema deve impedir o cadastro e apresentar uma mensagem de validação referente ao campo **Nome**.

**Resultado obtido:**  
O sistema impede o cadastro sem o preenchimento do campo **Nome** e apresenta uma mensagem de validação referente à sua obrigatoriedade.

**Evidências**
https://jam.dev/c/00316793-7666-4728-8440-72940a4957c0

---

### CT-011 — Validar comportamento do campo Nome acima de 50 caracteres

**Status:** Sucesso
**Prioridade:** Média  
**Severidade:** Média

**Objetivo:**  
Tentar informar um nome com mais de 50 caracteres.

**Pré-condição:**

- Formulário de cadastro de responsável aberto.

**Passos:**

1. Localizar o campo **Nome**.
2. Informar um texto contendo mais de 50 caracteres.
3. Observar o comportamento do campo.

**Resultado esperado:**  
O sistema deve respeitar o limite máximo de 50 caracteres, impedindo a entrada excedente.

**Resultado obtido:**  
O sistema impede a inserção de caracteres adicionais após o campo **Nome** atingir o limite máximo de 50 caracteres.

**Evidências**
https://jam.dev/c/ea8c945e-263d-4469-bb4a-ad56156bbf15

---

### CT-012 — Validar formato inválido de e-mail

**Status:** Sucesso
**Prioridade:** Alta  
**Severidade:** Média

**Objetivo:**  
Tentar cadastrar um responsável utilizando um e-mail em formato inválido.

**Pré-condição:**

- Formulário de cadastro de responsável aberto.

**Passos:**

1. Preencher o campo **Nome** com valor válido.
2. Informar um endereço inválido no campo **E-mail**.
3. Preencher o campo **Telefone** com valor válido.
4. Tentar salvar.

**Resultado esperado:**  
O sistema deve impedir o cadastro e apresentar uma validação indicando que o e-mail informado não possui formato válido.

**Resultado obtido:**  
O sistema impede o cadastro quando um e-mail em formato inválido é informado e apresenta uma mensagem de validação referente ao campo **E-mail**.

**Evidências**
https://jam.dev/c/857a334f-82c6-49a1-8707-89264f422b51

---

### CT-013 — Validar obrigatoriedade do campo E-mail

**Status:** Sucesso
**Prioridade:** Alta  
**Severidade:** Média

**Objetivo:**  
Tentar cadastrar um responsável sem informar o e-mail.

**Pré-condição:**

- Formulário de cadastro de responsável aberto.

**Passos:**

1. Preencher o campo **Nome**.
2. Manter o campo **E-mail** vazio.
3. Preencher o campo **Telefone**.
4. Tentar salvar.

**Resultado esperado:**  
O sistema deve impedir o cadastro e apresentar uma mensagem de validação referente ao campo **E-mail**.

**Resultado obtido:**  
O sistema impede o cadastro quando o campo **E-mail** não é preenchido e apresenta uma mensagem de validação referente à sua obrigatoriedade.

**Evidências**
https://jam.dev/c/00316793-7666-4728-8440-72940a4957c0

---

### CT-014 — Validar telefone em formato válido

**Status:** Sucesso
**Prioridade:** Média  
**Severidade:** Média

**Objetivo:**  
Validar o preenchimento do telefone no formato especificado pelo requisito.

**Pré-condição:**

- Formulário de cadastro de responsável aberto.

**Passos:**

1. Preencher o campo **Nome** com valor válido.
2. Preencher o campo **E-mail** com valor válido.
3. Informar um telefone seguindo o formato esperado.
4. Salvar o cadastro.

**Resultado esperado:**  
O telefone deve ser aceito no formato `(00) 00000-0000` e o responsável deve poder ser cadastrado.

**Resultado obtido:**  
O telefone é aceito no formato `(00) 00000-0000` e o responsável é cadastrado com sucesso.

**Evidências**
https://jam.dev/c/c164cc47-c3cd-41c5-a78f-89d2d28b9cae

---

### CT-015 — Validar telefone em formato inválido

**Status:** Falha
**Prioridade:** Alta  
**Severidade:** Alta

**Objetivo:**  
Tentar cadastrar um responsável utilizando um telefone fora do formato especificado.

**Pré-condição:**

- Formulário de cadastro de responsável aberto.

**Passos:**

1. Preencher o campo **Nome** com valor válido.
2. Preencher o campo **E-mail** com valor válido.
3. Informar um telefone em formato diferente do esperado.
4. Tentar salvar.

**Resultado esperado:**  
O sistema deve validar o telefone conforme o formato definido no requisito "(00) 00000-0000", e impedir o cadastro quando o valor não atender à regra.

**Resultado obtido:**  
O sistema permite cadastrar o responsável utilizando um telefone fora do formato `(00) 00000-0000`, inclusive sem o nono dígito.

**Evidências**
https://jam.dev/c/1a5b467a-2e81-4c34-be30-ee233bd014e7

---

### CT-016 — Validar obrigatoriedade do campo Telefone

**Status:** Sucesso
**Prioridade:** Alta  
**Severidade:** Média

**Objetivo:**  
Tentar cadastrar um responsável sem informar o telefone.

**Pré-condição:**

- Formulário de cadastro de responsável aberto.

**Passos:**

1. Preencher o campo **Nome**.
2. Preencher o campo **E-mail**.
3. Não preencher o campo **Telefone**.
4. Tentar salvar.

**Resultado esperado:**  
O sistema deve impedir o cadastro e apresentar uma mensagem de validação referente ao campo **Telefone**.

**Resultado obtido:**  
O sistema impede o cadastro quando o campo **Telefone** não é preenchido e apresenta uma mensagem de validação referente à sua obrigatoriedade.

**Evidências**
https://jam.dev/c/00316793-7666-4728-8440-72940a4957c0
