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

export const AT_STRINGS_CONFIG: VariantLocalStrings = VARIANT_STRINGS_CONFIG;

export const AT_LINKS_CONFIG: VariantLocalLinks = {
    [LinksKeys.DevicesButton]: getDictionaryLink('Devices'),
};

export const AT_IMAGES_CONFIG: VariantLocalImages = {
    [ImagesKeys.HeroBackground]: [
        { src: getBackgroundImage(DeviceSize.Small, 'hero-de-mobile') },
        { src: getBackgroundImage(DeviceSize.Tablet, 'hero-de'), screenWidth: 768 },
        { src: getBackgroundImage(DeviceSize.Desktop, 'hero-de'), screenWidth: 1024 },
    ],
};

const { help, faq, terms, privacy, aboutUs, careers, business } = getFooterElements();

export const AT_LISTS_CONFIG: VariantLocalLists = {
    [ListsKeys.Footer]: [help, faq, terms, privacy, aboutUs, careers, business],
};

export const AT_ELEMENT_CONFIG: VariantLocalElements = {
    [ElementSettingKeys.HeroOfferDisplayType]: DisplayTypeValues.StartingFrom,
    [ElementSettingKeys.HeroVariant]: HeroVariantEnum.ManyTournaments,
    [ElementSettingKeys.HeroImagePosition]: {
        width: '100%',
        objectFit: ['contain', 'cover'],
        objectPosition: ['0px -60px', '30px 0px'],
    },
    [ElementSettingKeys.HeroPicturePosition]: {
        width: '100%',
    },
};

export default {
    stringsConfig: AT_STRINGS_CONFIG,
    linksConfig: AT_LINKS_CONFIG,
    imagesConfig: AT_IMAGES_CONFIG,
    listsConfig: AT_LISTS_CONFIG,
    elementsConfig: AT_ELEMENT_CONFIG,
};
