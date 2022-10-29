import epgResponse from '../mockResponses/epgResponse.json';
import faqResponse from '../mockResponses/faqResponse.json';
import railsResponse from '../mockResponses/railsResponse.json';
import railEntitlementResponse from '../mockResponses/railEntitlementResponse.json';
import optimizelyResponse from '../mockResponses/optimizelyResponse.json';
import optimizelyFELabelsHeroResponse from '../mockResponses/optimizelyFELabelsHeroResponse.json';
import optimizelyWithNoAddons from '../mockResponses/optimizelyWithNoAddons.json';
import offersAddonsResponse from '../mockResponses/offersAddonsResponse.json';
import offersNoAddonsResponse from '../mockResponses/offersNoAddonsResponse.json';
import spoloResponse from '../mockResponses/spoloResponse.json';
import experimentsAccResponse from '../mockResponses/experimentsAccResponse.json';
import optimizelyFELabelsPPVResponse from '../mockResponses/optimizelyFELabelsPPVResponse.json';
import offersNoAddonsFreeTrialResponse from '../mockResponses/offersNoAddonsFreeTrialResponse.json';

export const mockFAQ = () => {
    return cy.intercept(
        'GET',
        'https://help.stage.ar.dazn-stage.com/*/categories/faq',
        faqResponse,
    );
};
export const mockImages = () => {
    return cy.intercept('GET', 'https://image.discovery.dazn-stage.com/**', {
        fixture: 'images/calendarImage.jpeg',
    });
};
export const mockEpg = () => {
    return cy.intercept('GET', 'https://epg.discovery.dazn-stage.com/**', epgResponse);
};

export const mockRailsResponse = () => {
    return cy.intercept('GET', 'https://rail-router.discovery.dazn-stage.com/**', railsResponse);
};

export const mockRailPPVResponse = () => {
    return cy.intercept(
        'GET',
        'https://rail-router.discovery.dazn-stage.com/**',
        railEntitlementResponse,
    );
};

export const mockOptimizely = () => {
    return cy.intercept('GET', 'https://optmzly.fe.indazn.com/datafiles/**', optimizelyResponse);
};

export const mockOptimizelyFELabelsHero = () => {
    return cy.intercept('GET', 'https://optmzly.fe.indazn.com/datafiles/**', optimizelyFELabelsHeroResponse);
};

export const mockOptimizelyFELabelsPPV = () => {
    return cy.intercept('GET', 'https://optmzly.fe.indazn.com/datafiles/**', optimizelyFELabelsPPVResponse);
};

export const mockExperimentsAcc = () => {
    return cy.intercept('GET', 'https://experiments-api.acc.indazn.com/**', experimentsAccResponse);
};

export const mockOptimizelyNoAddons = () => {
    return cy.intercept(
        'GET',
        'https://optmzly.fe.indazn.com/datafiles/**',
        optimizelyWithNoAddons,
    );
};

export const mockOffersAddons = () => {
    return cy.intercept(
        'POST',
        'https://tiered-pricing-offer-service.ar.dazn-stage.com/v1/offers',
        offersAddonsResponse,
    );
};

export const mockOffersNoAddons = () => {
    return cy.intercept(
        'POST',
        'https://tiered-pricing-offer-service.ar.dazn-stage.com/v1/offers',
        offersNoAddonsResponse,
    );
};

export const mockOffersNoAddonsFreeTrial = () => {
    return cy.intercept(
        'POST',
        'https://tiered-pricing-offer-service.ar.dazn-stage.com/v1/offers',
        offersNoAddonsFreeTrialResponse,
    );
};

export const mockSpoloResponse = () => {
    return cy.intercept(
        'GET',
        'https://spolo-public-api-global.acc.dazn-stage.com/**',
        spoloResponse,
    );
};

export const mockEmptySpoloResponse = () => {
    return cy.intercept('GET', 'https://spolo-public-api-global.acc.dazn-stage.com/**', {});
};
