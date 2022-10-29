import { ImagesKeys, ListsKeys } from '@config/ConfigsKeys';
import {
    VariantLocalElements,
    VariantLocalImages,
    VariantLocalLinks,
    VariantLocalLists,
    VariantLocalStrings,
} from '@hooks/resourceStrings/Types';

import { DeviceSize, getBackgroundImage } from './common/Hero';
import { VARIANT_STRINGS_CONFIG } from './common/VariantStringsConfig';

export const GLOBAL_STRINGS_CONFIG: VariantLocalStrings = VARIANT_STRINGS_CONFIG;

export const GLOBAL_LINKS_CONFIG: VariantLocalLinks = {};

export const GLOBAL_IMAGES_CONFIG: VariantLocalImages = {
    [ImagesKeys.HeroBackground]: getBackgroundImage(DeviceSize.Desktop, 'hero-de'),
};

export const GLOBAL_LISTS_CONFIG: VariantLocalLists = {
    [ListsKeys.Footer]: [],
};

export const GLOBAL_ELEMENTS_CONFIG: VariantLocalElements = {};

export default {
    stringsConfig: GLOBAL_STRINGS_CONFIG,
    linksConfig: GLOBAL_LINKS_CONFIG,
    imagesConfig: GLOBAL_IMAGES_CONFIG,
    listsConfig: GLOBAL_LISTS_CONFIG,
    elementsConfig: GLOBAL_ELEMENTS_CONFIG,
};
