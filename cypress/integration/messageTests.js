
describe("Should send a message when logged in", () => {

 it("should fill in textarea", () => {
   cy.visit("http://localhost:4200/login");
   //log in
   cy.get('.emailInput')
     .type('anni@anni.anni');
   cy.get('.passwordInput')
     .type('annianni');
   cy.get('.loginBtn').click();
   cy.get('.chatBtn').click();

   cy.get('.messageTextArea')
     .type('Hello from cypress').should('have.value', 'Hello from cypress');
  });

  it("should send message", () => {
    cy.get('.sendMessageBtn').click();
    cy.get('.chat_box').contains('Hello from cypress');
    cy.get('.msgLogoutBtn').click();
  });
});
