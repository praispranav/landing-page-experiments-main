import { useRail } from '@hooks/dazn/rail/UseRail';
import { getCountry } from '@utils/dazn/Region';
import { useQuery } from 'react-query';

import { BOXING_COMING_UP_PARAMS } from '../constants';
import { filterBoxingRails, formatToTile, ITile } from '../utils';
import { WhatsOnVariantEnum } from '../Variants';

const useComingUpRail = (): ITile[] => {
    const country = getCountry();
    const { Tiles } = useRail({
        id: WhatsOnVariantEnum.ComingUp,
        params: BOXING_COMING_UP_PARAMS,
    });
    const { data = [] } = useQuery(`coming-up-${country}`, () =>
        Promise.all(Tiles.map(formatToTile))
    )
    return data;
}

export const useBoxingComingUpTiles = (): ITile[] => {
    const comingUpTiles = useComingUpRail()
    return filterBoxingRails(comingUpTiles);
};
