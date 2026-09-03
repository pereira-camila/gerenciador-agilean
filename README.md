# Gerenciador de Atividades — Automação de Testes E2E

Projeto desenvolvido como parte de um desafio técnico de **Quality Assurance**, com o objetivo de realizar o planejamento, execução e automação de testes para uma aplicação de gerenciamento de atividades.

A solução contempla a documentação dos cenários de teste, automação dos fluxos priorizados utilizando Cypress e TypeScript e geração de relatórios de execução com Mochawesome.

---

## Objetivo

O objetivo deste projeto é validar as principais funcionalidades e regras de negócio da aplicação Gerenciador de Atividades, utilizando testes funcionais e automação E2E.

A estratégia adotada prioriza:

- cenários críticos para o funcionamento da aplicação;
- principais regras de negócio;
- validações de campos e dados;
- fluxos com maior valor para testes de regressão;
- independência e reutilização dos testes;
- legibilidade e manutenção da automação.

Nem todos os cenários documentados foram automatizados. A automação foi direcionada aos cenários considerados mais relevantes para cobertura de regressão, mantendo os demais documentados para execução manual.
Os cenários que falharam manualmente não foram incluídos no plano de automação.

---

## Tecnologias utilizadas

- **Cypress 15**
- **TypeScript**
- **Node.js**
- **npm**
- **dotenv**
- **Mochawesome**
- **Mochawesome Merge**
- **Mochawesome Report Generator**
- **Husky**
- **Commitlint**
- **Git / GitHub**

---

## Estrutura do projeto

```text
gerenciador-agilean/
│
├── cypress/
│   ├── e2e/
│   │   └── activities/
│   │       ├── activitiesActions.cy.ts
│   │       ├── activitiesTable.cy.ts
│   │       ├── activityRegistration.cy.ts
│   │       ├── cards.cy.ts
│   │       ├── charts.cy.ts
│   │       ├── logout.cy.ts
│   │       └── responsibleRegistration.cy.ts
│   │
│   ├── factories/
│   │   └── responsibleFactory.ts
│   │
│   ├── locators/
│   │   ├── activityTable.ts
│   │   ├── cardsAndCharts.ts
│   │   ├── createActivity.ts
│   │   └── loginPage.ts
│   │
│   └── support/
│       ├── commands.ts
│       └── e2e.ts
│
├── docs/
│   └── cenarios_de_teste/
│       ├── açõesDaAtividade.md
│       ├── cadastroDeAtividades.md
│       ├── cadastroDeResponsável.md
│       ├── cardsDeResumo.md
│       ├── graficos.md
│       ├── logout.md
│       ├── tabelaDeAtividades.md
│       └── sugestoes-de-melhoria.pdf
│
├── .env.example
├── .gitignore
├── commitlint.config.js
├── cypress.config.ts
├── LICENSE
├── package.json
├── package-lock.json
├── README.md
└── tsconfig.json
```

---

## Organização da automação

Os testes foram separados por funcionalidade para facilitar a leitura, manutenção e execução da suíte.

### Cadastro de atividades

Arquivo:

```text
cypress/e2e/activities/activityRegistration.cy.ts
```

Contém cenários relacionados ao cadastro de atividades, incluindo:

- cadastro com dados válidos;
- validação de campos obrigatórios;
- limite máximo do campo Atividade;
- opções disponíveis para Status;
- opções disponíveis para Prioridade.

### Cadastro de responsáveis

Arquivo:

```text
cypress/e2e/activities/responsibleRegistration.cy.ts
```

Contém validações relacionadas ao cadastro de responsáveis, como:

- cadastro de responsável;
- obrigatoriedade do nome;
- validações de e-mail;
- obrigatoriedade do e-mail;
- obrigatoriedade do telefone.

### Tabela de atividades

Arquivo:

```text
cypress/e2e/activities/activitiesTable.cy.ts
```

Responsável pelas validações relacionadas à estrutura e ao comportamento da tabela de atividades.

### Ações sobre atividades

Arquivo:

```text
cypress/e2e/activities/activitiesActions.cy.ts
```

Contém os cenários relacionados às ações disponíveis para uma atividade, incluindo exclusão e demais comportamentos associados ao gerenciamento dos registros.

### Cards de resumo

Arquivo:

```text
cypress/e2e/activities/cards.cy.ts
```

Contém validações relacionadas aos indicadores apresentados nos cards da aplicação, incluindo atividades cadastradas, pendentes e atrasadas.

### Gráficos

Arquivo:

```text
cypress/e2e/activities/charts.cy.ts
```

Responsável pelas validações dos dados e percentuais apresentados nos gráficos.

### Logout

Arquivo:

```text
cypress/e2e/activities/logout.cy.ts
```

Valida o encerramento da sessão através da funcionalidade de logout.

---

## Cenários de teste

Além da automação, os cenários de teste foram documentados separadamente em:

```text
docs/cenarios_de_teste/
```

A documentação está dividida por funcionalidade:

- Cadastro de Atividades;
- Cadastro de Responsáveis;
- Tabela de Atividades;
- Ações da Atividade;
- Cards de Resumo;
- Gráficos;
- Logout.

