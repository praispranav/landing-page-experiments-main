describe('Footer', () => {
        it(`is presented on the page`, () => {
            cy.visitStory('sections-footer--default-story');
            cy.findByRole('contentInfo').should('exist');
        });
});
