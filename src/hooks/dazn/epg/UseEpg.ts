import { IScheduleTile } from '@dazn/discovery-web-module-components/dist/ScheduleGrid';
import { getLabels } from '@dazn/discovery-web-module-utils';
import { triggerErrorImpression } from '@tracking/index';
import { DaznError } from '@utils/dazn/DaznError';
import { getCountry, getLanguage } from '@utils/dazn/Region';
import { useQuery } from 'react-query';
import { RailTile } from 'types/dazn/Rail/Rail';

import { ServiceCategories } from '../shared/ServiceCategoriesEnum';
import { getTileImage, getTileMetadata } from '../shared/Tile';
import { ServiceConfiguration } from '../types';
import { useService } from '../UseService';
import { IS_FREE_TO_VIEW_ENABLED, IS_PAY_PER_VIEW_TILE } from './constants';
import { IEpgQuery, IEpgQueryWithFilters, IEpgResponse } from './types';

const EPG_CONFIG: ServiceConfiguration = {
    name: 'Epg',
    category: ServiceCategories.Epg,
    version: 2,
};

const mapTilesWithMetadata = async (tile: RailTile): Promise<IScheduleTile> => {
    const subtitle = await getTileMetadata(tile);

    const labels = getLabels('Default', tile, IS_FREE_TO_VIEW_ENABLED, IS_PAY_PER_VIEW_TILE);

    const imageUrl = getTileImage({
        imageId: tile.Image.Id,
        width: 334,
        height: 187,
    });

    return {
        id: tile.Id,
        eventId: tile.EventId,
        title: tile.Title,
        subtitle,
        imageUrl,
        labels,
    };
};

export const useEpg = (date: string, sports: string[]): IScheduleTile[] => {
    const baseQuery: IEpgQuery = {
        $format: 'json',
        date,
        country: getCountry(),
        languageCode: getLanguage(),
    };

    const query: IEpgQuery | IEpgQueryWithFilters = sports.length
        ? { ...baseQuery, filters: sports.join(';') }
        : baseQuery;

    const queryKey = JSON.stringify(query);

    const { data: epgResponse } = useService<IEpgResponse>(EPG_CONFIG, {
        key: `epg-service-${queryKey}`,
        query,
        onError: (error: DaznError) => {
            triggerErrorImpression('silent', error);
        },
    });

    const epgTiles = epgResponse?.Tiles ?? [];

    const { data: epgWithMetadata } = useQuery(`epg-metadata-${queryKey}`, () =>
        Promise.all(epgTiles.map(mapTilesWithMetadata)),
    );

    return epgWithMetadata ?? [];
};
