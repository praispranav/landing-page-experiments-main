import { DeviceSize, getBackgroundImage } from './Hero';

describe('getBackgroundImage', () => {
    const testImage: Record<DeviceSize, string> = {
        small: '/fe-cle-images/none/test-image/fill/center/top/none/90/750/680/jpg/image',
        tablet: '/fe-cle-images/none/test-image/fill/center/top/none/90/1024/554/jpg/image',
        desktop: '/fe-cle-images/none/test-image/fill/center/top/none/90/1920/1040/jpg/image',
    };

    it('should return correct string for mobile', () => {
        const backgroundImage = getBackgroundImage(DeviceSize.Small, 'test-image');

        expect(backgroundImage).toBe(testImage.small);
    });

    it('should return correct string for tablet', () => {
        const backgroundImage = getBackgroundImage(DeviceSize.Tablet, 'test-image');

        expect(backgroundImage).toBe(testImage.tablet);
    });

    it('should return correct string for desktop', () => {
        const backgroundImage = getBackgroundImage(DeviceSize.Desktop, 'test-image');

        expect(backgroundImage).toBe(testImage.desktop);
    });
});
