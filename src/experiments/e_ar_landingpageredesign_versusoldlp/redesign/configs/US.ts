import {
    DisplayTypeValues,
    ElementSettingKeys,
    ImagesKeys,
    LinksKeys,
    ListsKeys,
} from '@config/ConfigsKeys';
import { WhatsOnVariantEnum } from '@containers/sections/WhatsOn/Variants';
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

export const US_STRINGS_CONFIG: VariantLocalStrings = VARIANT_STRINGS_CONFIG;

export const US_LINKS_CONFIG: VariantLocalLinks = {
    [LinksKeys.DevicesButton]: getDictionaryLink('Devices'),
};

export const US_IMAGES_CONFIG: VariantLocalImages = {
    [ImagesKeys.HeroBackground]: [
        { src: getBackgroundImage(DeviceSize.Small, 'hero-us-mobile') },
        { src: getBackgroundImage(DeviceSize.Tablet, 'hero-us'), screenWidth: 768 },
        { src: getBackgroundImage(DeviceSize.Desktop, 'hero-us'), screenWidth: 1024 },
    ],
};

const { help, news, faq, terms, privacy, careers, media, business } = getFooterElements();

export const US_LISTS_CONFIG: VariantLocalLists = {
    [ListsKeys.Footer]: [help, news, faq, terms, privacy, careers, media, business],
};

export const US_ELEMENT_CONFIG: VariantLocalElements = {
    [ElementSettingKeys.HeroOfferDisplayType]: DisplayTypeValues.Default,
    [ElementSettingKeys.WhatsOnVariant]: WhatsOnVariantEnum.ComingUp,
};

export default {
    stringsConfig: US_STRINGS_CONFIG,
    linksConfig: US_LINKS_CONFIG,
    imagesConfig: US_IMAGES_CONFIG,
    listsConfig: US_LISTS_CONFIG,
    elementsConfig: US_ELEMENT_CONFIG,
};
