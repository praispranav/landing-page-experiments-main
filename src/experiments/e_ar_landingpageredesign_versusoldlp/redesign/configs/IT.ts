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

export const IT_STRINGS_CONFIG: VariantLocalStrings = VARIANT_STRINGS_CONFIG;

export const IT_LINKS_CONFIG: VariantLocalLinks = {
    [LinksKeys.DevicesButton]: getDictionaryLink('Devices'),
};

export const IT_IMAGES_CONFIG: VariantLocalImages = {
    [ImagesKeys.HeroBackground]: [
        { src: getBackgroundImage(DeviceSize.Small, 'hero-it-mobile') },
        { src: getBackgroundImage(DeviceSize.Tablet, 'hero-it'), screenWidth: 768 },
        { src: getBackgroundImage(DeviceSize.Desktop, 'hero-it'), screenWidth: 1024 },
    ],
};

const { help, terms, termsPlus, privacy, imprint, explore, business } = getFooterElements();

export const IT_LISTS_CONFIG: VariantLocalLists = {
    [ListsKeys.Footer]: [help, terms, termsPlus, imprint, explore, privacy, business],
};

export const IT_ELEMENT_CONFIG: VariantLocalElements = {
    [ElementSettingKeys.HeroOfferDisplayType]: DisplayTypeValues.StartingFrom,
    [ElementSettingKeys.HeroVariant]: HeroVariantEnum.ManyTournaments,
};

export default {
    stringsConfig: IT_STRINGS_CONFIG,
    linksConfig: IT_LINKS_CONFIG,
    imagesConfig: IT_IMAGES_CONFIG,
    listsConfig: IT_LISTS_CONFIG,
    elementsConfig: IT_ELEMENT_CONFIG,
};
