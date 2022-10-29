import { QueryClientWrapper } from '@config/QueryClient';
import format from '@dazn/fe-formats';
import { renderHook } from '@testing-library/react-hooks';
import de from 'date-fns/locale/de';
import en from 'date-fns/locale/en';
import es from 'date-fns/locale/es';
import it from 'date-fns/locale/it';
import ja from 'date-fns/locale/ja';
import pt from 'date-fns/locale/pt';

import {
    DateFnsLanguageKey,
    getDateFnsLocale,
    Locale,
    useFormatEventDate,
    useFormattedDate,
} from './Date';
import { getCountry, getLanguage } from './dazn/Region';

jest.mock('@utils/dazn/Region');
jest.mock('@dazn/fe-formats');

describe('Date', () => {
    describe('getDateFnsLocale', () => {
        type ExpectedDateFnsLocale = [DateFnsLanguageKey, Locale];
        const expectedDateFnsLocales: ExpectedDateFnsLocale[] = [
            ['de', de],
            ['en', en],
            ['es', es],
            ['it', it],
            ['ja', ja],
            ['pt', pt],
        ];

        test.each(expectedDateFnsLocales)(
            'should get the getDateFnsLocale for %s',
            async (languageCode: DateFnsLanguageKey, expectedDateFnsLocale: Locale) => {
                const dateFnsLocale = await getDateFnsLocale(languageCode);

                expect(expectedDateFnsLocale).toBe(dateFnsLocale);
            },
        );
    });

    describe('Formatting', () => {
        const mockDate = new Date('2021-03-18T11:04:46.868Z');
        const expectedDateFormats = [
            ['es', 'US', 'jueves, 18 de marzo'],
            ['pt', 'BR', 'quinta-feira, 18 de março'],
            ['it', 'IT', 'giovedì, 18 marzo'],

            ['en', 'US', 'March 18'],
            ['en', 'GB', '18th March'],

            ['ja', 'JP', '木曜日 | 18/03/2021'],
        ];

        test.each(expectedDateFormats)(
            'should format the date in %s-%s as %s',
            async (language, country, formattedDate) => {
                (getLanguage as jest.Mock).mockReturnValue(language);
                (getCountry as jest.Mock).mockReturnValue(country);

                const { result, waitFor } = renderHook(() => useFormattedDate(mockDate), {
                    wrapper: QueryClientWrapper,
                });

                await waitFor(() => Boolean(result.current));

                expect(result.current).toBe(formattedDate);
            },
        );

        describe('useFormatEventDate', () => {
            test('should call the format from fe-formats', () => {
                const eventStartDate = '2022-10-16T20:00:00Z';
                const language = 'en';
                const country = 'de';
                const locale = {
                    language,
                    country,
                };

                (getLanguage as jest.Mock).mockReturnValue(language);
                (getCountry as jest.Mock).mockReturnValue(country);

                renderHook(() => useFormatEventDate(eventStartDate));

                expect(format).toBeCalledWith(locale);
            });

            test('should return undefined in case no date has been passed', () => {
                const { result } = renderHook(() => useFormatEventDate());

                expect(format).not.toBeCalled();
                expect(result.current).toBe(undefined);
            });
        });
    });
});
