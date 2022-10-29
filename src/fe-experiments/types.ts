import {
    FArLandingpageDisplaytypeFeature,
    FArLandingpageWhatsOnFeature,
} from '@dazn/fe-experiments';

type WhatsOnVariationKeys = keyof typeof FArLandingpageWhatsOnFeature.WhatsOnVariation;

export type WhatsOnVariationValues =
    typeof FArLandingpageWhatsOnFeature.WhatsOnVariation[WhatsOnVariationKeys];

type HeroOfferDisplayTypeKeys = keyof typeof FArLandingpageDisplaytypeFeature.HeroOfferDisplayType;

export type HeroOfferDisplayTypeValues =
    typeof FArLandingpageDisplaytypeFeature.HeroOfferDisplayType[HeroOfferDisplayTypeKeys];
