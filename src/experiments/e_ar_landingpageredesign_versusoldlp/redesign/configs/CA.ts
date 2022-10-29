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

export const CA_STRINGS_CONFIG: VariantLocalStrings = VARIANT_STRINGS_CONFIG;

export const CA_LINKS_CONFIG: VariantLocalLinks = {
    [LinksKeys.DevicesButton]: getDictionaryLink('Devices'),
};

export const CA_IMAGES_CONFIG: VariantLocalImages = {
    [ImagesKeys.HeroBackground]: [
        { src: getBackgroundImage(DeviceSize.Small, 'hero-ca-mobile') },
        { src: getBackgroundImage(DeviceSize.Tablet, 'hero-ca'), screenWidth: 768 },
        { src: getBackgroundImage(DeviceSize.Desktop, 'hero-ca'), screenWidth: 1024 },
    ],
};

const { help, faq, privacy, terms, careers, media, business } = getFooterElements();

export const CA_LISTS_CONFIG: VariantLocalLists = {
    [ListsKeys.Footer]: [help, faq, privacy, terms, careers, media, business],
};

export const CA_ELEMENT_CONFIG: VariantLocalElements = {
    [ElementSettingKeys.HeroOfferDisplayType]: DisplayTypeValues.StartingFrom,
    [ElementSettingKeys.HeroVariant]: HeroVariantEnum.ManyTournaments,
};

export default {
    stringsConfig: CA_STRINGS_CONFIG,
    linksConfig: CA_LINKS_CONFIG,
    imagesConfig: CA_IMAGES_CONFIG,
    listsConfig: CA_LISTS_CONFIG,
    elementsConfig: CA_ELEMENT_CONFIG,
};
