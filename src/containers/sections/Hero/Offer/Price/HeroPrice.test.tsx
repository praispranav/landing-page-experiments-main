import { formatChargeWithCurrency } from '@hooks/dazn/offer/shared/ChargeTier';
import { AnnualOfferParsed } from '@hooks/dazn/offer/types';
import { useAddons } from '@hooks/dazn/offer/UseAddon';
import { useOffer } from '@hooks/dazn/offer/UseOffer';
import { render } from '@testing-library/react';
import { setCurrentChapter } from '@utils/dazn/ChapterHistory';
import * as daznRegion from '@utils/dazn/Region';
import { DaznChapterEnum } from 'types/dazn/DaznChapterEnum';

// eslint-disable-next-line jest/no-mocks-import
import { getOfferParsed } from '../__mocks__/MockHeroOffer';
import { HeroPrice } from './HeroPrice';
import { usePricePeriod } from './HeroPrice.hooks';

jest.mock('@hooks/dazn/offer/UseAddon');
jest.mock('@hooks/dazn/offer/UseOffer');
jest.mock('@utils/dazn/ChapterHistory');
jest.mock('./HeroPrice.hooks');

describe('Hero Price', () => {
    beforeEach(() => (useAddons as jest.Mock).mockReturnValue({}));

    const monthly = getOfferParsed(1.99);
    const annual = getOfferParsed(10, { amountSaved: null }) as AnnualOfferParsed;

    describe('Value', () => {
        it("shouldn't wrap the fraction of the price in case the currency doesn't has decimals", async () => {
            jest.spyOn(daznRegion, 'getLocale').mockReturnValue('ja-JP');

            const monthlyJP = getOfferParsed(1.99, { freeTrialAmount: 0 }, 'JPY');
            const annualJP = getOfferParsed(10, { amountSaved: null }, 'JPY') as AnnualOfferParsed;

            (useOffer as jest.Mock).mockReturnValue({ monthly: monthlyJP, annual: annualJP });
            const priceJPY = formatChargeWithCurrency({ Currency: 'JPY', Price: 1.99 });

            const { findByTestId } = render(<HeroPrice.Value>{priceJPY}</HeroPrice.Value>);

            const fullValue = await findByTestId('HERO_PRICE_FULL_VALUE');
            expect(fullValue).toHaveTextContent('¥2');
        });

        it('should display the full price', async () => {
            (useOffer as jest.Mock).mockReturnValue({ monthly, annual });
            const { findByTestId } = render(<HeroPrice.Value>{monthly.price}</HeroPrice.Value>);

            const fullValue = await findByTestId('HERO_PRICE_FULL_VALUE');
            expect(fullValue.textContent).toBe(monthly.price);
        });
    });

    describe('CTA', () => {
        it.each`
            period      | chapterPath                | selectPlan
            ${null}     | ${'account/signup'}        | ${false}
            ${'Month'}  | ${'account/signup/month'}  | ${false}
            ${'Annual'} | ${'account/signup/annual'} | ${false}
            ${'Month'}  | ${'account/signup'}        | ${true}
            ${'Annual'} | ${'account/signup'}        | ${true}
        `(
            'should have a CTA leading to $chapterPath when selectPlan is $selectPlan',
            async ({ period, chapterPath, selectPlan }) => {
                (usePricePeriod as jest.Mock).mockReturnValue(period);

                const { findByTestId } = render(<HeroPrice.Cta selectPlan={selectPlan} />);

                const cta = await findByTestId('HERO_CTA');
                cta.click();

                expect(setCurrentChapter as jest.Mock).toHaveBeenCalledWith({
                    chapterName: DaznChapterEnum.Auth,
                    chapterPath,
                });
            },
        );
    });
});
