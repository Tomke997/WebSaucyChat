
describe("Testing Routing", () => {
  it("should visit login page", () => {
    cy.visit("http://localhost:4200");
    cy.location('pathname').should('eq', '/login');
  });

  it("should not go to message-room when not logged in", () => {
    cy.visit("http://localhost:4200/message-room");
    cy.location('pathname').should('eq', '/login');
  });

  it("should go to message-room when logged in", () => {
    //login
    cy.get('.emailInput')
      .type('anni@anni.anni');
    cy.get('.passwordInput')
      .type('annianni');
    cy.get('.loginBtn').click();
    cy.get('.chatBtn').click();

    cy.location('pathname').should('eq', '/message-room');
  });

  it("should go to login when logging out from message-room", () => {
    cy.get('.msgLogoutBtn').click();
    cy.contains('Login')
    cy.location('pathname').should('eq', '/login');
  });
});
