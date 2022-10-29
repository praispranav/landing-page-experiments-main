import { mockOffersByLocale } from '@containers/sections/Hero/Offer/__stories__/MockedResponse';
import { useLocalisedConfig } from '@experiments/e_ar_landingpageredesign_versusoldlp/redesign/configs';
import { VariantConfigsProvider } from '@experiments/VariantConfigsProvider';
import { Story } from '@storybook/react';
import { useXhrMocks } from '@utils/__mocks__/UseXhrMocks';
import { FC, Suspense } from 'react';

import {
    MapModeToVariant,
    mockSports,
    mockWhatsOnMode,
    resetWhatsOnMocks,
    WhatsOnStoryMode,
} from '../__mocks__/MockedResponse';
import { WhatsOnVariantEnum } from '../Variants';
import { WhatsOn as WhatsOnSection } from '../WhatsOn';
import { overrideVariantConfig } from './OverrideConfig';

const WhatsOnSectionWithConfig: FC = () => {
    useLocalisedConfig();

    return <WhatsOnSection />;
};

const WhatsOn: FC = () => (
    <Suspense fallback={null}>
        <WhatsOnSectionWithConfig />
    </Suspense>
);

interface WhatsOnStoryParams {
    mode: WhatsOnStoryMode;
    railId?: string;
}

const useWhatsOnMocks = (mode: WhatsOnStoryMode, railId?: string): void => {
    resetWhatsOnMocks();

    const xhrMocks = [mockWhatsOnMode(mode, railId), mockOffersByLocale('de-DE', true)];

    if (MapModeToVariant[mode] === 'Epg') {
        xhrMocks.push(mockSports());
    }

    useXhrMocks(xhrMocks);
};

export const Default: Story<WhatsOnStoryParams> = ({ mode, railId }) => {
    useWhatsOnMocks(mode, railId);

    const overrideConfigFn = overrideVariantConfig(MapModeToVariant[mode] as WhatsOnVariantEnum, railId);

    return (
        <VariantConfigsProvider overrideConfigFn={overrideConfigFn}>
            <WhatsOn />
        </VariantConfigsProvider>
    );
};

Default.args = {
    mode: 'Epg',
};

Default.storyName = 'WhatsOn';

export default {
    title: 'Sections/WhatsOn',
    component: WhatsOn,
    argTypes: {
        mode: {
            control: {
                type: 'select',
                options: ['', 'ComingUp', 'Epg', 'EpgEntitlements', 'NextUp'],
            },
        },
        railId: {
            control: {
                type: 'select',
                options: [undefined, '', '27474ae4-3032-4f5e-bb92-518697c95bd6'],
            },
        },
    },
};
