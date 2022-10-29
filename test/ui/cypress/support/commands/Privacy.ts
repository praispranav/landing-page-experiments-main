Cypress.Commands.add('givePrivacyConsent', (): Cypress.Chainable => {
    const date = new Date();
    return cy.setCookie('OptanonAlertBoxClosed', date.toISOString());
});
