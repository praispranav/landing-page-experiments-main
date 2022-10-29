import { QueryClientWrapper } from '@config/QueryClient';
import { render } from '@testing-library/react';
import { internet, random } from 'faker';

import { TileTypes } from '../constants';
import { Tile } from './';

const testId = 'MOCK_BACKGROUND';
const mockName = random.words(3);
const mockImage = `${internet.url()}/image.jpg`;
describe('ComingUpTile', () => {
    it('should render standard tile as default', () => {
        const { queryByTestId } = render(
            <Tile name={mockName} image={mockImage} testid={testId} />,
            { wrapper: QueryClientWrapper },
        );

        const image = queryByTestId(`IMAGE_${testId}`);
        const ppv = queryByTestId('PPV_TAG');
        expect(image).toHaveProperty('src', mockImage);
        expect(ppv).not.toBeInTheDocument();
    });

    it('should render standard tile when wrong type is set', () => {
        const { queryByTestId } = render(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            <Tile name={mockName} image={mockImage} testid={testId} variation="FOO" />,
            { wrapper: QueryClientWrapper },
        );

        const image = queryByTestId(`IMAGE_${testId}`);
        const ppv = queryByTestId('PPV_TAG');
        expect(image).toHaveProperty('src', mockImage);
        expect(ppv).not.toBeInTheDocument();
    });

    it('should render PPV tile', () => {
        const { queryByTestId } = render(
            <Tile name={mockName} image={mockImage} testid={testId} variation={TileTypes.PPV} />,
            { wrapper: QueryClientWrapper },
        );

        const image = queryByTestId(`IMAGE_${testId}`);
        const ppv = queryByTestId('PPV_TAG');
        expect(image).toHaveProperty('src', mockImage);
        expect(ppv).toBeInTheDocument();
    });
});
