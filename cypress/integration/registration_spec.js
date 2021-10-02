// registration_spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
const url = 'http://localhost:3000'
const uName = 'Carlisle RectumTaco'
const email = 'kaknBowlz69420@buttchecks.org'
const password = '12345'
const age = '69'

describe('Patient Sign Up', () => {
  after(() => {
    cy.task('dbDestroyUser', 'this will fuck up ya user boyeee, SHEEEEEEEESH!')
  })
  it('goes to the homepage successfully', () => {
    cy.visit(url)
    cy.contains(`Don't have an account? Sign Up`).click()
    cy.get('[type="checkbox"]').first().check()
    cy.get('#firstName').type(uName)
    cy.get('#age').type(age)
    cy.get('#email').type(email)
    cy.get('#password').type(password)
    cy.get('.submit-signup').click()
    cy.contains('Visualize')
    cy.contains('Logout').click()
    cy.get('#email').type(email)
    cy.get('#password').type(password)
    cy.contains('Sign in').click()
    cy.contains('Visualize')
  })

})