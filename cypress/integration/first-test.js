import {describe, it} from "@angular/core/testing/src/testing_internal";

describe("Should visit the login page", () => {
  it("should visit login page", () => {
    cy.visit("http://localhost:4200/login");
  });
});

describe("Login page should contain element when logged in/not", () => {
  it("should visit login page when not logged in", () => {
    cy.visit("http://localhost:4200/login");
    cy.contains('Connect Google');
  });

  it("should visit login page", () => {
    cy.visit("http://localhost:4200/login");
    //log in
    cy.contains('Logout');
  });/**/
});

describe("Routing ", () => {
  it("should not go to message-room when not logged in", () => {
    cy.visit("http://localhost:4200/message-room");
    cy.contains('Connect Google');
  });
/*
  it("should go to message-room when logged in", () => {
    cy.visit("http://localhost:4200/message-room");
    //log in
    //click go to chatroom
    cy.contains('Image');
  });*/
});
/*
describe("Should send a message when logged in", () => {
 it("should not send empty message", () => {
    //log in
    cy.visit("http://localhost:4200/message-room");
    //don't put text in text-area, send, see that page does not contains new message
  });
  it("should send message", () => {
    //log in
    cy.visit("http://localhost:4200/message-room");
    //put text in text-area, send, see if page contains new message
  });
   it("should open filechooser", () => {
    //log in
    cy.visit("http://localhost:4200/message-room");
    //click image, pick image click ok
  });
    it("should send image", () => {
    //log in
    cy.visit("http://localhost:4200/message-room");
    //click image, pick image click ok
  });

});*/

//change userpicture ability
