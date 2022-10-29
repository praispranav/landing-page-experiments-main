import { IStartupData } from 'types/dazn/StartupData';

export const startupData: IStartupData = {
    SupportedLanguages: ['en', 'de'],
    Region: {
        isAllowed: true,
        GeolocatedCountry: 'de',
        GeolocatedCountryName: 'Germany',
        GeolocatedSubregion: 'western_europe',
        GeolocatedRegion: 'europe',
        Currency: 'eur',
        CountrySubdivision: null,
        Country: 'de',
        Language: 'en',
        isAnonymous: false,
        isMoon: false,
        MarketingEmailsDefault: false,
        HideMarketingOptIns: true,
        HideNflMarketingOptIns: true,
        CountryPortabilityStatus: 'NativeAndPortabilityAvailable',
    },
    ServiceDictionary: {
        Rail: {
            Versions: {
                v3: {
                    ServicePath: 'https://rail-router.discovery.dazn-stage.com/eu/v3/Rail',
                },
            },
        },
        img: {
            Versions: {
                v2: {
                    ServicePath: 'https://image.discovery.dazn-stage.com/eu/v2/eu/image',
                },
                v4: {
                    ServicePath: 'https://image.discovery.dazn-stage.com/eu/v4',
                },
            },
        },
        RatePlans: {
            Versions: {
                v4: {
                    ServicePath: 'https://tiered-pricing-offer-service.ar.dazn-stage.com/v1/offers',
                },
            },
        },
        Epg: {
            Versions: {
                v2: {
                    ServicePath: 'https://epg.discovery.dazn-stage.com/eu/v2/Epg',
                },
            },
        },
        Help: {
            Versions: {
                v1: {
                    ServicePath: 'https://help.stage.ar.dazn-stage.com',
                },
            },
        },
        Spolo: {
            Versions: {
                v1: {
                    ServicePath: 'https://spolo-public-api-global.acc.dazn-stage.com/v1',
                },
            },
        },
        Experiments: {
            Versions: {
                v1: {
                    ServicePath: 'https://experiments-api.acc.indazn.com/v1/preview',
                },
            },
        },
    },
};
