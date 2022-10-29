import { QueryClientWrapper } from '@config/QueryClient';
// eslint-disable-next-line jest/no-mocks-import
import { spyUseService } from '@hooks/dazn/__mocks__/MockUseService';
import { renderHook } from '@testing-library/react-hooks';
import { getCountry } from '@utils/dazn/Region';
import { getServicePath } from '@utils/dazn/Service';

// eslint-disable-next-line jest/no-mocks-import
import MockSpoloResponse from './__mocks__/MockSpoloResponse.json';
// eslint-disable-next-line jest/no-mocks-import
import { mockServiceDictionary } from './__mocks__/MocksUseSpolo';
import { SpoloRequest } from './types';
import { useDefaultLogoSet, useSpolo } from './UseSpolo';

jest.mock('@utils/dazn/Service');
jest.mock('@utils/dazn/Region');

describe('UseSpolo', () => {
    describe('Hook', () => {
        beforeEach(() => {
            const mockServicePath = new URL(mockServiceDictionary.Spolo.Versions.v1.ServicePath);
            (getServicePath as jest.Mock).mockReturnValue(mockServicePath);
            (getCountry as jest.Mock).mockReturnValue(mockedCountry);
        });

        const SPOLO_CONFIG_MOCK = {
            name: 'Spolo',
            version: 1,
            category: 121,
        };

        const mockedCountry = 'de';

        const basedQuery = {
            $format: 'json',
            country: 'de',
            imageType: 'png',
        };

        const hookOptions = { wrapper: QueryClientWrapper };

        test('should transform and embed the default params object into the request', () => {
            const spiedUseService = spyUseService({ data: MockSpoloResponse });
            const mockedPath = 'logosets';
            const expectedQuery = {
                ...basedQuery,
                type: 'default',
                height: '200',
                width: '200',
            };

            renderHook(() => useSpolo({}), hookOptions);

            expect(spiedUseService).toHaveBeenCalledWith(SPOLO_CONFIG_MOCK, {
                key: `spolo-service-${mockedCountry}-${mockedPath}`,
                query: expect.objectContaining(expectedQuery),
                path: mockedPath,
                onError: expect.any(Function),
            });
        });

        test('should transform and embed the Tiering params object into the request', () => {
            const spiedUseService = spyUseService({ data: MockSpoloResponse });
            const mockedPath = 'logosets';
            const width = '100';
            const height = '100';
            const type = 'entitlementSet';
            const typeId = 'entitlementSet-111';

            const params = {
                path: mockedPath,
                type,
                typeId,
                width,
                height,
            } as SpoloRequest;

            const expectedQuery = {
                ...basedQuery,
                type,
                typeId,
                height,
                width,
            };

            renderHook(() => useSpolo(params), hookOptions);

            expect(spiedUseService).toHaveBeenCalledWith(SPOLO_CONFIG_MOCK, {
                key: `spolo-service-${mockedCountry}-${mockedPath}`,
                query: expect.objectContaining(expectedQuery),
                path: mockedPath,
                onError: expect.any(Function),
            });
        });

        test('should return the correct logo sets', () => {
            spyUseService({ data: MockSpoloResponse });

            const {
                result: { current },
            } = renderHook(() => useSpolo({}), hookOptions);

            expect(current).toStrictEqual(MockSpoloResponse.data);
        });

        describe('useDefaultLogoSet', () => {
            test('should return the logos urls', () => {
                spyUseService({ data: MockSpoloResponse });

                const {
                    result: { current },
                } = renderHook(() => useDefaultLogoSet(), hookOptions);

                expect(current).toStrictEqual(MockSpoloResponse.data?.[0].logos);
            });
        });
    });
});
