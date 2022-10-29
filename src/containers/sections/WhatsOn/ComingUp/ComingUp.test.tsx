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

import { TileTypes } from '../constants';
import ComingUp from '.';
// eslint-disable-next-line jest/no-mocks-import
import { getComingUpFightTilesMock, mockUseFightHook } from './__mocks__/ComingUpMocks';
import { getTileType } from './ComingUp';

jest.mock('@hooks/utils/UseLocalisedConfig');
jest.mock('../Tiles', () => ({
    ...jest.requireActual('../Tiles'),
    StaticTiles: (): ReactElement => <div data-testid="STATICTILES" />,
}));

const checkFightCards = async ({ getByTestId }: RenderResult): Promise<void> => {
    const fightTiles = await getComingUpFightTilesMock();

    fightTiles.forEach((tile, index) => {
        const imageUrl = getTileImage({
            imageId: tile.imageId,
            height: 222,
            width: 418,
        });

        const expectedTestId = `IMAGE_FIGHT_CARD_${index}`;
        expect(getByTestId(expectedTestId)).toHaveProperty('src', imageUrl);
    });
};

const checkDefaultTiles = async ({ queryByTestId }: RenderResult): Promise<void> => {
    expect(queryByTestId('STATICTILES')).toBeTruthy();
};

describe("What's On - Coming Up", () => {
    beforeEach(() => {
        mockServicePath(internet.url());
    });

    // eslint-disable-next-line jest/expect-expect
    test('should show four tiles when rails returns empty', () => {
        mockUseFightHook([]);
        mockDateFnsLocale();

        const result = render(<ComingUp />, { wrapper: QueryClientWrapper });
        checkDefaultTiles(result);
    });

    test('should show tiles according to the data returned by rails', async () => {
        (useElementSetting as jest.Mock).mockReturnValue(true);
        const fightTiles = await getComingUpFightTilesMock();
        mockUseFightHook(fightTiles);
        mockDateFnsLocale();

        const result = render(<ComingUp />, {
            wrapper: QueryClientWrapper,
        });

        await checkFightCards(result);
        checkDefaultTiles(result);

        const tiles = result.getAllByTestId('TILE');
        expect(tiles).toHaveLength(8);
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
