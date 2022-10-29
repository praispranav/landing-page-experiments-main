import { renderHook } from '@testing-library/react-hooks';
import { getCountry, getLanguage } from '@utils/dazn/Region';
import { random } from 'faker';

// eslint-disable-next-line jest/no-mocks-import
import OffersResponseDE from '../__mocks__/OffersResponseDE.json';
import {
    formatChargeWithCurrency,
    getPriceFromChargeTier,
    useChargeForCurrency,
} from './ChargeTier';

const currency = 'eur';

jest.mock('@utils/dazn/Region');

describe('UseChargeForCurrency', () => {
    const [{ ChargeTiers }] = OffersResponseDE.Offers;

    it('should find the charge tier given the currency that was passed', () => {
        const { result } = renderHook(() => useChargeForCurrency(currency, ChargeTiers));

        expect(result.current).toStrictEqual({ Price: 29.99, Currency: currency.toUpperCase() });
    });
});

describe('Get price from charge tier', () => {
    it('should return the full price, if the Discount object is absent', () => {
        const expectedPrice = 29.99;

        const price = getPriceFromChargeTier({
            Currency: 'eur',
            Price: expectedPrice,
        });

        expect(price).toBe(expectedPrice);
    });

    it('should return the discounted price, if the Discount object is available', () => {
        const expectedPrice = 8.99;

        const price = getPriceFromChargeTier({
            Currency: 'eur',
            Price: random.number(),
            Discount: {
                Price: expectedPrice,
                Percentage: random.number(),
            },
        });

        expect(price).toBe(expectedPrice);
    });
});

describe('Format charge with currency', () => {
    beforeEach(() => {
        (getLanguage as jest.Mock).mockReturnValue('en');
        (getCountry as jest.Mock).mockReturnValue('DE');
    });

    it('should format a charge tier object into a price string', () => {
        const expectedPrice = '€29.99';

        const formattedPrice = formatChargeWithCurrency({
            Price: 29.99,
            Currency: currency,
        });

        expect(formattedPrice).toBe(expectedPrice);
    });
});
