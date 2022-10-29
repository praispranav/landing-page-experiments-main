import { ElementSettingKeys, HeroVariantEnum } from '@config/ConfigsKeys';
import { render } from '@testing-library/react';

import { HeroVariant } from './HeroVariant';

jest.mock('@hooks/utils/UseLocalisedConfig');
jest.mock('@hooks/dazn/offer/UseAddon');

import { QueryClientWrapper } from '@config/QueryClient';
import { useShouldDisplayPPV } from '@hooks/dazn/offer/UseAddon';
import { useElementSetting } from '@hooks/utils/UseLocalisedConfig';

const { useElementSetting: actualElementSetting } = jest.requireActual(
    '@hooks/utils/UseLocalisedConfig',
);

const mockHeroVariant =
    (heroVariant: HeroVariantEnum) =>
    (elementName: ElementSettingKeys): boolean =>
        elementName === ElementSettingKeys.HeroVariant
            ? heroVariant
            : actualElementSetting(elementName);

describe('Hero Variant', () => {
    beforeEach(() => {
        (useShouldDisplayPPV as jest.Mock).mockReturnValue(false);
    });

    it('should render the "Hero Event" variant on the Hero section', () => {
        (useElementSetting as jest.Mock).mockImplementation(mockHeroVariant(HeroVariantEnum.Event));

        const { queryByTestId } = render(<HeroVariant />, {
            wrapper: QueryClientWrapper,
        });

        expect(queryByTestId('HERO_EVENT_VARIANT')).toBeInTheDocument();
    });

    it('should render the "Hero Many Tournaments" variant on the Hero section', () => {
        (useElementSetting as jest.Mock).mockImplementation(
            mockHeroVariant(HeroVariantEnum.ManyTournaments),
        );

        const { queryByTestId } = render(<HeroVariant />, { wrapper: QueryClientWrapper });

        expect(queryByTestId('HERO_MANY_TOURNAMENTS_VARIANT')).toBeInTheDocument();
    });

    it('should render the "PayPerView" variant if there is an addon and feature flag is enabled', () => {
        (useShouldDisplayPPV as jest.Mock).mockReturnValue(true);
        (useElementSetting as jest.Mock).mockImplementation(mockHeroVariant(HeroVariantEnum.Event));

        const { queryByTestId } = render(<HeroVariant />, {
            wrapper: QueryClientWrapper,
        });

        expect(queryByTestId('HERO_PPV')).toBeInTheDocument();
    });

    it('should render the "Hero Event" variant if useShouldDisplayPPV has returned false', () => {
        (useShouldDisplayPPV as jest.Mock).mockReturnValue(false);
        (useElementSetting as jest.Mock).mockImplementation(mockHeroVariant(HeroVariantEnum.Event));

        const { queryByTestId } = render(<HeroVariant />, { wrapper: QueryClientWrapper });

        expect(queryByTestId('HERO_PPV')).not.toBeInTheDocument();
        expect(queryByTestId('HERO_EVENT_VARIANT')).toBeInTheDocument();
    });
});
