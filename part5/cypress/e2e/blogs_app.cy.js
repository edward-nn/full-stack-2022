describe('Blog app ', function() {
  beforeEach(function() {
    cy.visit('')
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    const userNew = {
      name: 'New Matti Luukkainen',
      username: 'mluukkaiNew',
      password: 'salainen'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, userNew)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('log in')
    cy.get('html').should('not.contain', 'Note app, Department of Computer Science, University of Helsinki 2023')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('mluukkai logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error').contains('Wrong credentials')
      cy.get('.error').should('contain', 'Wrong credentials')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.error').should('have.css', 'border-style', 'solid')
      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
      cy.contains('Matti Luukkainen logged in').should('not.exist')

    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title-input').type('a blog created by cypress')
      cy.get('#author-input').type('a author created by cypress')
      cy.get('#url-input').type('a url created by cypress')
      cy.get('.click').click()
      cy.contains('a blog created by cypress')
      cy.contains('blogs')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'another blog cypress',
          author: ' another author created by cypress',
          url: ' another url created by cypress',
        })
      })

      it('it can be view', function () {
        cy.contains('blogs')
        cy.contains('mluukkai logged in')
        cy.contains('another blog cypress')
        cy.get('.hideVisible').click()
        cy.contains('likes').find('button').click()
        cy.contains('likes').should('contain', '1')
        cy.contains('remove').click()
        
      })
      describe('logging in with another user', function () {
        beforeEach(function () {
          cy.login({ username: 'mluukkaiNew', password: 'salainen' })
        })

        it('only the creator can see the delete button of a blog', function () {
          cy.get('.blog').should('exist')
          cy.get('.hideVisible').click()
          cy.get('.blog-deleteButton').should('not.exist')
        })
      })

      describe('and another blog exists', function () {
        beforeEach(function () {
          cy.createBlog({
            title: 'another one blog cypress',
            author: ' another one author created by cypress',
            url: ' another one url created by cypress',
          })
          cy.createBlog({
            title: 'a blog created by cypress',
            author: ' a author created by cypress',
            url: ' a url created by cypress',
          })
        })
        it('The blogs are ordered according to likes', function() {
          cy.get('.hideVisible').then( buttons => {
            console.log('number of buttons', buttons.length)
            cy.wrap(buttons).click({ multiple: true })
            cy.contains('likes').find('button').click()
            cy.contains('likes').find('button').click()
            cy.get('.blog').then((blogs) => {
              const blogLikes = blogs.map((i, blog) => {
                const likeCountText =  Cypress.$(blog).find('.blogLikes').text()
                const likeCount = parseInt(likeCountText.match(/\d+/)[0], 10)
                console.log('likeCount', likeCount)
                return likeCount
              })
              for(let i = 0; i < blogLikes.length - 1; i++ ){
                expect(blogLikes[i] ).to.be.at.least(blogLikes[i +1])
              }
            })
            cy.get('.blog').eq(0).should('contain', 'another blog cypress')
            cy.get('.blog').eq(1).should('contain', 'another one blog cypress')
            cy.get('button').then( buttons => {
              console.log('number of buttons', buttons.length)
              cy.wrap(buttons[0]).click()
            })

          })
        })
      })
    })
  })
})