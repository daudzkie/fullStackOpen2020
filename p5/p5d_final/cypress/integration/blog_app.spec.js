describe('Blog app', function() {
  beforeEach(function() {
    cy.login({ username: 'daudzkie', password: 'tinuod' })
  })

  it('front page can be opened', function() {
    cy.contains('Blogs')
  })

  it('login fails with wrong password', function() {
    cy.contains('login').click({ force: true })
    cy.get('#username').type('daudzkie')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('html').should('contain', 'Wrong credentials')
    // .and('have.css', 'color', 'rgb(255,0,0)')//not implemented
    // .and('have.css', 'border-style', 'solid') //not implemented

    /***'html' get access to the whole visible content */
    cy.get('html').should('not.contain', 'Dodskie Gwapo is logged in')
  })

  it('user can login and create a new blog', function() {
    cy.contains('login').click({ force: true })
    cy.get('#username').type('daudzkie')
    cy.get('#password').type('tinuod')
    cy.get('#login-button').click()

    cy.contains('Dodskie Gwapo is logged in')

    cy.get('html').contains('New Blog').click()
    cy.get('#title').type('The Dodskie Gwapo chronicles')
    cy.get('#author').type('Dodskie Gwapo')
    cy.get('#url').type('dodskiegwapo.com')
    cy.get('#likes').type(40000)
    cy.get('#btn-submit').click()
  })

  it('a user can like a blog', function() {
    cy.contains('login').click({ force: true })
    cy.get('#username').type('daudzkie')
    cy.get('#password').type('tinuod')
    cy.get('#login-button').click()

    cy.get('html').contains('view').click()
    cy.get('html').contains('like').click({ force: true })
  })

  it('a user can delete a blog', function() {
    cy.contains('login').click({ force: true })
    cy.get('#username').type('daudzkie')
    cy.get('#password').type('tinuod')
    cy.get('#login-button').debug().click()

    cy.wait(0)
    cy.get('ul')
      .last()
      // .last()
      // .find()
      .contains('view')
      .debug()
      .click({ force: true })

    cy.wait(0)
    cy.get('button')
      .contains('remove')
      .debug()
      .click({ force: true })

    cy.visit('http://localhost:3000/api/blogs')

    // cy.wait(0)
    // cy.get('html')
    // // .first()
    //   .contains('view')
    //   .debug()
    //   .click({ force: true })

    // .next('view')
    // .debug()
    // .click({ force: true })
    // .next('view')
    // .debug()
    // .click({ force: true })
    // .next('view')



    // cy.get('html').should('not.be.visible').last().click({ force: true })

    // cy.contains('view').should('not.be.visible').click({ force: true })
    // cy.get('button').eq(5).click({ force: true })
    // cy.get(':nth-child(5)').click({ force: true })
    // cy.get('button').eq(8).invoke('val').then((val)   => {
    //   cy.get('button').select(val).click()
    // })
    // cy.get('button.view:last-of-type').click({ force: true })
    // cy.get('button').last().contains('view').debug().click({ force: true })
    // cy.get('button').eq(9).contains('view').click({ force: true })
    // cy.get('#btn-view').eq(5).click({ force: true })/**not workig */
    // cy.get('html').contains('view').first().click({ force: true })/***not working */
    // cy.get('html', 'view').click({ force: true })/**not working */
    // cy.get('html').find('#btn-view', 'view').click({ force: true })
    // cy.get('html').contains('remove').click({ force: true })
    // cy.get('form').find('button').last().click()
  })
})

// describe('when logged in', function() {
//   beforeEach(function() {
//     /***pass username & password to support/commands */
//     /**login in command will perform login operation */
//     cy.login({ username: 'daudzkie', password: 'tinuod' })
//   })

//   it('a new blog can be created', function() {
//     cy.contains('New Blog').click()
//     cy.get('#title').type('The gwapo chronicles')
//     cy.get('#author').type('Dodskie Gwapo')
//     cy.get('#url').type('dodskiegwapo.com')
//     cy.get('#likes').type(50000)
//     cy.get('#btn-submit').click()

//     cy.get('html').should('contain', 'The gwapo chronicles by Dodskie Gwapo is added')
//   })
// })