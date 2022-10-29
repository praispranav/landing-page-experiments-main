import { mockEpg } from '../../support/mockFunctions/intercepters';

describe('Whats On Section UI', () => {
    const storyName = 'sections-whatson--default';

    const epgModes = ['Epg', 'EpgEntitlements'];

    type ViewportPreset = 'macbook-11' | 'macbook-15' | 'ipad-mini' | 'iphone-8';
    const VIEWPORTS: Array<ViewportPreset> = ['iphone-8', 'ipad-mini', 'macbook-11', 'macbook-15'];

    const epgParams = VIEWPORTS.map((viewport) =>
        epgModes.map((mode) => ({ viewport, mode })),
    ).reduce((previousValue, currentValue) => [...previousValue, ...currentValue], []);

    const comingUpParams = VIEWPORTS.map((viewport) => ({ viewport, mode: 'ComingUp' }));

    const nextUpParamsWithoutRailId = VIEWPORTS.map((viewport) => ({ viewport, mode: 'NextUp' }));

    const nextUpParamsWithRailId = VIEWPORTS.map((viewport) => ({ viewport, mode: 'NextUp', railId: '27474ae4-3032-4f5e-bb92-518697c95bd6' }));

    beforeEach(() => {
        const now = new Date(Date.UTC(2021, 4, 9)).getTime();
        cy.clock(now);

        mockEpg().as('epg');
    });

    epgParams.forEach(({ mode, viewport }) => {
        it(`when mode:${mode}, viewport:${viewport} match image snapshot`, () => {
            cy.viewport(viewport);
            cy.visitStory(`${storyName}&args=mode:${mode};`);
            cy.getByTestId('CONTAINER').should('exist');
            cy.wait(3000);
            cy.matchImageSnapshot(`whats-on-section-${mode}-${viewport}`);
        });
    });

    comingUpParams.forEach(({ mode, viewport }) => {
        it(`when mode:${mode}, viewport:${viewport} match image snapshot`, () => {
            cy.viewport(viewport);
            cy.visitStory(`${storyName}&args=mode:${mode};`);
            cy.wait(3000);
            cy.matchImageSnapshot(`whats-on-section-${mode}-${viewport}`);
        });
    });

    nextUpParamsWithoutRailId.forEach(({ mode, viewport }) => {
        it(`when mode:${mode}, viewport:${viewport} match image snapshot without railId`, () => {
            cy.viewport(viewport);
            cy.visitStory(`${storyName}&args=mode:${mode};`);
            cy.wait(3000);
            cy.matchImageSnapshot(`whats-on-section-ComingUp-${viewport}`);
        });
    });

    nextUpParamsWithRailId.forEach(({ mode, viewport, railId }) => {
        it(`when mode:${mode}, viewport:${viewport} match image snapshot with railId:${railId}`, () => {
            cy.viewport(viewport);
            cy.visitStory(`${storyName}&args=mode:${mode};railId:${railId};`);
            cy.wait(3000);
            cy.matchImageSnapshot(`whats-on-section-${mode}-${viewport}`);
        });
    });
});
