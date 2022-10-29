import { ImagesKeys } from '@config/ConfigsKeys';
import { ILocalImageObject } from '@hooks/resourceStrings/Types';
import { useLocalisedImage } from '@hooks/utils/UseLocalisedConfig';

export const useHeroPictureSources = (): ILocalImageObject[] => {
    const heroBackground = useLocalisedImage(ImagesKeys.HeroBackground);

    if (!Array.isArray(heroBackground)) {
        return [];
    }

    return heroBackground
        .filter((pic): pic is Required<ILocalImageObject> => Boolean(pic.screenWidth))
        .sort((a, b) => b.screenWidth - a.screenWidth);
};

export const useHeroDefaultPicture = (): ILocalImageObject | undefined => {
    const heroBackground = useLocalisedImage(ImagesKeys.HeroBackground) ?? '';

    return Array.isArray(heroBackground)
        ? heroBackground.find((pic): pic is Pick<ILocalImageObject, 'src'> => !pic.screenWidth)
        : { src: heroBackground };
};
