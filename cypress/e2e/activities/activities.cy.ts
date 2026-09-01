import { createActivityModal } from "../../locators/createActivity";

describe("Gerenciador de Atividades", () => {
  beforeEach(() => {
    cy.login();
  });

  it.only("CT-001 — Cadastrar atividade com dados válidos", () => {
    cy.get(createActivityModal.createActivityButton).click();
    cy.get(createActivityModal.activityNameInput).type(
      "Uma nova atividade de teste",
    );
    cy.get(createActivityModal.responsibleSelect).select("João");
    cy.get(createActivityModal.deadlineInput).type("2027-03-16");
    cy.get(createActivityModal.registerButton).click();
    cy.getCellByHeader(3, "#").should("contain.text", "4");
    cy.getCellByHeader(3, "Responsável").should("contain.text", "João");
    cy.getCellByHeader(3, "Atividade").should(
      "contain.text",
      "Uma nova atividade de teste",
    );
    cy.getCellByHeader(3, "Prazo").should("contain.text", "16/03/2027");
    cy.getCellByHeader(3, "Prioridade").should("contain.text", "Média");
    cy.getCellByHeader(3, "Status").should("contain.text", "Não Iniciada");
  });

  /* it("CT-002 — Validar campos obrigatórios no cadastro de atividade", () => {
    openActivityModal();

    cy.contains("button", "Salvar").click();
    cy.contains("body", /obrigat|required|campo obrigatório/i).should("exist");
  });

  it("CT-003 — Validar limite máximo do campo Atividade", () => {
    openActivityModal();

    const longText = "A".repeat(60);
    getFieldByLabel("Atividade").clear().type(longText, { delay: 0 });

    getFieldByLabel("Atividade")
      .invoke("val")
      .then((value) => {
        expect(String(value)).to.have.length.of.at.most(50);
      });
  });

  it("CT-004 — Validar opções disponíveis no campo Status", () => {
    openActivityModal();

    getFieldByLabel("Status").then(($select) => {
      const options = Array.from($select[0].options)
        .map((option) => option.textContent?.trim())
        .filter((text): text is string => Boolean(text));

      expect(options).to.deep.equal(["Não Iniciada", "Em Andamento"]);
    });
  });

  it("CT-005 — Validar opções disponíveis no campo Prioridade", () => {
    openActivityModal();

    getFieldByLabel("Prioridade").then(($select) => {
      const options = Array.from($select[0].options)
        .map((option) => option.textContent?.trim())
        .filter((text): text is string => Boolean(text));

      expect(options).to.deep.equal(["Baixa", "Média", "Alta"]);
    });
  });

  it("CT-006 — Validar lista de responsáveis no cadastro da atividade", () => {
    openActivityModal();

    getFieldByLabel("Responsável").then(($select) => {
      const options = Array.from($select[0].options)
        .map((option) => option.textContent?.trim())
        .filter((text): text is string => Boolean(text));

      expect(options.length).to.be.greaterThan(0);
      expect(options[0]).to.not.equal("");
    });

    getFieldByLabel("Responsável").select(1);
    getFieldByLabel("Responsável").should("not.have.value", "");
  }); */
});
