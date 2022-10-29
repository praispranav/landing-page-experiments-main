import {
    FArLandingpageAnnouncementBannerFeature,
    FArLandingpageDisplaytypeFeature,
    FArLandingpageHeroDetailsFeature,
    FArLandingpagePpvFeature,
    FArLandingpagesMarketpropositionFeature,
    FArLandingpageWhatsOnFeature,
    FArShowAddonsFeature,
} from '@dazn/fe-experiments';

import { HeroOfferDisplayTypeValues } from './types';

export const isDisplayTypeFlagEnabled = (): boolean =>
    FArLandingpageDisplaytypeFeature.isEnabledAnonymous();

export const getDisplayTypeVariant = (): HeroOfferDisplayTypeValues =>
    FArLandingpageDisplaytypeFeature.getHeroOfferDisplayTypeAnonymous();

export const showPPV = (): boolean =>
    FArShowAddonsFeature.isEnabledAnonymous() && FArLandingpagePpvFeature.isEnabledAnonymous();

export const showMarketProposition = (): boolean =>
    FArLandingpagesMarketpropositionFeature.isEnabledAnonymous();

export const isAnnouncementBanner = (): boolean =>
    FArLandingpageAnnouncementBannerFeature.isEnabledAnonymous();

export const isWhatsOnFlagEnabled = (): boolean =>
    FArLandingpageWhatsOnFeature.isEnabledAnonymous();

export const getWhatsOnVariant = (): FArLandingpageWhatsOnFeature.WhatsOnVariation =>
    FArLandingpageWhatsOnFeature.getWhatsOnVariationAnonymous();

export const getWhatsOnRailId = (): FArLandingpageWhatsOnFeature.RailId =>
    FArLandingpageWhatsOnFeature.getRailIdAnonymous();

export const isHeroDetailsEnabled = (): boolean =>
    FArLandingpageHeroDetailsFeature.isEnabledAnonymous();
