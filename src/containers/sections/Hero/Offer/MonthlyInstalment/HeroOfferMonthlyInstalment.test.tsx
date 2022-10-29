// eslint-disable-next-line jest/no-mocks-import
import { renderWithVariantConfig } from '@experiments/__mocks__/MockProviderConfig';
import { AnnualOfferParsed } from '@hooks/dazn/offer/types';

// eslint-disable-next-line jest/no-mocks-import
import { getOfferParsed } from '../__mocks__/MockHeroOffer';
import { HeroOfferMonthlyIPP } from './HeroOfferMonthlyInstalment';

jest.mock('@hooks/dazn/offer/UseOffer');
jest.mock('@hooks/dazn/offer/UseAddon');

import { useAddons } from '@hooks/dazn/offer/UseAddon';
import { useOffer } from '@hooks/dazn/offer/UseOffer';

const render = renderWithVariantConfig();

describe('HeroOfferPeriodPlans', () => {
    beforeEach(() => (useAddons as jest.Mock).mockReturnValue({ length: 0 }));

    const monthly = getOfferParsed(1.99);
    const Instalment = getOfferParsed(10.99) as AnnualOfferParsed;

    it('should display only the monthly price', () => {
        (useOffer as jest.Mock).mockReturnValue({ monthly });
        const { queryByTestId } = render(
            <HeroOfferMonthlyIPP monthly={monthly} instalments={null} />,
        );

        expect(queryByTestId('HERO_PRICE_MONTH')).toHaveTextContent(monthly.price as string);
        expect(queryByTestId('HERO_PRICE_INSTALMENTS')).toBeNull();
    });

    it('should display only the Instalment price', () => {
        (useOffer as jest.Mock).mockReturnValue({ Instalment });
        const { queryByTestId } = render(
            <HeroOfferMonthlyIPP monthly={null} instalments={Instalment} />,
        );

        expect(queryByTestId('HERO_PRICE_INSTALMENTS')).toHaveTextContent(
            Instalment.price as string,
        );
        expect(queryByTestId('HERO_PRICE_MONTH')).toBeNull();
    });

    it('should display both Instalment and monthly price', () => {
        (useOffer as jest.Mock).mockReturnValue({ monthly, Instalment });

        const { queryByTestId } = render(
            <HeroOfferMonthlyIPP monthly={monthly} instalments={Instalment} />,
        );

        expect(queryByTestId('HERO_PRICE_INSTALMENTS')).toHaveTextContent(
            Instalment.price as string,
        );
        expect(queryByTestId('HERO_PRICE_MONTH')).toHaveTextContent(monthly.price as string);
    });
});
