import { createActivity } from "../../locators/createActivity";

describe("Cadastro de responsáveis", () => {
  beforeEach(() => {
    cy.login();
    cy.intercept("POST", "/rest/v1/atividades?select=*").as(
      "createActivityRequest",
    );
    cy.intercept("POST", "/rest/v1/responsaveis?select=*").as(
      "createResponsibleRequest",
    );

    cy.deleteAllActivities();
  });

  it("CT-008 — Cadastrar responsável com dados válidos", () => {
    const responsibleName = `Automação de teste ${Date.now()}`;

    cy.get(createActivity.createActivityButton).click();
    cy.get(createActivity.responsibleAddButton).click();
    cy.get(createActivity.responsibleModal).should("exist");
    cy.get(createActivity.responsibleNameInput).type(responsibleName);
    cy.get(createActivity.responsibleEmailInput).type("automacao@teste.com");
    cy.get(createActivity.responsiblePhoneInput).type("(85) 99999-9999");
    cy.get(createActivity.responsibleSaveButton).click();

    cy.wait("@createResponsibleRequest")
      .its("response.statusCode")
      .should("eq", 201);

    cy.get(createActivity.responsibleSelect).select(responsibleName);
    cy.get(createActivity.responsibleSelect)
      .find("option:selected")
      .should("contain.text", responsibleName);
  });

  it("CT-009 — Validar seleção automática do responsável após cadastro", () => {
    const responsibleName = `Automação de teste ${Date.now()}`;

    cy.get(createActivity.createActivityButton).click();
    cy.get(createActivity.responsibleAddButton).click();
    cy.get(createActivity.responsibleModal).should("exist");
    cy.get(createActivity.responsibleNameInput).type(responsibleName);
    cy.get(createActivity.responsibleEmailInput).type("automacao@teste.com");
    cy.get(createActivity.responsiblePhoneInput).type("(85) 99999-9999");
    cy.get(createActivity.responsibleSaveButton).click();

    cy.get(createActivity.responsibleSelect)
      .find("option:selected")
      .should("contain.text", responsibleName);
  });

  it("CT-010 — Validar obrigatoriedade do campo Nome", () => {
    cy.get(createActivity.createActivityButton).click();
    cy.get(createActivity.responsibleAddButton).click();
    cy.get(createActivity.responsibleModal).should("exist");
    cy.get(createActivity.responsibleEmailInput).type("automacao@teste.com");
    cy.get(createActivity.responsiblePhoneInput).type("(85) 99999-9999");
    cy.get(createActivity.responsibleSaveButton).click();
    cy.get(createActivity.responsibleNameRequiredAlert).should("be.visible");
  });

  it("CT-011 — Validar comportamento do campo Nome acima de 50 caracteres", () => {
    cy.get(createActivity.createActivityButton).click();
    cy.get(createActivity.responsibleAddButton).click();
    cy.get(createActivity.responsibleModal).should("exist");

    const responsibleName = "A".repeat(51);

    cy.get(createActivity.responsibleNameInput)
      .type(responsibleName)
      .invoke("val")
      .should("have.length", 50);
  });

  it("CT-012 — Validar formato inválido de e-mail", () => {
    cy.get(createActivity.createActivityButton).click();
    cy.get(createActivity.responsibleAddButton).click();
    cy.get(createActivity.responsibleModal).should("exist");

    cy.get(createActivity.responsibleEmailInput).type("Automação de teste");
    cy.get(createActivity.responsibleSaveButton).click();
    cy.get(createActivity.responsibleEmailRequiredAlert).should("be.visible");
    cy.get(createActivity.responsibleEmailInput).type("automacaoteste.com");
    cy.get(createActivity.responsibleSaveButton).click();
    cy.get(createActivity.responsibleEmailRequiredAlert).should("be.visible");
    cy.get(createActivity.responsibleEmailInput).type("automacao!teste.com");
    cy.get(createActivity.responsibleSaveButton).click();
    cy.get(createActivity.responsibleEmailRequiredAlert).should("be.visible");
  });

  it("CT-013 — Validar obrigatoriedade do campo E-mail", () => {
    cy.get(createActivity.createActivityButton).click();
    cy.get(createActivity.responsibleAddButton).click();
    cy.get(createActivity.responsibleModal).should("exist");
    cy.get(createActivity.responsibleNameInput).type("Teste");
    cy.get(createActivity.responsiblePhoneInput).type("(85) 99999-9999");
    cy.get(createActivity.responsibleSaveButton).click();
    cy.get(createActivity.responsibleEmailRequiredAlert).should("be.visible");
  });

  it.only("CT-016 — Validar obrigatoriedade do campo Telefone", () => {
    cy.get(createActivity.createActivityButton).click();
    cy.get(createActivity.responsibleAddButton).click();
    cy.get(createActivity.responsibleModal).should("exist");
    cy.get(createActivity.responsibleNameInput).type("Teste");
    cy.get(createActivity.responsibleEmailInput).type("automacao@teste.com");
    cy.get(createActivity.responsibleSaveButton).click();
    cy.get(createActivity.responsiblePhoneRequiredAlert).should("be.visible");
  });
});
