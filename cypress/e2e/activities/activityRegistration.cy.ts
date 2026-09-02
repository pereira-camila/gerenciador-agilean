import { createResponsibleData } from "../../factories/responsibleFactory";
import { activityTable } from "../../locators/activityTable";
import { createActivity } from "../../locators/createActivity";

describe("Cadastro de atividades", () => {
  beforeEach(() => {
    cy.login();
    cy.intercept("POST", "/rest/v1/atividades?select=*").as(
      "createActivityRequest",
    );
    cy.intercept("DELETE", "/rest/v1/atividades?**").as(
      "deleteActivityRequest",
    );

    cy.deleteAllActivities();
  });

  it("CT-001 — Cadastrar atividade com dados válidos", () => {
    const responsible = createResponsibleData();

    cy.createResponsible(responsible);
    cy.createActivity({
      status: "Não Iniciada",
      priority: "Média",
      activity: "Uma nova atividade de teste",
      responsible: responsible.name,
      deadline: "2027-03-16",
    });

    cy.wait("@createActivityRequest")
      .its("response.statusCode")
      .should("eq", 201);

    cy.getCellByHeader(0, "#").should("contain.text", "1");
    cy.getCellByHeader(0, "Responsável").should(
      "contain.text",
      responsible.name,
    );
    cy.getCellByHeader(0, "Atividade").should(
      "contain.text",
      "Uma nova atividade de teste",
    );
    cy.getCellByHeader(0, "Prazo").should("contain.text", "16/03/2027");
    cy.getCellByHeader(0, "Prioridade").should("contain.text", "Média");
    cy.getCellByHeader(0, "Status").should("contain.text", "Não Iniciada");
  });

  it("CT-002 — Validar campos obrigatórios no cadastro de atividade", () => {
    cy.get(createActivity.createActivityButton).click();

    cy.get(createActivity.registerButton).click();
    cy.get(createActivity.activityRequiredAlert).should("be.visible");
    cy.get(createActivity.responsibleRequiredAlert).should("be.visible");
    cy.get(createActivity.deadlineRequiredAlert).should("be.visible");
  });

  it("CT-003 — Validar limite máximo do campo Atividade", () => {
    const activityName = "A".repeat(51);

    cy.get(createActivity.createActivityButton).click();
    cy.get(createActivity.activityNameInput)
      .type(activityName)
      .invoke("val")
      .should("have.length", 50);
  });

  it("CT-004 — Validar opções disponíveis no campo Status", () => {
    const expectedStatus = ["Não Iniciada", "Em Andamento"];

    cy.get(createActivity.createActivityButton).click();
    cy.get(createActivity.statusSelect)
      .find("option")
      .then(($options) => {
        const actualStatus = [...$options].map((option) =>
          option.textContent?.trim(),
        );

        expect(actualStatus).to.deep.equal(expectedStatus);
      });
  });

  it("CT-005 — Validar opções disponíveis no campo Prioridade", () => {
    cy.get(createActivity.createActivityButton).click();

    const expectedPriority = ["Baixa", "Média", "Alta"];

    cy.get(createActivity.prioritySelect)
      .find("option")
      .then(($options) => {
        const actualPriority = [...$options].map((option) =>
          option.textContent?.trim(),
        );

        expect(actualPriority).to.deep.equal(expectedPriority);
      });
  });
});
