/// <reference types="cypress" />>

import Chance from 'chance'
const chance = new Chance()

describe('Login and register system', () => {
  const email = chance.email()
  const pw = '-Strong2001-'
  const firstname = 'John'
  const lastname = 'Doe'
  // beforeEach(() => {
  //   cy.visit('http://localhost:5000')
  // })

  it('Has a title', () => {
    cy.visit('http://localhost:5000')
    cy.contains('MCT airlines')
  })
  it('Has Login', () => {
    cy.contains('Login')
  })

  it('Sign up a new user', () => {
    cy.contains('Login').click()

    cy.contains('Register').click()
    cy.get('input[name=registerEmail]').type(email)
    cy.get('input[name=firstName]').type(firstname)
    cy.get('input[name=lastName]').type(lastname)
    cy.get('input[name=pw]').type(pw)
    cy.get('input[name=cpw]').type(pw)
    cy.get('#registerForm').submit()
    cy.get('button[name=closeRegisterForm').click()
    cy.contains('My bookings')
    cy.contains('John Doe')
  })

  it('Log out user', () => {
    cy.contains('John Doe').click()
    cy.contains('Sign out').click()
    cy.contains('Login')
  })

  it('Login user', () => {
    cy.contains('Login')
    cy.contains('Login').click()
    cy.get('input[name=loginEmail]').type(email)
    cy.get('input[name=loginPw]').type(pw)
    cy.get('#loginForm').submit()
    cy.get('button[name=closeLoginForm').click()
    cy.contains('My bookings')
    cy.contains('John Doe')
  })
})

describe('Check bookings', () => {
  it('navigate to bookings', () => {
    cy.contains('My bookings').click()
    cy.contains('Future bookings')
    cy.contains('No future bookings found')
    cy.contains('Previous bookings')
    cy.contains('No previous bookings found')
  })
})
