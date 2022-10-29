import { HeroVariantEnum } from '../../../../../src/config/ConfigsKeys';
import { DaznChapterEnum } from '../../../../../src/types/dazn/DaznChapterEnum';
import {
    mockEmptySpoloResponse,
    mockSpoloResponse,
} from '../../support/mockFunctions/intercepters';

describe('Hero Section', () => {
    const ppvHero = 'HERO_PPV';
    const ppvTag = 'HERO_PPV_TAG';
    const AddonDisplayType = 'HERO_PRICES_ADDONS';
    const storyName = 'sections-hero--default';

    interface HeroStoryProps {
        heroVariant: HeroVariantEnum;
        ppvEnabled: boolean;
        hasAddons: boolean;
        isAnnouncementBanner: boolean;
    }

    const visitHeroStory = ({
        heroVariant = HeroVariantEnum.Event,
        hasAddons = false,
        ppvEnabled = false,
        isAnnouncementBanner=false,
    }: Partial<HeroStoryProps>) => {
        const args = Object.entries({
            heroVariant,
            responseHasAddons: hasAddons,
            showPPV: ppvEnabled,
            announcementBanner: isAnnouncementBanner,
        }).reduce((acc, [prop, val]) => `${acc}${prop}:${val};`, '');

        cy.visitStory(`${storyName}&args=${args}`);
    };

    describe('CTA Payment Plan', () => {
        it(`directs to ${DaznChapterEnum.Auth} upon click on the Start You Free Month Button`, () => {
            visitHeroStory({});
            cy.getByTestId('HERO_CTA').click({ multiple: true, force: true });

            cy.waitForIdleNetwork();
            const dazn = cy.window().its('dazn');
            dazn.should(
                'have.deep.nested.property',
                'chapterHistory.currentChapter.chapterName',
                'auth',
            );
        });
    });

    describe('Hero Variant', () => {
        describe('PPV', () => {
            it('should show the PPV elements when there are addons', () => {
                visitHeroStory({ hasAddons: true, ppvEnabled: true });

                cy.getByTestId(ppvHero).should('exist');
                cy.getById(ppvTag).should('exist');
                cy.getByTestId(AddonDisplayType).should('exist');
            });

            it('should not show the PPV elements if there are no addons', () => {
                visitHeroStory({ hasAddons: false, ppvEnabled: true });

                cy.getByTestId(ppvHero).should('not.exist');
                cy.getById(ppvTag).should('not.exist');
                cy.getByTestId(AddonDisplayType).should('not.exist');
            });

            it('should not show the PPV elements if the feature flag is disable', () => {
                visitHeroStory({ hasAddons: true, ppvEnabled: false });

                cy.getByTestId(ppvHero).should('not.exist');
                cy.getById(ppvTag).should('not.exist');
                cy.getByTestId(AddonDisplayType).should('not.exist');
            });
        });
    });

    describe('Sports Grid', () => {
        it('should display the sports grid when there is a response', () => {
            mockSpoloResponse();
            visitHeroStory({ heroVariant: HeroVariantEnum.ManyTournaments });

            cy.getByTestId('SPORTS_GRID').should('exist');
        });

        it('should not display the sports grid when there is a response', () => {
            mockEmptySpoloResponse();
            visitHeroStory({ heroVariant: HeroVariantEnum.ManyTournaments });

            cy.getByTestId('SPORTS_GRID').should('not.exist');
            cy.getById("HERO_TITLE").should('exist');
        });
    });
});
