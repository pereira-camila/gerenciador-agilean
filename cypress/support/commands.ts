import { users } from "../fixtures/users.js";
import { loginPage } from "../locators/loginPage.js";

declare global {
  namespace Cypress {
    interface Chainable {
      // Custom command to login

      login(): Cypress.Chainable<void>;

      // Custom command to get a cell by header name
      getCellByHeader(
        row: number,
        header: string,
      ): Chainable<JQuery<HTMLElement>>;
    }
  }
}

Cypress.Commands.add("login", () => {
  cy.intercept("POST", "/auth/v1/token?grant_type=password").as("loginRequest");
  cy.visit("/");
  cy.get(loginPage.emailInput).type(Cypress.env("email"));
  cy.get(loginPage.passwordInput).type(Cypress.env("password"));
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

export {};
