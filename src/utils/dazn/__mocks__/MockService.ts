import { internet } from 'faker';
import { IServiceDictionary } from 'types/dazn/StartupData';

import * as Service from '../Service';

const mockedServicePath = internet.url();

export const mockServiceDictionary: IServiceDictionary = {
    Epg: {
        Versions: {
            v2: { ServicePath: mockedServicePath },
        },
    },

    Help: {
        Versions: {
            v1: { ServicePath: mockedServicePath },
        },
    },

    img: {
        Versions: {
            v2: { ServicePath: 'https://image.discovery.indazn.com/eu/v2/eu/image' },
            v4: { ServicePath: 'https://image.discovery.dazn-stage.com/eu/v4' },
        },
    },

    RatePlans: {
        Versions: {
            v4: { ServicePath: mockedServicePath },
        },
    },

    Rail: {
        Versions: {
            v3: { ServicePath: mockedServicePath },
        },
    },
    Spolo: {
        Versions: {
            v1: { ServicePath: mockedServicePath },
        },
    },
    Experiments: {
        Versions: {
            v1: {
                ServicePath: 'https://experiments-api.acc.indazn.com/v1/preview',
            },
        },
    },
};

export const mockServicePath = (servicePath = mockedServicePath): jest.SpyInstance =>
    jest.spyOn(Service, 'getServicePath').mockReturnValue(new URL(servicePath));
