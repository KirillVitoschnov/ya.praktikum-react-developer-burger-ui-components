import 'cypress-drag-drop';

Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  cy.get('input[type="email"]').type(email);
  cy.get('input[type="password"]').type(password);
  cy.contains('button', 'Войти').click();
  cy.url().should('eq', Cypress.config('baseUrl') + '/');
});

Cypress.Commands.add('clearCart', () => {
  cy.get('body').then(($body) => {
    if ($body.find('button:contains("Очистить корзину")').length > 0) {
      cy.contains('button', 'Очистить корзину').click();
    }
  });
});

Cypress.Commands.add('dragIngredientToConstructor', (sectionName) => {
  cy.contains('h2', sectionName)
    .parent()
    .find('[class*="card-ingridient_card__"]')
    .first()
    .drag('[class*="burger-constructor_main__container__"]');
});

export {};
