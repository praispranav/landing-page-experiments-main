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

export const AU_STRINGS_CONFIG: VariantLocalStrings = VARIANT_STRINGS_CONFIG;

export const AU_LINKS_CONFIG: VariantLocalLinks = {
    [LinksKeys.DevicesButton]: getDictionaryLink('Devices'),
};

export const AU_IMAGES_CONFIG: VariantLocalImages = {
    [ImagesKeys.HeroBackground]: [
        { src: getBackgroundImage(DeviceSize.Small, 'hero-us-mobile') },
        { src: getBackgroundImage(DeviceSize.Tablet, 'hero-us'), screenWidth: 768 },
        { src: getBackgroundImage(DeviceSize.Desktop, 'hero-us'), screenWidth: 1024 },
    ],
};

const { help, faq, privacy, terms, redeem, news, business } = getFooterElements();

export const AU_LISTS_CONFIG: VariantLocalLists = {
    [ListsKeys.Footer]: [help, faq, privacy, terms, redeem, news, business],
};

export const AU_ELEMENT_CONFIG: VariantLocalElements = {
    [ElementSettingKeys.HeroOfferDisplayType]: DisplayTypeValues.Default,
    [ElementSettingKeys.WhatsOnVariant]: WhatsOnVariantEnum.ComingUp,
};

export default {
    stringsConfig: AU_STRINGS_CONFIG,
    linksConfig: AU_LINKS_CONFIG,
    imagesConfig: AU_IMAGES_CONFIG,
    listsConfig: AU_LISTS_CONFIG,
    elementsConfig: AU_ELEMENT_CONFIG,
};
