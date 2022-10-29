import { ITileImage } from '@hooks/dazn/shared/Tile';
import { formatDate } from '@utils/Date';
import { getCountry, getLanguage } from '@utils/dazn/Region';
import { RailTile } from 'types/dazn/Rail/Rail';

import { BOXING_TILE_TITLES } from './constants';

export type ITile = Pick<ITileImage, 'imageId'> & {
    title: string;
    eventId: string;
    subtitle: string;
    entitlementIds: string[];
};

export const formatToTile = async (tile: RailTile): Promise<ITile> => {
    const subtitle = tile.Start
        ? await formatDate(new Date(tile.Start), getLanguage(), getCountry())
        : '';

    return {
        title: tile.Title,
        imageId: tile.Image.Id,
        eventId: tile.EventId,
        entitlementIds: tile.EntitlementIds,
        subtitle,
    };
};

export const filterBoxingRails = (rails: ITile[]): ITile[] => {
    const titleSuffix = BOXING_TILE_TITLES[getLanguage()] ?? BOXING_TILE_TITLES.en;
    return rails.filter(({ title }) => title.includes(titleSuffix));
};
