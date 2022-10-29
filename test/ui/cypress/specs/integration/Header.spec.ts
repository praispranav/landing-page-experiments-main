enum Viewports {
    Desktop = 'macbook-11',
    Tablet = 'ipad-mini',
    Mobile = 'iphone-xr',
}

describe('Header', () => {
    describe('Default', () => {
        beforeEach(() => cy.visitStory('sections-header--default'));

        describe('Mobile viewport', () => {
            beforeEach(() => cy.viewport(Viewports.Mobile));

            it('should show the sign up banner with no header visible if after the user has scrolled below the fold and click signup', () => {
                cy.getByTestId('SECTION_BELOW_FOLD').scrollIntoView().should('be.visible');
                cy.getByTestId('HEADER').should('have.length', 1).should('not.be.inViewport');
                cy.getById("HEADER_SIGN_UP_BANNER").should('be.inViewport').click();

                cy.waitForIdleNetwork();
                cy.window()
                    .its('dazn.chapterHistory.currentChapter.chapterName')
                    .should('eq', 'auth');
            });

            it("should hide the header and the sign up banner if the user has scrolled, but hasn't reached below the fold", () => {
                cy.getByTestId('SECTION_BELOW_FOLD').scrollIntoView({
                    offset: { top: -400, left: 0 },
                });

                cy.getByTestId('HEADER').should('not.be.inViewport');
                cy.getById("HEADER_SIGN_UP_BANNER").should('not.be.inViewport');
            });

            it("should show the header if the user hasn't scrolled", () => {
                cy.getByTestId('HEADER').should('have.length', 1).should('be.visible');
                cy.getById("HEADER_SIGN_UP_BANNER").should('not.be.inViewport');
                cy.getById("HEADER_SIGN_IN").click();

                cy.waitForIdleNetwork();
                cy.window().its('dazn.chapterHistory.currentChapter').should('eq', 'signin');
            });
        });

        describe('Desktop and tablet viewports', () => {
            [Viewports.Desktop, Viewports.Tablet].forEach((viewport: Viewports) => {
                beforeEach(() => cy.viewport(viewport));

                it('should not show the sign up banner after the user has scrolled below the fold', () => {
                    cy.getByTestId('SECTION_BELOW_FOLD').scrollIntoView();
                    cy.getById("HEADER_SIGN_UP_BANNER").should('not.be.visible');
                });

                it('should show the header after the user has scrolled below the fold', () => {
                    cy.getByTestId('SECTION_BELOW_FOLD').scrollIntoView();
                    cy.getByTestId('HEADER').should('be.visible');
                });

                it("should show the header and go to singup if the user hasn't scrolled below the fold", () => {
                    cy.getByTestId('HEADER').should('have.length', 1).should('be.visible');
                    cy.getById("HEADER_SIGN_UP").should('be.inViewport').click();

                    cy.waitForIdleNetwork();
                    cy.window()
                        .its('dazn.chapterHistory.currentChapter.chapterName')
                        .should('eq', 'auth');
                });

                it('should scroll to the top upon clicking in the logo', () => {
                    cy.getByTestId('SECTION_BELOW_FOLD').scrollIntoView();
                    cy.getByTestId('SECTION_ON_FOLD').should('not.be.inViewport');
                    cy.getByTestId('HEADER_LOGO_ANCHOR').click();
                    cy.getByTestId('SECTION_ON_FOLD').should('be.inViewport');
                });
            });
        });
    });

    describe('Relative content', () => {
        before(() => cy.visitStory('sections-header--header-with-relative-element'));

        it('should cover relative elements', () => {
            cy.getByTestId('SECTION_RELATIVE_CONTENT')
                .scrollIntoView({ offset: { top: 250, left: 0 } })
                .should('be.covered');
        });
    });
});
