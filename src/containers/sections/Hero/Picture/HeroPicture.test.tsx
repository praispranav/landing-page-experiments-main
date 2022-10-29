import { useLocalisedImage } from '@hooks/utils/UseLocalisedConfig';
import { render } from '@testing-library/react';
import { internet } from 'faker';

// eslint-disable-next-line jest/no-mocks-import
import { mockServiceDictionary } from '../../../../utils/dazn/__mocks__/MockService';
import { HeroPicture } from './HeroPicture';

jest.mock('@hooks/utils/UseLocalisedConfig');
jest.mock('@utils/dazn/Service', () => ({
    getServicePath: (): string => mockServiceDictionary.img.Versions.v4.ServicePath,
}));

describe('Hero Picture', () => {
    const baseImagePath = mockServiceDictionary.img.Versions.v4.ServicePath;
    describe('background image as an array', () => {
        const backgroundImages = [
            { src: '/test-image-mobile' },
            { src: 'test-image-tablet', screenWidth: 768 },
            { src: 'test-image-desktop', screenWidth: 1024 },
        ];

        it('should render the background image as picture sources', () => {
            (useLocalisedImage as jest.Mock).mockReturnValue(backgroundImages);

            const { queryByTestId } = render(<HeroPicture />);

            const backgroundsForScreenWidth = backgroundImages.filter(
                ({ screenWidth }) => screenWidth,
            );
            backgroundsForScreenWidth.forEach(({ screenWidth, src }) => {
                expect(queryByTestId(`HERO_SOURCE_${screenWidth}`)).toHaveAttribute('srcSet', `${baseImagePath}${src}`);
            });
        });

        it("should render the default background image as being the one that doesn't contain a screen width", () => {
            (useLocalisedImage as jest.Mock).mockReturnValue(backgroundImages);

            const { queryByTestId } = render(<HeroPicture />);

            const defaultBackground = backgroundImages.find(({ screenWidth }) => !screenWidth);
            expect(queryByTestId('HERO_SOURCE_DEFAULT')).toHaveAttribute(
                'src',
                `${baseImagePath}${defaultBackground?.src}`,
            );
        });
    });

    describe('background image as a string', () => {
        it("should render the default image when there's no specific image per resolution", () => {
            const defaultBackground = internet.url();
            (useLocalisedImage as jest.Mock).mockReturnValue(defaultBackground);
            const { queryByTestId } = render(<HeroPicture />);

            expect(queryByTestId('HERO_SOURCE_DEFAULT')).toHaveAttribute('src', `${baseImagePath}${defaultBackground}`);
        });

        it('should render the default image with an empty src when no background is set', () => {
            (useLocalisedImage as jest.Mock).mockReturnValue(null);
            const { queryByTestId } = render(<HeroPicture />);

            expect(queryByTestId('HERO_SOURCE_DEFAULT')).toHaveAttribute('src', '');
        });
    });
});
