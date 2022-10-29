import 'cypress-iframe';

Cypress.Commands.add(
    'getIframeDocument',
    (iframeName: string): Cypress.Chainable => {
        return cy.get(`iframe[id="${iframeName}"]`).its('0.contentDocument').should('exist');
    },
);

Cypress.Commands.add(
    'getIframeBody',
    (iframeName: string): Cypress.Chainable => {
        return cy
            .getIframeDocument(iframeName)
            .its('body')
            .should('not.be.undefined')
            .then(cy.wrap);
    },
);

Cypress.Commands.add(
    'getByTestId',
    { prevSubject: ['optional', 'document', 'window', 'element'] },
    (subject: Cypress.Chainable, selector: string, ...args): ReturnType<typeof cy.get> => {
        const testIdSelector = `[data-testid=${selector}],[data-test-id=${selector}]`;

        if (subject) {
            return cy.wrap(subject).find(testIdSelector, ...args);
        }

        return cy.get(testIdSelector, ...args);
    },
);

Cypress.Commands.add(
    'getById',
    { prevSubject: ['optional', 'document', 'window', 'element'] },
    (subject: Cypress.Chainable, selector: string, ...args): ReturnType<typeof cy.get> => {
        const testIdSelector = `[id=${selector}]`;

        if (subject) {
            return cy.wrap(subject).find(testIdSelector, ...args);
        }

        return cy.get(testIdSelector, ...args);
    },
);
