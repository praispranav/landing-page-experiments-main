import { DisplayTypeValues } from '@config/ConfigsKeys';
// eslint-disable-next-line jest/no-mocks-import
import AddonsResponse from '@hooks/dazn/offer/__mocks__/AddonsResponse.json';
// eslint-disable-next-line jest/no-mocks-import
import OffersResponseDE from '@hooks/dazn/offer/__mocks__/OffersResponseDE.json';
import {
    formatChargeWithCurrency,
    getChargeForCurrency,
} from '@hooks/dazn/offer/shared/ChargeTier';
import { useOffersService } from '@hooks/dazn/offer/shared/UseOfferService';
import { render, within } from '@testing-library/react';
import { setCurrentChapter } from '@utils/dazn/ChapterHistory';
import { getCurrency } from '@utils/dazn/Region';
import { ChargeTier } from 'types/dazn/RatePlans/Offers';

// eslint-disable-next-line jest/no-mocks-import
import { HeroOffer } from '../HeroOffer';

const currency = 'eur';

jest.mock('@hooks/dazn/offer/shared/UseOfferService');
jest.mock('@utils/dazn/Region', () => ({
    ...jest.requireActual('@utils/dazn/Region'),
    getCurrency: jest.fn().mockReturnValue(currency),
}));
jest.mock('@utils/dazn/ChapterHistory');

describe('HeroOfferAddons', () => {
    beforeEach(() => {
        const mockOffersWithAddons = { ...OffersResponseDE, ...AddonsResponse };

        (useOffersService as jest.Mock).mockReturnValue({ data: mockOffersWithAddons });
        (getCurrency as jest.Mock).mockReturnValue(currency);
    });

    describe('Addon Price', () => {
        it('should render the addon price', () => {
            const { queryByTestId } = render(<HeroOffer displayType={DisplayTypeValues.Addon} />);

            const charge = getChargeForCurrency(
                currency,
                AddonsResponse.Addons[0].ChargeTiers,
            ) as ChargeTier;

            const price = formatChargeWithCurrency(charge);

            expect(queryByTestId('HERO_PRICE')).toHaveTextContent(price);
        });
    });

    describe('Hero Price', () => {
        it('should render the monthly price', () => {
            const { queryByTestId } = render(<HeroOffer displayType={DisplayTypeValues.Addon} />);

            const monthlyOffer = OffersResponseDE.Offers.find(
                (offer) => offer.BillingPeriod === 'Month',
            );

            if (!monthlyOffer) {
                throw new Error("Monthly offer doesn't exist");
            }

            const monthlyCharge = getChargeForCurrency(currency, monthlyOffer.ChargeTiers);

            if (!monthlyCharge) {
                throw new Error("Monthly charge doesn't exist");
            }

            const price = formatChargeWithCurrency(monthlyCharge);
            expect(queryByTestId('HERO_PRICE_MONTH')).toHaveTextContent(price);
        });

        it('should redirect to account/signup when clicking on the monthly CTA', async () => {
            const { findByTestId } = render(<HeroOffer displayType={DisplayTypeValues.Addon} />);

            const element = await findByTestId('HERO_PRICE_MONTH');
            const cta = await within(element).findByTestId('HERO_CTA');
            cta.click();

            expect(setCurrentChapter as jest.Mock).toHaveBeenCalledWith({
                chapterName: 'auth',
                chapterPath: 'account/signup',
            });
        });
    });
});
