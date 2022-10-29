/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable id-length */
import { IDazn } from 'types/dazn';
import { DaznChapterEnum } from 'types/dazn/DaznChapterEnum';

import { resourceStringsData } from './mockResourceStringsData';
import { startupData } from './mockStartupData';

export const mockBootstrap: IDazn = {
    resourceStringsData,
    startupData,
    language: 'en',
    device: {
        id: '0053a7c45d',
        guid: 'ab38ccb1-8fd2-42ee-880f-ee38f18e0f21',
        manufacturer: '',
        platform: 'web',
        model: '',
    },
    deviceId: '0053a7c45d',
    captureException: (): void => {},
    experiment: {
        trackAuthenticated: (): void => {},
        trackAnonymous: (): void => {},
        getVariationAnonymous: (): string => '',
        activateAnonymous: () => true,
        getVariationAuthenticated: () => '',
        activateAuthenticated: () => true,
    },
    features: {
        isEnabledAnonymous: (): boolean => true,
        getVariableStringAnonymous: <T>(): T => true as unknown as T,
    },
    devMode: {
        isDevModeEnabled: false,
        enable: (): void => {},
        disable: (): void => {},
    },
    lifecycle: { onChapterUnload: (): void => {} },
    chapterHistory: {
        currentChapter: DaznChapterEnum.LandingPage,
        getChapterFromPath: (pathname: string): string => pathname,
    },
    environment: 'staging',
    platform: 'web',
};
