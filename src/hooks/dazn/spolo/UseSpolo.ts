import { triggerErrorImpression } from '@tracking/index';
import { DaznError } from '@utils/dazn/DaznError';
import { getCountry } from '@utils/dazn/Region';

import { ServiceCategories } from '../shared/ServiceCategoriesEnum';
import { ServiceConfiguration } from '../types';
import { useService } from '../UseService';
import { ILogoResponse, ISpoloData, ISpoloResponse, LogoSetType, SpoloRequest } from './types';

const SPOLO_CONFIG: ServiceConfiguration = {
    name: 'Spolo',
    category: ServiceCategories.Spolo,
    version: 1,
};

export const useSpolo = ({
    path = 'logosets',
    type = LogoSetType.DEFAULT,
    imageType = 'png',
    width = '200',
    height = '200',
    typeId,
}: SpoloRequest): ISpoloData[] => {
    const country = getCountry();

    const queryKey = `spolo-service-${country}-${path}`;
    const query: Record<string, string> = {
        $format: 'json',
        country,
        type,
        imageType,
        width,
        height,
    };

    if (type === LogoSetType.TIERING && typeId) {
        query.typeId = typeId;
    }

    const { data: spoloResponse } = useService<ISpoloResponse>(SPOLO_CONFIG, {
        key: queryKey,
        query,
        path,
        onError: (error: DaznError) => {
            triggerErrorImpression('silent', error);
        },
    });

    return spoloResponse?.data || [];
};

export const useDefaultLogoSet = (): ILogoResponse[] => {
    const result = useSpolo({});

    const logosData = result.reduce(
        (acc: ILogoResponse[], cur: ISpoloData) =>
            cur.type === LogoSetType.DEFAULT ? cur.logos : acc,
        [],
    );

    return logosData;
};
