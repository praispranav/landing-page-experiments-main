import { HyperError, HyperErrorCode, IConfig, make } from '@dazn/hyper';
import { getApplicationName } from '@utils/Application';
import { DaznError } from '@utils/dazn/DaznError';
import { getEnvironment } from '@utils/dazn/Environment';
import { getDeviceId, isDevModeEnabled } from '@utils/dazn/MarcoPolo';
import { getPlatform } from '@utils/dazn/Platform';
import { getCountry } from '@utils/dazn/Region';
import { getServicePath } from '@utils/dazn/Service';
import { useCallback, useMemo } from 'react';
import { useQuery } from 'react-query';

import {
    IMarcoPoloHeaders,
    ServiceConfiguration,
    ServiceName,
    ServiceOptions,
    ServiceUrlOptions,
    UseServiceResponse,
} from './types';

const GENERIC_UI_ERROR_CODE = 0;
const GENERIC_UI_ERROR_STATUS = 0;

const getServiceUrl = (
    name: ServiceName,
    versionNumber: number,
    options?: ServiceUrlOptions,
): string => {
    const serviceUrl = getServicePath(name, versionNumber);

    if (options?.path) {
        serviceUrl.pathname = `${serviceUrl.pathname}/${options.path}`.replace('//', '/');
    }

    if (options?.query) {
        serviceUrl.search = new URLSearchParams(options.query).toString();
    }

    return serviceUrl.toString();
};

const getRequestHeaders = <T extends ServiceOptions['headers']>(
    headers: T,
): T | (T & IMarcoPoloHeaders) =>
    isDevModeEnabled()
        ? {
              ...headers,
              'x-dazn-marco': '',
              'x-dazn-device': getDeviceId(),
          }
        : headers;

export const useService = <TQueryResponse>(
    { name, category, version }: ServiceConfiguration,
    {
        key,
        path,
        query,
        headers,
        onError,
        suspense = true,
        useErrorBoundary,
        ...options
    }: ServiceOptions,
): UseServiceResponse<TQueryResponse> => {
    const requestKey = key ? `${name}${key}` : name;
    const requestUrl = getServiceUrl(name, version, { path, query });

    const requestOptions: IConfig<Omit<ServiceOptions, 'key' | 'path' | 'query'>> = useMemo(
        () => ({
            ...options,
            headers: getRequestHeaders(headers ?? {}),
            dazn: {
                serviceName: getApplicationName(),
                target: getPlatform(),
                environment: getEnvironment(),
                country: getCountry(),
            },
        }),
        [headers, options],
    );

    const requestCallback = useCallback(async () => {
        try {
            const request = make<TQueryResponse>(requestUrl, requestOptions);
            return await request.done;
        } catch (error) {
            const hyperError = error as HyperError;

            switch (hyperError.code) {
                case HyperErrorCode.FAILED_REQUEST:
                    throw new DaznError({
                        name: name.toString(),
                        category,
                        code: hyperError.code,
                        message: hyperError.response,
                        httpStatus: hyperError.status,
                    });

                case HyperErrorCode.NETWORK_ERROR:
                    throw new DaznError({
                        name: name.toString(),
                        message: `Failed to fetch on ${requestUrl}`,
                        code: GENERIC_UI_ERROR_CODE,
                        category,
                        httpStatus: GENERIC_UI_ERROR_STATUS,
                    });

                default:
                    throw error;
            }
        }
    }, [category, name, requestUrl, requestOptions]);

    const result = useQuery<TQueryResponse, DaznError, TQueryResponse>(
        requestKey,
        requestCallback,
        { suspense, useErrorBoundary, onError },
    );

    return { ...result, url: requestUrl };
};
