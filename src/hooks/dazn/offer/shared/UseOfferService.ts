import { HttpMethod } from '@dazn/hyper';
import { triggerErrorImpression } from '@tracking/index';
import { DaznError } from '@utils/dazn/DaznError';
import { getCountry } from '@utils/dazn/Region';
import { OffersResponse } from 'types/dazn/RatePlans/Offers';

import { ServiceCategories } from '../../shared/ServiceCategoriesEnum';
import { ServiceConfiguration, UseServiceResponse } from '../../types';
import { useService } from '../../UseService';
import { IRatePlansParams } from '../types';

const RATE_PLANS_CONFIG: ServiceConfiguration = {
    name: 'RatePlans',
    category: ServiceCategories.Offers,
    version: 4,
};

export const useOffersService = (): UseServiceResponse<OffersResponse> => {
    const params: IRatePlansParams = {
        Platform: 'web',
        Manufacturer: '',
    };

    return useService<OffersResponse>(RATE_PLANS_CONFIG, {
        method: HttpMethod.POST,
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json',
        },
        key: getCountry(),
        suspense: true,
        useErrorBoundary: false,
        onError: (error: DaznError) => {
            triggerErrorImpression('silent', error);
        },
    });
};
