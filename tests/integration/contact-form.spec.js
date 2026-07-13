describe('Contact Suite', () => {
  beforeEach(() => {
    cy.visit('/cypress/fixtures/test-page.html');
  });

  it('renderiza el formulario con toggle', () => {
    cy.get('.lcs-root').should('exist');
    cy.get('.lcs-toggle__option').should('have.length', 2);
  });

  it('cambia de canal y oculta campos', () => {
    cy.get('.lcs-toggle__option[data-channel="whatsapp"]').click();
    cy.get('[data-field-name="email"]').should('have.class', 'lcs-field--hidden');
  });

  it('muestra error de validación', () => {
    cy.get('button[type="submit"]').click();
    cy.get('.lcs-field__error--visible').should('exist');
  });

  it('envía correctamente', () => {
    cy.window().then((win) => {
      win.fetch = () => Promise.resolve({ ok: true, json: () => Promise.resolve({}), headers: { get: () => 'application/json' } });
    });
    cy.get('#lcs-name').type('Juan');
    cy.get('#lcs-message').type('Hola');
    cy.get('button[type="submit"]').click();
    cy.get('.lcs-status--success').should('contain', 'éxito');
  });
});
