import { loginPage } from "../../locators/loginPage";

describe("Logout", () => {
  beforeEach(() => {
    cy.intercept("POST", "/auth/v1/logout?scope=global").as("logoutRequest");

    cy.login();
  });

  it("CT-043 — Realizar logout da aplicação", () => {
    cy.get(loginPage.logoutButton).click();
    cy.wait("@logoutRequest").its("response.statusCode").should("eq", 204);
    cy.get(loginPage.loginModal).should("be.visible");
  });
});
