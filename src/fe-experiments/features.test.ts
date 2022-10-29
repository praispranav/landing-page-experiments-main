/* eslint-disable id-length */
import {
    FArLandingpageAnnouncementBannerFeature,
    FArLandingpageDisplaytypeFeature,
    FArLandingpageHeroDetailsFeature,
    FArLandingpagePpvFeature,
    FArLandingpagesMarketpropositionFeature,
    FArLandingpageWhatsOnFeature,
    FArShowAddonsFeature,
} from '@dazn/fe-experiments';

import {
    getDisplayTypeVariant,
    getWhatsOnRailId,
    getWhatsOnVariant,
    isAnnouncementBanner,
    isDisplayTypeFlagEnabled,
    isHeroDetailsEnabled,
    isWhatsOnFlagEnabled,
    showMarketProposition,
    showPPV,
} from './features';

jest.mock('@dazn/fe-experiments', () => ({
    FArLandingpageHeroDetailsFeature: {
        isEnabledAnonymous: jest.fn(),
    },
    FArLandingpagesMarketpropositionFeature: {
        isEnabledAnonymous: jest.fn(),
    },
    FArLandingpagePpvFeature: {
        isEnabledAnonymous: jest.fn(),
    },
    FArShowAddonsFeature: {
        isEnabledAnonymous: jest.fn(),
    },
    FArLandingpageAnnouncementBannerFeature: {
        isEnabledAnonymous: jest.fn(),
    },
    FArLandingpageDisplaytypeFeature: {
        isEnabledAnonymous: jest.fn(),
        getHeroOfferDisplayTypeAnonymous: jest.fn(),
    },
    FArLandingpageWhatsOnFeature: {
        isEnabledAnonymous: jest.fn(),
        getWhatsOnVariationAnonymous: jest.fn(),
        getRailIdAnonymous: jest.fn(),
    },
}));

describe('fe-experiments features', () => {
    describe('Whats On - Feature Flag', () => {
        it('should return true if `f_ar_landingpage_whats_on` is enabled', () => {
            (FArLandingpageWhatsOnFeature.isEnabledAnonymous as jest.Mock).mockReturnValue(true);

            expect(isWhatsOnFlagEnabled()).toBeTruthy();
        });

        it('should return false if `f_ar_landingpage_whats_on` is not enabled', () => {
            (FArLandingpageWhatsOnFeature.isEnabledAnonymous as jest.Mock).mockReturnValue(false);

            expect(isWhatsOnFlagEnabled()).toBeFalsy();
        });

        it('should return the whats on variant', () => {
            const whatsOnVariat = 'EPG';
            (
                FArLandingpageWhatsOnFeature.getWhatsOnVariationAnonymous as jest.Mock
            ).mockReturnValue(whatsOnVariat);

            expect(getWhatsOnVariant()).toBe(whatsOnVariat);
        });

        it('should return the Rail Id variant value', () => {
            const railId = 'uuid';
            (FArLandingpageWhatsOnFeature.getRailIdAnonymous as jest.Mock).mockReturnValue(railId);

            expect(getWhatsOnRailId()).toBe(railId);
        });
    });

    describe('Display type - Feature Flag', () => {
        it('should return true if `f_ar_landingpage_displaytype` is enabled', () => {
            (FArLandingpageDisplaytypeFeature.isEnabledAnonymous as jest.Mock).mockReturnValue(
                true,
            );

            expect(isDisplayTypeFlagEnabled()).toBeTruthy();
        });

        it('should return false if `f_ar_landingpage_displaytype` is not enabled', () => {
            (FArLandingpageDisplaytypeFeature.isEnabledAnonymous as jest.Mock).mockReturnValue(
                false,
            );

            expect(isDisplayTypeFlagEnabled()).toBeFalsy();
        });

        it('should return the variant value', () => {
            const variantValue = 'Addon';
            (
                FArLandingpageDisplaytypeFeature.getHeroOfferDisplayTypeAnonymous as jest.Mock
            ).mockReturnValue(variantValue);

            expect(getDisplayTypeVariant()).toBe(variantValue);
        });
    });

    describe('Announcement banner - Feature Flag', () => {
        it('should show Announcement Banner if `f_ar_landingpage_announcement_banner` is enabled', () => {
            (
                FArLandingpageAnnouncementBannerFeature.isEnabledAnonymous as jest.Mock
            ).mockReturnValue(true);

            expect(isAnnouncementBanner()).toBeTruthy();
        });

        it('should not show Announcement Banner if `f_ar_landingpage_announcement_banner` is not enabled', () => {
            (
                FArLandingpageAnnouncementBannerFeature.isEnabledAnonymous as jest.Mock
            ).mockReturnValue(false);

            expect(isAnnouncementBanner()).toBeFalsy();
        });
    });

    describe('Show Market Proposition - Feature Flag', () => {
        it('should show market proposition if `f_ar_landingpages_marketproposition` is enabled', () => {
            (
                FArLandingpagesMarketpropositionFeature.isEnabledAnonymous as jest.Mock
            ).mockReturnValue(true);

            expect(showMarketProposition()).toBeTruthy();
        });

        it('should not show market proposition if `f_ar_landingpages_marketproposition` is not enabled', () => {
            (
                FArLandingpagesMarketpropositionFeature.isEnabledAnonymous as jest.Mock
            ).mockReturnValue(false);

            expect(showMarketProposition()).toBeFalsy();
        });
    });

    describe('Feature Flag - Show PPV', () => {
        it('should show PPV if the `f_ar_show_addons` and `f_ar_landingpage_ppv` are enabled', () => {
            (FArLandingpagePpvFeature.isEnabledAnonymous as jest.Mock).mockReturnValue(true);
            (FArShowAddonsFeature.isEnabledAnonymous as jest.Mock).mockReturnValue(true);

            expect(showPPV()).toBeTruthy();
        });

        it('should not show PPV if only `f_ar_show_addons` is enabled', () => {
            (FArLandingpagePpvFeature.isEnabledAnonymous as jest.Mock).mockReturnValue(true);

            expect(showPPV()).toBeFalsy();
        });

        it('should not show PPV if only `f_ar_landingpage_ppv` is enabled', () => {
            (FArShowAddonsFeature.isEnabledAnonymous as jest.Mock).mockReturnValue(true);

            expect(showPPV()).toBeFalsy();
        });
    });

    describe('Show Hero Details - Feature Flag', () => {
        it('should show hero details if `f_ar_landingpage_hero_details` is enabled', () => {
            (FArLandingpageHeroDetailsFeature.isEnabledAnonymous as jest.Mock).mockReturnValue(
                true,
            );

            expect(isHeroDetailsEnabled()).toBeTruthy();
        });

        it('should not show market proposition if `f_ar_landingpage_hero_details` is not enabled', () => {
            (FArLandingpageHeroDetailsFeature.isEnabledAnonymous as jest.Mock).mockReturnValue(
                false,
            );

            expect(isHeroDetailsEnabled()).toBeFalsy();
        });
    });
});
