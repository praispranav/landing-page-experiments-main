import type { Currency, Locale } from '@dazn/fe-formats';
// eslint-disable-next-line no-duplicate-imports
import format, { currencyFormat } from '@dazn/fe-formats';

import { getCountry, getLanguage } from './dazn/Region';

export const formatWithCurrency = (value: number, currency: string): string => {
    const locale = {
        language: getLanguage().toLowerCase(),
        country: getCountry().toLowerCase(),
    } as Locale;

    const formatValue = format(locale);
    return formatValue(value).pipe(
        currencyFormat({ currency: currency.toLowerCase() as Currency }),
    );
};
