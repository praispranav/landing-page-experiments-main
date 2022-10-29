import { DisplayTypeValues } from '@config/ConfigsKeys';
import { mockOffersByLocale } from '@containers/sections/Hero/Offer/__stories__/MockedResponse';
import {
    mockWhatsOnMode,
    shouldShowComingUp,
} from '@containers/sections/WhatsOn/__mocks__/MockedResponse';
import { WhatsOnVariantEnum } from '@containers/sections/WhatsOn/Variants';
import Redesign from '@experiments/e_ar_landingpageredesign_versusoldlp/redesign';
import { VariantConfigsProvider } from '@experiments/VariantConfigsProvider';
import { Args, Story } from '@storybook/react';
import { useXhrMocks } from '@utils/__mocks__/UseXhrMocks';
import { currencyMap } from '@utils/dazn/__mocks__/constants';

import { overrideExperimentConfig } from '../experiments/OverrideConfig';

export const Default: Story<Args> = ({
    displayType,
    heroBackgroundUrl,
    showPPV,
    showMarketProposition,
    locale,
    announcementBanner,
    whatsOnVariant,
    showHeroDetails,
}) => {
    const overrideConfigFn = overrideExperimentConfig({
        heroOfferDisplayType: displayType,
        heroBackgroundUrl,
        showPPV,
        showMarketProposition,
        showAnnouncementBanner: announcementBanner,
        whatsOnVariant,
        showHeroDetails,
    });

    useXhrMocks([
        mockWhatsOnMode(
            shouldShowComingUp(locale) ? WhatsOnVariantEnum.ComingUp : WhatsOnVariantEnum.Epg,
        ),
        mockOffersByLocale(locale, showPPV, true),
    ]);

    return (
        <VariantConfigsProvider overrideConfigFn={overrideConfigFn}>
            <Redesign />
        </VariantConfigsProvider>
    );
};

Default.args = {
    locale: 'de-DE',
    displayType: DisplayTypeValues.Default,
    heroBackgroundUrl: 'default',
    ppvEnabled: false,
    announcementBanner: true,
    showHeroDetails: false,
};

export default {
    title: 'Experiments',
    argTypes: {
        locale: {
            control: {
                type: 'select',
                options: Object.keys(currencyMap),
            },
        },
        displayType: {
            control: {
                type: 'select',
                options: ['', ...Object.values(DisplayTypeValues)],
            },
        },
        heroBackgroundUrl: {
            control: {
                type: 'text',
            },
        },
        showPPV: {
            control: {
                type: 'boolean',
            },
        },
        announcementBanner: {
            control: {
                type: 'boolean',
            },
        },
        showMarketProposition: {
            control: {
                type: 'boolean',
            },
        },
        whatsOnVariant: {
            control: {
                type: 'select',
                options: ['', ...Object.values(WhatsOnVariantEnum)],
            },
        },
        showHeroDetails: {
            control: {
                type: 'boolean',
            },
        },
    },
};
