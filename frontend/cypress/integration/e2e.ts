export {}; //Makes file turn into a module, added to remove error

describe('End to end test', () => {
  const email: string = 'testUser123@gmail.com';
  const password: string = 'ValidPassword123';

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
    //cy.should('include', '#NKVO');
  });

  it('Filter on Øl, Brennevin, Annet and scroll', () => {
    cy.get('#kategoriId').click();
    cy.contains('Øl').click();
    cy.contains('Brennevin').click();
    cy.contains('Annet').click();
    cy.get('#kategoriId').click(); //Close menu
    cy.contains('1-Enkelt');
    cy.scrollTo('bottom', { duration: 1000 });
    cy.scrollTo('bottom', { duration: 1000 });
    cy.scrollTo('bottom', { duration: 1000 });
    cy.scrollTo('bottom', { duration: 1000 });
    cy.contains('Aalborg Nordguld');
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

  it('create user', () => {});

  it('Comment item', () => {
    //create function for login
    cy.get('#searchField').type('bad santa{enter}');
    cy.contains('Bad Santa Juleakevitt').should('be.visible').click();
    cy.get('#loginForReviewButton').click();
    cy.url().should('eq', 'http://localhost:3000/login');
    //cy.get('#loginButton').click();
    //https://stackoverflow.com/questions/51208998/how-to-login-in-auth0-in-an-e2e-test-with-cypress
  });
});
