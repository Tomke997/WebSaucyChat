
describe("Testing Login and logout", () => {
  it("should  fill in email and password", () => {
    cy.visit("http://localhost:4200/login");
    cy.get('.emailInput')
      .type('anni@anni.anni').should('have.value', 'anni@anni.anni');

    cy.get('.passwordInput')
      .type('annianni').should('have.value', 'annianni');
  });

  it("should log in", () => {
    cy.get('.loginBtn').click();

    cy.contains('Logout');
    cy.location('pathname').should('eq', '/login');
  });

  it("should log out", () => {
    cy.get('.logoutBtn').click();

    cy.contains('Login');
    cy.location('pathname').should('eq', '/login');
  });
});
