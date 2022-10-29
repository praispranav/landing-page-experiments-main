describe('Whats on', () => {
    const storyName = 'sections-whatson--default';

    describe('Epg', () => {
        it(`when mode is EpgEntitlements, the purchased label shouldn't appear`, () => {
            cy.visitStory(`${storyName}&args=mode:EpgEntitlements;`);

            cy.getByTestId('CONTAINER').should('exist');
            cy.getByTestId('PURCHASED_LABEL_TILE').should('not.exist');
        });
    });

    describe('Coming Up', () => {
        it(`should show PPV Elements`, () => {
            cy.visitStory(`${storyName}&args=mode:ComingUp;`);

            cy.getByTestId('PPV_TAG').should('be.visible');
        });
    });

    describe('Next Up', () => {
        it(`should show PPV Elements`, () => {
            cy.visitStory(`${storyName}&args=mode:NextUp;railId:27474ae4-3032-4f5e-bb92-518697c95bd6`);

            cy.getByTestId('PPV_TAG').should('be.visible');
        });
    });
});
