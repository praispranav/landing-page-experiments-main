import { QueryClientWrapper } from '@config/QueryClient';
import { renderHook } from '@testing-library/react-hooks';
import { formatWithCurrency } from '@utils/Currency';
import { getCurrency } from '@utils/dazn/Region';
import { ChargeTier, Periodicity, PeriodicityKeys } from 'types/dazn/RatePlans/Offers';

import { useService } from '../UseService';
// eslint-disable-next-line jest/no-mocks-import
import MockOffers from './__mocks__/OffersResponseDE.json';
import { AnnualOfferParsed, InstalmentsOfferParsed, MonthlyOfferParsed } from './types';
import { getStartingFromOffer, useOffer } from './UseOffer';

const hookOptions = { wrapper: QueryClientWrapper };

const currency = 'eur' as string;

const getMockChargePeriod = (period: PeriodicityKeys): ChargeTier => {
    const offerForPeriod = MockOffers.Offers.find((offer) => offer.BillingPeriod === period);
    const chargeTier = offerForPeriod?.ChargeTiers.find(
        ({ Currency }) => Currency.toLocaleLowerCase() === currency,
    );

    return chargeTier ?? { Currency: 'abc', Price: 0 };
};

jest.mock('../UseService');
jest.mock('@utils/dazn/Region', () => ({
    ...jest.requireActual('@utils/dazn/Region'),
    getCurrency: jest.fn(),
}));

describe('UseOffer', () => {
    beforeEach(() => {
        (useService as jest.Mock).mockReturnValue({ data: MockOffers });

        (getCurrency as jest.Mock).mockReturnValue(currency);
    });

    it('should return null for annual, monthly, and instalments in case there is no data', () => {
        (useService as jest.Mock).mockReturnValue({ data: undefined });
        const { result } = renderHook(() => useOffer(), hookOptions);
        const { annual, monthly, instalments } = result.current;

        expect(annual).toBeNull();
        expect(monthly).toBeNull();
        expect(instalments).toBeNull();
    });

    describe('useAnnualOffer', () => {
        it('should return the value of the Instalment period', () => {
            const { result } = renderHook(() => useOffer(), hookOptions);
            const { annual } = result.current as { annual: AnnualOfferParsed };

            const annualCharge = getMockChargePeriod(Periodicity.Annual);
            expect(annual.price).toBe(formatWithCurrency(annualCharge.Price, currency));
        });

        it('should calculate how much the user is saving if they choose the annual plan', () => {
            const { result } = renderHook(() => useOffer(), hookOptions);
            const { annual } = result.current as { annual: AnnualOfferParsed };

            const {
                total: amountSavedTotal,
                monthly: amountSavedMonthly,
                percentageSave: amountSavedPercentage,
            } = annual.amountSaved ?? {};

            const monthlyCharge = getMockChargePeriod(Periodicity.Month);
            const annualCharge = getMockChargePeriod(Periodicity.Annual);

            const savedAmount = monthlyCharge.Price - annualCharge.Price / 12;

            expect(amountSavedMonthly).toBe(formatWithCurrency(savedAmount, currency));
            expect(amountSavedTotal).toBe(formatWithCurrency(savedAmount * 12, currency));
            expect(amountSavedPercentage).toBe(
                Math.trunc((savedAmount / monthlyCharge.Price) * 100),
            );
        });
    });

    describe('useInstalmentsOffer', () => {
        it('should return the value of the Instalment period', () => {
            const { result } = renderHook(() => useOffer(), hookOptions);
            const { instalments } = result.current as { instalments: InstalmentsOfferParsed };

            const InstalmentCharge = getMockChargePeriod(Periodicity.Instalments);
            expect(instalments.price).toBe(formatWithCurrency(InstalmentCharge.Price, currency));
        });

        it('should calculate how much the user is saving if they choose the Instalments plan', () => {
            const { result } = renderHook(() => useOffer(), hookOptions);
            const { instalments } = result.current as { instalments: InstalmentsOfferParsed };

            const {
                total: amountSavedTotal,
                monthly: amountSavedMonthly,
                percentageSave: amountSavedPercentage,
            } = instalments.amountSaved ?? {};

            const monthlyCharge = getMockChargePeriod(Periodicity.Month);
            const InstalmentCharge = getMockChargePeriod(Periodicity.Instalments);

            const savedAmount = monthlyCharge.Price - InstalmentCharge.Price;

            expect(amountSavedMonthly).toBe(formatWithCurrency(savedAmount, currency));
            expect(amountSavedTotal).toBe(formatWithCurrency(savedAmount * 12, currency));
            expect(amountSavedPercentage).toBe(
                Math.trunc((savedAmount / monthlyCharge.Price) * 100),
            );
        });
    });

    describe('Price Formatting', () => {
        const expectedPrice = '€29.99';

        it('should return the price with the currency as a string', () => {
            const { result } = renderHook(() => useOffer(), hookOptions);
            const { monthly } = result.current as { monthly: MonthlyOfferParsed };

            expect(monthly.price).toEqual(expectedPrice);
        });
    });

    describe('getStartingFromOffer', () => {
        it.each`
            index | monthly                 | instalments             | annual                  | expected
            ${1}  | ${{ value: 29.99 }}     | ${{ value: 24.99 }}     | ${{ value: 274.99 }}    | ${{ value: 24.99 }}
            ${2}  | ${{ value: 29.99 }}     | ${undefined}            | ${{ value: 274.99 }}    | ${{ value: 29.99 }}
            ${3}  | ${{ value: undefined }} | ${{ value: 24.99 }}     | ${null}                 | ${{ value: 24.99 }}
            ${4}  | ${{ value: 29.99 }}     | ${{ value: '' }}        | ${{ value: 274.99 }}    | ${{ value: 29.99 }}
            ${5}  | ${{ value: 29.99 }}     | ${{ value: 0 }}         | ${{ value: 274.99 }}    | ${{ value: 29.99 }}
            ${6}  | ${{ value: '' }}        | ${{ value: 0 }}         | ${{ value: 274.99 }}    | ${{ value: 274.99 }}
            ${7}  | ${{ value: undefined }} | ${{ value: undefined }} | ${{ value: null }}      | ${null}
            ${8}  | ${null}                 | ${null}                 | ${null}                 | ${null}
            ${9}  | ${null}                 | ${undefined}            | ${{ value: undefined }} | ${null}
            ${10} | ${{ value: '' }}        | ${{ value: 0 }}         | ${{ value: undefined }} | ${null}
        `(
            `should return the lowest offer or null if all offers have unexpected value, case $index`,
            ({ monthly, instalments, annual, expected }) => {
                const startingFromOffer = getStartingFromOffer(annual, monthly, instalments);

                expect(startingFromOffer).toEqual(expected);
            },
        );
    });
});
