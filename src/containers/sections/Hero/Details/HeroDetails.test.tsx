/* eslint-disable jest/no-mocks-import */
import { ElementSettingKeys } from '@config/ConfigsKeys';
import { renderWithVariantConfig } from '@experiments/__mocks__/MockProviderConfig';
import { MockVariantConfig } from '@experiments/__mocks__/MockVariantConfig';
import { PPV_HERO_STRINGS } from '@experiments/e_ar_landingpageredesign_versusoldlp/redesign/configs/common/PPV';
import { VARIANT_STRINGS_CONFIG } from '@experiments/e_ar_landingpageredesign_versusoldlp/redesign/configs/common/VariantStringsConfig';
import { queryByAttribute } from '@testing-library/react';

import { HeroDetails } from './HeroDetails';

const render = renderWithVariantConfig({
    ...MockVariantConfig,
    strings: { ...VARIANT_STRINGS_CONFIG, ...PPV_HERO_STRINGS },
    elements: { [ElementSettingKeys.HeroDetails]: true },
});

describe('Hero Details', () => {
    it('renders the element with expected copy', () => {
        const { container } = render(<HeroDetails />);

        expect(queryByAttribute('id', container, 'HERO_DETAILS')).toHaveTextContent(
            'Fight night coverage starts %{details}',
        );
    });

    it('returns null if the feature flag is off', () => {
        const renderFeatureFlagOff = renderWithVariantConfig({
            ...MockVariantConfig,
            strings: { ...VARIANT_STRINGS_CONFIG, ...PPV_HERO_STRINGS },
            elements: { [ElementSettingKeys.HeroDetails]: false },
        });
        const { container } = renderFeatureFlagOff(<HeroDetails />);

        expect(queryByAttribute('id', container, 'HERO_DETAILS')).toBeNull();
    });
});
