describe('Sticky note end to end test', () => {
  
  it('shows error message with invalid credentials and then registers new user', () => {
    // Test invalid login
    cy.visit('http://localhost:8080/login')
    cy.get('input[type="text"]').type('wrong@example.com')
    cy.get('input[type="password"]').type('wrongpassword')
    cy.get('button[type="submit"]').click()
    
    cy.contains('User not found').should('be.visible')
  })
 
  it('Register new user', () => {
    // Navigate to registration
    cy.visit('http://localhost:8080/signup')

    // Fill registration form
    cy.get('input[placeholder="Name"]').type('Sunny Kumar')
    cy.get('input[placeholder="Email"]').type('sunnykumar@gmail.com')
    cy.get('input[placeholder="Password"]').type('password123')
    cy.get('.register-button').click()
  })

  it('successfully logs in with valid credentials', () => {
    cy.visit('http://localhost:8080/login')
    cy.get('input[type="text"]').type('sunnykumar@gmail.com')
    cy.get('input[type="password"]').type('password123')
    cy.get('button[type="submit"]').click()
    
    cy.url().should('eq', 'http://localhost:8080/stickynote')
  })
})
