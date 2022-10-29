// eslint-disable-next-line jest/no-mocks-import
import { mockNextUpRails } from '@hooks/dazn/rail/__mocks__/MocksUseRail';

import { filterBoxingRails, formatToTile } from '../../utils';
import * as NextUpHooks from '../NextUp.hooks';

export const getNextUpFightTilesMock = async (): Promise<
    ReturnType<typeof NextUpHooks.useNextUpTiles>
> => {
    const { Tiles: tiles } = await mockNextUpRails.getEnglish();
    const formattedTiles = await Promise.all(tiles.map(formatToTile));
    return filterBoxingRails(formattedTiles)
};
