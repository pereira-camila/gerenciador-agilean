import { createResponsibleData } from "../../factories/responsibleFactory";
import { activityTable } from "../../locators/activityTable";
import { cardsAndCharts } from "../../locators/cardsAndCharts";

describe("Cards e indicadores", () => {
  beforeEach(() => {
    cy.login();
    cy.intercept("POST", "/rest/v1/atividades?select=*").as(
      "createActivityRequest",
    );
    cy.intercept("PATCH", "/rest/v1/atividades?**").as("updateActivityRequest");

    cy.deleteAllActivities();
  });

  it("CT-031 — Validar atualização do card Cadastradas após novo cadastro", () => {
    const responsible = createResponsibleData();

    cy.createResponsible(responsible);
    cy.get(cardsAndCharts.registeredCard).should(
      "contain.text",
      "Cadastradas0",
    );

    cy.createActivity({
      status: "Não Iniciada",
      priority: "Média",
      activity: "Atividade para validar card Cadastradas",
      responsible: responsible.name,
      deadline: "2027-03-16",
    });

    cy.wait("@createActivityRequest")
      .its("response.statusCode")
      .should("eq", 201);

    cy.get(cardsAndCharts.registeredCard).should(
      "contain.text",
      "Cadastradas1",
    );
  });

  it("CT-034 — Validar que atividade Não Iniciada é contabilizada como Pendente", () => {
    const responsible = createResponsibleData();

    cy.createResponsible(responsible);
    cy.get(cardsAndCharts.pendingCard).should("have.text", "Pendentes0");
    cy.createActivity({
      status: "Não Iniciada",
      priority: "Média",
      activity: "Atividade para validar atualização dos cards",
      responsible: responsible.name,
      deadline: "2027-03-16",
    });
    cy.wait("@createActivityRequest")
      .its("response.statusCode")
      .should("eq", 201);

    cy.get(cardsAndCharts.pendingCard).should("have.text", "Pendentes1");
  });

  it("CT-035 — Validar que atividade Em Andamento é contabilizada como Pendente", () => {
    const responsible = createResponsibleData();

    cy.createResponsible(responsible);
    cy.get(cardsAndCharts.pendingCard).should("have.text", "Pendentes0");
    cy.createActivity({
      status: "Em Andamento",
      priority: "Média",
      activity: "Atividade para validar atualização dos cards",
      responsible: responsible.name,
      deadline: "2027-03-16",
    });
    cy.wait("@createActivityRequest")
      .its("response.statusCode")
      .should("eq", 201);

    cy.get(cardsAndCharts.pendingCard).should("have.text", "Pendentes1");
  });

  it("CT-036 — Validar classificação de atividade atrasada", () => {
    const responsible = createResponsibleData();

    cy.createResponsible(responsible);
    cy.get(cardsAndCharts.lateCard).should("have.text", "Atrasadas0");
    cy.createActivity({
      status: "Não Iniciada",
      priority: "Média",
      activity: "Atividade para validar atualização dos cards",
      responsible: responsible.name,
      deadline: "2020-01-01",
    });
    cy.wait("@createActivityRequest")
      .its("response.statusCode")
      .should("eq", 201);

    cy.get(cardsAndCharts.lateCard).should("have.text", "Atrasadas1");
  });
});