Os documentos contêm informações como:

- ID;
- cenário;
- prioridade;
- severidade;
- pré-condições;
- passos;
- dados de teste;
- resultado esperado;
- resultado obtido;
- status.

Também foi elaborado um documento separado com **sugestões de melhoria** identificadas durante os testes exploratórios da aplicação.

---

# Configuração do projeto

## Pré-requisitos

Para executar o projeto localmente é necessário possuir:

- Node.js;
- npm;
- Git.

---

## Clonando o projeto

```bash
git clone https://github.com/pereira-camila/gerenciador-agilean.git
```

Acesse o diretório:

```bash
cd gerenciador-agilean
```

---

## Instalando as dependências

Execute:

```bash
npm install
```

As dependências necessárias serão instaladas a partir do `package.json`.

---

# Variáveis de ambiente

As informações de ambiente e autenticação não são versionadas no repositório.

O projeto disponibiliza o arquivo:

```text
.env.example
```

Crie um arquivo `.env` na raiz do projeto seguindo esta estrutura:

```env
BASE_URL=
EMAIL=
PASSWORD=
```

Preencha com os dados do ambiente utilizado para os testes.

Exemplo:

```env
BASE_URL=https://endereco-da-aplicacao.com
EMAIL=usuario@exemplo.com
PASSWORD=senha
```

> O arquivo `.env` está incluído no `.gitignore` para evitar o versionamento de credenciais e informações sensíveis.

O projeto valida a existência das variáveis necessárias antes da execução. Caso alguma delas não esteja configurada, a execução será interrompida com uma mensagem informando quais configurações são necessárias.

---

# Executando os testes

## Cypress em modo interativo

Para abrir a interface do Cypress:

```bash
npm start
```

Esse comando executa:

```bash
cypress open
```

A partir da interface é possível selecionar e executar individualmente os arquivos de teste.

---

## Executando a suíte em modo headless

Para executar todos os testes:

```bash
npm run cy:run
```

Esse comando executa:

```bash
cypress run
```

---

## Execução limpa da suíte

Para remover relatórios anteriores antes de iniciar uma nova execução:

```bash
npm run test:run
```

Esse comando executa:

```text
Limpeza dos relatórios anteriores
        ↓
Execução da suíte Cypress
        ↓
Geração dos novos resultados
```

Equivalente a:

```bash
npm run clean:reports && npm run cy:run
```

---

# Relatórios de execução

O projeto utiliza **Mochawesome** para geração dos relatórios dos testes automatizados.

Durante a execução são gerados arquivos JSON individuais contendo os resultados dos testes.

Os artefatos são organizados em:

```text
reports/
├── json/
├── screenshots/
├── videos/
└── html/
```

A pasta `reports/` não é versionada no Git, pois contém artefatos gerados automaticamente durante as execuções.

---

## Gerando o relatório HTML

Após executar os testes:

```bash
npm run report
```

O comando realiza:

1. merge dos arquivos JSON gerados pelo Mochawesome;
2. criação de um relatório consolidado;
3. geração do relatório HTML.

O arquivo final poderá ser encontrado em:

```text
reports/html/index.html
```

O relatório contém informações como:

- quantidade de testes executados;
- testes aprovados;
- testes que apresentaram falha;
- duração da execução;
- suites executadas;
- detalhes de cada cenário.

---

## Fluxo recomendado para execução completa

Para realizar uma execução limpa e gerar um novo relatório:

```bash
npm run test:run
```

Após finalizar a execução:

```bash
npm run report
```

Assim, relatórios de execuções anteriores não são considerados no novo resultado.

---

# Screenshots e vídeos

O Cypress está configurado para armazenar os artefatos de execução dentro da pasta de relatórios.

Vídeos:

```text
reports/videos/
```

Screenshots:

```text
reports/screenshots/
```

Esses arquivos podem auxiliar na análise de eventuais falhas encontradas durante a execução automatizada.

---

# Estratégia de locators

Os seletores da aplicação foram centralizados em:

```text
cypress/locators/
```

Exemplo:

```text
activityTable.ts
cardsAndCharts.ts
createActivity.ts
loginPage.ts
```

Essa abordagem evita espalhar seletores diretamente pelos arquivos de teste e facilita a manutenção caso algum elemento da interface seja alterado.

Sempre que disponíveis, foram priorizados atributos destinados à automação, como:

```text
data-cy
```

Para elementos cujo identificador possui uma parte dinâmica, foram utilizados seletores que não dependem diretamente do índice do registro.

Exemplo:

```ts
button[data-cy$="-btn-menu"]
```

Dessa forma, a automação não fica vinculada exclusivamente a registros como `atividade-0`, tornando os testes menos dependentes da posição das linhas na tabela.

---

# Custom Commands

Ações reutilizadas em diferentes cenários foram centralizadas em:

```text
cypress/support/commands.ts
```

Entre elas estão operações relacionadas a:

- autenticação;
- cadastro de atividades;
- cadastro de responsáveis;
- limpeza das atividades;
- manipulação de elementos da tabela;
- sincronização necessária da interface.

