// eslint-disable-next-line jest/no-mocks-import
import { renderWithVariantConfig } from '@experiments/__mocks__/MockProviderConfig';
import { AnnualOfferParsed } from '@hooks/dazn/offer/types';
import { random } from 'faker';

// eslint-disable-next-line jest/no-mocks-import
import { getOfferParsed } from '../__mocks__/MockHeroOffer';
import { HeroOfferPeriodPlans } from './HeroOfferPeriodPlans';

jest.mock('@hooks/dazn/offer/UseOffer');
jest.mock('@hooks/dazn/offer/UseAddon');

import { useAddons } from '@hooks/dazn/offer/UseAddon';
import { useOffer } from '@hooks/dazn/offer/UseOffer';

const render = renderWithVariantConfig();

describe('HeroOfferPeriodPlans', () => {
    beforeEach(() => (useAddons as jest.Mock).mockReturnValue({ length: 0 }));

    const monthly = getOfferParsed(1.99);
    const annual = getOfferParsed(10.99) as AnnualOfferParsed;

    it('should display only the monthly price', () => {
        (useOffer as jest.Mock).mockReturnValue({ monthly });
        const { queryByTestId } = render(<HeroOfferPeriodPlans annual={null} monthly={monthly} />);

        expect(queryByTestId('HERO_PRICE_MONTH')).toHaveTextContent(monthly.price as string);
    });

    it('should display only the annual price', () => {
        (useOffer as jest.Mock).mockReturnValue({ annual });
        const { queryByTestId } = render(<HeroOfferPeriodPlans annual={annual} monthly={null} />);

        expect(queryByTestId('HERO_PRICE_ANNUAL')).toHaveTextContent(annual.price as string);
    });

    it('should display only the monthly & annual price, with the saving amount', () => {
        (useOffer as jest.Mock).mockReturnValue({ monthly, annual });

        const amountSavedMonth = random.number();
        const amountSavedYear = amountSavedMonth * 12;

        const amountSaved = {
            total: amountSavedYear.toString(),
            monthly: amountSavedMonth.toString(),
            percentageSave: 58,
        };

        const { queryByTestId } = render(
            <HeroOfferPeriodPlans monthly={monthly} annual={{ ...annual, amountSaved }} />,
        );

        expect(queryByTestId('HERO_PRICE_HIGHLIGHT')).toHaveTextContent(
            amountSaved.percentageSave as unknown as string
        );

        expect(queryByTestId('HERO_PRICE_ANNUAL')).toHaveTextContent(annual?.price as string);
        expect(queryByTestId('HERO_PRICE_MONTH')).toHaveTextContent(monthly?.price as string);
    });
});
