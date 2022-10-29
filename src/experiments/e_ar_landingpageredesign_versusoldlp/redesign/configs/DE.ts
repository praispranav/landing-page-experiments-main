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

export const DE_STRINGS_CONFIG: VariantLocalStrings = VARIANT_STRINGS_CONFIG;

export const DE_LINKS_CONFIG: VariantLocalLinks = {
    [LinksKeys.DevicesButton]: getDictionaryLink('Devices'),
};

export const DE_IMAGES_CONFIG: VariantLocalImages = {
    [ImagesKeys.HeroBackground]: [
        { src: getBackgroundImage(DeviceSize.Small, 'hero-de-mobile') },
        { src: getBackgroundImage(DeviceSize.Tablet, 'hero-de'), screenWidth: 768 },
        { src: getBackgroundImage(DeviceSize.Desktop, 'hero-de'), screenWidth: 1024 },
    ],
};

const { help, faq, terms, privacy, aboutUs, careers, business, cancel } = getFooterElements();

export const DE_LISTS_CONFIG: VariantLocalLists = {
    [ListsKeys.Footer]: [help, faq, terms, privacy, aboutUs, careers, business, cancel],
};

export const DE_ELEMENT_CONFIG: VariantLocalElements = {
    [ElementSettingKeys.HeroOfferDisplayType]: DisplayTypeValues.StartingFrom,
    [ElementSettingKeys.HeroVariant]: HeroVariantEnum.ManyTournaments,
    [ElementSettingKeys.MarketPropositionSection]: true,
};

export default {
    stringsConfig: DE_STRINGS_CONFIG,
    linksConfig: DE_LINKS_CONFIG,
    imagesConfig: DE_IMAGES_CONFIG,
    listsConfig: DE_LISTS_CONFIG,
    elementsConfig: DE_ELEMENT_CONFIG,
};
