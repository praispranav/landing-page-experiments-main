import { DisplayTypeValues, HeroVariantEnum } from '@config/ConfigsKeys';
import { mockOffersByLocale } from '@containers/sections/Hero/Offer/__stories__/MockedResponse';
import { HeroVariant } from '@containers/sections/Hero/Variant/HeroVariant';
import { useLocalisedConfig } from '@experiments/e_ar_landingpageredesign_versusoldlp/redesign/configs';
import { overrideExperimentConfig } from '@experiments/OverrideConfig';
import { VariantConfigsProvider } from '@experiments/VariantConfigsProvider';
import { HeroOfferDisplayTypeValues } from '@fe-experiments/types';
import { Story } from '@storybook/react';
import { useXhrMocks } from '@utils/__mocks__/UseXhrMocks';
import { currencyMap, LocaleKeys } from '@utils/dazn/__mocks__/constants';
import React, { FC, Suspense } from 'react';

const HeroVariantWithConfig: FC = () => {
    useLocalisedConfig();

    return <HeroVariant />;
};

const Hero: FC = () => (
    <Suspense fallback={null}>
        <HeroVariantWithConfig />
    </Suspense>
);

interface HeroStoryArgs {
    locale: LocaleKeys;
    displayType: HeroOfferDisplayTypeValues;
    heroVariant: HeroVariantEnum;
    responseHasAddons: boolean;
    showPPV: boolean;
    announcementBanner: boolean;
}

const Template: Story<HeroStoryArgs> = ({
    displayType,
    heroVariant,
    showPPV,
    locale,
    announcementBanner,
    responseHasAddons,
}) => {
    useXhrMocks([mockOffersByLocale(locale, responseHasAddons, true)]);

    const overrideConfigFn = overrideExperimentConfig({
        heroOfferDisplayType: displayType,
        heroVariant,
        showPPV,
        showAnnouncementBanner: announcementBanner,
    });

    return (
        <VariantConfigsProvider overrideConfigFn={overrideConfigFn}>
            <Hero />
        </VariantConfigsProvider>
    );
};

export const Default = Template.bind({});
Default.args = {
    locale: 'de-DE',
    displayType: DisplayTypeValues.Default as unknown as HeroOfferDisplayTypeValues,
    heroVariant: HeroVariantEnum.Event,
    responseHasAddons: true,
    showPPV: true,
    announcementBanner: true,
};

export default {
    title: 'Sections/Hero',
    component: Hero,
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
        heroVariant: {
            control: {
                type: 'select',
                options: ['', ...Object.values(HeroVariantEnum)],
            },
        },
        responseHasAddons: {
            control: {
                type: 'boolean',
            },
        },
        showPPV: {
            control: {
                type: 'boolean',
            },
        },
    },
};
