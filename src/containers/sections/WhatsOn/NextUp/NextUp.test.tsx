import { QueryClientWrapper } from '@config/QueryClient';
import { getTileImage } from '@hooks/dazn/shared/Tile';
import { useElementSetting } from '@hooks/utils/UseLocalisedConfig';
import { render, RenderResult } from '@testing-library/react';
// eslint-disable-next-line jest/no-mocks-import
import { mockDateFnsLocale } from '@utils/__mocks__/MockDate';
// eslint-disable-next-line jest/no-mocks-import
import { mockServicePath } from '@utils/dazn/__mocks__/MockService';
import { internet } from 'faker';
import React, { ReactElement } from 'react';

import ComingUp from '../ComingUp';
import { TileTypes } from '../constants';
import NextUp from './';
// eslint-disable-next-line jest/no-mocks-import
import { getNextUpFightTilesMock } from './__mocks__/NextUpMocks';
import { getTileType } from './NextUp';
import { useNextUpTiles } from './NextUp.hooks';

jest.mock('../ComingUp');

jest.mock('./NextUp.hooks', () => ({
    ...jest.requireActual('./NextUp.hooks'),
    useNextUpTiles: jest.fn(),
}));

jest.mock('@hooks/utils/UseLocalisedConfig');

jest.mock('../Tiles', () => ({
    ...jest.requireActual('../Tiles'),
    StaticTiles: (): ReactElement => <div data-testid="STATICTILES" />,
}));

const railId = 'mockedRailId';

describe("What's On - Next Up", () => {
    beforeEach(() => {
        mockServicePath(internet.url());
    });

    const checkFightCards = async ({ getByTestId }: RenderResult): Promise<void> => {
        const tiles = await getNextUpFightTilesMock();

        tiles.forEach((tile, index) => {
            const imageUrl = getTileImage({
                imageId: tile.imageId,
                height: 222,
                width: 418,
            });

            const expectedTestId = `IMAGE_NEXT_UP_CARD_${index}`;
            expect(getByTestId(expectedTestId)).toHaveProperty('src', imageUrl);
        });
    };

    test('should call Coming Up rail as fallback', () => {
        (ComingUp as jest.Mock).mockReturnValue(null);
        (useNextUpTiles as jest.Mock).mockImplementation(() => {
            throw new Error();
        });

        render(<NextUp railId={railId} />, { wrapper: QueryClientWrapper });
        expect(ComingUp).toHaveBeenCalled();
    });

    test('should show static tiles when rails returns empty', () => {
        mockDateFnsLocale();
        (useNextUpTiles as jest.Mock).mockReturnValue([]);

        const { queryByTestId } = render(<NextUp railId={railId} />, {
            wrapper: QueryClientWrapper,
        });

        expect(queryByTestId('STATICTILES')).toBeInTheDocument();
    });

    test('should show tiles according to the data returned by rails', async () => {
        (useElementSetting as jest.Mock).mockReturnValue(true);
        const tiles = await getNextUpFightTilesMock();
        (useNextUpTiles as jest.Mock).mockReturnValue(tiles);
        mockDateFnsLocale();

        const result = render(<NextUp railId={railId} />, { wrapper: QueryClientWrapper });

        await checkFightCards(result);

        const renderedTiles = result.getAllByTestId('TILE');
        expect(renderedTiles).toHaveLength(7);
    });
});

describe('getTileType', () => {
    test('should return default when the entitlementIds are empty', () => {
        expect(getTileType([])).toBe(TileTypes.Default);
    });

    test('should return ppv when the entitlementIds are not empty', () => {
        expect(getTileType(['b0e10c4a-d69d-4e4b-9ddf-1749ab554032'])).toBe(TileTypes.PPV);
    });
});
