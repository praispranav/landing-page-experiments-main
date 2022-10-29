/* eslint-disable jest/no-mocks-import */
import { queryClient } from '@config/QueryClient';
import MockEpg from '@hooks/dazn/epg/__mocks__/MockEpg.json';
import MockEpgEntitlements from '@hooks/dazn/epg/__mocks__/MockEpgEntitlements.json';
import MockSports from '@hooks/dazn/epg/__mocks__/MockRail.json';
import MockComingUpRail from '@hooks/dazn/rail/__mocks__/RailComingUp_enUS.json';
import MockNextUpRail from '@hooks/dazn/rail/__mocks__/RailNextUp_enUS.json';
import { IMock } from '@utils/__mocks__/UseXhrMocks';
import { LocaleKeys } from '@utils/dazn/__mocks__/constants';

import { WhatsOnVariantEnum } from '../Variants';

const mockRail = (responseBody: Record<string, unknown>, id: string): IMock => ({
    method: 'GET',
    url: new RegExp(`.+${id}.*`),
    response: { body: JSON.stringify(responseBody) },
});

const mockEpg = (responseBody: Record<string, unknown>): IMock => ({
    method: 'GET',
    url: /Epg/,
    response: { body: JSON.stringify(responseBody) },
});

export const mockSports = (): IMock => mockRail(MockSports, 'Sports');
export const mockNextUp = (railId?: string): IMock => mockRail(MockNextUpRail, railId || '');
export const mockComingUp = (): IMock => mockRail(MockComingUpRail, 'ComingUp');

export const mockEpgBasic = (): IMock => mockEpg(MockEpg);
export const mockEpgEntitlements = (): IMock => mockEpg(MockEpgEntitlements);

export const shouldShowComingUp = (locale: LocaleKeys): boolean =>
    ['en-US', 'en-GB', 'en-IE'].includes(locale);

export type WhatsOnStoryMode = keyof typeof WhatsOnVariantEnum | 'EpgEntitlements';

const mockModesMap: Record<WhatsOnStoryMode, (railId?: string) => IMock> = {
    NextUp: mockNextUp,
    ComingUp: mockComingUp,
    Epg: mockEpgBasic,
    EpgEntitlements: mockEpgEntitlements,
};

export const MapModeToVariant: Record<WhatsOnStoryMode, WhatsOnVariantEnum> = {
    NextUp: WhatsOnVariantEnum.NextUp,
    ComingUp: WhatsOnVariantEnum.ComingUp,
    Epg: WhatsOnVariantEnum.Epg,
    EpgEntitlements: WhatsOnVariantEnum.Epg,
};

export const resetWhatsOnMocks = (): void => {
    ['ComingUp', 'NextUp'].forEach((queryKey) => queryClient.removeQueries(queryKey));
};

export const mockWhatsOnMode = (mode: WhatsOnStoryMode, railId?: string): IMock => {
    if (mode === WhatsOnVariantEnum.NextUp && !railId) {
        return mockModesMap[WhatsOnVariantEnum.ComingUp](railId);
    }
    return mockModesMap[mode](railId);
}
