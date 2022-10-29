import { MARCO_POLO_TASK_NAME } from './constants';
import '@testing-library/cypress/add-commands'

const token = Cypress.env('VAULT_MP_TOKEN');

export function getMarcoPoloTokenCommand() {
    return cy.task(MARCO_POLO_TASK_NAME, token);
}

export function addGetMarcoPoloTokenCommand() {
    Cypress.Commands.add(
        'getMarcoPoloToken',
        {
            prevSubject: ['optional', 'element', 'window', 'document'],
        },
        getMarcoPoloTokenCommand,
    );
}
