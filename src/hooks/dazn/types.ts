import { IConfig } from '@dazn/hyper';
import { DaznError } from '@utils/dazn/DaznError';
import { QueryObserverResult } from 'react-query';
import { IServiceDictionary } from 'types/dazn/StartupData';

import { ServiceCategories } from './shared/ServiceCategoriesEnum';

export type UseServiceResponse<TQueryResponse> = QueryObserverResult<TQueryResponse, DaznError> & {
    url: string;
};

export interface ServiceUrlOptions {
    query?: Record<string, string>;
    path?: string;
}

export type ServiceName = keyof IServiceDictionary;

export interface IMarcoPoloHeaders extends Record<string, string> {
    'x-dazn-marco': '';
    'x-dazn-device': string;
}

export interface ServiceConfiguration {
    name: ServiceName;
    category: ServiceCategories;
    version: number;
}

export type ServiceOptions = IConfig &
    ServiceUrlOptions & {
        key: string;
        suspense?: boolean;
        useErrorBoundary?: boolean;
        onError?: (error: DaznError) => void;
    };

export interface ServiceError {
    ['odata.error']: {
        code: number;
        message: {
            lang: string;
            value: string;
        };
    };
}
