import { DisplayTypeValues, ElementSettingKeys, ImagesKeys } from '@config/ConfigsKeys';
import {
    VariantLocalElements,
    VariantLocalImages,
    VariantLocalStrings,
} from '@hooks/resourceStrings/Types';

import { DeviceSize, getBackgroundImage } from './common/Hero';
import { PPV_HERO_STRINGS } from './common/PPV';
import { VARIANT_STRINGS_CONFIG } from './common/VariantStringsConfig';

export const PPV_STRINGS_CONFIG: VariantLocalStrings = {
    ...VARIANT_STRINGS_CONFIG,
    ...PPV_HERO_STRINGS,
};

export const PPV_IMAGES_CONFIG: VariantLocalImages = {
    [ImagesKeys.HeroBackground]: [
        { src: getBackgroundImage(DeviceSize.Small, 'banner_ppv_001_mobile') },
        { src: getBackgroundImage(DeviceSize.Tablet, 'banner_ppv_001_desktop'), screenWidth: 768 },
        {
            src: getBackgroundImage(DeviceSize.Desktop, 'banner_ppv_001_desktop'),
            screenWidth: 1024,
        },
    ],
};

export const PPV_ELEMENT_CONFIG: VariantLocalElements = {
    [ElementSettingKeys.HeroOfferDisplayType]: DisplayTypeValues.Addon,
};

export default {
    stringsConfig: PPV_STRINGS_CONFIG,
    linksConfig: {},
    imagesConfig: PPV_IMAGES_CONFIG,
    listsConfig: {},
    elementsConfig: PPV_ELEMENT_CONFIG,
};
