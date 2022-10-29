import { internet } from 'faker';
import { IServiceDictionary } from 'types/dazn/StartupData';

const mockServicePath = internet.url();
export const mockServiceDictionary: Pick<IServiceDictionary, 'Spolo'> = {
    Spolo: {
        Versions: {
            v1: { ServicePath: mockServicePath },
        },
    },
};
