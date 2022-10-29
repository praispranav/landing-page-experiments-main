import { DisplayTypeValues, HeroVariantEnum } from '../../../../../src/config/ConfigsKeys';
import { mockSpoloResponse } from '../../support/mockFunctions/intercepters';

describe('Hero Section UI', () => {
    const storyName = 'sections-hero--default';

    interface HeroStoryProps {
        locale: string;
        heroVariant: HeroVariantEnum;
        ppvEnabled: boolean;
        displayType: DisplayTypeValues;
        isAnnouncementBanner: boolean;
    }

    const shouldEnablePPV = (displayTypes: string): boolean =>
        displayTypes === DisplayTypeValues.Addon;

    const visitHeroStory = ({ displayType, isAnnouncementBanner=false, ...props }: Partial<HeroStoryProps>) => {
        const args = Object.entries({
            ...props,
            displayType,
            responseHasAddons: shouldEnablePPV(displayType),
            showPPV: shouldEnablePPV(displayType),
            announcementBanner: isAnnouncementBanner,
        }).reduce((acc, [prop, val]) => `${acc}${prop}:${val};`, '');
        cy.visitStory(`${storyName}&args=${args}`);
    };

    describe('when display type is', () => {
        describe('desktop', () => {
            const displayTypes = [
                DisplayTypeValues.Default,
                DisplayTypeValues.Copy,
                DisplayTypeValues.StartingFrom,
                DisplayTypeValues.CtaOnly,
                DisplayTypeValues.Addon,
                DisplayTypeValues.Monthly,
            ];

            it.each(displayTypes)(
                (displayType) => displayType,
                (displayType) => {
                    mockSpoloResponse();
                    visitHeroStory({ displayType, heroVariant: HeroVariantEnum.ManyTournaments });

                    cy.waitForIdleNetwork();
                    cy.matchImageSnapshot(`hero-section-${displayType}`);
                },
            );
        });

        describe('mobile', () => {
            const viewport = 'iphone-8';
            const displayTypes = [DisplayTypeValues.Default, DisplayTypeValues.Addon];

            it.each(displayTypes)(
                (displayType) => displayType,
                (displayType) => {
                    mockSpoloResponse();
                    cy.viewport(viewport);
                    visitHeroStory({ displayType, isAnnouncementBanner: true, heroVariant: HeroVariantEnum.ManyTournaments });

                    cy.waitForIdleNetwork();
                    cy.matchImageSnapshot(`hero-section-${displayType}-${viewport}`);
                },
            );
        });
    });

    describe('Hero Variant', () => {
        const snapshotStory = (locale: string, heroVariant: HeroVariantEnum) =>
            cy.matchImageSnapshot(`hero-section-${heroVariant}-${locale}`);

        describe(HeroVariantEnum.Event, () => {
            it.each(['en-US', 'en-IE', 'en-GB'])(
                (locale) => `when locale is ${locale}`,
                (locale) => {
                    visitHeroStory({ locale, heroVariant: HeroVariantEnum.Event });

                    cy.waitForIdleNetwork();
                    snapshotStory(locale, HeroVariantEnum.Event);
                },
            );
        });

        describe(HeroVariantEnum.ManyTournaments, () => {
            it.each(['pt-BR', 'it-IT', 'es-ES', 'de-DE', 'de-AT', 'ja-JP'])(
                (locale) => `when locale is ${locale}`,
                (locale) => {
                    mockSpoloResponse();
                    visitHeroStory({ locale, heroVariant: HeroVariantEnum.ManyTournaments });

                    cy.getByTestId('SPORTS_LOGO')
                        .then(($logos) =>
                            $logos.toArray().map(($logo) => $logo.getAttribute('src')),
                        )
                        .then((logosSrc) => cy.waitForResources(logosSrc));

                    snapshotStory(locale, HeroVariantEnum.ManyTournaments);
                },
            );
        });
    });
});
