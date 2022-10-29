import { useRail } from '@hooks/dazn/rail/UseRail';
import { getCountry } from '@utils/dazn/Region';
import { useQuery } from 'react-query';

import { filterBoxingRails, formatToTile, ITile } from '../utils';

const useNextUpRail = (railId: string): ITile[] => {
    const country = getCountry();

    const { Tiles } = useRail({
        id: railId,
        params: {
            PageType: 'Home',
            ContentType: 'None',
        },
    });

    if (Tiles.length === 0) {
        throw new Error('No tiles found for Next Up rail');
    }

    const { data = [] } = useQuery(`next-up-${country}`, () =>
        Promise.all(Tiles.map(formatToTile)),
    );

    return data;
};

export const useNextUpTiles = (railId: string): ITile[] => {
    const tiles = useNextUpRail(railId);
    return filterBoxingRails(tiles);
};
