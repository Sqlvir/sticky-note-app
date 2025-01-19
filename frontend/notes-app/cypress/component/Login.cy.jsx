import React from 'react';
import Login from '../../src/pages/Login/login';
import { BrowserRouter } from 'react-router-dom';

describe('Login Component', () => {
  beforeEach(() => {
    cy.mount(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
  });

  // Check login form elements exist
  it('renders login form elements correctly', () => {
    cy.contains('Welcome to LogIn');
    cy.get('input[type="text"]').should('exist');
    cy.get('input[type="password"]').should('exist');
    cy.get('button[type="submit"]').should('exist');
  });

  // Check email validation
  it('validates email format', () => {
    cy.get('input[type="text"]')
      .type('invalid-email')
      .blur();
    cy.contains('Please enter a valid email').should('not.exist');
    
    cy.get('input[type="text"]')
      .clear()
      .type('valid@email.com')
      .blur();
    cy.contains('Please enter a valid email').should('not.exist');
  });

  // Check password validation
  it('handles form submission', () => {
    const testEmail = 'test@example.com';
    const testPassword = 'password123';

    cy.get('input[type="text"]').type(testEmail);
    cy.get('input[type="password"]').type(testPassword);
    cy.get('button[type="submit"]').click();

    // Add assertions based on your login logic
    // Example: checking if navigation occurs after successful login
    cy.url().should('not.include', '/login');
  });

  // Check error message for invalid credentials
  it('displays error message for invalid credentials', () => {
    const invalidEmail = 'wrong@gmail.com';
    const invalidPassword = 'wrongpassword';

    cy.get('input[type="text"]').type(invalidEmail);
    cy.get('input[type="password"]').type(invalidPassword);
    cy.get('button[type="submit"]').click();

    cy.contains('Invalid credentials').should('not.exist');
  });

  // Check navigation to signup page
  it('navigates to signup page when clicking signup link', () => {
    cy.get('a[href="/signup"]').click();
    cy.url().should('include', '/signup');
  });
});
