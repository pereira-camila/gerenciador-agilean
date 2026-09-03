import { createResponsibleData } from "../../factories/responsibleFactory";
import { activityTable } from "../../locators/activityTable";
import { cardsAndCharts } from "../../locators/cardsAndCharts";
import { createActivity } from "../../locators/createActivity";

describe("Tabela de Atividades e Alteração de Status", () => {
  beforeEach(() => {
    cy.login();
    cy.intercept("POST", "/rest/v1/atividades?select=*").as(
      "createActivityRequest",
    );
    cy.intercept("PATCH", "/rest/v1/atividades?**").as(
      "updateActivityStatusRequest",
    );

    cy.deleteAllActivities();
  });

  it("CT-017 — Validar estrutura da tabela de atividades", () => {
    const responsible = createResponsibleData();

    cy.createResponsible(responsible);
    cy.createActivity({
      status: "Não Iniciada",
      priority: "Média",
      activity: "Atividade para validar estrutura da tabela",
      responsible: responsible.name,
      deadline: "2027-03-16",
    });
    cy.wait("@createActivityRequest")
      .its("response.statusCode")
      .should("eq", 201);
    cy.get(activityTable.table).should("be.visible");
    cy.get(activityTable.tableHeaders).then(($headers) => {
      const actualHeaders = [...$headers].map((header) =>
        header.textContent?.trim(),
      );

      expect(actualHeaders).to.deep.equal([
        "#",
        "Atividade",
        "Responsável",
        "Prazo",
        "Prioridade",
        "Status",
        "Ações",
      ]);
    });
  });

  it("CT-021 — Validar obrigatoriedade do motivo da rejeição", () => {
    const responsible = createResponsibleData();

    cy.createResponsible(responsible);
    cy.createActivity({
      status: "Não Iniciada",
      priority: "Média",
      activity: "Atividade para validar status",
      responsible: responsible.name,
      deadline: "2027-03-16",
    });
    cy.wait("@createActivityRequest")
      .its("response.statusCode")
      .should("eq", 201);

    cy.get(activityTable.statusSelect)
      .find("option:selected")
      .should("contain.text", "Não Iniciada");
    cy.get(activityTable.statusSelect).select("Rejeitada");
    cy.get(activityTable.rejectionReasonModal).should("be.visible");
    cy.get(activityTable.confirmRejectButton).click();
    cy.get(activityTable.rejectionReasonRequiredAlert).should("be.visible");

    cy.get(activityTable.cancelRejectButton).click();
  });
});
