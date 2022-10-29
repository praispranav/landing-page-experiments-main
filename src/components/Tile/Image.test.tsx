import { render } from '@testing-library/react';
import { internet } from 'faker';

import { Image } from './Image';

const srcMock = `${internet.url()}/image.jpg`;
const testId = 'FOO';
const contentId = 'CONTENT_ID';

describe('Tile.Image', () => {
    it('should render Tile Image', () => {
        const { queryByTestId } = render(<Image src={srcMock} testid={testId} />);
        const image = queryByTestId(testId);
        expect(image).toHaveProperty('src', srcMock);
    });

    it('should render Tile Image with children elements', () => {
        const { queryByTestId } = render(
            <Image src={srcMock} testid={testId}>
                <div data-testid={contentId} />
            </Image>,
        );
        const image = queryByTestId(testId);
        expect(image).toHaveProperty('src', srcMock);
        expect(queryByTestId(contentId)).toBeInTheDocument();
    });
});
