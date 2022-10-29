import { IRegion } from './Region';

export interface IService {
    Versions: {
        [versionName: string]: {
            ServicePath: string;
        };
    };
}

export interface IServiceDictionary {
    Epg: IService;
    Help: IService;
    img: IService;
    RatePlans: IService;
    Rail: IService;
    Spolo: IService;
    Experiments: IService;
}

export interface IStartupData {
    Region: IRegion;
    ServiceDictionary: IServiceDictionary;
    SupportedLanguages: string[];
}
