import { mockOffersNoAddons, mockOptimizely } from '../../support/mockFunctions/intercepters';

describe('Fallback - Uncaught Error', () => {
    const country = 'DE';

    beforeEach(() => {
        mockOptimizely();

        cy.givePrivacyConsent();
        cy.visitExperimentWithDevPackage(`en-${country}`);
        cy.enableMarcoPolo(country);
    });

    it('should redirect to Open Browse', () => {
        mockOffersNoAddons();

        cy.window().should('have.property', 'dazn');

        cy.window().then((win) => {
            Object.defineProperty(win.dazn.startupData.Region, 'Currency', {
                get() {
                    throw new Error('Uncaught Error Test');
                },
            });
        });

        cy.window().should(
            'have.nested.property',
            'dazn.chapterHistory.currentChapter',
            'openbrowse',
        );
    });
});
