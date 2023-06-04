describe('Blog app', () => {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username:"admin",
      name:"admin",
      password:"admin"
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
  
    cy.visit('http://localhost:3000/')
    cy.contains('login').click()

  })

  it('Login form is shown', () => {
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('input[name="Username"]').type('admin')
      cy.get('input[name="Password"]').type('admin')
      cy.get('button[type="submit"]').click()
      cy.contains('logged in as admin')
    })

    it('fails with wrong credentials', function() {
      cy.get('input[name="Username"]').type('hasnain')
      cy.get('input[name="Password"]').type('admin')
      cy.get('button[type="submit"]').click()
      cy.contains('wrong username')
    })

  describe('When Logged in', function(){
    beforeEach(function() {
      cy.get('input[name="Username"]').type('admin')
      cy.get('input[name="Password"]').type('admin')
      cy.get('button[type="submit"]').click()
      cy.contains('logged in as admin')
    })
    it('creating a blog', function() {
      
      cy.contains('new note').click()
      cy.get('input[name="Title"]').type('Cypress')
      cy.get('input[name="Author"]').type('Cypress Author')
      cy.get('input[name="URL"]').type('Cypress URL')
      cy.get('button[type="submit"]').click()
      cy.contains('a new blog created')
    })

    it('user can like a blog', function() {
      cy.contains('new note').click()
      cy.get('input[name="Title"]').type('Cypress')
      cy.get('input[name="Author"]').type('admin')
      cy.get('input[name="URL"]').type('Cypress URL')
      cy.get('button[type="submit"]').click()

      cy.contains('view').click()
      cy.contains('like').click()
    })

    it('if creator of the blog user can see the remove button', function() {
      cy.contains('new note').click()
      cy.get('input[name="Title"]').type('Cypress')
      cy.get('input[name="Author"]').type('admin')
      cy.get('input[name="URL"]').type('Cypress URL')
      cy.get('button[type="submit"]').click()
      cy.get('span[class="author"]').contains('admin')
      cy.contains('remove')
    })

    it('blogs are ordered according to likes', function() {
      cy.contains('new note').click()
      cy.get('input[name="Title"]').type('first')
      cy.get('input[name="Author"]').type('admin')
      cy.get('input[name="URL"]').type('Cypress URL')
      cy.get('button[name="create"]').click()
      cy.wait(1000)

      cy.contains('new note').click()
      cy.get('input[name="Title"]').type('second')
      cy.get('input[name="Author"]').type('admin')
      cy.get('input[name="URL"]').type('Cypress URL')
      cy.get('button[name="create"]').click()

      cy.contains('new note').click()
      cy.get('input[name="Title"]').type('third')
      cy.get('input[name="Author"]').type('admin')
      cy.get('input[name="URL"]').type('Cypress URL')
      cy.get('button[name="create"]').click()
      cy.wait(1000)
      
      cy.contains('span', 'first').then(($element) => {
        cy.contains($element.text()).parent('div.toggle').find('button').contains('view').click() 
      })
      cy.contains('span', 'first').then(($element) => {
        cy.contains($element.text()).parent('div.toggle').find('button').contains('like').click()})
        cy.contains('span', 'second').then(($element) => {
          cy.contains($element.text()).parent('div.toggle').find('button').contains('view').click() 
        })
        cy.contains('span', 'second').then(($element) => {
          cy.contains($element.text()).parent('div.toggle').find('button').contains('like').click().wait(500).click()})
 
          cy.contains('span', 'third').then(($element) => {
            cy.contains($element.text()).parent('div.toggle').find('button').contains('view').click() 
          })
          cy.contains('span', 'third').then(($element) => {
            cy.contains($element.text()).parent('div.toggle').find('button').contains('like').click().wait(500).click().wait(500).click()})

        cy.get('.blog').eq(0).should('contain', 'third') //highest number of likes
        cy.get('.blog').eq(1).should('contain', 'second') 
        cy.get('.blog').eq(2).should('contain', 'first') //lowest number of likes

})

    
  })
  })
})