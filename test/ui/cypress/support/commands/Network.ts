import { isPlainObject, last } from 'cypress/types/lodash';
import { DaznChapterEnum } from '../../../../../src/types/dazn/DaznChapterEnum';

Cypress.Commands.add(
    'interceptChapter',
    (chapterName: DaznChapterEnum, ...args): ReturnType<typeof cy.intercept> => {
        const aliasName = `${chapterName}_chapter`;
        const regexChapter = new RegExp(`chapters/\\w{2}/${chapterName}`);

        return cy.intercept(regexChapter, {}).as(aliasName);
    },
);

Cypress.Commands.add(
    'waitForIdleNetwork',
    ({ timeout = Cypress.config('defaultCommandTimeout') } = {}): Cypress.Chainable => {
        cy.log('Waiting for network to be idle...');

        return cy
            .window()
            .then(
                { timeout },
                (win) =>
                    new Cypress.Promise((resolve: () => void) => win.requestIdleCallback(resolve)),
            );
    },
);

Cypress.Commands.add(
    'waitForResources',
    (resources: string[], { timeout = Cypress.config('defaultCommandTimeout') } = {}) => {
        if (Cypress.browser.family === 'firefox') {
            cy.log('Skip waitForResource in Firefox');

            return;
        }

        const log = false; // let's not log inner commands

        cy.log('Waiting for resources', resources);

        cy.window({ log }).then({ timeout }, (win) => {
            return new Cypress.Promise((resolve, reject) => {
                // flag set when we find all names
                let hasFoundResources: boolean;

                // control how long we should try finding the resource
                // and if it is still not found. An explicit "reject"
                // allows us to show nice informative message
                setTimeout(() => {
                    if (hasFoundResources) {
                        // nothing needs to be done, successfully found the resource
                        return;
                    }

                    clearInterval(interval);
                    reject(new Error(`Timed out waiting for resources ${resources.join(', ')}`));
                }, timeout);

                const interval = setInterval(() => {
                    hasFoundResources = resources.every((name) => {
                        return win.performance
                            .getEntriesByType('resource')
                            .find((item) => item.name.endsWith(name));
                    });

                    if (!hasFoundResources) {
                        // some resource not found, will try again
                        return;
                    }

                    cy.log('Found all resources');
                    clearInterval(interval);
                    resolve();
                }, 100);
            });
        });
    },
);
