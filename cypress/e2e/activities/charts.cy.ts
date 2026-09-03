import { createResponsibleData } from "../../factories/responsibleFactory";
import { activityTable } from "../../locators/activityTable";
import { cardsAndCharts } from "../../locators/cardsAndCharts";
import { createActivity } from "../../locators/createActivity";

describe("Gráficos de atividades", () => {
  beforeEach(() => {
    cy.login();
    cy.intercept("POST", "/rest/v1/atividades?select=*").as(
      "createActivityRequest",
    );
    cy.intercept("PATCH", "/rest/v1/atividades?**").as("updateActivityRequest");
    cy.intercept("GET", "/rest/v1/atividades?**").as("getActivitiesRequest");
    cy.deleteAllActivities();
  });

  it("CT-039 — Validar percentual de atividades Cadastradas", () => {
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

    cy.get(cardsAndCharts.charts)
      .find(cardsAndCharts.chartBar)
      .first()
      .trigger("mouseover");

    cy.get(cardsAndCharts.chartHover)
      .should("be.visible")
      .and("contain.text", "Cadastradas")
      .and("contain.text", "Percentual : 100%");
  });

  it("CT-040 — Validar cálculo percentual de Resolvidas e Pendentes", () => {
    const responsible = createResponsibleData();
    cy.createResponsible(responsible);
    const newResponsible = createResponsibleData();
    cy.createResponsible(newResponsible);

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

    cy.createActivity({
      status: "Não Iniciada",
      priority: "Média",
      activity: "Uma nova atividade de teste",
      responsible: newResponsible.name,
      deadline: "2027-03-20",
    });

    cy.wait("@createActivityRequest")
      .its("response.statusCode")
      .should("eq", 201);

    cy.get(cardsAndCharts.charts)
      .find(".recharts-surface")
      .trigger("mousemove", 900, 200, {
        force: true,
      });

    cy.get(cardsAndCharts.chartHover)
      .should("be.visible")
      .and("contain.text", "Resolvidas")
      .and("contain.text", "0%");

    cy.get(cardsAndCharts.charts)
      .find(cardsAndCharts.chartBar)
      .last()
      .trigger("mouseover");

    cy.get(cardsAndCharts.chartHover)
      .should("be.visible")
      .and("contain.text", "Pendentes")
      .and("contain.text", "100%");

    cy.get(activityTable.statusSelect).eq(0).select("Resolvida");
    cy.wait("@updateActivityRequest")
      .its("response.statusCode")
      .should("eq", 204);
    cy.reload();

    cy.waitForUi();
    cy.get(cardsAndCharts.charts)
      .find(cardsAndCharts.chartBar)
      .eq(1)
      .trigger("mouseover", { force: true });

    cy.get(cardsAndCharts.chartHover)
      .should("be.visible")
      .and("contain.text", "Resolvidas")
      .and("contain.text", "50%");

    cy.get(cardsAndCharts.charts)
      .find(cardsAndCharts.chartBar)
      .last()
      .trigger("mouseover");

    cy.get(cardsAndCharts.chartHover)
      .should("be.visible")
      .and("contain.text", "Pendentes")
      .and("contain.text", "50%");
  });
});
