describe('Sticky note end to end test', () => {

  // Verify successful login and redirect to sticky note page
  it('successfully logs in with valid credentials', () => {
    cy.visit('http://localhost:8080/login')
    cy.get('input[type="text"]').type('testuser@gmail.com')
    cy.get('input[type="password"]').type('testuser@123')
    cy.get('button[type="submit"]').click()
    
    cy.url().should('eq', 'http://localhost:8080/stickynote')
  })

  // Verify unsuccessful login with invalid credentials
  // it('shows error message with invalid credentials', () => {
  //   cy.visit('http://localhost:8080/login')
  //   cy.get('input[type="text"]').type('wrong@example.com')
  //   cy.get('input[type="password"]').type('wrongpassword')
  //   cy.get('button[type="submit"]').click()
    
  //   cy.contains('User not found').should('be.visible')
  //   cy.url().should('include', '/login')
  // })
})
