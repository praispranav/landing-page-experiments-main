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

export const BR_STRINGS_CONFIG: VariantLocalStrings = VARIANT_STRINGS_CONFIG;

export const BR_LINKS_CONFIG: VariantLocalLinks = {
    [LinksKeys.DevicesButton]: getDictionaryLink('Devices'),
};

export const BR_IMAGES_CONFIG: VariantLocalImages = {
    [ImagesKeys.HeroBackground]: [
        { src: getBackgroundImage(DeviceSize.Small, 'hero-de-mobile') },
        { src: getBackgroundImage(DeviceSize.Tablet, 'hero-de'), screenWidth: 768 },
        { src: getBackgroundImage(DeviceSize.Desktop, 'hero-de'), screenWidth: 1024 },
    ],
};

const { help, privacy, terms, careers, media, business } = getFooterElements();

export const BR_LISTS_CONFIG: VariantLocalLists = {
    [ListsKeys.Footer]: [help, privacy, terms, careers, media, business],
};

export const BR_ELEMENT_CONFIG: VariantLocalElements = {
    [ElementSettingKeys.HeroOfferDisplayType]: DisplayTypeValues.Copy,
    [ElementSettingKeys.HeroVariant]: HeroVariantEnum.ManyTournaments,
    [ElementSettingKeys.HeroPicturePosition]: {
        width: ['100%', 'auto'],
        right: ['auto', '-350px', '-250px', 0],
    },
    [ElementSettingKeys.HeroImagePosition]: {
        width: '100%',
        objectFit: ['contain', 'cover'],
        objectPosition: ['0 -40px', 'center'],
    },
};

export default {
    stringsConfig: BR_STRINGS_CONFIG,
    linksConfig: BR_LINKS_CONFIG,
    imagesConfig: BR_IMAGES_CONFIG,
    listsConfig: BR_LISTS_CONFIG,
    elementsConfig: BR_ELEMENT_CONFIG,
};
