const mockedMake = jest.fn();
jest.mock('@dazn/hyper', () => ({
    ...jest.requireActual('@dazn/hyper'),
    make: mockedMake,
}));

jest.mock('@utils/dazn/Region');

import { QueryClientWrapper } from '@config/QueryClient';
import { HyperError, HyperErrorCode } from '@dazn/hyper';
import IConfigDazn from '@dazn/hyper/dist/commonjs/Interfaces/IConfigDazn';
import { renderHook } from '@testing-library/react-hooks';
import { getApplicationName } from '@utils/Application';
// eslint-disable-next-line jest/no-mocks-import
import {
    mockDeviceId,
    mockDisableDevMode,
    mockEnableDevMode,
} from '@utils/dazn/__mocks__/MockMarcoPolo';
import { DaznError } from '@utils/dazn/DaznError';
import { getEnvironment } from '@utils/dazn/Environment';
import { getPlatform } from '@utils/dazn/Platform';
import { getCountry } from '@utils/dazn/Region';
import { datatype, internet, random } from 'faker';
import React, { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { IServiceDictionary, IStartupData } from 'types/dazn/StartupData';

import { ServiceError, ServiceOptions, UseServiceResponse } from './types';

const mockServiceDomain = `${internet.url()}/v1`;
const mockServiceDictionary: Partial<IServiceDictionary> = {
    Rail: {
        Versions: {
            v3: { ServicePath: mockServiceDomain },
        },
    },
    RatePlans: {
        Versions: {
            v4: { ServicePath: mockServiceDomain },
        },
    },
};

interface IServiceInfo {
    name: keyof IServiceDictionary;
    version: number;
    responseStatus: 'success' | 'error';
}

const mockServicesList: Record<string, IServiceInfo> = {
    rail: {
        name: 'Rail',
        version: 3,
        responseStatus: 'success',
    },
    ratePlans: {
        name: 'RatePlans',
        version: 4,
        responseStatus: 'error',
    },
};

window.dazn.startupData = {
    ServiceDictionary: mockServiceDictionary,
} as IStartupData;

const mockBodyResponse = { [random.word()]: random.words() };
const mockHyperMake = (response = Promise.resolve(mockBodyResponse)): jest.Mock => {
    mockedMake.mockReturnValue({ done: response });

    return mockedMake;
};

const mockMarcoPoloHeaders = (): Record<string, string> => {
    const deviceId = datatype.uuid();

    mockDeviceId(deviceId);
    mockEnableDevMode();

    return {
        'x-dazn-marco': '',
        'x-dazn-device': deviceId,
    };
};

const mockQueryClient = (): { client: QueryClient; Provider: FC } => {
    const client = new QueryClient();
    const Provider: FC = ({ children }) => (
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
    );

    return { client, Provider };
};

const renderService = async (
    options: ServiceOptions = { key: datatype.uuid() },
    Provider: FC = QueryClientWrapper,
    service: IServiceInfo = mockServicesList.rail,
): Promise<UseServiceResponse<typeof mockBodyResponse>> => {
    const SERVICE_MOCK_CONFIG = { name: service.name, version: service.version, category: 8000 };

    const { useService } = await import('./UseService');

    const { result, waitFor } = renderHook(
        () => useService<typeof mockBodyResponse>(SERVICE_MOCK_CONFIG, options),
        {
            wrapper: Provider,
        },
    );

    if (service.responseStatus === 'error') {
        await waitFor(() => expect(result.error).toBeTruthy());
        return result.current;
    }

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
    return result.current;
};

describe('Use Service', () => {
    const mockCountry = 'DE';

    beforeEach(() => {
        mockDisableDevMode();
        (getCountry as jest.Mock).mockReturnValue(mockCountry);
    });

    it(`should use the mocked service path ${mockServiceDomain} when calling the api`, async () => {
        mockHyperMake();

        const result = await renderService();

        expect(result.url).toBe(mockServiceDomain);
    });

    it('should construct the url of the service with query and append the path to the original one', async () => {
        const path = 'abc/abc';
        const query = { test: '123', test2: '12345' };

        const expectedQueryParams = new URLSearchParams(query).toString();
        const mockedUrl = `${mockServiceDomain}/${path}?${expectedQueryParams}`;

        mockHyperMake();

        await renderService({
            key: datatype.uuid(),
            path,
            query,
        });

        expect(mockedMake).toHaveBeenCalledWith(
            mockedUrl,
            expect.objectContaining({ headers: {} }),
        );
    });

    it('should construct the correct URL with appended path when it has also a slash', async () => {
        const path = '/abc/abc';

        const mockedUrl = `${mockServiceDomain}${path}`

        mockHyperMake();

        await renderService({
            key: datatype.uuid(),
            path,
        });

        expect(mockedMake).toHaveBeenCalledWith(
            mockedUrl,
            expect.objectContaining({ headers: {} }),
        );
    });

    it('should add an entry to query cache with the key passed', async () => {
        const { client, Provider } = mockQueryClient();
        const key = datatype.uuid();

        mockHyperMake();

        await renderService({ key }, Provider);

        const keyQueryCache = `${mockServicesList.rail.name}${key}`;
        const cachedQueryData = client.getQueryData(keyQueryCache);

        expect(cachedQueryData).toStrictEqual(mockBodyResponse);
    });

    it('should add an entry to query cache with the suspense status', async () => {
        const { client, Provider } = mockQueryClient();
        const key = datatype.uuid();

        mockHyperMake();

        await renderService({ key, suspense: false }, Provider);

        const queryKey = `${mockServicesList.rail.name}${key}`;
        const cachedQueryOptions = client.getQueryCache().find(queryKey)?.options;

        expect(cachedQueryOptions).toHaveProperty('suspense', false);
    });

    describe('XHR', () => {
        it('should return the data from the mocked response of RatePlans', async () => {
            mockHyperMake();
            const result = await renderService();
            expect(result.data).toStrictEqual(mockBodyResponse);
        });

        it('should throw an error on response status 4xx, 5xx', async () => {
            jest.spyOn(console, 'error').mockImplementation(() => undefined);

            const mockHttpStatus = 401;
            const mockBody = JSON.stringify({
                ['odata.error']: {
                    code: 10000,
                    message: { value: 'something went wrong', lang: 'en-US' },
                },
            } as ServiceError);

            const hyperError = new HyperError(
                HyperErrorCode.FAILED_REQUEST,
                mockHttpStatus,
                mockHttpStatus,
                mockBody,
            );

            mockHyperMake(Promise.reject(hyperError));

            const customError = new DaznError({
                name: mockServicesList.ratePlans.name,
                message: mockBody,
                code: 0,
                category: 8000,
                httpStatus: mockHttpStatus,
            });

            await expect(
                renderService(undefined, undefined, mockServicesList.ratePlans),
            ).rejects.toEqual(customError);

            jest.spyOn(console, 'error').mockRestore();
        });
    });

    describe('Marco Polo', () => {
        const { Provider } = mockQueryClient();

        it('should add the marco polo headers when dev mode is enabled', async () => {
            const marcoPoloHeaders = mockMarcoPoloHeaders();

            mockHyperMake();

            await renderService(undefined, Provider);

            expect(mockedMake).toHaveBeenCalledWith(
                mockServiceDomain,
                expect.objectContaining({
                    headers: marcoPoloHeaders,
                }),
            );
        });

        it('should merge the marco polo headers when dev mode is enabled & other headers were passed', async () => {
            const key = datatype.uuid();
            const headers = { [datatype.uuid()]: random.words() };
            const marcoPoloHeaders = mockMarcoPoloHeaders();
            const expectedHeaders = { ...headers, ...marcoPoloHeaders };

            mockHyperMake();

            await renderService({ key, headers }, Provider);

            expect(mockedMake).toHaveBeenCalledWith(
                mockServiceDomain,
                expect.objectContaining({
                    headers: expectedHeaders,
                }),
            );
        });
    });

    describe('DAZN User-Agent', () => {
        it('should send a DAZN UA header on all requests', async () => {
            mockHyperMake();

            await renderService();

            const expectedDazn: IConfigDazn = {
                serviceName: getApplicationName(),
                country: getCountry(),
                target: getPlatform(),
                environment: getEnvironment(),
            };

            expect(mockedMake).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    dazn: expectedDazn,
                }),
            );
        });
    });
});
