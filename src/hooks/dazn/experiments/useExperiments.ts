import { triggerErrorImpression } from '@tracking/index';
import { DaznError } from '@utils/dazn/DaznError';
import { getCountry, getLanguage } from '@utils/dazn/Region';

import { ServiceCategories } from '../shared/ServiceCategoriesEnum';
import { ServiceConfiguration, UseServiceResponse } from '../types';
import { useService } from '../UseService';

const EXPERIMENTS_CONFIG: ServiceConfiguration = {
    name: 'Experiments',
    category: ServiceCategories.Experiments,
    version: 1,
};

export interface ExperimentsResponse {
    Experiments: Record<
        string,
        {
            [stringKey: string]: {
                [variationKey: string]: string;
            };
        }
    >;
}

const useExperiments = (): UseServiceResponse<ExperimentsResponse> | null => {
    const region = getCountry();
    const languageCode = getLanguage();

    const queryKey = `${languageCode}-${region}`;

    const query: Record<string, string> = {
        $format: 'json',
        languageCode,
        region,
    };

    try {
        return useService<ExperimentsResponse>(EXPERIMENTS_CONFIG, {
            key: `experiments-service-${queryKey}`,
            query,
            path: 'strings/experiments',
            onError: (error: DaznError) => {
                triggerErrorImpression('silent', error);
            },
        });
    } catch (error) {
        return null;
    }
};

export const useExperimentVariables = (): ExperimentsResponse['Experiments'] | undefined => {
    const experiments = useExperiments();

    return experiments?.data?.Experiments;
};
