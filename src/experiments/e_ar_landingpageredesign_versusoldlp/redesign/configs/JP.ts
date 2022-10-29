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

export const JP_STRINGS_CONFIG: VariantLocalStrings = VARIANT_STRINGS_CONFIG;

export const JP_LINKS_CONFIG: VariantLocalLinks = {
    [LinksKeys.DevicesButton]: getDictionaryLink('Devices'),
};

export const JP_IMAGES_CONFIG: VariantLocalImages = {
    [ImagesKeys.HeroBackground]: [
        { src: getBackgroundImage(DeviceSize.Small, 'hero-jp-mobile') },
        { src: getBackgroundImage(DeviceSize.Tablet, 'hero-jp'), screenWidth: 768 },
        { src: getBackgroundImage(DeviceSize.Desktop, 'hero-jp'), screenWidth: 1024 },
    ],
};

const { help, faq, terms, privacy, imprint, sctl, business } = getFooterElements();

export const JP_LISTS_CONFIG: VariantLocalLists = {
    [ListsKeys.Footer]: [help, faq, terms, privacy, imprint, sctl, business],
};

export const JP_ELEMENT_CONFIG: VariantLocalElements = {
    [ElementSettingKeys.HeroOfferDisplayType]: DisplayTypeValues.StartingFrom,
    [ElementSettingKeys.HeroVariant]: HeroVariantEnum.ManyTournaments,
    [ElementSettingKeys.HeroPriceDetail]: '*',
};

export default {
    stringsConfig: JP_STRINGS_CONFIG,
    linksConfig: JP_LINKS_CONFIG,
    imagesConfig: JP_IMAGES_CONFIG,
    listsConfig: JP_LISTS_CONFIG,
    elementsConfig: JP_ELEMENT_CONFIG,
};
