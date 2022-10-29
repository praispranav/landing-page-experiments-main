import { ResourceStringsKeys } from '@config/ConfigsKeys';
import { VariantLocalStrings } from '@hooks/resourceStrings/Types';

export const HERO_STRINGS: VariantLocalStrings = {
    [ResourceStringsKeys.HeroTitle]: 'landingpages_web_hero_title',
    [ResourceStringsKeys.AnnouncementBanner]: 'landingpages_web_hero_announcementBanner',
    [ResourceStringsKeys.HeroDescription]: 'landingpages_web_hero_description',
    [ResourceStringsKeys.HeroLegalCopy]: 'landingpages_web_hero_legal',
};

export enum DeviceSize {
    Small = 'small',
    Tablet = 'tablet',
    Desktop = 'desktop',
};

const heroBackgroundImage: Record<DeviceSize, string> = {
    small: '/fe-cle-images/none/{{IMAGE_NAME}}/fill/center/top/none/90/750/680/jpg/image',
    tablet: '/fe-cle-images/none/{{IMAGE_NAME}}/fill/center/top/none/90/1024/554/jpg/image',
    desktop: '/fe-cle-images/none/{{IMAGE_NAME}}/fill/center/top/none/90/1920/1040/jpg/image',
};

export const getBackgroundImage = (deviceSize: DeviceSize, imageName: string): string =>
    heroBackgroundImage[deviceSize].replace('{{IMAGE_NAME}}', imageName)
