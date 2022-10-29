import {
    DisplayTypeValues,
    ElementSettingKeys,
    HeroVariantEnum,
    ImagesKeys,
    LinksKeys,
    ListsKeys,
} from '@config/ConfigsKeys';
import {
    VariantLocalElements,
    VariantLocalImages,
    VariantLocalLinks,
    VariantLocalLists,
    VariantLocalStrings,
} from '@hooks/resourceStrings/Types';
import { getDictionaryLink } from '@utils/dazn/ResourcesDictionary';

import { getFooterElements } from './common/Footer';
import { DeviceSize, getBackgroundImage } from './common/Hero';
import { VARIANT_STRINGS_CONFIG } from './common/VariantStringsConfig';

export const ES_STRINGS_CONFIG: VariantLocalStrings = VARIANT_STRINGS_CONFIG;

export const ES_LINKS_CONFIG: VariantLocalLinks = {
    [LinksKeys.DevicesButton]: getDictionaryLink('Devices'),
};

export const ES_IMAGES_CONFIG: VariantLocalImages = {
    [ImagesKeys.HeroBackground]: [
        { src: getBackgroundImage(DeviceSize.Small, 'hero-es-mobile') },
        { src: getBackgroundImage(DeviceSize.Tablet, 'hero-es'), screenWidth: 768 },
        { src: getBackgroundImage(DeviceSize.Desktop, 'hero-es'), screenWidth: 1024 },
    ],
};

const { privacy, business } = getFooterElements();

export const ES_LISTS_CONFIG: VariantLocalLists = {
    [ListsKeys.Footer]: [privacy, business],
};

export const ES_ELEMENT_CONFIG: VariantLocalElements = {
    [ElementSettingKeys.HeroOfferDisplayType]: DisplayTypeValues.StartingFrom,
    [ElementSettingKeys.HeroVariant]: HeroVariantEnum.ManyTournaments,
};

export default {
    stringsConfig: ES_STRINGS_CONFIG,
    linksConfig: ES_LINKS_CONFIG,
    imagesConfig: ES_IMAGES_CONFIG,
    listsConfig: ES_LISTS_CONFIG,
    elementsConfig: ES_ELEMENT_CONFIG,
};
