import { activityTable } from "../locators/activityTable.js";
import { createActivity } from "../locators/createActivity.js";
import { loginPage } from "../locators/loginPage.js";

declare global {
  namespace Cypress {
    interface Chainable {
      // Custom command to login

      login(): Cypress.Chainable<void>;

      // Custom command to delete activities
      deleteAllActivities(): Cypress.Chainable<void>;

      // Custom command to create activities
      createActivity(data: ActivityData): Cypress.Chainable<void>;

      // Custom command to create responsible
      createResponsible(responsible: ResponsibleData): Cypress.Chainable<void>;

      // Custom command to wait for UI to load
      waitForUi(): Cypress.Chainable<void>;

      // Custom command to get a cell by header name
      getCellByHeader(
        row: number,
        header: string,
      ): Chainable<JQuery<HTMLElement>>;
    }
  }
}

interface ActivityData {
  status: "Não Iniciada" | "Em Andamento";
  priority: "Baixa" | "Média" | "Alta";
  activity: string;
  responsible: string;
  deadline: string;
}

interface ResponsibleData {
  name: string;
  email: string;
  phone: string;
}

Cypress.Commands.add("login", () => {
  cy.intercept("POST", "/auth/v1/token?grant_type=password").as("loginRequest");
  cy.visit("/");
  cy.get(loginPage.emailInput).type(Cypress.env("email"));
  cy.get(loginPage.passwordInput).type(Cypress.env("password"), {
    log: false,
  });
  cy.get(loginPage.loginButton).click();

  cy.wait("@loginRequest").its("response.statusCode").should("eq", 200);
});

Cypress.Commands.add("getCellByHeader", (row: number, header: string) => {
  return cy.get("table thead th").then(($headers) => {
    const index = [...$headers].findIndex(
      (th) => th.textContent?.trim() === header,
    );

    if (index === -1) {
      throw new Error(`Coluna "${header}" não encontrada.`);
    }

    return cy.get("table tbody tr").eq(row).find("td").eq(index);
  });
});

Cypress.Commands.add("deleteAllActivities", () => {
  cy.waitForUi();
  const deleteActivity = () => {
    cy.get("body").then(($body) => {
      cy.intercept("DELETE", "/rest/v1/atividades?**").as(
        "deleteActivityRequest",
      );

      const rows = $body.find(activityTable.tableRows);

      if (rows.length === 0) {
        return;
      }

      cy.wrap(rows.first()).find(activityTable.actionsButton).click();

      cy.get(activityTable.deleteButton).click();

      cy.wait("@deleteActivityRequest")
        .its("response.statusCode")
        .should("eq", 204);

      cy.reload();
      cy.waitForUi();
      // Verifica novamente se ainda existem registros
      deleteActivity();
    });
  };

  deleteActivity();
});

Cypress.Commands.add("createActivity", (data: ActivityData) => {
  cy.get(createActivity.createActivityButton).click();

  cy.get(createActivity.statusSelect).select(data.status);

  cy.get(createActivity.prioritySelect).select(data.priority);

  cy.get(createActivity.activityNameInput).type(data.activity);

  cy.get(createActivity.responsibleSelect).select(data.responsible);

  cy.get(createActivity.deadlineInput).type(data.deadline);

  cy.get(createActivity.registerButton).click();
});

Cypress.Commands.add("createResponsible", (responsible: ResponsibleData) => {
  cy.get(createActivity.createActivityButton).click();
  cy.get(createActivity.responsibleAddButton).click();

  cy.get(createActivity.responsibleNameInput).clear().type(responsible.name);

  cy.get(createActivity.responsibleEmailInput).clear().type(responsible.email);

  cy.get(createActivity.responsiblePhoneInput).clear().type(responsible.phone);

  cy.get(createActivity.responsibleSaveButton).click();

  cy.get(createActivity.cancelActivityButton).click();
});

Cypress.Commands.add("waitForUi", () => {
  // Aguarda a estabilização da interface após operações assíncronas.
  cy.wait(2000);
});
