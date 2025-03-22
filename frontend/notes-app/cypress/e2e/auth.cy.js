describe('Authentication Flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/')
    // Clear localStorage before each test
    cy.clearLocalStorage()
  })

  it('should register a new user successfully', () => {
    cy.get('.signup-box').click()
    cy.get('input[placeholder="Name"]').type('Test User')
    cy.get('input[placeholder="Email"]').type('test@example.com')
    cy.get('input[placeholder="Password"]').type('password123')
    cy.get('.register-button').click()

    // Verify localStorage has the token
    cy.window().its('localStorage.token').should('exist')
    // Verify redirect to notes page
    cy.url().should('include', '/notes')
  })

  it('should login user successfully', () => {
    cy.get('input[type="text"]').type('test@example.com')
    cy.get('input[type="password"]').type('password123')
    cy.get('button[type="submit"]').click();

    // Verify localStorage has the token
    cy.window().its('localStorage.token').should('exist')
    // Verify user is logged in
    cy.get('[data-testid="user-profile"]').should('be.visible')
  })

  it('should logout user successfully', () => {
    // Login first
    cy.get('input[type="text"]').type('test@example.com')
    cy.get('input[type="password"]').type('password123')
    cy.get('button[type="submit"]').click();

    // Perform logout
    cy.get('[data-testid="logout-button"]').click()

    // Verify localStorage token is removed
    cy.window().its('localStorage.token').should('not.exist')
    // Verify redirect to login page
    cy.url().should('include', '/login')
  })

  it('should show error for invalid credentials', () => {
    cy.get('input[type="text"]').type('wrong@example.com')
    cy.get('input[type="password"]').type('wrongpassword')
    cy.get('button[type="submit"]').click()

    // Verify error message
    cy.get('[data-testid="error-message"]')
      .should('be.visible')
      .and('contain', 'Invalid credentials')
  })

  it('should persist authentication across page reloads', () => {
    // Login
    cy.get('input[type="text"]').type('test@example.com')
    cy.get('input[type="password"]').type('password123')
    cy.get('button[type="submit"]').click();

    // Reload page
    cy.reload()

    // Verify still logged in
    cy.get('[data-testid="user-profile"]').should('be.visible')
    cy.url().should('include', '/stickynote')
  })
})
