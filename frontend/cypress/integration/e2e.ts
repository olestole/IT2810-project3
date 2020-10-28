export {}; //Makes file turn into a module, added to remove error

describe('End to end test', () => {
  const email: string = 'testUser123@gmail.com';
  const password: string = 'ValidPassword123';
  //https://dev-sti0dl03.eu.auth0.com/login?state=g6Fo2SBZNG5iNXhKRDE3QXQzMlpfeEROekI0RFdfZTF2M2JtZKN0aWTZIEpNZTFyT2V0RVN0NmVfQnJhWU5ScmRmczlUalFQZGNGo2NpZNkgc1oxQWJ2N2QzNXdTdk9MSkNkNEdnMkRwZjQ3V2o2d1Y&client=sZ1Abv7d35wSvOLJCd4Gg2Dpf47Wj6wV&protocol=oauth2&audience=https%3A%2F%2Fdev-sti0dl03.eu.auth0.com%2Fapi%2Fv2%2F&scope=openid%20profile%20email%20read%3Acurrent_user%20update%3Acurrent_user_metadata&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&response_type=code&response_mode=query&nonce=V2tOcVVDNzZDdVBlMFFjTlRqMDEzQ1lfYjFzVndNb1pmbnpneFlPTkZpRw%3D%3D&code_challenge=xN6dyDI_8Ffpe699c_NetEEKP7bGn-8pROl3IoyPAZ8&code_challenge_method=S256&auth0Client=eyJuYW1lIjoiYXV0aDAtcmVhY3QiLCJ2ZXJzaW9uIjoiMS4xLjAifQ%3D%3D
  const options = {
    method: 'POST',
    url: 'https://dev-sti0dl03.eu.auth0.com/oauth/token',
    body: {
      grant_type: 'password',
      username: 'testUser123@gmail.com',
      password: 'ValidPassword123',
      audience: 'https://dev-sti0dl03.eu.auth0.com/api/v2/',
      scope: 'openid profile email',
      //client_id: '',
      //client_secret: '',
      client_id: `${process.env.REACT_APP_AUTH0_CLIENT_ID}`,
      client_secret: `${process.env.REACT_APP_CLIENT_SECRET}`,
    },
  };

  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });
  /*
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
*/
  it('Comment item', () => {
    //create function for login
    cy.request(options);
    cy.get('#searchField').type('bad santa{enter}');
    cy.contains('Bad Santa Juleakevitt').should('be.visible').click();
    cy.get('#loginForReviewButton').click();
    cy.url().should('eq', 'http://localhost:3000/login');
    //cy.get('#loginButton').click();
    //https://stackoverflow.com/questions/51208998/how-to-login-in-auth0-in-an-e2e-test-with-cypress
  });
});
