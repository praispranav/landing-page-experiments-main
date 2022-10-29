import { triggerErrorImpression } from '@tracking/index';
import { DaznError } from '@utils/dazn/DaznError';
import { getCountry, getLanguage } from '@utils/dazn/Region';
import { RailResponse } from 'types/dazn/Rail/Rail';

import { ServiceCategories } from '../shared/ServiceCategoriesEnum';
import { ServiceConfiguration } from '../types';
import { useService } from '../UseService';
import { IRailHookRail, IRailHookRailParams, IRailHookResult } from './types';

const RAIL_CONFIG: ServiceConfiguration = {
    name: 'Rail',
    version: 3,
    category: ServiceCategories.Rail,
};

const formatRailParams = (params: IRailHookRailParams): string =>
    Object.keys(params).reduce(
        (accumulated, paramKey) =>
            `${accumulated}${paramKey}:${params[paramKey as keyof IRailHookRailParams]};`,
        '',
    );

export const useRail = ({ id, params }: IRailHookRail): IRailHookResult => {
    const formattedParams = typeof params === 'string' ? params : formatRailParams(params);

    const { data } = useService<RailResponse>(RAIL_CONFIG,
        {
            query: {
                $format: 'json',
                id,
                params: formattedParams,
                country: getCountry(),
                languageCode: getLanguage(),
            },
            key: id,
            onError: (error: DaznError) => {
                triggerErrorImpression('silent', error);
            },
        }
    );

    return data ? { Title: data.Title, Tiles: data.Tiles } : { Title: '', Tiles: [] };
};
