import {
    mockFAQ,
    mockEpg,
    mockRailsResponse,
    mockImages,
    mockOptimizely,
    mockSpoloResponse,
} from '../../support/mockFunctions/intercepters';

describe.skip('Stage Tests', () => {
    const makeHeaderStatic = () =>
        cy.getByTestId('HEADER').then((el) => (el[0].style.position = 'static'));

    const hideDevModeIndicator = () => cy.get('#devMode').invoke('css', 'display', 'none');
    const hideHeaderElements = () => {
        cy.getById("HEADER_SIGN_IN").then((el) => (el[0].style.display = 'none'));
        cy.getById("HEADER_SIGN_UP_BANNER").then((el) => (el[0].style.display = 'none'));
    };

    const transformPageBeforeTest = () => {
        cy.givePrivacyConsent();

        hideHeaderElements();
        makeHeaderStatic();
    };

    const isWhatsonCountry = (country: string) => ['US', 'IE', 'GB'].includes(country);

    type ViewportPreset = 'macbook-11' | 'ipad-mini' | 'iphone-8';
    const VIEWPORTS: Array<ViewportPreset> = ['iphone-8', 'ipad-mini', 'macbook-11'];
    for (let viewport of VIEWPORTS) {
        it(`should render en-DE in ${viewport} viewport`, () => {
            const now = new Date(Date.UTC(2021, 4, 9)).getTime();

            mockOptimizely().as('optimizely');
            mockImages();
            mockFAQ();
            mockEpg().as('epg');
            mockSpoloResponse();
            cy.clock(now);
            cy.viewport(viewport);

            cy.visitExperimentWithDevPackage('en-DE');
            cy.wait('@epg');
            cy.wait('@optimizely');

            transformPageBeforeTest();
            // this is to wait until react renders data
            cy.wait(2000);

            cy.matchImageSnapshot(`landing-page-en-DE-${viewport}`);
        });
    }

    const COUNTRIES = ['US', 'JP', 'GB', 'IE'];

    for (let country of COUNTRIES) {
        it(`should render ${country} in desktop viewport`, () => {
            const now = new Date(Date.UTC(2021, 4, 9)).getTime();
            cy.clock(now);
            cy.viewport('macbook-11');
            mockImages();
            mockFAQ().as('faq');
            mockSpoloResponse();

            if (isWhatsonCountry(country)) {
                mockRailsResponse();
            } else {
                mockEpg();
            }

            cy.visitExperimentWithDevPackage(`en-${country}`);
            cy.enableMarcoPolo(country);

            cy.wait('@faq');
            transformPageBeforeTest();
            hideDevModeIndicator();
            // this is to wait until react renders data
            cy.wait(2000);

            cy.matchImageSnapshot(`landing-page-en-${country}-desktop`);
        });
    }
});
