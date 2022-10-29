import { mockOptimizely } from '../../support/mockFunctions/intercepters';


describe('Language switcher:', () => {
    beforeEach(() => {
        cy.viewport('macbook-11');
        mockOptimizely();
        cy.givePrivacyConsent();   
    });
    const germany = 'DE';
    it(`switches language between EN/${germany} on ${germany} LP footer`, () => {
        cy.visitExperimentWithDevPackage(`en-${germany}`);
        cy.enableMarcoPolo(germany);
        cy.waitForIdleNetwork();
        cy.findByRole('link', {name: /Auf Deutsch/i}).click();
        cy.waitForIdleNetwork();
        cy.findByRole('link', {name: /English/i}).should('be.visible');      
    });
    const england = 'GB';
    it.skip(`is absent on ${england} page`, () => {
        cy.visitExperimentWithDevPackage(`en-${england}`);
        cy.enableMarcoPolo(england);
        cy.waitForIdleNetwork();
        cy.getByTestId('TBD')
                .should('not.exist');
    });
});
