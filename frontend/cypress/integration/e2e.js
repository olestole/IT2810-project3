describe('CRA', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Filter on red wines', function () {
    cy.contains('WineEncyclopedia');
    cy.get('#kategoriId').click();
    cy.contains('Rødvin').click();
    cy.contains('4kilos 2018');
    //cy.should('include', '#NKVO');
  });
});
