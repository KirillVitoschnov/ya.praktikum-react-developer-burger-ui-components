const LOGIN_EMAIL = 'lejitiv169@agenra.com';
const LOGIN_PASSWORD = 'lejitiv169@agenra.com';

describe('Burger Constructor Interaction', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/login');

        cy.get('input[type="email"]').type(LOGIN_EMAIL);
        cy.get('input[type="password"]').type(LOGIN_PASSWORD);
        cy.contains('button', 'Войти').click();

        cy.url().should('eq', 'http://localhost:3000/');

        cy.get('body').then(($body) => {
            if ($body.find('button:contains("Очистить корзину")').length > 0) {
                cy.contains('button', 'Очистить корзину').click();
            }
        });
    });

    function selectIngredientBySection(sectionName) {
        cy.contains('h2', sectionName)
            .parent()
            .find('[class*="card-ingridient_card__"]')
            .first()
            .drag('[class*="burger-constructor_main__container__"]');
    }

    it('should create a burger, reorder ingredients, and place an order', () => {
        cy.intercept('POST', '/api/orders').as('createOrder');

        selectIngredientBySection('Булки');
        selectIngredientBySection('Соусы');
        selectIngredientBySection('Начинки');

        cy.contains('button', 'Оформить заказ')
            .should('not.be.disabled')
            .click();

        cy.wait('@createOrder')
            .its('response.statusCode')
            .should('eq', 200);

        cy.get('[class*="modal-overlay_modal__overlay__"]', { timeout: 10000 })
            .should('be.visible');

        cy.contains('Ваш заказ начали готовить').should('be.visible');
        cy.contains('Дождитесь готовности на орбитальной станции').should('be.visible');

        cy.get('button[class*="modal_modal__btn_confirm__"]').click();

        cy.get('[class*="modal-overlay_modal__overlay__"]').should('not.exist');
    });
});
