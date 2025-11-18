const LOGIN_EMAIL = 'lejitiv169@agenra.com';
const LOGIN_PASSWORD = 'lejitiv169@agenra.com';

describe('Burger Constructor Interaction', () => {
    beforeEach(() => {
        cy.login(LOGIN_EMAIL, LOGIN_PASSWORD);
        cy.clearCart();
    });

    it('should open ingredient details modal and check content', () => {
        cy.contains('h2', 'Булки')
            .parent()
            .find('[class*="card-ingridient_card__"]')
            .first()
            .click();

        cy.get('section[class*="modal_modal__"]')
            .should('be.visible')
            .within(() => {
                cy.get('header[class*="modal_modal__header__"] h1')
                    .should('have.text', 'Детали ингредиента');
                cy.get('.ingredient-details_details__xokdJ').within(() => {
                    cy.get('img').should('have.attr', 'alt').and('include', 'булка');
                    cy.get('p.ingredient-details_details__name__AWCIS')
                        .should('contain.text', 'булка');
                    cy.get('.ingredient-details_details__compound__pi0Hp')
                        .within(() => {
                            cy.contains('Калории, ккал').should('exist');
                            cy.contains('Белки, г').should('exist');
                            cy.contains('Жиры, г').should('exist');
                            cy.contains('Углеводы, г').should('exist');
                        });
                });
            });

        cy.get('button[class*="modal_modal__btn__"]')
            .click();

        cy.get('section[class*="modal_modal__"]').should('not.exist');
    });

    it('should add ingredient from list to constructor', () => {
        cy.get('[class*="burger-ingredients_burger__left__"]', { timeout: 10000 }).should('be.visible');

        cy.contains('h2', 'Булки')
            .parent()
            .find('[class*="card-ingridient_card__cgQTP"]')
            .first()
            .then(($ingredient) => {
                const ingredientName = $ingredient.find('p').text();
                const ingredientPrice = $ingredient.find('[class*="card-ingridient_card__price__"]').text();

                const dataTransfer = new DataTransfer();
                cy.wrap($ingredient)
                    .trigger('dragstart', { dataTransfer });

                cy.get('[class*="burger-constructor_main__container__"]')
                    .trigger('drop', { dataTransfer });

                cy.get('[class*="burger-constructor_main__container__"]')
                    .should('contain.text', ingredientName)
                    .and('contain.text', ingredientPrice);
            });
    });

    it('should create a burger, reorder ingredients, and place an order', () => {
        cy.intercept('POST', '/api/orders').as('createOrder');

        cy.contains('h2', 'Булки')
            .parent()
            .find('[class*="card-ingridient_card__cgQTP"]')
            .first()
            .then(($bun) => {
                const dataTransfer = new DataTransfer();
                cy.wrap($bun)
                    .trigger('dragstart', { dataTransfer });

                cy.get('[class*="burger-constructor_main__container__"]')
                    .trigger('drop', { dataTransfer });
            });

        cy.contains('h2', 'Соусы')
            .parent()
            .find('[class*="card-ingridient_card__cgQTP"]')
            .first()
            .then(($sauce) => {
                const dataTransfer = new DataTransfer();
                cy.wrap($sauce)
                    .trigger('dragstart', { dataTransfer });

                cy.get('[class*="burger-constructor_main__container__"]')
                    .trigger('drop', { dataTransfer });
            });

        cy.contains('h2', 'Начинки')
            .parent()
            .find('[class*="card-ingridient_card__cgQTP"]')
            .first()
            .then(($filling) => {
                const dataTransfer = new DataTransfer();
                cy.wrap($filling)
                    .trigger('dragstart', { dataTransfer });

                cy.get('[class*="burger-constructor_main__container__"]')
                    .trigger('drop', { dataTransfer });
            });

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