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

export const GB_STRINGS_CONFIG: VariantLocalStrings = VARIANT_STRINGS_CONFIG;

export const GB_LINKS_CONFIG: VariantLocalLinks = {
    [LinksKeys.DevicesButton]: getDictionaryLink('Devices'),
};

export const GB_IMAGES_CONFIG: VariantLocalImages = {
    [ImagesKeys.HeroBackground]: [
        { src: getBackgroundImage(DeviceSize.Small, 'hero-gb-mobile') },
        { src: getBackgroundImage(DeviceSize.Tablet, 'hero-gb'), screenWidth: 768 },
        { src: getBackgroundImage(DeviceSize.Desktop, 'hero-gb'), screenWidth: 1024 },
    ],
};

const { help, faq, privacy, terms, redeem, news, business } = getFooterElements();

export const GB_LISTS_CONFIG: VariantLocalLists = {
    [ListsKeys.Footer]: [help, faq, privacy, terms, redeem, news, business],
};

export const GB_ELEMENT_CONFIG: VariantLocalElements = {
    [ElementSettingKeys.HeroOfferDisplayType]: DisplayTypeValues.Default,
    [ElementSettingKeys.WhatsOnVariant]: WhatsOnVariantEnum.ComingUp,
};

export default {
    stringsConfig: GB_STRINGS_CONFIG,
    linksConfig: GB_LINKS_CONFIG,
    imagesConfig: GB_IMAGES_CONFIG,
    listsConfig: GB_LISTS_CONFIG,
    elementsConfig: GB_ELEMENT_CONFIG,
};
