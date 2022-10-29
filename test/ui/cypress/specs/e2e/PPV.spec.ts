import {
    mockOffersNoAddons,
    mockOffersAddons,
    mockRailPPVResponse,
    mockImages,
    mockOptimizely,
    mockOptimizelyNoAddons,
} from '../../support/mockFunctions/intercepters';

describe('PPV', () => {
    const country = 'US';

    beforeEach(() => {
        cy.viewport('macbook-11');

        mockOptimizely();

        cy.givePrivacyConsent();
        cy.visitExperimentWithDevPackage(`en-${country}`);
        cy.enableMarcoPolo(country);
        cy.waitForIdleNetwork();
    });

    describe('Disabled', () => {
        it(`is not shown on Hero section in ${country} when Offers API sends empty Addon`, () => {
            mockOffersNoAddons();

            cy.getById("HERO_PPV_TAG").should('not.exist');
        });
    });

    describe('Enabled', () => {
        const checkPPVElements = (subject: 'not.exist' | 'exist') => {
            cy.getById("HERO_PPV_TAG").should(subject);
            cy.getByTestId('HERO_PPV').should(subject);
            cy.getByTestId('HERO_PRICES_ADDONS').should(subject);
        };

        beforeEach(() => {
            mockRailPPVResponse();
            mockOffersAddons();
        });

        it(`labels are shown on Hero/Whats On section in ${country} when Offers/Rail API sends PPV info`, () => {
            mockImages();

            cy.getById('HERO_PPV_TAG').should('exist');

            let ppvPicture = cy.getByTestId('IMAGE_FIGHT_CARD_0').parent();
            ppvPicture
                .children("[data-testid='PPV_TILE_TEXT']")
                .should('to.have.text', 'SUBSCRIBE TO BUY');

            ppvPicture = cy.getByTestId('IMAGE_FIGHT_CARD_0').parent();
            const ppvTag = ppvPicture.children("[data-testid='PPV_TAG']");
            ppvTag.children('[id=PPV_TAG_TEXT]').should('exist');

            const notPpvPicture = cy.getByTestId('IMAGE_FIGHT_CARD_1').parent();
            notPpvPicture.children("[data-testid='PPV_TAG']").should('not.exist');
        });
    });

});
