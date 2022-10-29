import { IServiceDictionary, IStartupData } from 'types/dazn/StartupData';

// eslint-disable-next-line jest/no-mocks-import
import { mockServiceDictionary } from './__mocks__/MockService';
import { getServiceVersions } from './Service';

window.dazn.startupData = {
    ServiceDictionary: mockServiceDictionary,
} as IStartupData;

describe('Service', () => {
    type ServiceKeys = (keyof IServiceDictionary)[];
    const expectedServices = Object.keys(mockServiceDictionary).map((key) => [key]) as ServiceKeys[];

    test.each<ServiceKeys>(expectedServices)(
        'getServiceVersions is returning the versions for the %s service',
        (serviceName) => {
            expect(getServiceVersions(serviceName)).toBe(mockServiceDictionary[serviceName]);
        },
    );
});
