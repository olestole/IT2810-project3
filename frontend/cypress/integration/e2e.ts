export {}; //Makes file turn into a module, added to remove error

describe('End to end test', () => {
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

  it('create user', () => {});

  it('Comment item', () => {
    //create function for login
  });
});
