describe('Blog app', function() {
  beforeEach( function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    
    const user = {
      username: 'tester',
      name: 'Test Tester',
      password: 'test',
      blogs: []
    }
    
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Username')
    cy.contains('Password')
    cy.contains('Login')
  })
  
  describe('Login ', function() {
    it('fails with wrong password', function() {
      cy.get('#username').type('tester')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()
      
      cy.contains('Username or password wrong')
    })
    
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('tester')
      cy.get('#password').type('test')
      cy.get('#login-button').click()
      
      cy.contains('Logged in as Test Tester')
    })
  })
  
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'tester', password: 'test' })
    })

    describe.only('and several blogs can be created', () => {
      beforeEach(function() {
        cy.createBlog({
          title: 'blog with zero likes',
          author: 'tester',
          url: 'testurl1',
          likes: 0
        })
        cy.createBlog({
          title: 'blog with second most likes',
          author: 'tester',
          url: 'testurl2',
          likes: 3
        })
        cy.createBlog({
          title: 'blog with most likes',
          author: 'tester',
          url: 'testurl2',
          likes: 4
        })
      })
      
      it('A blog can be created', function() {
        cy.contains('Create blog').click()
        cy.createBlog({
          title: 'Cypress test blog',
          author: 'Cypress',
          url: 'www.cypresstestblog.com'
        })
        
        cy.contains('Cypress test blog')
      })
      
      it('a blog can be liked', function() {
        cy.contains('Show').click()
        cy.contains('Like').click()
        cy.contains('Like').click()
        
        cy.get('#likes').parent()
          .should('contain', '6')
      })
      
      it('a blog can be deleted by right user', function() {
        cy.contains('Show')
          .click()
        cy.contains('Delete')
          .click()
      })
      
      it('blogs are organized based on likes', function() {
        cy.contains('Show')
          .click()
        cy.contains('4')
      })
    })
  })
})