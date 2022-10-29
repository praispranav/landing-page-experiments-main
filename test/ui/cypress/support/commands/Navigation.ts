interface IVisitStoryOptionsCommand {
    withControls: boolean;
}

Cypress.Commands.add(
    'visitStory',
    (
        storyName: string,
        { withControls }: IVisitStoryOptionsCommand = { withControls: false },
    ): ReturnType<typeof cy.visit | typeof cy.iframe> => {
        const baseUrl = Cypress.env('STORYBOOK_BASE_URL') ?? 'http://localhost:6006';

        const path = withControls
            ? `?path=/story/${storyName}`
            : `iframe.html?id=${storyName}&viewMode=story`;
        const route = `${baseUrl}/${path}`;

        cy.intercept(route).as('visitStory');
        const visit = cy.visit(route);
        visit.wait('@visitStory');

        const storyFrame = withControls ? visit.iframe() : visit;
        if (withControls) {
            storyFrame.getByTestId('PREVIEW_LOADER', { timeout: 10000 }).should('not.exist');
        } else {
            cy.getByTestId('PREVIEW_LOADER', { timeout: 10000 }).should('not.exist');
        }

        return storyFrame;
    },
);

Cypress.Commands.add(
    'visitExperimentWithDevPackage',
    (region: string): ReturnType<typeof cy.visit> => {
        localStorage.setItem(
            '@dazn/landing-page-experiments/developmentPath',
            Cypress.env('packageServer'),
        );
        return cy.visit(`https://stag.dazn.com/${region}/l/sports`);
    },
);
