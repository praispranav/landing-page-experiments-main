// eslint-disable-next-line jest/no-mocks-import
import { mockComingUpRails } from '@hooks/dazn/rail/__mocks__/MocksUseRail';

import { filterBoxingRails, formatToTile } from '../../utils';
import * as ComingUpHooks from '../ComingUp.hooks';

export const getComingUpFightTilesMock = async (): Promise<
    ReturnType<typeof ComingUpHooks.useBoxingComingUpTiles>
> => {
    const { Tiles: tiles } = await mockComingUpRails.getEnglish();
    const formattedTiles = await Promise.all(tiles.map(formatToTile));
    return filterBoxingRails(formattedTiles)
};

export const mockUseFightHook = (
    tiles: ReturnType<typeof ComingUpHooks.useBoxingComingUpTiles>,
): jest.SpyInstance => jest.spyOn(ComingUpHooks, 'useBoxingComingUpTiles').mockReturnValue(tiles);
