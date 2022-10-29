// eslint-disable-next-line jest/no-mocks-import
import { formatChargeWithCurrency } from '@hooks/dazn/offer/shared/ChargeTier';
import { AnnualOfferParsed, MonthlyOfferParsed } from '@hooks/dazn/offer/types';

type OfferParsedOptions = Partial<Pick<AnnualOfferParsed, 'amountSaved' | 'freeTrialAmount'>>;

export const getOfferParsed = (
    price: number,
    options?: OfferParsedOptions,
    currency = 'EUR',
): MonthlyOfferParsed | AnnualOfferParsed => ({
    freeTrialAmount: options?.freeTrialAmount ?? 0,
    amountSaved: options?.amountSaved,
    price: formatChargeWithCurrency({ Currency: currency, Price: price }),
    value: price,
});
