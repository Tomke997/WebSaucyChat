
describe("Testing Create and remove user", () => {
  it("should  fill in email and password", () => {
    cy.visit("http://localhost:4200/login");
    cy.get('.emailInput')
      .type('testing@testing.com').should('have.value', 'testing@testing.com');
    cy.get('.passwordInput')
      .type('annianni').should('have.value', 'annianni');
    cy.get('.createUserBtn').click();

    cy.contains('Remove user');
    cy.location('pathname').should('eq', '/login');
  });

  it("should remove user", () => {
    cy.get('.removeUserBtn').click();

    cy.contains('Create account');
    cy.location('pathname').should('eq', '/login');
  });

});
