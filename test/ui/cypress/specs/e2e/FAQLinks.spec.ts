import { mockOptimizely, mockFAQ } from '../../support/mockFunctions/intercepters';

describe('FAQ Links', () => {
    const articleName = 'Article with Collapsibles';
    const country = 'DE';

    before(() => {
        mockOptimizely();
        mockFAQ();

        cy.givePrivacyConsent();
        cy.visitExperimentWithDevPackage(`en-${country}`);
        cy.enableMarcoPolo(country);
    });

    it(`clicking on ${articleName} article should redirect to a help page`, () => {
        const article = cy.contains('[data-testid="FAQ_ARTICLE_TITLE"]', articleName);
        article.parent().click();

        cy.waitForIdleNetwork();
        cy.url().should('contain', 'en-DE/help/articles/article-with-collapsibles');
        cy.get('[data-test-id="headline"]')
            .contains('Hi, how can we help you today?')
            .should('be.visible');
    });
});
