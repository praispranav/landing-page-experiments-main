import { internet } from 'faker';
import { RailResponse } from 'types/dazn/Rail/Rail';
import { IServiceDictionary } from 'types/dazn/StartupData';

export const mockComingUpRails = {
    getEnglish: (): Promise<RailResponse> => import('./RailComingUp_enUS.json').then((json) => json.default) as Promise<RailResponse>,

    getSpanish: (): Promise<RailResponse> =>
        import('./RailComingUp_esUS.json').then((json) => json.default) as Promise<RailResponse>,
};

export const mockNextUpRails = {
    getEnglish: (): Promise<RailResponse> =>
        import('./RailNextUp_enUS.json').then((json) => json.default) as Promise<RailResponse>,

    getSpanish: (): Promise<RailResponse> =>
        import('./RailNextUp_esUS.json').then((json) => json.default) as Promise<RailResponse>,
};

const mockServicePath = internet.url();
export const mockServiceDictionary: Pick<IServiceDictionary, 'Rail' | 'img'> = {
    img: {
        Versions: {
            v2: { ServicePath: mockServicePath },
        },
    },

    Rail: {
        Versions: {
            v3: { ServicePath: mockServicePath },
        },
    },
};
