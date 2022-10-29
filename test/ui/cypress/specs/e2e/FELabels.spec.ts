import {
    mockOffersAddons,
    mockRailPPVResponse,
    mockOptimizelyFELabelsPPV,
    mockExperimentsAcc,
    mockOptimizelyFELabelsHero,
    mockOffersNoAddonsFreeTrial,
} from '../../support/mockFunctions/intercepters';

const viewPort = ['macbook-11'];

describe('Check FE-labels - PPV enable', () => {
    const country = 'US';

    beforeEach(() => {

        mockOptimizelyFELabelsPPV();

        cy.givePrivacyConsent();
        cy.visitExperimentWithDevPackage(`en-${country}`);
        cy.enableMarcoPolo(country);
    });

    describe('Enabled', () => {
        const checkPPVElements = (subject: 'not.exist' | 'exist') => {
            cy.getById('HERO_PPV_TAG').should(subject);
            cy.getByTestId('HERO_PPV').should(subject);
            cy.getByTestId('HERO_PRICES_ADDONS').should(subject);
        };

        beforeEach(() => {
            mockRailPPVResponse();
            mockOffersAddons();
            mockExperimentsAcc();
        });

        viewPort.forEach(viewport => {
            it(`Validate fe-labels on PPV elements with viewPort ${viewport}`, () => {
                cy.viewport(<Cypress.ViewportPreset>viewport);
                checkPPVElements('exist');
                cy.fixture('../support/mockResponses/experimentsAccResponse').then(experiments => {
                    const data = experiments.Experiments.e_acc_ar_fe_labels_lp_redesgin;

                    cy.getById('HERO_TITLE').should('have.text', data.landingpages_web_hero_title_ppv.B);
                    cy.getById('HERO_DESCRIPTION').should('to.have.text', data.landingpages_web_hero_description_ppv.B);
                    cy.getByTestId('HERO_PRICE_MONTH').children('[id="HERO_PRICE_LABEL"]')
                        .should('to.have.text', data.landingpages_web_hero_billingMonthly_ppv.B);
                    cy.getByTestId('HERO_PRICE').children('[id="HERO_PRICE_LABEL"]')
                        .should('to.have.text', data.landingpages_web_hero_billingAddon_ppv.B);
                    cy.getByTestId('HERO_CTA').should('to.have.text', data.landingpages_web_hero_button_getStarted_ppv.B);
                });
            });

        });
    });

});
describe('Check FE-labels - PPV disable', () => {
    const country = 'US';

    beforeEach(() => {
        mockOptimizelyFELabelsHero();

        cy.givePrivacyConsent();
        cy.visitExperimentWithDevPackage(`en-${country}`);
        cy.enableMarcoPolo(country);
    });

    describe('Hero', () => {

        beforeEach(() => {
            mockRailPPVResponse();
            mockExperimentsAcc();
        });

        viewPort.forEach(viewport => {
            it(`Validate fe-labels on Hero elements with ${viewport}`, () => {
                mockOffersAddons()
                cy.viewport(<Cypress.ViewportPreset>viewport);
                cy.getById('HERO_PPV_TAG').should('not.exist');
                cy.fixture('../support/mockResponses/experimentsAccResponse').then(experiments => {
                    const data = experiments.Experiments.e_acc_ar_fe_labels_lp_redesgin;

                    //Header
                    cy.getById('HEADER_SIGN_UP').should('have.text', data.landingpages_web_header_button_signUp.B);
                    cy.getById('HEADER_SIGN_IN').should('have.text', data.landingpages_web_header_button_signIn.B);

                    //Hero teaser
                    cy.getById('HERO_TITLE').should('have.text', data.landingpages_web_hero_title.B);
                    cy.getById('HERO_DESCRIPTION').should('have.text', data.landingpages_web_hero_description.B);
                    cy.getByTestId('HERO_PRICE_MONTH').children('[id="HERO_PRICE_LABEL"]')
                        .should('to.have.text', data.landingpages_web_hero_billingMonthly.B);
                    cy.getByTestId('HERO_PRICE_ANNUAL').children('[id="HERO_PRICE_LABEL"]')
                        .should('to.have.text', data.landingpages_web_hero_billingYearly.B);
                    cy.getByTestId('HERO_PRICE_ANNUAL').children('[data-testid="HERO_CTA"]')
                        .should('to.have.text', data.landingpages_web_hero_button_signUp.B);
                    cy.getByTestId('HERO_PRICE_MONTH').children('[data-testid="HERO_CTA"]')
                        .should('to.have.text', data.landingpages_web_hero_button_signUp.B);
                    cy.getByTestId('HERO_PRICE_HIGHLIGHT').should('to.have.text', data.landingpages_web_hero_savingTotal.B);

                    //missing kys
                    //Hero:
                    // landingpages_web_hero_legal
                    // landingpages_web_hero_billingFrom
                    // landingpages_web_hero_annualMonthlyOffer
                    // landingpages_web_hero_annualOffer
                    // landingpages_web_hero_monthlyOffer


                    //Devices
                    cy.getByTestId('DEVICES').first().scrollIntoView()
                    cy.getByTestId('DEVICES').children('h1').contains(`${data.landingpages_web_devices_title.B}`);
                    cy.getByTestId('DEVICES').children('p').contains(`${data.landingpages_web_devices_subtitle.B}`);

                });
            });
            it(`Validate fe-labels on Hero elements with [free trial] on ${viewport}`, () => {
                mockOffersNoAddonsFreeTrial()
                cy.viewport(<Cypress.ViewportPreset>viewport);
                cy.getById('HERO_PPV_TAG').should('not.exist');
                cy.fixture('../support/mockResponses/experimentsAccResponse').then(experiments => {
                    const data = experiments.Experiments.e_acc_ar_fe_labels_lp_redesgin;

                    //Header
                    cy.getById('HEADER_SIGN_UP').should('have.text', data.landingpages_web_header_button_freeTrial.B);
                    //Hero teaser
                    cy.getByTestId('HERO_PRICE_MONTH').children('[data-testid="HERO_CTA"]')
                        .should('to.have.text', data.landingpages_web_hero_button_freeTrial.B);

                });
            });

        });
    });

});
