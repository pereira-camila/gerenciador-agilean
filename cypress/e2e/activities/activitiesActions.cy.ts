import { activityTable } from "../../locators/activityTable";
import { createActivity } from "../../locators/createActivity";

describe("Menu de ações", () => {
  beforeEach(() => {
    cy.login();
    cy.intercept("POST", "/rest/v1/atividades?select=*").as(
      "createActivityRequest",
    );
    cy.intercept("PATCH", "/rest/v1/atividades?**").as("updateActivityRequest");
    cy.intercept("DELETE", "/rest/v1/atividades?**").as(
      "deleteActivityRequest",
    );

    cy.deleteAllActivities();
  });

  it("CT-026 — Editar os dados de uma atividade", () => {
    cy.createActivity({
      status: "Não Iniciada",
      priority: "Média",
      activity: "Uma nova atividade de teste",
      responsible: "João",
      deadline: "2027-03-16",
    });

    cy.get(activityTable.actionsButton).click();
    cy.get(activityTable.editButton).click();

    cy.get(createActivity.statusSelect).select("Em Andamento");
    cy.get(createActivity.prioritySelect).select("Alta");
    cy.get(createActivity.activityNameInput)
      .clear()
      .type("Atividade editada com sucesso");
    cy.get(createActivity.responsibleSelect).select("Maria");
    cy.get(createActivity.deadlineInput).clear().type("2027-04-20");
    cy.get(createActivity.statusSelect).select("Resolvida");
    cy.get(createActivity.registerButton).click();
    cy.wait("@updateActivityRequest")
      .its("response.statusCode")
      .should("eq", 204);

    cy.getCellByHeader(0, "#").should("contain.text", "1");
    cy.getCellByHeader(0, "Responsável").should("contain.text", "Maria");
    cy.getCellByHeader(0, "Atividade").should(
      "contain.text",
      "Atividade editada com sucesso",
    );
    cy.getCellByHeader(0, "Prazo").should("contain.text", "20/04/2027");
    cy.getCellByHeader(0, "Prioridade").should("contain.text", "Alta");
    cy.getCellByHeader(0, "Status").should("contain.text", "Resolvida");
  });

  it("CT-027 — Duplicar uma atividade", () => {
    cy.createActivity({
      status: "Em Andamento",
      priority: "Média",
      activity: "Atividade para duplicar",
      responsible: "João",
      deadline: "2027-08-18",
    });
    cy.wait("@createActivityRequest")
      .its("response.statusCode")
      .should("eq", 201);

    cy.get(activityTable.actionsButton).click();
    cy.get(activityTable.duplicateButton).click();

    cy.wait("@createActivityRequest")
      .its("response.statusCode")
      .should("eq", 201);

    cy.getCellByHeader(0, "#").should("contain.text", "1");
    cy.getCellByHeader(0, "Responsável").should("contain.text", "João");
    cy.getCellByHeader(0, "Atividade").should(
      "contain.text",
      "Atividade para duplicar",
    );
    cy.getCellByHeader(0, "Prazo").should("contain.text", "18/08/2027");
    cy.getCellByHeader(0, "Prioridade").should("contain.text", "Média");
    cy.getCellByHeader(0, "Status").should("contain.text", "Não Iniciada");
  });

  it("CT-029 — Excluir uma atividade", () => {
    cy.createActivity({
      status: "Não Iniciada",
      priority: "Média",
      activity: "Atividade para excluir",
      responsible: "João",
      deadline: "2027-08-18",
    });

    cy.get(activityTable.actionsButton).click();
    cy.get(activityTable.deleteButton).click();

    cy.wait("@deleteActivityRequest")
      .its("response.statusCode")
      .should("eq", 204);

    cy.contains("Nenhuma atividade cadastrada").should("be.visible");
  });
});
