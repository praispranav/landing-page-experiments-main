import { ILocalImageObject } from '@hooks/resourceStrings/Types';
import { useLocalisedImage } from '@hooks/utils/UseLocalisedConfig';
import { renderHook } from '@testing-library/react-hooks';
import { internet } from 'faker';

import { useHeroDefaultPicture, useHeroPictureSources } from './HeroPicture.hooks';

jest.mock('@hooks/utils/UseLocalisedConfig');

const IMAGES: ILocalImageObject[] = [
    { src: internet.url() },
    { src: internet.url(), screenWidth: 768 },
    { src: internet.url(), screenWidth: 1024 },
];

describe('Hero Picture', () => {
    it('should return only images with a defined size as being "source images"', () => {
        (useLocalisedImage as jest.Mock).mockReturnValue(IMAGES);

        const { result } = renderHook(() => useHeroPictureSources());
        expect(result.current).toEqual(
            expect.arrayContaining(IMAGES.filter((image) => Boolean(image.screenWidth))),
        );
    });

    it('should return the source images sorted', () => {
        (useLocalisedImage as jest.Mock).mockReturnValue(IMAGES);

        const { result } = renderHook(() => useHeroPictureSources());

        const filterWithScreenWidth = (
            image: ILocalImageObject,
        ): image is Required<ILocalImageObject> => Boolean(image.screenWidth);

        const expectedSources = IMAGES.filter(filterWithScreenWidth).sort(
            (a, b) => b.screenWidth - a.screenWidth,
        );

        expect(result.current).toStrictEqual(expectedSources);
    });

    it('should return the first image without a defined size as the default one', () => {
        (useLocalisedImage as jest.Mock).mockReturnValue(IMAGES);

        const { result } = renderHook(() => useHeroDefaultPicture());
        const expectedDefaultImage = IMAGES.find((image) => !image.screenWidth)?.src;

        expect(result.current).toStrictEqual({ src: expectedDefaultImage });
    });

    it('if the image value is a string, the default picture should be in the format of a ILocalImageObject', () => {
        const mockSource = internet.url();
        (useLocalisedImage as jest.Mock).mockReturnValue(mockSource);

        const { result } = renderHook(() => useHeroDefaultPicture());
        expect(result.current).toStrictEqual({ src: mockSource });
    });

    it('if the image value is a string, the picture sources should be an empty array', () => {
        const mockSource = internet.url();
        (useLocalisedImage as jest.Mock).mockReturnValue(mockSource);

        const { result } = renderHook(() => useHeroPictureSources());
        expect(result.current).toStrictEqual([]);
    });
});
