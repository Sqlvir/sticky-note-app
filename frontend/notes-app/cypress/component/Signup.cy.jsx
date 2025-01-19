import React from 'react';
import SignUp from '../../src/pages/SignUp/signup';
import { BrowserRouter } from 'react-router-dom';

describe('SignUp Component Tests', () => {
  beforeEach(() => {
    cy.mount(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );
  });

  // Check signup form elements exist
  it('validates form fields and styling', () => {
    cy.get('.signup-box').should('be.visible')
    cy.get('input[placeholder="Name"]').should('be.visible')
    cy.get('input[placeholder="Email"]').should('be.visible')
    cy.get('input[placeholder="Password"]').should('be.visible')
    cy.get('.register-button').should('be.visible')
  })

  // Display name validation error message when name field is empty
  it('shows name validation error', () => {
    cy.get('.register-button').click()
    cy.get('.text-red-500').should('contain', 'Please enter a valid name')
  })

  // Display email validation error message when email field is empty
  it('shows email validation error', () => {
    cy.get('input[placeholder="Name"]').type('Test User')
    cy.get('input[placeholder="Email"]').type('invalid-email')
    cy.get('.register-button').click()
    cy.get('.text-red-500').should('contain', 'Please enter a valid email address')
  })

  // Display password validation error message when password field is empty
  it('shows password validation error', () => {
    cy.get('input[placeholder="Name"]').type('Test User')
    cy.get('input[placeholder="Email"]').type('test@example.com')
    cy.get('.register-button').click()
    cy.get('.text-red-500').should('contain', 'Please enter the password')
  })

  // Submit form with valid data
  it('submits form with valid data', () => {
    cy.intercept('POST', '/create-account', {
      body: {
        accessToken: 'Test-Token',
      }
    }).as('signupRequest')

    cy.get('input[placeholder="Name"]').type('Test User')
    cy.get('input[placeholder="Email"]').type('test@example.com')
    cy.get('input[placeholder="Password"]').type('password123')
    cy.get('.register-button').click()

    cy.wait('@signupRequest').its('request.body').should('deep.equal', {
      fullName: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    })
  })

  // Handle server error response
  it('handles server error response', () => {
    cy.intercept('POST', '/create-account', {
      statusCode: 400,
      body: {
        message: 'User already exists'
      }
    }).as('signupError')

    cy.get('input[placeholder="Name"]').type('Test User')
    cy.get('input[placeholder="Email"]').type('test@example.com')
    cy.get('input[placeholder="Password"]').type('password123')
    cy.get('.register-button').click()

    cy.get('.text-red-500').should('contain', 'User already exists')
  })

  // Handle successful signup
  it('navigates to login page', () => {
    cy.get('.signin-text').click()
    cy.url().should('include', '/login')
  })
})
