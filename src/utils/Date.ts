import { ResourceStringsKeys } from '@config/ConfigsKeys';
import type { Locale as FeFormatsLocale } from '@dazn/fe-formats';
// eslint-disable-next-line no-duplicate-imports
import format, { dateMapDistanceToNow } from '@dazn/fe-formats';
import { useLocalisedStringKey } from '@hooks/resourceStrings/UseLocalisedStrings';
import formatWithOptions from 'date-fns/format';
import { useQuery } from 'react-query';

import { getCountry, getLanguage } from './dazn/Region';
import { MemberOf } from './Types';

const daznToDateFnsLocales = {
    en: 'en',
    de: 'de',
    es: 'es',
    it: 'it',
    ja: 'ja',
    pt: 'pt',
} as const;

const dateFormatMap = {
    enGB: 'Do MMMM',
    enUS: 'MMMM DD',
    es: 'dddd, D [de] MMMM',
    pt: 'dddd, D [de] MMMM',
    it: 'dddd, D MMMM',
    default: 'dddd | DD/MM/YYYY',
} as const;

type DateFormatMap = typeof dateFormatMap;
export type DateFnsLanguageKey = MemberOf<typeof daznToDateFnsLocales>;
export type Locale = Record<string, unknown>;

const memoizedLocales: Partial<Record<DateFnsLanguageKey, Promise<Locale>>> = {};

const loadDateFnsLocale = (language: DateFnsLanguageKey): Promise<Locale> => {
    const memoizedLocale = memoizedLocales[language];

    if (memoizedLocale) {
        return memoizedLocale;
    }

    const dateFnsLocale = import(
        /* webpackExclude: /_lib/ */
        /* webpackInclude: /locale\/(de|en|es|it|ja|pt)\/index.js/ */
        /* webpackChunkName: "date-fns-locale-[request]" */
        `date-fns/locale/${daznToDateFnsLocales[language]}/index.js`
    ).then((module) => module.default);

    memoizedLocales[language] = dateFnsLocale;
    return dateFnsLocale;
};

export const getDateFnsLocale = (language: DateFnsLanguageKey): Promise<Locale> => {
    if (Object.keys(daznToDateFnsLocales).includes(language)) {
        return loadDateFnsLocale(language);
    }

    return loadDateFnsLocale('en');
};

const getDateFnsFormat = (language: DateFnsLanguageKey, country: string): keyof DateFormatMap => {
    if (language === 'en') {
        const angloLocale = `${language}${country}`;

        return Object.keys(dateFormatMap).includes(angloLocale)
            ? (angloLocale as keyof DateFormatMap)
            : 'enUS';
    }

    return Object.keys(dateFormatMap).includes(language)
        ? (language as keyof DateFormatMap)
        : 'default';
};

export const formatDate = async (
    date: Date,
    language: string,
    country: string,
): Promise<string> => {
    const locale = await getDateFnsLocale(language as DateFnsLanguageKey);
    const formatLocale = getDateFnsFormat(language as DateFnsLanguageKey, country);

    return formatWithOptions(date, dateFormatMap[formatLocale], { locale });
};

export const useFormattedDate = (date: Date): string | undefined => {
    const language = getLanguage();
    const country = getCountry();

    const dateFormatLocale = getDateFnsFormat(language as DateFnsLanguageKey, country);

    return useQuery(`format-date-${date}-${dateFormatLocale}`, () =>
        formatDate(date, language, country),
    ).data;
};

export const useFormatEventDate = (dateString?: string): string | undefined => {
    const addonMoreThanWeekAgo = useLocalisedStringKey(ResourceStringsKeys.AddonMoreThanWeekAgo);
    const addonLessThanWeekAgo = useLocalisedStringKey(ResourceStringsKeys.AddonLessThanWeekAgo);
    const addonYesterday = useLocalisedStringKey(ResourceStringsKeys.AddonYesterday);
    const addonLastNight = useLocalisedStringKey(ResourceStringsKeys.AddonLastNight);
    const addonToday = useLocalisedStringKey(ResourceStringsKeys.AddonToday);
    const addonThisEvening = useLocalisedStringKey(ResourceStringsKeys.AddonThisEvening);
    const addonTonight = useLocalisedStringKey(ResourceStringsKeys.AddonTonight);
    const addonTomorrow = useLocalisedStringKey(ResourceStringsKeys.AddonTomorrow);
    const addonLessThanWeekAway = useLocalisedStringKey(ResourceStringsKeys.AddonLessThanWeekAway);
    const addonMoreThanWeekAway = useLocalisedStringKey(ResourceStringsKeys.AddonMoreThanWeekAway);

    if (!dateString) {
        return undefined;
    }

    const locale = {
        language: getLanguage().toLowerCase(),
        country: getCountry().toLowerCase(),
    } as FeFormatsLocale;

    const formatValue = format(locale);

    const eventDate = new Date(dateString);

    try {
        return formatValue(eventDate).pipe(
            dateMapDistanceToNow({
                moreThan7DaysAgo: {
                    value: addonMoreThanWeekAgo,
                },
                between2And6DaysAgo: {
                    value: addonLessThanWeekAgo,
                },
                yesterday: {
                    value: addonYesterday,
                },
                lastNight: {
                    value: addonLastNight,
                },
                today: {
                    value: addonToday,
                },
                thisEvening: {
                    value: addonThisEvening,
                },
                tonight: {
                    value: addonTonight,
                },
                tomorrow: {
                    value: addonTomorrow,
                },
                between2And6Days: {
                    value: addonLessThanWeekAway,
                },
                moreThan7Days: {
                    value: addonMoreThanWeekAway,
                },
            }),
        );
    } catch (error) {
        return '';
    }
};
