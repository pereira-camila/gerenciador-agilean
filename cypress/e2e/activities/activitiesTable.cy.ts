import { activityTable } from "../../locators/activityTable";
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
    cy.intercept("DELETE", "/rest/v1/atividades?**").as(
      "deleteActivityRequest",
    );

    cy.deleteAllActivities();
  });

  it("CT-017 — Validar estrutura da tabela de atividades", () => {
    cy.createActivity({
      status: "Não Iniciada",
      priority: "Média",
      activity: "Atividade para validar estrutura da tabela",
      responsible: "João",
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

  it("CT-018 — Alterar status de 'Não Iniciada' para 'Em Andamento'", () => {
    cy.createActivity({
      status: "Não Iniciada",
      priority: "Média",
      activity: "Atividade para validar status",
      responsible: "João",
      deadline: "2027-03-16",
    });
    cy.wait("@createActivityRequest")
      .its("response.statusCode")
      .should("eq", 201);

    cy.get(activityTable.statusSelect)
      .find("option:selected")
      .should("contain.text", "Não Iniciada");
    cy.get(activityTable.statusSelect).select("Em Andamento");
    cy.reload();
    cy.get(activityTable.statusSelect)
      .find("option:selected")
      .should("contain.text", "Em Andamento");
  });

  it("CT-019 — Alterar status de uma atividade para 'Resolvida'", () => {
    cy.createActivity({
      status: "Não Iniciada",
      priority: "Média",
      activity: "Atividade para validar status",
      responsible: "João",
      deadline: "2027-03-16",
    });
    cy.wait("@createActivityRequest")
      .its("response.statusCode")
      .should("eq", 201);

    cy.get(activityTable.statusSelect)
      .find("option:selected")
      .should("contain.text", "Não Iniciada");
    cy.get(activityTable.statusSelect).select("Resolvida");
    cy.reload();
    cy.get(activityTable.statusSelect)
      .find("option:selected")
      .should("contain.text", "Resolvida");
  });

  it("CT-020 — Selecionar o status 'Rejeitada'", () => {
    cy.createActivity({
      status: "Não Iniciada",
      priority: "Média",
      activity: "Atividade para validar status",
      responsible: "João",
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
    cy.get(activityTable.rejectionReasonInput).type(
      "Motivo da rejeição para teste automatizado",
    );
    cy.get(activityTable.confirmRejectButton).click();
    cy.reload();
    cy.get(activityTable.statusSelect)
      .find("option:selected")
      .should("contain.text", "Rejeitada");
  });

  it("CT-021 — Validar obrigatoriedade do motivo da rejeição", () => {
    cy.createActivity({
      status: "Não Iniciada",
      priority: "Média",
      activity: "Atividade para validar status",
      responsible: "João",
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

  it("CT-022 — Validar atualização dos cards após alteração de status", () => {
    cy.createActivity({
      status: "Não Iniciada",
      priority: "Média",
      activity: "Atividade para validar atualização dos cards",
      responsible: "João",
      deadline: "2027-03-16",
    });
    cy.wait("@createActivityRequest")
      .its("response.statusCode")
      .should("eq", 201);

    cy.get(activityTable.pendingCard).should("have.text", "Pendentes1");
    cy.get(activityTable.statusSelect).select("Resolvida");
    cy.reload();
    cy.get(activityTable.pendingCard).should("have.text", "Pendentes0");
    cy.get(activityTable.resolvedCard).should("have.text", "Resolvidas1");
  });
});
