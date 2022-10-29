import { DisplayTypeValues, ElementSettingKeys } from '@config/ConfigsKeys';
import { useShouldDisplayPPV } from '@hooks/dazn/offer/UseAddon';
import { useElementSetting } from '@hooks/utils/UseLocalisedConfig';

import { heroVariantValue } from './constants';
import { HeroVariantValue } from './types';

export const useHeroVariant = (): HeroVariantValue => {
    const heroVariantSetting =
        useElementSetting(ElementSettingKeys.HeroVariant) ?? heroVariantValue.Event;

    const heroVariant = useShouldDisplayPPV() ? heroVariantValue.PayPerView : heroVariantSetting;

    return heroVariant;
};

export const useVariantDisplayType = (): DisplayTypeValues => {
    const displayTypeSetting =
        useElementSetting(ElementSettingKeys.HeroOfferDisplayType) ?? DisplayTypeValues.CtaOnly;

    const shouldDisplayPPV = useShouldDisplayPPV();

    if (shouldDisplayPPV) {
        return DisplayTypeValues.Addon;
    }

    if (displayTypeSetting === DisplayTypeValues.Addon && !shouldDisplayPPV) {
        return DisplayTypeValues.CtaOnly;
    }

    return displayTypeSetting;
};