A utilização de Custom Commands reduz duplicação de código e mantém os arquivos de teste focados no comportamento que está sendo validado.

---

# Massa de dados dinâmica

Para evitar dependência de responsáveis previamente cadastrados no ambiente, foi criada uma factory:

```text
cypress/factories/responsibleFactory.ts
```

Ela gera responsáveis com identificadores únicos durante a execução.

Exemplo de estratégia utilizada:

```ts
const uniqueId = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
```

A partir desse identificador são gerados dados únicos, como nome e e-mail.

Essa abordagem reduz:

- colisão entre dados de diferentes execuções;
- dependência de massa previamente cadastrada;
- falhas causadas pela reutilização de registros;
- acoplamento dos testes ao estado inicial do ambiente.

---

# Sincronização da interface

Durante a automação foi identificado que algumas operações da interface necessitam de um pequeno período para estabilização antes da próxima interação.

Para evitar a repetição de esperas diretamente nos arquivos de teste, essa necessidade foi centralizada em um Custom Command.

Isso mantém a estratégia de sincronização em um único ponto e facilita futuras alterações caso o comportamento da aplicação seja otimizado.

---

# Segurança

Algumas medidas foram adotadas para evitar exposição de informações sensíveis no projeto.

### Credenciais

Credenciais são carregadas através de variáveis de ambiente:

```env
EMAIL=
PASSWORD=
```

O arquivo `.env` não é versionado.

### Senha no Cypress Command Log

A digitação da senha é realizada sem registrar seu conteúdo no log do Cypress.

Exemplo:

```ts
cy.get(loginPage.passwordInput).type(Cypress.env("password"), {
  log: false,
});
```

### Arquivos ignorados pelo Git

Arquivos gerados localmente e informações sensíveis são protegidos através do `.gitignore`, incluindo:

```text
node_modules/
.env
reports/
```

---

# Padronização de commits

O projeto utiliza **Husky** e **Commitlint** para auxiliar na padronização das mensagens de commit.

O Commitlint utiliza o padrão **Conventional Commits**.

Exemplos:

```text
feat: add activity registration tests
test: add chart validation scenarios
fix: adjust activity locator
docs: update project documentation
chore: configure mochawesome reporter
```

Essa padronização facilita a leitura e manutenção do histórico do repositório.

---

# Decisões técnicas

## Cypress + TypeScript

O Cypress foi utilizado para automação dos testes E2E por oferecer uma boa integração com aplicações web, mecanismos automáticos de retry e ferramentas de depuração durante a execução.

O TypeScript foi utilizado para aumentar a segurança durante o desenvolvimento da automação através de tipagem e melhor suporte da IDE.

## Separação dos testes por funcionalidade

Os arquivos `.cy.ts` foram divididos por responsabilidade para evitar specs extensos e facilitar a identificação dos testes relacionados a cada funcionalidade.

## Centralização de locators

Os locators foram separados dos cenários para reduzir duplicação e facilitar futuras alterações na interface.

## Custom Commands

Fluxos reutilizáveis foram abstraídos em comandos Cypress para evitar repetição e melhorar a legibilidade dos testes.

## Factory para dados dinâmicos

Responsáveis utilizados durante os testes são gerados dinamicamente para reduzir dependência do estado anterior da aplicação.

## Mochawesome

O Mochawesome foi utilizado para disponibilizar um relatório consolidado e de fácil leitura dos resultados da automação.

## Automação baseada em prioridade

A estratégia adotada não teve como objetivo automatizar todos os cenários documentados.

Foram priorizados cenários com maior relevância para regressão, regras de negócio e fluxos críticos da aplicação.

Os demais cenários permanecem documentados para execução manual.

---

# Sugestões de melhoria

Durante os testes também foram identificadas oportunidades de evolução da aplicação.

As sugestões foram documentadas separadamente em:

```text
docs/cenarios_de_teste/sugestoes-de-melhoria.pdf
```

O objetivo desse documento é registrar oportunidades observadas durante a exploração do sistema sem classificá-las necessariamente como defeitos dos requisitos atuais.

---

# Comandos disponíveis

| Comando | Descrição |
|---|---|
| `npm start` | Abre o Cypress em modo interativo |
| `npm run cy:run` | Executa toda a suíte Cypress |
| `npm run clean:reports` | Remove relatórios de execuções anteriores |
| `npm run test:run` | Limpa os relatórios e executa a suíte |
| `npm run merge:reports` | Consolida os arquivos JSON do Mochawesome |
| `npm run generate:report` | Gera o relatório HTML |
| `npm run report` | Consolida os resultados e gera o relatório final |

---

# Considerações finais

O projeto foi estruturado buscando equilibrar **cobertura de testes, legibilidade, reutilização e facilidade de manutenção**.

Além da execução automatizada, foram mantidos os cenários funcionais documentados, permitindo visualizar tanto a estratégia de testes adotada quanto os cenários selecionados para automação.

A automação foi tratada como uma camada complementar ao planejamento de testes, priorizando cenários relevantes para regressão em vez de simplesmente automatizar toda a documentação existente.

---

## Licença

Este projeto está disponibilizado sob a licença **MIT**.