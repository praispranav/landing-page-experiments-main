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

export const CH_STRINGS_CONFIG: VariantLocalStrings = VARIANT_STRINGS_CONFIG;

export const CH_LINKS_CONFIG: VariantLocalLinks = {
    [LinksKeys.DevicesButton]: getDictionaryLink('Devices'),
};

export const CH_IMAGES_CONFIG: VariantLocalImages = {
    [ImagesKeys.HeroBackground]: [
        { src: getBackgroundImage(DeviceSize.Small, 'hero-de-mobile') },
        { src: getBackgroundImage(DeviceSize.Tablet, 'hero-de'), screenWidth: 768 },
        { src: getBackgroundImage(DeviceSize.Desktop, 'hero-de'), screenWidth: 768 },
    ],
};

const { help, faq, terms, privacy, aboutUs, careers, redeem, business } = getFooterElements();

export const CH_LISTS_CONFIG: VariantLocalLists = {
    [ListsKeys.Footer]: [help, faq, terms, privacy, aboutUs, careers, redeem, business],
};

export const CH_ELEMENTS_CONFIG: VariantLocalElements = {
    [ElementSettingKeys.HeroOfferDisplayType]: DisplayTypeValues.StartingFrom,
    [ElementSettingKeys.HeroVariant]: HeroVariantEnum.ManyTournaments,
    [ElementSettingKeys.HeroPicturePosition]: {
        width: ['100%', 'auto'],
        right: ['auto', '-250px', '-250px', 0],
    },
    [ElementSettingKeys.HeroImagePosition]: {
        width: '100%',
        objectFit: ['contain', 'cover'],
        objectPosition: ['0px -60px', '30px 0px'],
    },
};

export default {
    stringsConfig: CH_STRINGS_CONFIG,
    linksConfig: CH_LINKS_CONFIG,
    imagesConfig: CH_IMAGES_CONFIG,
    listsConfig: CH_LISTS_CONFIG,
    elementsConfig: CH_ELEMENTS_CONFIG,
};
