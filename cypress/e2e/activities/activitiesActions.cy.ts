import { createResponsibleData } from "../../factories/responsibleFactory";
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

  it("CT-029 — Excluir uma atividade", () => {
    const responsible = createResponsibleData();
    const activityName = "Atividade 1";

    cy.createResponsible(responsible);
    cy.createActivity({
      status: "Não Iniciada",
      priority: "Média",
      activity: activityName,
      responsible: responsible.name,
      deadline: "2027-08-18",
    });

    cy.contains(activityTable.tableRows, activityName).within(() => {
      cy.get(activityTable.actionsButton).click();
      cy.get(activityTable.deleteButton).click();
    });

    cy.wait("@deleteActivityRequest")
      .its("response.statusCode")
      .should("eq", 204);

    cy.contains("Nenhuma atividade cadastrada").should("be.visible");
  });
});
