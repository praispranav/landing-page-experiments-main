import {
    DisplayTypeValues,
    ElementSettingKeys,
    HeroVariantEnum,
    ImagesKeys,
} from '@config/ConfigsKeys';
import { WhatsOnVariantEnum } from '@containers/sections/WhatsOn/Variants';
import { ILocalVariantConfig } from '@experiments/IVariantConfig';
import { HeroOfferDisplayTypeValues, WhatsOnVariationValues } from '@fe-experiments/types';
import {
    LocalImageValue,
    VariantLocalElements,
    VariantLocalImages,
} from '@hooks/resourceStrings/Types';

interface OverrideElementsConfig {
    heroOfferDisplayType?: HeroOfferDisplayTypeValues | DisplayTypeValues;
    heroVariant?: HeroVariantEnum;
    showMarketProposition?: boolean;
    showPPV?: boolean;
    showAnnouncementBanner?: boolean;
    whatsOnVariant?: WhatsOnVariantEnum | WhatsOnVariationValues;
    railId?: string;
    showHeroDetails?: boolean;
}

interface OverrideImagesConfig {
    heroBackgroundUrl?: string;
}

type OverrideConfig = OverrideElementsConfig & OverrideImagesConfig;

export function updateBackgroundUrl(
    originalConfig: ILocalVariantConfig,
    heroBackgroundUrl?: string,
): LocalImageValue {
    if (!heroBackgroundUrl || heroBackgroundUrl === 'default') {
        return originalConfig.images[ImagesKeys.HeroBackground];
    }
    return heroBackgroundUrl;
}

const isDisplayTypeValue = (displayType = ''): displayType is DisplayTypeValues =>
    Object.values(DisplayTypeValues).includes(displayType as DisplayTypeValues);

export const updateDisplayType = (
    originalConfig: ILocalVariantConfig,
    offerDisplayType?: DisplayTypeValues | HeroOfferDisplayTypeValues,
): DisplayTypeValues => {
    if (!offerDisplayType || !isDisplayTypeValue(offerDisplayType)) {
        return (
            originalConfig.elements?.[ElementSettingKeys.HeroOfferDisplayType] ??
            DisplayTypeValues.Default
        );
    }
    return offerDisplayType;
};

export const updateHeroVariant = (
    originalConfig: ILocalVariantConfig,
    heroVariant?: HeroVariantEnum,
): HeroVariantEnum => {
    if (!heroVariant || !Object.values(HeroVariantEnum).includes(heroVariant)) {
        return originalConfig.elements?.[ElementSettingKeys.HeroVariant] ?? HeroVariantEnum.Event;
    }
    return heroVariant;
};

const isWhatsOnValue = (whatsOnVariant = ''): whatsOnVariant is WhatsOnVariantEnum =>
    Object.values(WhatsOnVariantEnum).includes(whatsOnVariant as WhatsOnVariantEnum);

export const updateWhatsOnVariant = (
    originalConfig: ILocalVariantConfig,
    whatsOnVariant?: WhatsOnVariantEnum | WhatsOnVariationValues,
): WhatsOnVariantEnum => {
    if (!whatsOnVariant || !isWhatsOnValue(whatsOnVariant)) {
        return (
            originalConfig.elements?.[ElementSettingKeys.WhatsOnVariant] ?? WhatsOnVariantEnum.Epg
        );
    }
    return whatsOnVariant;
};

const overrideElementConfig = (
    originalConfig: ILocalVariantConfig,
    {
        heroOfferDisplayType,
        heroVariant,
        showPPV,
        showMarketProposition,
        showAnnouncementBanner,
        whatsOnVariant,
        railId,
        showHeroDetails,
    }: OverrideElementsConfig,
): VariantLocalElements => ({
    ...originalConfig.elements,
    [ElementSettingKeys.HeroOfferDisplayType]: updateDisplayType(
        originalConfig,
        heroOfferDisplayType,
    ),
    [ElementSettingKeys.HeroVariant]: updateHeroVariant(originalConfig, heroVariant),
    [ElementSettingKeys.PPVFeatureFlag]: showPPV,
    [ElementSettingKeys.MarketPropositionSection]: showMarketProposition,
    [ElementSettingKeys.AnnouncementBanner]: showAnnouncementBanner,
    [ElementSettingKeys.WhatsOnVariant]: updateWhatsOnVariant(originalConfig, whatsOnVariant),
    [ElementSettingKeys.RailId]: railId,
    [ElementSettingKeys.HeroDetails]: showHeroDetails,
});

const overrideImagesConfig = (
    originalConfig: ILocalVariantConfig,
    { heroBackgroundUrl }: OverrideImagesConfig,
): VariantLocalImages => ({
    ...originalConfig.images,
    [ImagesKeys.HeroBackground]: updateBackgroundUrl(originalConfig, heroBackgroundUrl),
});

export const overrideExperimentConfig =
    ({
        heroBackgroundUrl,
        heroOfferDisplayType,
        heroVariant,
        showPPV,
        showMarketProposition,
        showAnnouncementBanner,
        whatsOnVariant,
        railId,
        showHeroDetails,
    }: OverrideConfig) =>
    (originalConfig: ILocalVariantConfig): ILocalVariantConfig => ({
        ...originalConfig,
        images: overrideImagesConfig(originalConfig, { heroBackgroundUrl }),
        elements: overrideElementConfig(originalConfig, {
            heroOfferDisplayType,
            heroVariant,
            showPPV,
            showMarketProposition,
            showAnnouncementBanner,
            whatsOnVariant,
            railId,
            showHeroDetails,
        }),
    });
