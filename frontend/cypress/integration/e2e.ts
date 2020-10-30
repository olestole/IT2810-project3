export {}; //Makes file turn into a module, added to remove error

describe('End to end test', () => {
  const options = {
    method: 'POST',
    url: 'https://dev-sti0dl03.eu.auth0.com/oauth/token',
    body: {
      grant_type: 'password',
      username: Cypress.env('username'),
      password: Cypress.env('password'),
      audience: Cypress.env('audience'),
      scope: 'openid profile email',
      client_id: Cypress.env('client_id'),
      client_secret: Cypress.env('client_secret'),
    },
  };

  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Page is showing', () => {
    cy.contains('WineEncyclopedia');
  });

  it('Filter on red wines', function () {
    cy.get('#kategoriId').click();
    cy.contains('Rødvin').click();
    cy.contains('4kilos 2018');
  });

  it('Filter on Øl, Brennevin, Annet and scroll', () => {
    cy.get('#kategoriId').click();
    cy.contains('Øl').click();
    cy.contains('Brennevin').click();
    cy.contains('Annet').click();
    cy.get('#kategoriId').click(); //Close menu
    cy.contains('1-Enkelt');
    cy.scrollTo('bottom').as('scroll');
    cy.contains('7 Fjell Fløien IPA');
  });

  it('Search on dom p', () => {
    cy.get('#searchField').type('dom p{enter}');
    cy.contains('#NKVO').should('not.be.visible');
    cy.contains('Dom Perignon Brut 2010').should('be.visible').click();
    cy.contains('Produsent: Moët & Chandon');
    //cy.should('include', '#NKVO');
  });

  it('Perform multiple searches', () => {
    cy.get('#searchField').type('bols{enter}');
    cy.contains('#NKVO').should('not.be.visible');
    cy.contains('Bols Blue').should('be.visible');
    cy.get('#searchField').type('banan'); //Typing in but not pressing enter
    cy.contains('De Kuyper Banana').should('not.be.visible');
    cy.get('#searchInputField').clear();
    cy.get('#searchField').type('apple{enter}');
    cy.contains('Bacardi Pineapple').should('be.visible');
    cy.get('#searchField').type('Liverpool{enter}');
    cy.contains('Liverpool Gin').should('be.visible');
  });

  it('Commenting item working', () => {
    cy.request(options);
    cy.get('#searchField').type('bad santa{enter}');
    cy.contains('Bad Santa Juleakevitt').should('be.visible').click();
    cy.get('#loginForReviewButton').click();
    cy.url().should('eq', 'http://localhost:3000/profile');
    cy.get('#loginButton').click();
    cy.get('#1-email').type(Cypress.env('username'));
    cy.get('[type=password]').type(Cypress.env('password'));
    cy.get('[type=submit]').click();
    cy.get('#reviewProductButton').click();
    cy.get('#reviewHeaderText').type('Test Tittel');
    cy.get('#reviewRating').click();
    cy.get('#reviewProductText').type('Wow test is running, cool');
    cy.get('#saveReviewButton').click();
    cy.contains('Anmeldelsen er registrert').should('be.visible');
    cy.get('#profileIcon').click();
    cy.get('#logOutButton').click();
  });
});
