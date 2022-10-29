import { render } from '@testing-library/react';

import { Tile } from './Tile';

const testId = 'MOCK_NODE';
describe('Tile', () => {
    test('should render Tile with children elements', async () => {
        const { getByTestId } = render(
            <Tile width={100}>
                <div data-testid={testId} />
            </Tile>,
        );

        expect(getByTestId(testId)).toBeInTheDocument();
    });
});
